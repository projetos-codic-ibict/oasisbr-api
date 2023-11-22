#!/usr/bin/env bash

echo "Running npm install"
npm install
echo "Running pm2 stop oasisbr-api"
pm2 stop oasisbr-api
echo "Copy local configs"
cp .env  .env.local
echo "npm run deploy:prod"
npm run deploy:prod
echo "finished!"