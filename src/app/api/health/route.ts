import { NextRequest, NextResponse } from 'next/server';

/**
 * Health Check API Route for ChatGPT Webhook monitoring
 * Provides system status, memory usage, and API readiness information
 */
export async function GET(request: NextRequest) {
  const startTime = Date.now();
  const requestId = `health_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
  
  try {
    // Gather system metrics
    const memoryUsage = process.memoryUsage();
    const uptime = process.uptime();
    const timestamp = new Date().toISOString();
    
    // Basic health checks
    const healthChecks = {
      api: 'healthy',
      memory: {
        status: memoryUsage.heapUsed < (512 * 1024 * 1024) ? 'healthy' : 'warning', // 512MB threshold
        heapUsed: memoryUsage.heapUsed,
        heapTotal: memoryUsage.heapTotal,
        rss: memoryUsage.rss,
        external: memoryUsage.external
      },
      uptime: {
        status: uptime > 0 ? 'healthy' : 'error',
        seconds: uptime,
        readable: `${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m ${Math.floor(uptime % 60)}s`
      },
      environment: process.env.NODE_ENV || 'unknown'
    };
    
    // Determine overall health status
    const isHealthy = healthChecks.api === 'healthy' && 
                     healthChecks.memory.status !== 'error' && 
                     healthChecks.uptime.status === 'healthy';
    
    const processingTime = Date.now() - startTime;
    
    // Log health check request
    console.log(`[HEALTH][${requestId}] Health check requested`, {
      timestamp,
      processingTime,
      overallStatus: isHealthy ? 'healthy' : 'degraded',
      checks: healthChecks
    });
    
    return NextResponse.json(
      {
        status: isHealthy ? 'healthy' : 'degraded',
        timestamp,
        requestId,
        processingTime: `${processingTime}ms`,
        checks: healthChecks,
        version: '2.0',
        service: 'chatgpt-webhook-api'
      },
      { 
        status: isHealthy ? 200 : 503,
        headers: {
          'X-Request-ID': requestId,
          'X-Processing-Time': `${processingTime}ms`,
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
      }
    );
    
  } catch (error) {
    const processingTime = Date.now() - startTime;
    
    console.error(`[HEALTH][${requestId}] Health check failed:`, {
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? {
        message: error.message,
        stack: error.stack,
        name: error.name
      } : 'Unknown error',
      processingTime
    });
    
    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        requestId,
        processingTime: `${processingTime}ms`,
        error: error instanceof Error ? error.message : 'Health check failed',
        service: 'chatgpt-webhook-api'
      },
      { 
        status: 503,
        headers: {
          'X-Request-ID': requestId,
          'X-Processing-Time': `${processingTime}ms`
        }
      }
    );
  }
}

// Only GET method is supported for health checks
export async function POST() {
  return NextResponse.json(
    { message: 'Method not allowed. Use GET for health checks.' },
    { status: 405, headers: { 'Allow': 'GET' } }
  );
}
