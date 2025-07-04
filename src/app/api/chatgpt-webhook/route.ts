import { NextRequest, NextResponse } from 'next/server';

// Structured logging interface for Azure monitoring
interface StructuredLog {
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
  requestId: string;
  event: string;
  data?: Record<string, unknown>;
  duration?: number;
  memoryUsage?: NodeJS.MemoryUsage;
  error?: {
    message: string;
    stack?: string;
    name: string;
  };
}

// ChatGPT connector expected request/response interfaces
interface ChatGPTRequest {
  message?: string;
  conversation_id?: string;
  user_id?: string;
  action?: string;
  input?: string;
  query?: string;
  [key: string]: unknown; // Allow additional properties
}

interface ChatGPTResponse {
  status: 'success' | 'error';
  message: string;
  data?: unknown;
  conversation_id?: string;
  response?: string;
  result?: string;
  timestamp: string;
}

// Utility function for structured logging compatible with Azure Log Analytics
function logStructured(log: StructuredLog): void {
  const logEntry = {
    ...log,
    source: 'chatgpt-webhook-api',
    version: '2.0',
    environment: process.env.NODE_ENV || 'production'
  };
  
  // Console log for Azure Static Web Apps to capture
  console.log(`[STRUCTURED][${log.level}][${log.requestId}] ${log.event}`, JSON.stringify(logEntry));
}

// Enhanced CORS headers for ChatGPT Connector compatibility
function getCorsHeaders(): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept, Origin, X-Requested-With, X-API-Key, X-ChatGPT-Request',
    'Access-Control-Allow-Credentials': 'false',
    'Access-Control-Expose-Headers': 'X-Request-ID, X-Processing-Time',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin, Access-Control-Request-Method, Access-Control-Request-Headers'
  };
}

// Performance and memory monitoring
function getPerformanceMetrics(): { memoryUsage: NodeJS.MemoryUsage; uptime: number } {
  return {
    memoryUsage: process.memoryUsage(),
    uptime: process.uptime()
  };
}

