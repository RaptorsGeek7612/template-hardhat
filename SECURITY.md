# Security Policy

This is a starter template, not a deployed/live contract. There is no bug bounty and no mainnet deployment to protect — but issues are still worth reporting so future users of the template don't inherit them.

## Reporting a vulnerability

If you find a security issue in the `Voting` contract's logic, or in the template's tooling/config (e.g. a way the CI or deploy scripts could leak secrets), please open an issue on this repository, or contact the maintainer directly if the issue could affect real deployments before it's fixed publicly.

## Known issues

- `pnpm audit` reports a handful of advisories in transitive dev-dependencies pulled in by Hardhat/Mocha itself (e.g. `elliptic`, `diff`). These affect the local dev/test toolchain only, not the `Voting` contract or anything deployed on-chain, and are outside this template's control until upstream (`hardhat`, `mocha`) bump their own dependencies. Run `pnpm audit` to see the current list.
