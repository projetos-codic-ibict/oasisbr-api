#!/usr/bin/env bash
set -e
echo "Versão do Node"
node -v
echo "Running yarn install"
yarn
echo "Running pm2 stop all"
pm2 stop all || true
echo "copy env configs"
cp .env.example  .env
echo "yarn deploy"
yarn deploy
echo "pm2 save"
pm2 save
echo "finished!"