/**
 * Enhanced API Route for ChatGPT Connector webhook with comprehensive diagnostics
 * Accepts POST requests with JSON payloads and provides detailed logging
 * Version 2.0 - Added Azure-compatible structured logging and performance monitoring
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const startMetrics = getPerformanceMetrics();
  
  // ChatGPT Actions validation
  const validation = validateChatGPTAction(request);
  if (!validation.isValid) {
    return NextResponse.json(
      { 
        message: 'Invalid ChatGPT Action request', 
        error: validation.error,
        requestId 
      },
      { 
        status: 400,
        headers: getCorsHeaders()
      }
    );
  }
  
  // Structured logging for request start
  logStructured({
    timestamp: new Date().toISOString(),
    level: 'INFO',
    requestId,
    event: 'chatgpt_webhook_request_start',
    data: {
      method: request.method,
      url: request.url,
      userAgent: request.headers.get('user-agent'),
      contentType: request.headers.get('content-type'),
      contentLength: request.headers.get('content-length'),
      origin: request.headers.get('origin'),
      xForwardedFor: request.headers.get('x-forwarded-for'),
      xRealIp: request.headers.get('x-real-ip'),
      isChatGPTAction: request.headers.get('user-agent')?.includes('OpenAI') || request.headers.get('user-agent')?.includes('ChatGPT')
    },
    memoryUsage: startMetrics.memoryUsage
  });

  try {
    // Enhanced request validation with timeout protection
    const requestTimeout = 25000; // 25 seconds (less than typical Azure timeout)
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request processing timeout')), requestTimeout);
    });

    // Process request with timeout protection
    const processRequest = async () => {
      // Log all headers for debugging
      const allHeaders = Object.fromEntries(request.headers.entries());
      logStructured({
        timestamp: new Date().toISOString(),
        level: 'DEBUG',
        requestId,
        event: 'headers_received',
        data: { headerCount: Object.keys(allHeaders).length, headers: allHeaders }
      });

      // Attempt to parse JSON body with detailed error handling
      let jsonData;
      let rawBody = '';
      
      try {
        const bodyText = await request.text();
        rawBody = bodyText;
        
        logStructured({
          timestamp: new Date().toISOString(),
          level: 'DEBUG',
          requestId,
          event: 'body_received',
          data: { 
            bodyLength: rawBody.length,
            bodyPreview: rawBody.substring(0, 100),
            isEmpty: !bodyText.trim()
          }
        });
        
        if (!bodyText.trim()) {
          throw new Error('Empty request body');
        }
        
        jsonData = JSON.parse(bodyText);
        
        logStructured({
          timestamp: new Date().toISOString(),
          level: 'INFO',
          requestId,
          event: 'json_parsed_successfully',
          data: {
            dataKeys: Object.keys(jsonData),
            dataSize: JSON.stringify(jsonData).length,
            hasValidStructure: typeof jsonData === 'object' && jsonData !== null
          }
        });
        
      } catch (parseError) {
        logStructured({
          timestamp: new Date().toISOString(),
          level: 'ERROR',
          requestId,
          event: 'json_parse_failed',
          data: {
            rawBodyLength: rawBody.length,
            rawBodyPreview: rawBody.substring(0, 200),
            contentType: request.headers.get('content-type')
          },
          error: {
            message: parseError instanceof Error ? parseError.message : 'Unknown parse error',
            name: parseError instanceof Error ? parseError.name : 'ParseError'
          }
        });
        
        const processingTime = Date.now() - startTime;
        
        logStructured({
          timestamp: new Date().toISOString(),
          level: 'WARN',
          requestId,
          event: 'webhook_request_end',
          data: { result: 'parse_error', httpStatus: 400 },
          duration: processingTime,
          memoryUsage: getPerformanceMetrics().memoryUsage
        });
        
        return NextResponse.json(
          { 
            message: 'Invalid JSON payload', 
            error: parseError instanceof Error ? parseError.message : 'JSON parse error',
            requestId,
            processingTime: `${processingTime}ms`
          },
          { 
            status: 400,
            headers: {
              ...getCorsHeaders(),
              'X-Request-ID': requestId,
              'X-Processing-Time': `${processingTime}ms`
            }
          }
        );
      }
      
      // Business logic processing with performance tracking
      const businessLogicStart = Date.now();
      
      // Enhanced ChatGPT connector compatibility processing
      const chatGPTRequest = jsonData as ChatGPTRequest;
      
      logStructured({
        timestamp: new Date().toISOString(),
        level: 'INFO',
        requestId,
        event: 'chatgpt_request_processing',
        data: {
          hasMessage: !!chatGPTRequest.message,
          hasInput: !!chatGPTRequest.input,
          hasQuery: !!chatGPTRequest.query,
          hasAction: !!chatGPTRequest.action,
          conversationId: chatGPTRequest.conversation_id,
          userId: chatGPTRequest.user_id,
          dataKeys: Object.keys(chatGPTRequest)
        }
      });
      
      // Process the request and generate appropriate response
      let responseMessage = 'Request received successfully';
      let responseData: unknown = null;
      
      // Handle different types of ChatGPT requests
      if (chatGPTRequest.message) {
        responseMessage = `Processed message: ${chatGPTRequest.message}`;
        responseData = { originalMessage: chatGPTRequest.message };
      } else if (chatGPTRequest.input) {
        responseMessage = `Processed input: ${chatGPTRequest.input}`;
        responseData = { originalInput: chatGPTRequest.input };
      } else if (chatGPTRequest.query) {
        responseMessage = `Processed query: ${chatGPTRequest.query}`;
        responseData = { originalQuery: chatGPTRequest.query };
      } else if (chatGPTRequest.action) {
        responseMessage = `Processed action: ${chatGPTRequest.action}`;
        responseData = { originalAction: chatGPTRequest.action };
      }
      
      // Simulate processing time (remove in production)
      // await new Promise(resolve => setTimeout(resolve, 100));
      
      const businessLogicTime = Date.now() - businessLogicStart;
      const totalProcessingTime = Date.now() - startTime;
      const endMetrics = getPerformanceMetrics();
      
      logStructured({
        timestamp: new Date().toISOString(),
        level: 'INFO',
        requestId,
        event: 'webhook_request_success',
        data: {
          dataReceived: chatGPTRequest,
          businessLogicTimeMs: businessLogicTime,
          responseMessage,
          memoryDelta: {
            heapUsed: endMetrics.memoryUsage.heapUsed - startMetrics.memoryUsage.heapUsed,
            rss: endMetrics.memoryUsage.rss - startMetrics.memoryUsage.rss
          }
        },
        duration: totalProcessingTime,
        memoryUsage: endMetrics.memoryUsage
      });
      
      logStructured({
        timestamp: new Date().toISOString(),
        level: 'INFO',
        requestId,
        event: 'webhook_request_end',
        data: { result: 'success', httpStatus: 200 },
        duration: totalProcessingTime,
        memoryUsage: endMetrics.memoryUsage
      });
      
      // ChatGPT-compatible response format
      const chatGPTResponse: ChatGPTResponse = {
        status: 'success',
        message: responseMessage,
        data: responseData,
        conversation_id: chatGPTRequest.conversation_id,
        response: responseMessage,
        result: 'success',
        timestamp: new Date().toISOString()
      };
      
      // Respond with ChatGPT-compatible format including diagnostic info
      return NextResponse.json(
        {
          ...chatGPTResponse,
          // Additional diagnostic fields for debugging
          _debug: {
            requestId,
            processingTime: `${totalProcessingTime}ms`,
            businessLogicTime: `${businessLogicTime}ms`,
            memoryUsed: endMetrics.memoryUsage.heapUsed
          }
        },
        { 
          status: 200,
          headers: {
            ...getCorsHeaders(),
            'Content-Type': 'application/json',
            'X-Request-ID': requestId,
            'X-Processing-Time': `${totalProcessingTime}ms`,
            'X-Business-Logic-Time': `${businessLogicTime}ms`,
            'X-Memory-Used': `${endMetrics.memoryUsage.heapUsed}`,
            'X-ChatGPT-Compatible': 'true'
          }
        }
      );
    };

    // Execute with timeout protection
    return await Promise.race([processRequest(), timeoutPromise]) as NextResponse;
    
  } catch (error) {
    const processingTime = Date.now() - startTime;
    const errorMetrics = getPerformanceMetrics();
    
    // Comprehensive structured error logging
    logStructured({
      timestamp: new Date().toISOString(),
      level: 'ERROR',
      requestId,
      event: 'webhook_request_error',
      data: {
        requestUrl: request.url,
        requestMethod: request.method,
        isTimeout: error instanceof Error && error.message.includes('timeout'),
        memoryDelta: {
          heapUsed: errorMetrics.memoryUsage.heapUsed - startMetrics.memoryUsage.heapUsed,
          rss: errorMetrics.memoryUsage.rss - startMetrics.memoryUsage.rss
        }
      },
      duration: processingTime,
      memoryUsage: errorMetrics.memoryUsage,
      error: error instanceof Error ? {
        message: error.message,
        stack: error.stack,
        name: error.name
      } : { message: 'Unknown error type', name: 'UnknownError' }
    });
    
    logStructured({
      timestamp: new Date().toISOString(),
      level: 'WARN',
      requestId,
      event: 'webhook_request_end',
      data: { result: 'error', httpStatus: 500 },
      duration: processingTime,
      memoryUsage: errorMetrics.memoryUsage
    });
    
    // Determine error type and appropriate status code
    const isTimeout = error instanceof Error && error.message.includes('timeout');
    const statusCode = isTimeout ? 408 : 500;
    const errorMessage = isTimeout ? 'Request processing timeout' : 'Internal server error processing webhook';
    
    // Return detailed error response
    return NextResponse.json(
      { 
        message: errorMessage,
        error: error instanceof Error ? error.message : 'Unknown error',
        requestId,
        processingTime: `${processingTime}ms`,
        timestamp: new Date().toISOString(),
        errorType: isTimeout ? 'timeout' : 'internal_error'
      },
      { 
        status: statusCode,
        headers: {
          ...getCorsHeaders(),
          'X-Request-ID': requestId,
          'X-Processing-Time': `${processingTime}ms`,
          'X-Error-Type': isTimeout ? 'timeout' : 'internal_error'
        }
      }
    );
  }
}

/**
 * GET handler for ChatGPT Connector discovery and health checks
 * Provides endpoint information and capabilities
 */
