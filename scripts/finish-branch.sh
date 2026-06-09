#!/bin/bash

set -e

COMMIT_MESSAGE="$1"
CURRENT_BRANCH=$(git branch --show-current)

if [ -z "$COMMIT_MESSAGE" ]; then
  echo "Commit message is required."
  echo "Usage: ./scripts/finish-branch.sh \"Your commit message\""
  exit 1
fi

if [ "$CURRENT_BRANCH" = "main" ]; then
  echo "You are on main. Switch to a feature branch first."
  exit 1
fi

echo "Current branch: $CURRENT_BRANCH"
echo "Running build..."
npm run build

echo "Adding changes..."
git add .

if git diff --cached --quiet; then
  echo "No staged changes to commit."
else
  echo "Creating commit..."
  git commit -m "$COMMIT_MESSAGE"
fi

echo "Switching to main..."
git checkout main

echo "Pulling latest main..."
git pull origin main

echo "Merging $CURRENT_BRANCH into main..."
git merge "$CURRENT_BRANCH"

echo "Pushing main..."
git push origin main

echo "Deleting local branch $CURRENT_BRANCH..."
git branch -d "$CURRENT_BRANCH"

echo "Done."