#!/bin/sh
set -o nounset
set -o errexit

destfile="/srv/config.txt"
echo "$UPS_HOST" >> "$destfile"

serve -s /srv
