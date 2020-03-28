#!/bin/bash

rm .gitignore
mkdir -p build
npm install node-sass uglify-js
./node_modules/node-sass/bin/node-sass --output-style=compressed style.scss > build/style.css
./node_modules/uglify-js/bin/uglifyjs --compress --mangle -- app.js > build/app.js
cp index.html build
