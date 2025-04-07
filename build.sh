#!/bin/sh
set -e

echo "📦 Installing dependencies"
npm ci

echo "🏗️ Building and exporting"
npm run build
npm run export

echo "📂 Preparing output directory"
rm -rf output
mkdir output
cp -R out/* output/

echo "✅ Done! output/ 폴더에 정적 결과물이 있음"