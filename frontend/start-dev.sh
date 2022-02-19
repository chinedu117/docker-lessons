#!/usr/bin/env sh

set -e
set -x

docker build -f Dockerfile.dev -t frontend_react .

docker run -p "8001:3000"  -v /var/www/frontend/node_modules -v $(pwd):/var/www/frontend frontend_react