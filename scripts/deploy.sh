#!/usr/bin/env bash

npm install
pm2 stop oasisbr-api
npm run deploy:prod