export async function GET(request: NextRequest) {
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  logStructured({
    timestamp: new Date().toISOString(),
    level: 'INFO',
    requestId,
    event: 'discovery_request',
    data: {
      method: 'GET',
      url: request.url,
      userAgent: request.headers.get('user-agent'),
      origin: request.headers.get('origin'),
      accept: request.headers.get('accept')
    }
  });
  
  // ChatGPT connector discovery response
  const discoveryResponse = {
    name: 'Lions of Zion API',
    description: 'Custom ChatGPT Connector for Lions of Zion Organization',
    version: '2.0',
    status: 'active',
    capabilities: [
      'message_processing',
      'query_handling',
      'action_execution'
    ],
    endpoints: {
      webhook: '/api/chatgpt-webhook',
      methods: ['POST', 'OPTIONS']
    },
    formats: {
      request: {
        content_type: 'application/json',
        fields: ['message', 'input', 'query', 'action', 'conversation_id', 'user_id']
      },
      response: {
        content_type: 'application/json',
        fields: ['status', 'message', 'data', 'response', 'result', 'timestamp']
      }
    },
    cors: {
      enabled: true,
      origins: ['*'],
      methods: ['GET', 'POST', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With']
    },
    authentication: {
      required: false,
      type: 'none'
    },
    timestamp: new Date().toISOString(),
    requestId
  };
  
  return NextResponse.json(
    discoveryResponse,
    { 
      status: 200,
      headers: {
        ...getCorsHeaders(),
        'Content-Type': 'application/json',
        'X-Request-ID': requestId,
        'X-Endpoint-Type': 'discovery',
        'X-ChatGPT-Compatible': 'true'
      }
    }
  );
}

export async function PUT(request: NextRequest) {
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  logStructured({
    timestamp: new Date().toISOString(),
    level: 'WARN',
    requestId,
    event: 'unsupported_method_attempted',
    data: {
      method: 'PUT',
      url: request.url,
      userAgent: request.headers.get('user-agent')
    }
  });
  
  return NextResponse.json(
    { 
      message: 'Method not allowed. Only POST requests are accepted.',
      method: 'PUT',
      requestId 
    },
    { 
      status: 405,
      headers: {
        ...getCorsHeaders(),
        'Allow': 'POST, OPTIONS',
        'X-Request-ID': requestId
      }
    }
  );
}

export async function DELETE(request: NextRequest) {
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  logStructured({
    timestamp: new Date().toISOString(),
    level: 'WARN',
    requestId,
    event: 'unsupported_method_attempted',
    data: {
      method: 'DELETE',
      url: request.url,
      userAgent: request.headers.get('user-agent')
    }
  });
  
  return NextResponse.json(
    { 
      message: 'Method not allowed. Only POST requests are accepted.',
      method: 'DELETE',
      requestId 
    },
    { 
      status: 405,
      headers: {
        ...getCorsHeaders(),
        'Allow': 'POST, OPTIONS',
        'X-Request-ID': requestId
      }
    }
  );
}

export async function PATCH(request: NextRequest) {
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  logStructured({
    timestamp: new Date().toISOString(),
    level: 'WARN',
    requestId,
    event: 'unsupported_method_attempted',
    data: {
      method: 'PATCH',
      url: request.url,
      userAgent: request.headers.get('user-agent')
    }
  });
  
  return NextResponse.json(
    { 
      message: 'Method not allowed. Only POST requests are accepted.',
      method: 'PATCH',
      requestId 
    },
    { 
      status: 405,
      headers: {
        ...getCorsHeaders(),
        'Allow': 'POST, OPTIONS',
        'X-Request-ID': requestId
      }
    }
  );
}

/**
 * Enhanced OPTIONS handler for CORS preflight requests - Required for ChatGPT Connectors
 * Enables cross-origin requests from ChatGPT's domain and other authorized origins
 */
export async function OPTIONS(request: NextRequest) {
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  logStructured({
    timestamp: new Date().toISOString(),
    level: 'INFO',
    requestId,
    event: 'cors_preflight_request',
    data: {
      origin: request.headers.get('origin'),
      requestMethod: request.headers.get('access-control-request-method'),
      requestHeaders: request.headers.get('access-control-request-headers'),
      userAgent: request.headers.get('user-agent'),
      referrer: request.headers.get('referer') || request.headers.get('referrer')
    }
  });

  // Set comprehensive CORS headers for maximum ChatGPT Connector compatibility
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*', // Allow all origins for ChatGPT Connectors
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept, Origin, X-Requested-With, X-API-Key, X-ChatGPT-Request',
    'Access-Control-Allow-Credentials': 'false',
    'Access-Control-Expose-Headers': 'X-Request-ID, X-Processing-Time, X-ChatGPT-Compatible',
    'Access-Control-Max-Age': '86400', // Cache preflight for 24 hours
    'Content-Type': 'application/json',
    'Vary': 'Origin, Access-Control-Request-Method, Access-Control-Request-Headers',
    'X-Request-ID': requestId,
    'X-CORS-Enabled': 'true',
    'X-ChatGPT-Compatible': 'true',
    'X-Endpoint-Type': 'preflight'
  };

  return new NextResponse(null, {
    status: 204, // No Content
    headers: corsHeaders
  });
}

// ChatGPT Actions specific validation
function validateChatGPTAction(request: NextRequest): { isValid: boolean; error?: string } {
  // Check for ChatGPT-specific headers that indicate this is an Actions validation call
  const userAgent = request.headers.get('user-agent') || '';
  const origin = request.headers.get('origin') || '';
  
  // ChatGPT Actions often sends validation requests with specific patterns
  if (userAgent.includes('OpenAI') || userAgent.includes('ChatGPT') || 
      origin.includes('openai.com') || origin.includes('chatgpt.com')) {
    
    // For ChatGPT Actions, we need to ensure the endpoint responds correctly to validation
    return { isValid: true };
  }
  
  return { isValid: true }; // Allow all other requests
}
