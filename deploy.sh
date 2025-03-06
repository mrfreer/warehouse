#!/bin/bash

# Build the application
npm run build

# Create the app if it doesn't exist
doctl apps create --spec .do/app.yaml

# Get the app ID
APP_ID=$(doctl apps list --format ID --no-header)

# Deploy updates
doctl apps update $APP_ID --spec .do/app.yaml 