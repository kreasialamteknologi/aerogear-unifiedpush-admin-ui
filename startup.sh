#!/bin/bash
set -o nounset
set -o errexit

destfile="/usr/share/nginx/html/config.txt"
echo "$UPS_HOST" > "$destfile"
nginx -g "daemon off;"
