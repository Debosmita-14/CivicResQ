#!/usr/bin/env bash
# Unify all build processes for Render

echo "Building CivicResQ Monorepo for Render..."

# 1. Build the Node.js frontend
cd frontend
npm install
npm run build
cd ..

# 2. Build the Python backend
cd backend
pip install -r requirements.txt
