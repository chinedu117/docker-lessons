#!/usr/bin/env sh

set -e
set -x

docker build -t chinedu117/node-express .

docker run -p 8080:3000 chinedu117/node-express 