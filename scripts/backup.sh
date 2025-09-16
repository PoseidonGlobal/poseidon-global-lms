#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage: backup.sh [zip|bundle|both] [--dest /path/to/dir]

Creates repository backups:
  - ZIP snapshot (excludes build/deps)
  - Git bundle (all refs)

Defaults:
  - Mode: both
  - Destination: parent of repo directory (../)

Examples:
  bash scripts/backup.sh
  bash scripts/backup.sh zip
  bash scripts/backup.sh both --dest "$HOME/Backups"
EOF
}

MODE="both"
DEST=""

# Parse args
while [[ $# -gt 0 ]]; do
  case "$1" in
    zip|bundle|both)
      MODE="$1"; shift ;;
    --dest)
      DEST="${2:-}"; shift 2 ;;
    -h|--help)
      usage; exit 0 ;;
    *)
      echo "Unknown argument: $1" >&2; usage; exit 1 ;;
  esac
done

# Resolve repo root as the directory containing this script/.. (supports symlinks)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
REPO_NAME="$(basename "$REPO_ROOT")"
DATE_STR="$(date +%F)"

# Default destination is the repo's parent directory
if [[ -z "$DEST" ]]; then
  DEST="$(cd "$REPO_ROOT/.." && pwd)"
fi

mkdir -p "$DEST"

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Error: required command '$1' not found. Please install it and retry." >&2
    exit 1
  fi
}

require_cmd git
if [[ "$MODE" == "zip" || "$MODE" == "both" ]]; then
  require_cmd zip
fi

ZIP_PATH="$DEST/${REPO_NAME}-backup-${DATE_STR}.zip"
BUNDLE_PATH="$DEST/${REPO_NAME}-${DATE_STR}.bundle"

cd "$REPO_ROOT"

create_zip() {
  echo "Creating ZIP snapshot at: $ZIP_PATH"
  # Build exclude list patterns for zip
  # zip expects paths relative to current directory, so we zip '.'
  zip -r "$ZIP_PATH" . \
    -x "node_modules/*" \
    -x "backend/node_modules/*" \
    -x "frontend/node_modules/*" \
    -x "*/.next/*" \
    -x "*/.turbo/*" \
    -x "*/dist/*" \
    -x "*/.vercel/*" \
    -x "*/coverage/*"
  echo "ZIP created: $ZIP_PATH"
}

create_bundle() {
  echo "Creating Git bundle at: $BUNDLE_PATH"
  # Note: In shallow repositories (common in CI), bundle may not include full history
  if [[ -f .git/shallow ]]; then
    echo "Warning: Shallow repository detected. Bundle will contain available history only."
  fi
  # Create bundle with all available refs
  git bundle create "$BUNDLE_PATH" --all
  echo "Bundle created: $BUNDLE_PATH"
}

case "$MODE" in
  zip)
    create_zip ;;
  bundle)
    create_bundle ;;
  both)
    create_zip
    create_bundle ;;
  *)
    echo "Unexpected mode: $MODE" >&2; exit 1 ;;
esac

echo
echo "Backup complete. Artifacts:"
echo "  - ZIP:    $([[ -f "$ZIP_PATH" ]] && echo "$ZIP_PATH" || echo "(skipped)")"
echo "  - BUNDLE: $([[ -f "$BUNDLE_PATH" ]] && echo "$BUNDLE_PATH" || echo "(skipped)")"