# Next.js + NGINX Runtime Configuration POC

This proof of concept demonstrates how to deploy a Next.js application with NGINX and inject runtime configuration without rebuilding the application.

## Overview

The system allows for:
- **Build-time configuration**: Standard environment variables during the build process
- **Runtime configuration**: Dynamic configuration injection via NGINX without rebuilding
- **Seamless integration**: Client-side code receives both build-time and runtime configuration

## Architecture

1. **Next.js App**: Built with static export for optimal performance
2. **Configuration Utility**: Centralized config management in `lib/config.ts`
3. **HTML Placeholder**: `<script>window.__CONFIG__ = {};</script>` in the HTML template
4. **NGINX Injection**: Uses `sub_filter` to replace placeholder with real configuration
5. **Docker**: Multi-stage build for production deployment

## Project Structure

```
├── sites/demo-app/              # Next.js application
│   ├── src/
│   │   ├── app/                 # App Router pages
│   │   │   ├── layout.tsx       # Root layout with config placeholder
│   │   │   └── page.tsx         # Demo page showing configuration
│   │   └── lib/
│   │       └── config.ts        # Configuration utility
│   ├── package.json
│   └── next.config.ts           # Next.js config with static export
├── Dockerfile                   # Multi-stage Docker build
├── nginx.conf.template          # NGINX configuration template
├── entrypoint.sh               # Docker entrypoint for env substitution
├── docker-compose.yml          # Easy testing setup
└── README.md                   # This file
```

## Configuration System

### Build-time Configuration

Environment variables are read during the build process:

```typescript
// Default configuration from environment variables
const defaultConfig: AppConfig = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  FEATURE_X_ENABLED: process.env.NEXT_PUBLIC_FEATURE_X_ENABLED === 'true',
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Demo App',
};
```

### Runtime Configuration

NGINX injects configuration via script replacement:

```html
<!-- Placeholder in HTML -->
<script>window.__CONFIG__ = {};</script>

<!-- Replaced by NGINX -->
<script>window.__CONFIG__ = {"API_URL":"https://api.prod.com","FEATURE_X_ENABLED":true,"APP_NAME":"Production App"};</script>
```

### Configuration Utility

The `getConfig()` function merges both configurations:

```typescript
export function getConfig(): AppConfig {
  // Server-side: return default config from environment
  if (typeof window === 'undefined') {
    return defaultConfig;
  }

  // Client-side: merge default config with runtime overrides
  const runtimeConfig = window.__CONFIG__ || {};
  return {
    ...defaultConfig,
    ...runtimeConfig,
  };
}
```

## Quick Start

### Development

```bash
cd sites/demo-app
pnpm install
pnpm dev
```

Visit `http://localhost:3000` to see the application with default configuration.

### Production Build

```bash
cd sites/demo-app
pnpm build
```

This creates a static export in the `out/` directory.

### Docker Deployment

1. **Build and run with default configuration:**

```bash
docker build -t demo-app .
docker run -p 8080:80 demo-app
```

2. **Run with custom runtime configuration:**

```bash
docker run -p 8080:80 \
  -e API_URL="https://api.production.com" \
  -e FEATURE_X_ENABLED="true" \
  -e APP_NAME="Production Demo" \
  demo-app
```

3. **Using Docker Compose:**

```bash
docker-compose up --build
```

Visit `http://localhost:8080` to see the application with runtime configuration.

## Testing Runtime Configuration

The demo application displays:
- Current configuration values
- Runtime information (client/server environment)
- Feature toggles based on configuration
- Full configuration object in JSON format

### Test Scenarios

1. **Default Configuration**: Run without environment variables
2. **Production Configuration**: Set environment variables for production values
3. **Feature Toggle**: Toggle `FEATURE_X_ENABLED` to see UI changes
4. **API Endpoint**: Change `API_URL` to point to different backends

### Verification Steps

1. Build the application and check that the placeholder script is in the HTML:
   ```bash
   grep "__CONFIG__" sites/demo-app/out/index.html
   ```

2. Run with different environment variables and verify the injected script:
   ```bash
   docker run -p 8080:80 -e FEATURE_X_ENABLED="true" demo-app
   curl http://localhost:8080 | grep "__CONFIG__"
   ```

3. Check that client-side code receives the correct configuration:
   - Open browser developer tools
   - Check `window.__CONFIG__` in the console
   - Verify the demo page displays the correct values

## Key Benefits

1. **No Rebuild Required**: Change configuration without rebuilding the application
2. **Environment Flexibility**: Same Docker image can be used across environments
3. **Fast Deployments**: Static files served by NGINX with optimal performance
4. **Configuration Safety**: Type-safe configuration with TypeScript
5. **Fallback Support**: Graceful degradation when runtime config is unavailable

## Technology Stack

- **Next.js 15.5.0**: Latest version with App Router and static export
- **React 19.1.0**: Latest React with modern features
- **TypeScript**: Type-safe configuration management
- **Tailwind CSS**: Utility-first styling
- **NGINX**: High-performance web server with configuration injection
- **Docker**: Containerized deployment with multi-stage builds
- **pnpm**: Fast and efficient package manager

## Configuration Reference

### Environment Variables

| Variable | Description | Default Value |
|----------|-------------|---------------|
| `API_URL` | Backend API endpoint | `http://localhost:3001/api` |
| `FEATURE_X_ENABLED` | Enable/disable Feature X | `false` |
| `APP_NAME` | Application display name | `Demo App` |

### Docker Environment Variables

The same variables can be passed to the Docker container:

```bash
docker run -p 8080:80 \
  -e API_URL="https://api.example.com" \
  -e FEATURE_X_ENABLED="true" \
  -e APP_NAME="My Application" \
  demo-app
```

## Troubleshooting

### Configuration Not Updating

1. Check that environment variables are properly set
2. Verify NGINX configuration template substitution
3. Clear browser cache if testing locally
4. Check browser developer tools for JavaScript errors

### Build Issues

1. Ensure pnpm is installed: `npm install -g pnpm`
2. Clear dependencies: `rm -rf node_modules pnpm-lock.yaml && pnpm install`
3. Check Node.js version compatibility (requires Node.js 18+)

### Docker Issues

1. Build with no cache: `docker build --no-cache -t demo-app .`
2. Check container logs: `docker logs <container-id>`
3. Verify NGINX configuration: `docker exec <container-id> cat /etc/nginx/nginx.conf`

## Further Enhancements

This POC can be extended with:

1. **Multiple Environment Support**: Different configuration files per environment
2. **Configuration Validation**: Runtime validation of injected configuration
3. **Hot Reloading**: Development mode with live configuration updates
4. **Monitoring**: Health checks and configuration monitoring
5. **Security**: Encrypted configuration values for sensitive data