#!/usr/bin/env bash
set -e

echo "Running npm install"
npm install
echo "Running pm2 stop oasisbr-api"
pm2 stop oasisbr-api
echo "Copy local configs"
cp .env.example  .env
echo "npm run deploy"
npm run deploy
echo "finished!"