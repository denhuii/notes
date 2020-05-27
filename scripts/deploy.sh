#!/usr/bin/env sh

set -e

cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:denhuii/denhuii.github.io.git master

cd -