#!/bin/bash

# Build the project
vite build --mode development &&
tsc &&

# Copy necessary files to the dist directory
copyfiles -u 1 src/preload.mjs dist &&
copyfiles -u 1 src/icons/logo.png dist/assets &&

# Run the Electron app
electron ./dist/main.js