#!/bin/sh

# Set default values for environment variables if not provided
export API_URL="${API_URL:-http://localhost:3001/api}"
export FEATURE_X_ENABLED="${FEATURE_X_ENABLED:-false}"
export APP_NAME="${APP_NAME:-Demo App}"

# Substitute environment variables in nginx configuration
envsubst '${API_URL} ${FEATURE_X_ENABLED} ${APP_NAME}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# Execute the passed command
exec "$@"