#!/usr/bin/env sh

set -e
set -x

docker build -t chinedu117/react_nginx .

docker run -p 80:80 chinedu117/react_nginx