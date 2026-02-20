#! /bin/bash
#
# Run this from .../lwarpfiles directory
#
shopt -s extglob
cp -v !(*.sh) ../lwarpbuild
cp -v ../doc/compatibility.pdf ../lwarpbuild
cp -v ../doc/circuitikzmanual.tex ../lwarpbuild
#
echo Now do a \"make full\" in .../lwarpbuild and have a coffee

