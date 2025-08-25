/**
 * Configuration utility for environment variables and runtime overrides.
 * 
 * Build-time: Uses process.env for server-side config
 * Runtime (client): Reads from window.__RUNTIME_CONFIG__ if present, overriding env defaults
 */

// Define the shape of our configuration
export interface AppConfig {
  API_URL: string;
  FEATURE_X_ENABLED: boolean;
  APP_NAME: string;
}

// Extend the global Window interface to include our config
declare global {
  interface Window {
    __RUNTIME_CONFIG__?: Partial<AppConfig>;
  }
}

// Default configuration from environment variables
const defaultConfig: AppConfig = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  FEATURE_X_ENABLED: process.env.NEXT_PUBLIC_FEATURE_X_ENABLED === 'true',
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Demo App',
};

/**
 * Get configuration with runtime overrides
 * On the server: returns env-based config
 * On the client: merges env-based config with runtime window.__RUNTIME_CONFIG__
 */
export function getConfig(): AppConfig {
  // Server-side: return default config from environment
  if (typeof window === 'undefined') {
    return defaultConfig;
  }

  // Client-side: merge default config with runtime overrides
  const runtimeConfig = window.__RUNTIME_CONFIG__ || {};
  return {
    ...defaultConfig,
    ...runtimeConfig,
  };
}

/**
 * Get a specific config value with type safety
 */
export function getConfigValue<K extends keyof AppConfig>(key: K): AppConfig[K] {
  return getConfig()[key];
}

/**
 * Check if we're running on the client side
 */
export function isClient(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Check if we're running on the server side
 */
export function isServer(): boolean {
  return typeof window === 'undefined';
}

/**
 * Check if runtime configuration is available
 */
export function hasRuntimeConfig(): boolean {
  return typeof window !== 'undefined' && 
         window.__RUNTIME_CONFIG__ !== undefined && 
         Object.keys(window.__RUNTIME_CONFIG__).length > 0;
}