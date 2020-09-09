#!/bin/bash
#Instantiate environment variables

export MONGO_URI=""
export SESSION_SECRET=""
export SESSION_LIFETIME=$((1000 * 60 * 30))

echo "done setting environment variables"
