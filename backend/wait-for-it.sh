#!/bin/sh
set -e

# Use environment variables if set, otherwise default to hardcoded values
DB_USER="${DB_USER:-root}"
DB_PASSWORD="${DB_PASSWORD:-admin}"

# Debugging info: Show which host and credentials are being used
echo "Checking MySQL connection at host: $DB_HOST with user: $DB_USER"

# Retry variables (allow override via environment variables)
attempts=0
max_attempts="${MAX_ATTEMPTS:-10}"  # Default is 10 retries if not set in env
retry_interval="${RETRY_INTERVAL:-5}"  # Default is 5 seconds if not set in env

sleep 5

exec "$@"