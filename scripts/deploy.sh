#!/usr/bin/env bash

pm2 stop oasisbr-api

git pull

npm run deploy:prod