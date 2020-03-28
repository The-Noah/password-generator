#!/bin/bash

rm .gitignore
mkdir -p build
npm install node-sass terser postcss-cli autoprefixer
./node_modules/node-sass/bin/node-sass --output-style=compressed style.scss > build/style.css
./node_modules/terser/bin/terser --compress --mangle -- app.js > build/app.js
./node_modules/postcss-cli/bin/postcss build/style.css --use autoprefixer -d build/
cp index.html build
