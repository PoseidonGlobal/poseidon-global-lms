#!/usr/bin/env bash
set -euo pipefail

if [[ ${1:-} == "-h" || ${1:-} == "--help" || $# -lt 1 ]]; then
  cat <<'EOF'
Usage: restore-from-bundle.sh /path/to/repo-YYYY-MM-DD.bundle [target-directory]

Restores a repository from a Git bundle file.

Examples:
  bash scripts/restore-from-bundle.sh ../poseidon-global-lms-2025-09-16.bundle
  bash scripts/restore-from-bundle.sh ~/Backups/poseidon-global-lms-2025-09-16.bundle ~/Desktop/poseidon-restore
EOF
  exit 0
fi

BUNDLE_PATH="$1"
TARGET_DIR="${2:-}"

if [[ ! -f "$BUNDLE_PATH" ]]; then
  echo "Error: bundle file not found: $BUNDLE_PATH" >&2
  exit 1
fi

if command -v git >/dev/null 2>&1; then
  if [[ -z "$TARGET_DIR" ]]; then
    # Derive a default target dir from bundle name (remove extension)
    BASE_NAME="$(basename "$BUNDLE_PATH")"
    TARGET_DIR="${BASE_NAME%.bundle}"
  fi
  echo "Restoring into: $TARGET_DIR"
  mkdir -p "$TARGET_DIR"
  # Prefer 'git clone' from bundle if supported
  if git clone "$BUNDLE_PATH" "$TARGET_DIR" 2>/dev/null; then
    echo "Cloned repository from bundle into $TARGET_DIR"
    exit 0
  fi
  # Fallback: init + fetch + checkout
  pushd "$TARGET_DIR" >/dev/null
  git init
  git remote add origin "$BUNDLE_PATH"
  # Fetch all refs from the bundle
  git fetch origin "refs/heads/*:refs/remotes/origin/*" "refs/tags/*:refs/tags/*"
  # Set up a default branch if main exists
  if git show-ref --verify --quiet refs/remotes/origin/main; then
    git checkout -b main origin/main
  else
    # Checkout the first branch found
    DEFAULT_BRANCH="$(git for-each-ref --format='%(refname:short)' refs/remotes/origin | head -n 1 || true)"
    if [[ -n "$DEFAULT_BRANCH" ]]; then
      git checkout -b "${DEFAULT_BRANCH#origin/}" "${DEFAULT_BRANCH}"
    fi
  fi
  popd >/dev/null
  echo "Repository restored into $TARGET_DIR"
else
  echo "Error: git command not found. Please install Git and retry." >&2
  exit 1
fi