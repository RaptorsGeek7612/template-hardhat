# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

## [0.1.0] - 2026-09-16

### Changed

- Replaced the generic `Counter` scaffold contract with `Voting.sol`, a whitelisted on-chain voting system (`Ownable`-gated workflow, OpenZeppelin).
- Fixed a regression in `hardhat.config.ts` that had reverted it to a Hardhat 2-style config (toolbox plugin removed, `configVariable` replaced by `process.env`), which broke `ethers`/`networkHelpers` typing on `network.create()`.
- Migrated package management from npm to pnpm (`pnpm-lock.yaml` / `pnpm-workspace.yaml` replace `package-lock.json`).
- Replaced the OP-chain demo script with `scripts/run-workflow.ts`, walking through the full voting workflow end to end.

### Added

- Solidity tests (`contracts/Voting.t.sol`) and TypeScript integration tests (`test/Voting.ts`, `test/fixtures/deployVoting.ts`) for the `Voting` contract.
- `forge-std` as a git dependency; it was imported by the Solidity tests but never installed, so `hardhat compile` would have failed since the initial commit.
- GitHub Actions CI (lint, compile, typecheck, test) with a status badge in the README.
- MIT `LICENSE` file (previously present but empty).
- `CONTRIBUTING.md` and a pull request template.

### Removed

- Empty scaffold directories left over from project init (`docs/`, `deployments/`, `test/constants/`, `test/helpers/`).

## [0.0.0] - 2026-06-28 (untagged scaffold)

### Added

- Initial Hardhat 3 template (Counter contract, mocha/ethers toolbox, Solidity + TypeScript tests, Ignition module).
