#!/bin/bash
set -e

SOURCE_BRANCH="master"
TARGET_BRANCH="gh-pages"

SHA="$(git rev-parse --verify HEAD)"

if [ "${GITHUB_REF}" != "refs/heads/${SOURCE_BRANCH}" ]; then
    echo "Skipping deploy; not on ${SOURCE_BRANCH}."
    exit 0
fi

if [ -z "${GITHUB_TOKEN}" ]; then
    echo "GITHUB_TOKEN is not set"
    exit 1
fi

REPO="https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"

rm -rf out
git clone "$REPO" --single-branch --depth=1 --branch "$TARGET_BRANCH" out

cp circuitikzgit.sty out/
cp t-circuitikzgit.tex out/
cp circuitikzmanualgit.pdf out/
cp ctikzstylesgit.zip out/
python3 tools/update-gh-pages-info.py out/

cd out

git config user.name "github-actions[bot]"
git config user.email "41898282+github-actions[bot]@users.noreply.github.com"

git add .
git status

if git diff --cached --quiet; then
    echo "No changes to deploy."
    exit 0
fi

git commit -m "Deploy to GitHub Pages: ${SHA}"
git push origin "$TARGET_BRANCH"
