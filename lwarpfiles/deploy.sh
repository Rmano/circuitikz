#! /bin/bash
#
DEPLOY=../docs
mkdir -p "$DEPLOY"

cp -av \
  index.html node-*.html \
  lwarp.css lwarp_formal.css lwarp_sagebrush.css \
  ctikzcss.css sample_project.css \
  permalinks.js \
  circuitikzmanual-images \
  compatibility.svg \
  lwarp_mathjax.txt ctikz_mathjax.txt \
  "$DEPLOY" 2>/dev/null || true
