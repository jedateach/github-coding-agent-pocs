export async function setupMocks() {
  // Don't setup mocks during build time
  if (process.env.NODE_ENV === 'production' && typeof window === 'undefined') {
    return;
  }

  // Only enable mocks in development by default, or when explicitly enabled
  const shouldEnableMocks = 
    process.env.NODE_ENV === 'development' && 
    process.env.NEXT_PUBLIC_ENABLE_MOCKS !== 'false';
  
  // Also allow explicit enabling in production for testing
  const explicitlyEnabled = process.env.NEXT_PUBLIC_ENABLE_MOCKS === 'true';
  
  if (!shouldEnableMocks && !explicitlyEnabled) {
    return;
  }

  if (typeof window !== 'undefined') {
    // Browser environment
    const { worker } = await import('./browser');
    await worker.start({
      onUnhandledRequest: 'bypass',
    });
    console.log('🎭 MSW browser worker started');
  } else {
    // Node.js environment (SSR)
    const { server } = await import('./server');
    server.listen({
      onUnhandledRequest: 'bypass',
    });
    console.log('🎭 MSW server started');
  }
}