import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

/**
 * GET endpoint to serve the OpenAPI specification
 * This helps ChatGPT understand the API structure and capabilities
 */
export async function GET(request: NextRequest) {
  try {
    // Read the OpenAPI spec from the public directory
    const openApiPath = join(process.cwd(), 'public', 'openapi.json');
    const openApiContent = await readFile(openApiPath, 'utf-8');
    const openApiSpec = JSON.parse(openApiContent);

    // Add dynamic server URL based on the request
    const protocol = request.headers.get('x-forwarded-proto') || 'https';
    const host = request.headers.get('host') || 'lionsofzion-official.org';
    const baseUrl = `${protocol}://${host}`;

    openApiSpec.servers = [
      {
        url: baseUrl,
        description: 'Current server'
      }
    ];

    return NextResponse.json(openApiSpec, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Accept',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
        'X-API-Version': '2.0'
      }
    });
  } catch (error) {
    console.error('Error serving OpenAPI spec:', error);
    
    return NextResponse.json(
      { 
        error: 'Unable to load API specification',
        message: 'The OpenAPI specification could not be loaded'
      },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }
}

/**
 * OPTIONS handler for CORS preflight
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept',
      'Access-Control-Max-Age': '86400'
    }
  });
}
