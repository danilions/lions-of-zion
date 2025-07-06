import { NextRequest, NextResponse } from 'next/server';

// Structured logging interface for Azure monitoring
interface StructuredLog {
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
  requestId: string;
  event: string;
  data?: any;
  duration?: number;
  memoryUsage?: NodeJS.MemoryUsage;
  error?: {
    message: string;
    stack?: string;
    name: string;
  };
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
  
  // Structured logging for request start
  logStructured({
    timestamp: new Date().toISOString(),
    level: 'INFO',
    requestId,
    event: 'webhook_request_start',
    data: {
      method: request.method,
      url: request.url,
      userAgent: request.headers.get('user-agent'),
      contentType: request.headers.get('content-type'),
      contentLength: request.headers.get('content-length'),
      origin: request.headers.get('origin'),
      xForwardedFor: request.headers.get('x-forwarded-for'),
      xRealIp: request.headers.get('x-real-ip')
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
              'X-Request-ID': requestId,
              'X-Processing-Time': `${processingTime}ms`
            }
          }
        );
      }
      
      // Business logic processing with performance tracking
      const businessLogicStart = Date.now();
      
      // Simulate any business logic here (currently just logging the received data)
      logStructured({
        timestamp: new Date().toISOString(),
        level: 'INFO',
        requestId,
        event: 'business_logic_processing',
        data: {
          hasData: !!jsonData,
          dataType: typeof jsonData,
          processingStarted: true
        }
      });
      
      // Add artificial delay to test timeout handling (remove in production)
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
          dataReceived: jsonData,
          businessLogicTimeMs: businessLogicTime,
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
      
      // Respond with success message including diagnostic info
      return NextResponse.json(
        { 
          message: 'Received',
          status: 'success',
          timestamp: new Date().toISOString(),
          requestId,
          processingTime: `${totalProcessingTime}ms`,
          businessLogicTime: `${businessLogicTime}ms`
        },
        { 
          status: 200,
          headers: {
            'X-Request-ID': requestId,
            'X-Processing-Time': `${totalProcessingTime}ms`,
            'X-Business-Logic-Time': `${businessLogicTime}ms`,
            'X-Memory-Used': `${endMetrics.memoryUsage.heapUsed}`
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
          'X-Request-ID': requestId,
          'X-Processing-Time': `${processingTime}ms`,
          'X-Error-Type': isTimeout ? 'timeout' : 'internal_error'
        }
      }
    );
  }
}

/**
 * Enhanced handlers for unsupported HTTP methods with structured logging
 * Only POST is allowed for this webhook endpoint
 */
export async function GET(request: NextRequest) {
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  logStructured({
    timestamp: new Date().toISOString(),
    level: 'WARN',
    requestId,
    event: 'unsupported_method_attempted',
    data: {
      method: 'GET',
      url: request.url,
      userAgent: request.headers.get('user-agent'),
      origin: request.headers.get('origin')
    }
  });
  
  return NextResponse.json(
    { 
      message: 'Method not allowed. Only POST requests are accepted.',
      method: 'GET',
      requestId,
      timestamp: new Date().toISOString()
    },
    { 
      status: 405,
      headers: {
        'Allow': 'POST',
        'X-Request-ID': requestId
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
        'Allow': 'POST',
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
        'Allow': 'POST',
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
        'Allow': 'POST',
        'X-Request-ID': requestId
      }
    }
  );
}
