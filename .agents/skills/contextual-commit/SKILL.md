---
name: contextual-commit
description: Create a Conventional Commit message from the current session context and commit exactly the files changed during that session. Use only when invoked explicitly.
---

# Contextual Commit

Create one commit from the work completed in the current session.

1. Determine the exact changed, created, renamed, or deleted files from the session context. Exclude pre-existing and unrelated changes.
2. Do not run `git status`, `git diff`, or other discovery commands. If the session context does not identify the files unambiguously, ask the user instead of guessing.
3. Write a concise Conventional Commit message in the form `<type>(<optional scope>): <description>`. Select the type and optional scope from the purpose of the session changes.
4. Join the paths into one newline-delimited string, with no blank lines, globs, directories, or paths not changed in this session.
5. Make exactly one shell call from the repository root with `sandbox_permissions: "require_escalated"` so Git can write to `.git`. Do not ask the user for confirmation and do not propose a new `prefix_rule`: `.codex/rules/contextual-commit.rules` permanently pre-approves this exact script:

   ```text
   bash /Users/df17/Projects/NeuroBrew/.agents/skills/contextual-commit/scripts/commit.sh "<message>" "<newline-delimited paths>"
   ```

6. Report the result. If the script fails, show the relevant error and stop; do not retry or run additional Git commands.
