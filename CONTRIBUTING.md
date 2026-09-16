# Contributing

1. Fork the repo and create a branch from `master`.
2. `pnpm install`
3. Make your changes, then run the full check before opening a PR:
   ```shell
   pnpm run check    # lint + compile + test
   pnpm exec tsc --noEmit
   ```
4. Open a pull request describing the change (the PR template will guide you). CI (GitHub Actions) must pass — it runs the same lint/compile/typecheck/test steps.
