#!/bin/bash

# Test script to demonstrate runtime configuration

echo "Testing Next.js + NGINX Runtime Configuration POC"
echo "=================================================="

# Navigate to demo app directory
cd sites/demo-app

# Build the application
echo "Building the application..."
pnpm build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "Build failed!"
    exit 1
fi

echo "Build successful!"

# Verify the placeholder script is in the HTML
echo "Checking for placeholder script in HTML..."
if grep -q 'window.__CONFIG__ = {}' out/index.html; then
    echo "✓ Placeholder script found in HTML"
else
    echo "✗ Placeholder script not found in HTML"
    exit 1
fi

# Create a test with runtime configuration substitution
echo "Creating test with runtime configuration..."

# Copy the built files to a test directory
mkdir -p /tmp/test-runtime-config
cp -r out/* /tmp/test-runtime-config/

# Simulate NGINX substitution
TEST_CONFIG='{"API_URL":"https://api.production.com","FEATURE_X_ENABLED":true,"APP_NAME":"Production Demo App"}'
sed -i "s|window.__CONFIG__ = {};|window.__CONFIG__ = $TEST_CONFIG;|g" /tmp/test-runtime-config/index.html

# Verify the substitution worked
echo "Verifying runtime configuration substitution..."
if grep -q 'https://api.production.com' /tmp/test-runtime-config/index.html; then
    echo "✓ Runtime configuration successfully injected"
    echo "✓ API_URL set to: https://api.production.com"
else
    echo "✗ Runtime configuration injection failed"
    exit 1
fi

if grep -q '"FEATURE_X_ENABLED":true' /tmp/test-runtime-config/index.html; then
    echo "✓ FEATURE_X_ENABLED set to: true"
else
    echo "✗ FEATURE_X_ENABLED not set correctly"
    exit 1
fi

if grep -q '"APP_NAME":"Production Demo App"' /tmp/test-runtime-config/index.html; then
    echo "✓ APP_NAME set to: Production Demo App"
else
    echo "✗ APP_NAME not set correctly"
    exit 1
fi

echo ""
echo "All tests passed! ✅"
echo ""
echo "The application can be deployed with NGINX and runtime configuration"
echo "can be injected without rebuilding the application."
echo ""
echo "To test in a browser:"
echo "1. Serve the files from /tmp/test-runtime-config/ with a web server"
echo "2. Open the application in a browser"
echo "3. Check that the configuration shows the production values"
echo ""
echo "Example with Python:"
echo "cd /tmp/test-runtime-config && python3 -m http.server 8000"
echo "Then open http://localhost:8000 in your browser"