#!/usr/bin/env bash

echo "Running npm install"
npm install
echo "Running pm2 stop oasisbr-api"
pm2 stop oasisbr-api
echo "npm run deploy:prod"
npm run deploy:prod