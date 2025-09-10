// SSE endpoint for GraphQL subscriptions
// In static export mode, MSW will intercept these requests

export const dynamic = 'force-static'

export async function GET() {
  return new Response('GraphQL SSE endpoint - handled by MSW in browser', {
    status: 200,
    headers: {
      'Content-Type': 'text/event-stream',
    },
  })
}

export async function POST() {
  return new Response('GraphQL SSE endpoint - handled by MSW in browser', {
    status: 200,
    headers: {
      'Content-Type': 'text/event-stream',
    },
  })
}