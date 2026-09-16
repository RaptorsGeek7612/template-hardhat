# Voting (Hardhat 3 + ethers)

[![CI](https://github.com/RaptorsGeek7612/template-hardhat/actions/workflows/ci.yml/badge.svg)](https://github.com/RaptorsGeek7612/template-hardhat/actions/workflows/ci.yml)
[![Latest release](https://img.shields.io/github/v/release/RaptorsGeek7612/template-hardhat)](https://github.com/RaptorsGeek7612/template-hardhat/releases/latest)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A whitelisted on-chain voting system built with Hardhat 3, ethers.js, and OpenZeppelin's `Ownable`. This is the Hardhat counterpart of a pair of framework-pure starter templates implementing the same `Voting` contract:

- Hardhat (this repo) — https://github.com/RaptorsGeek7612/template-hardhat
- Foundry — https://github.com/RaptorsGeek7612/template-foundry

The `Voting` contract drives voters through a fixed workflow:

1. `RegisteringVoters` — the owner whitelists voter addresses.
2. `ProposalsRegistrationStarted` — whitelisted voters submit proposals.
3. `ProposalsRegistrationEnded`
4. `VotingSessionStarted` — whitelisted voters cast one vote each.
5. `VotingSessionEnded`
6. `VotesTallied` — the owner tallies votes; the most-voted proposal wins.

Only the owner can advance the workflow and register voters; only registered voters can submit proposals, vote, or read voter/proposal data.

## Project layout

```
contracts/        Solidity source (Voting.sol) and Foundry-style unit tests (Voting.t.sol)
test/             TypeScript integration tests (Voting.ts) and shared fixtures
ignition/         Hardhat Ignition deployment module
scripts/          Standalone demo script run with `hardhat run`
examples/         Walkthroughs and usage examples (see examples/README.md)
hardhat.config.ts
```

## Setup

This project uses **pnpm**.

```shell
pnpm install
cp .env.example .env   # fill in SEPOLIA_RPC_URL / SEPOLIA_PRIVATE_KEY to deploy to Sepolia
```

## Usage

### Running tests

```shell
pnpm test            # Solidity + TypeScript tests
pnpm exec hardhat test solidity
pnpm exec hardhat test mocha
```

### Compiling, linting, formatting

```shell
pnpm run compile
pnpm run lint
pnpm run format
pnpm run check    # lint + compile + test
```

### Running the demo workflow

A standalone script deploys the contract and walks through the full voting workflow (register voters, submit proposals, vote, tally) on an ephemeral local network:

```shell
pnpm exec hardhat run scripts/run-workflow.ts
```

### Deploying

To deploy locally (ephemeral, state is discarded afterwards):

```shell
pnpm exec hardhat ignition deploy ignition/modules/Voting.ts
```

To deploy to Sepolia, set `SEPOLIA_RPC_URL` and `SEPOLIA_PRIVATE_KEY` in `.env` (see `.env.example`), then run:

```shell
pnpm exec hardhat ignition deploy --network sepolia ignition/modules/Voting.ts
```

## Docs

- Hardhat 3 — https://hardhat.org/llms.txt
- ethers.js — https://docs.ethers.org/v6/

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT — see [LICENSE](LICENSE).
