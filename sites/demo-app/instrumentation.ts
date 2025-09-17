export async function register() {
  console.log('🔧 Instrumentation: register() called');
  if (process.env.NODE_ENV === 'development') {
    console.log('🔧 Setting up mocks for development...');
    const { setupMocks } = await import('./src/mocks');
    await setupMocks();
  }
}