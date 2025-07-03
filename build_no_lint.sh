#!/bin/bash
cd /Users/dnylhnwkyyb/lions-of-zion
export NEXT_IGNORE_ESLINT=1
export NODE_OPTIONS="--max-old-space-size=4096 --no-warnings"
npx next build --no-lint
