#!/usr/bin/env bash
set -e
echo "Versão do Node"
node -v
echo "Running npm install"
npm install
echo "Running pm2 stop all"
pm2 stop all || true
echo "copy env configs"
cp .env.example  .env
echo "npm run deploy"
npm run deploy
echo "pm2 save"
pm2 save
echo "finished!"