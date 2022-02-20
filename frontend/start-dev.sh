#!/usr/bin/env sh

set -e
set -x


docker-compose -f docker-compose-dev.yml up --build
