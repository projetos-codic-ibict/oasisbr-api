#!/usr/bin/env bash
set -e

echo "Running npm install"
yarn
echo "Running pm2 stop oasisbr-api"
pm2 stop oasisbr-api
echo "Copy local configs"
cp .env.example  .env
echo "npm run deploy"
yarn deploy
echo "finished!"