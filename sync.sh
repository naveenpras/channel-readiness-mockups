#!/usr/bin/env bash
# Stage, commit and push any local edits to the mockups.
#
#   ./sync.sh                 commit with an auto-generated summary
#   ./sync.sh "message"       commit with your own message
#
# Exits without committing when nothing has changed.

set -euo pipefail
cd "$(dirname "$0")"

if [ -n "$(git status --porcelain)" ]; then
  git add -A
else
  echo "No changes to sync."
  exit 0
fi

if [ $# -gt 0 ]; then
  message="$*"
else
  # Summarise what moved: "Update Channel Readiness.dc.html, assets/ (3 files)"
  changed=$(git diff --cached --name-only | sed 's|/.*||' | sort -u | head -4 | paste -sd ', ' -)
  count=$(git diff --cached --name-only | wc -l | tr -d ' ')
  message="Update ${changed} (${count} file$([ "$count" -eq 1 ] || echo s))"
fi

git commit -q -m "$message"
git push -q origin HEAD
echo "Pushed: $message"
