const { app } = require('@azure/functions');

/**
 * Azure Function to handle ChatGPT Connector webhook requests
 * Accepts POST requests with JSON payloads and logs them to the server console
 */
app.http('chatgpt-webhook', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        try {
            // Parse the JSON body from the request
            const jsonData = await request.json();
            
            // Log the received data to the server console
            context.log('ChatGPT Webhook received:', {
                timestamp: new Date().toISOString(),
                headers: Object.fromEntries(request.headers.entries()),
                data: jsonData
            });
            
            // Respond with success message
            return {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: 'Received' })
            };
            
        } catch (error) {
            // Log any errors that occur during processing
            context.log.error('Error processing ChatGPT webhook:', error);
            
            // Return error response
            return {
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    error: 'Internal server error',
                    message: 'Failed to process webhook request'
                })
            };
        }
    }
});
