import { NextRequest, NextResponse } from 'next/server';

/**
 * Enhanced API Route for ChatGPT Connector webhook with comprehensive diagnostics
 * Accepts POST requests with JSON payloads and provides detailed logging
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  // Initial request logging
  console.log(`[${requestId}] ==> WEBHOOK REQUEST START`, {
    timestamp: new Date().toISOString(),
    method: request.method,
    url: request.url,
    userAgent: request.headers.get('user-agent'),
    contentType: request.headers.get('content-type'),
    contentLength: request.headers.get('content-length'),
    origin: request.headers.get('origin'),
    referer: request.headers.get('referer'),
    xForwardedFor: request.headers.get('x-forwarded-for'),
    xRealIp: request.headers.get('x-real-ip'),
    requestId
  });

  try {
    // Log all headers for debugging
    const allHeaders = Object.fromEntries(request.headers.entries());
    console.log(`[${requestId}] All request headers:`, allHeaders);

    // Attempt to parse JSON body with detailed error handling
    let jsonData;
    let rawBody = '';
    
    try {
      const bodyText = await request.text();
      rawBody = bodyText;
      console.log(`[${requestId}] Raw request body (first 500 chars):`, rawBody.substring(0, 500));
      
      if (!bodyText.trim()) {
        throw new Error('Empty request body');
      }
      
      jsonData = JSON.parse(bodyText);
      console.log(`[${requestId}] Successfully parsed JSON:`, {
        dataKeys: Object.keys(jsonData),
        dataSize: JSON.stringify(jsonData).length
      });
      
    } catch (parseError) {
      console.error(`[${requestId}] JSON parsing failed:`, {
        error: parseError instanceof Error ? parseError.message : 'Unknown parse error',
        rawBodyLength: rawBody.length,
        rawBodyPreview: rawBody.substring(0, 200),
        contentType: request.headers.get('content-type')
      });
      
      const processingTime = Date.now() - startTime;
      console.log(`[${requestId}] <== WEBHOOK REQUEST END (PARSE ERROR) - ${processingTime}ms`);
      
      return NextResponse.json(
        { 
          message: 'Invalid JSON payload', 
          error: parseError instanceof Error ? parseError.message : 'JSON parse error',
          requestId,
          processingTime: `${processingTime}ms`
        },
        { status: 400 }
      );
    }
    
    // Log successful processing
    console.log(`[${requestId}] ChatGPT Webhook data processed successfully:`, {
      timestamp: new Date().toISOString(),
      dataReceived: jsonData,
      processingTimeMs: Date.now() - startTime
    });
    
    const processingTime = Date.now() - startTime;
    console.log(`[${requestId}] <== WEBHOOK REQUEST END (SUCCESS) - ${processingTime}ms`);
    
    // Respond with success message including diagnostic info
    return NextResponse.json(
      { 
        message: 'Received',
        status: 'success',
        timestamp: new Date().toISOString(),
        requestId,
        processingTime: `${processingTime}ms`
      },
      { 
        status: 200,
        headers: {
          'X-Request-ID': requestId,
          'X-Processing-Time': `${processingTime}ms`
        }
      }
    );
    
  } catch (error) {
    const processingTime = Date.now() - startTime;
    
    // Comprehensive error logging
    console.error(`[${requestId}] CRITICAL ERROR in webhook processing:`, {
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? {
        message: error.message,
        stack: error.stack,
        name: error.name
      } : 'Unknown error type',
      processingTimeMs: processingTime,
      requestUrl: request.url,
      requestMethod: request.method
    });
    
    console.log(`[${requestId}] <== WEBHOOK REQUEST END (ERROR) - ${processingTime}ms`);
    
    // Return detailed error response
    return NextResponse.json(
      { 
        message: 'Internal server error processing webhook',
        error: error instanceof Error ? error.message : 'Unknown error',
        requestId,
        processingTime: `${processingTime}ms`,
        timestamp: new Date().toISOString()
      },
      { 
        status: 500,
        headers: {
          'X-Request-ID': requestId,
          'X-Processing-Time': `${processingTime}ms`
        }
      }
    );
  }
}

/**
 * Enhanced handlers for unsupported HTTP methods with diagnostic logging
 * Only POST is allowed for this webhook endpoint
 */
export async function GET(request: NextRequest) {
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  console.log(`[${requestId}] GET request attempted on webhook endpoint:`, {
    timestamp: new Date().toISOString(),
    url: request.url,
    userAgent: request.headers.get('user-agent'),
    origin: request.headers.get('origin')
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
  console.log(`[${requestId}] PUT request attempted on webhook endpoint:`, {
    timestamp: new Date().toISOString(),
    url: request.url,
    userAgent: request.headers.get('user-agent')
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
  console.log(`[${requestId}] DELETE request attempted on webhook endpoint:`, {
    timestamp: new Date().toISOString(),
    url: request.url,
    userAgent: request.headers.get('user-agent')
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
  console.log(`[${requestId}] PATCH request attempted on webhook endpoint:`, {
    timestamp: new Date().toISOString(),
    url: request.url,
    userAgent: request.headers.get('user-agent')
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
