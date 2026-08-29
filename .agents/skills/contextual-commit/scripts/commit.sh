#!/usr/bin/env bash

set -euo pipefail

if [[ "$#" -ne 2 ]]; then
  echo "Usage: commit.sh <message> <newline-delimited-paths>" >&2
  exit 2
fi

message="$1"
paths_input="$2"
paths=()

while IFS= read -r path; do
  [[ -n "$path" ]] && paths+=("$path")
done <<< "$paths_input"

if [[ -z "${message//[[:space:]]/}" ]]; then
  echo "Commit message must not be empty" >&2
  exit 2
fi

if [[ "${#paths[@]}" -eq 0 ]]; then
  echo "At least one path is required" >&2
  exit 2
fi

git add -- "${paths[@]}"
git commit -m "$message"

