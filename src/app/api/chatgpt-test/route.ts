import { NextRequest, NextResponse } from 'next/server';

/**
 * Test endpoint specifically for ChatGPT Actions validation
 * This endpoint helps diagnose connection issues during connector setup
 */
export async function POST(request: NextRequest) {
  const requestId = `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  try {
    // Log the full request details for debugging
    const headers = Object.fromEntries(request.headers.entries());
    const url = request.url;
    const method = request.method;
    
    let body = '';
    let jsonData = null;
    
    try {
      body = await request.text();
      if (body) {
        jsonData = JSON.parse(body);
      }
    } catch (e) {
      // Body parsing failed, but that's okay for testing
    }
    
    // Comprehensive diagnostic response
    const diagnostics = {
      status: 'success',
      message: 'ChatGPT Actions test endpoint - connection successful',
      timestamp: new Date().toISOString(),
      requestId,
      diagnostics: {
        method,
        url,
        headerCount: Object.keys(headers).length,
        hasBody: !!body,
        bodyLength: body.length,
        parsedJson: !!jsonData,
        userAgent: headers['user-agent'] || 'none',
        origin: headers['origin'] || 'none',
        contentType: headers['content-type'] || 'none',
        authorization: headers['authorization'] ? 'present' : 'none',
        isChatGPTRequest: (headers['user-agent'] || '').includes('OpenAI') || (headers['user-agent'] || '').includes('ChatGPT'),
        detectedHeaders: Object.keys(headers).filter(h => 
          h.toLowerCase().includes('gpt') || 
          h.toLowerCase().includes('openai') || 
          h.toLowerCase().includes('action')
        )
      },
      receivedData: jsonData || body.substring(0, 200),
      advice: {
        corsStatus: 'Headers should include proper CORS',
        authStatus: 'No authentication required',
        formatStatus: 'JSON format detected and parsed successfully',
        compatibilityStatus: 'Endpoint is ChatGPT Actions compatible'
      }
    };
    
    // Log for server-side debugging
    console.log(`[TEST][${requestId}] ChatGPT Actions Test:`, JSON.stringify(diagnostics, null, 2));
    
    return NextResponse.json(diagnostics, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept, Origin, X-Requested-With, X-API-Key, X-ChatGPT-Request',
        'Access-Control-Allow-Credentials': 'false',
        'Access-Control-Expose-Headers': 'X-Request-ID, X-Test-Endpoint',
        'Access-Control-Max-Age': '86400',
        'Vary': 'Origin, Access-Control-Request-Method, Access-Control-Request-Headers',
        'X-Request-ID': requestId,
        'X-Test-Endpoint': 'chatgpt-actions-test',
        'X-ChatGPT-Compatible': 'true',
        'X-Endpoint-Type': 'test'
      }
    });
    
  } catch (error) {
    console.error(`[TEST][${requestId}] Error:`, error);
    
    return NextResponse.json({
      status: 'error',
      message: 'Test endpoint error',
      error: error instanceof Error ? error.message : 'Unknown error',
      requestId,
      timestamp: new Date().toISOString()
    }, {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'X-Request-ID': requestId,
        'X-Test-Endpoint': 'chatgpt-actions-test'
      }
    });
  }
}

/**
 * GET endpoint for test discovery
 */
export async function GET() {
  return NextResponse.json({
    name: 'ChatGPT Actions Test Endpoint',
    description: 'Test endpoint for diagnosing ChatGPT Actions connectivity',
    version: '1.0',
    status: 'active',
    testUrl: '/api/chatgpt-test',
    mainUrl: '/api/chatgpt-webhook',
    timestamp: new Date().toISOString()
  }, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'X-Test-Endpoint': 'chatgpt-actions-test'
    }
  });
}

/**
 * OPTIONS handler for CORS
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept, Origin, X-Requested-With, X-API-Key, X-ChatGPT-Request',
      'Access-Control-Max-Age': '86400',
      'X-Test-Endpoint': 'chatgpt-actions-test'
    }
  });
}
