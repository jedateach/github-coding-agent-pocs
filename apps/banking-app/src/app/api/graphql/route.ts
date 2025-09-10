// This is a placeholder route for the GraphQL endpoint
// In static export mode, MSW will intercept these requests

export const dynamic = 'force-static'

export async function GET() {
  return new Response('GraphQL endpoint - handled by MSW in browser', { 
    status: 200 
  })
}

export async function POST() {
  return new Response('GraphQL endpoint - handled by MSW in browser', { 
    status: 200 
  })
}