# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

## [0.1.6] - 2026-09-16

### Added

- A full worked Sepolia deployment example (with expected Ignition output) in `examples/README.md`, linked from the README's Sepolia section.

## [0.1.5] - 2026-09-16

### Added

- Automated tagging and releasing: a `release` job in CI now creates a git tag and GitHub release automatically whenever a push to `master` changes `CHANGELOG.md` and introduces a new version section that isn't tagged yet. It waits for the `test` job to pass first, and pulls the release notes straight from that version's CHANGELOG section. Bumping the version is still a manual, deliberate edit — only the tag/release mechanics are automated.

## [0.1.4] - 2026-09-16

### Added

- GitHub issue templates (bug report, feature request).
- `SECURITY.md`, including a note on the transitive dev-dependency advisories `pnpm audit` reports.
- License badge in the README.
- A `Coverage` step in CI (`hardhat test --coverage`).
- GitHub repo topics (`hardhat`, `solidity`, `ethereum`, `web3`, `voting`, `template`, `smart-contracts`) for discoverability.
- Branch protection on `master`: the CI check must pass before merging; force-pushes and branch deletion are blocked.
- `examples/` directory with a README of usage walkthroughs (demo workflow script, Ignition deployment, tests as documentation).

### Changed

- Deleted the stray `main` branch (an unused GitHub-generated stub) and made `master` the default branch. CI now only triggers on `master`.

## [0.1.3] - 2026-09-16

### Added

- `.gitattributes` (normalize line endings to LF, mark `pnpm-lock.yaml` as generated).

## [0.1.2] - 2026-09-16

### Added

- Cross-links to the sibling Foundry template in the README description.

## [0.1.1] - 2026-09-16

### Added

- "Latest release" badge/link in the README.

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
