import { NextRequest, NextResponse } from 'next/server';

/**
 * API Route to handle ChatGPT Connector webhook requests
 * Accepts POST requests with JSON payloads and logs them to the server console
 */
export async function POST(request: NextRequest) {
  try {
    // Parse the JSON body from the request
    const jsonData = await request.json();
    
    // Log the received data to the server console
    console.log('ChatGPT Webhook received:', {
      timestamp: new Date().toISOString(),
      headers: Object.fromEntries(request.headers.entries()),
      data: jsonData
    });
    
    // Respond with success message
    return NextResponse.json(
      { message: 'Received' },
      { status: 200 }
    );
    
  } catch (error) {
    // Log any errors that occur during processing
    console.error('Error processing ChatGPT webhook:', error);
    
    // Return error response
    return NextResponse.json(
      { message: 'Error processing webhook', error: 'Invalid JSON or server error' },
      { status: 400 }
    );
  }
}

/**
 * Handle unsupported HTTP methods
 * Only POST is allowed for this webhook endpoint
 */
export async function GET() {
  return NextResponse.json(
    { message: 'Method not allowed. Only POST requests are accepted.' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { message: 'Method not allowed. Only POST requests are accepted.' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { message: 'Method not allowed. Only POST requests are accepted.' },
    { status: 405 }
  );
}

export async function PATCH() {
  return NextResponse.json(
    { message: 'Method not allowed. Only POST requests are accepted.' },
    { status: 405 }
  );
}
