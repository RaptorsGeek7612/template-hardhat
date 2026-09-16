# Examples

## Full voting workflow

[`scripts/run-workflow.ts`](../scripts/run-workflow.ts) walks through the entire `Voting` lifecycle against an ephemeral local network: deploy the contract, register three voters, open proposal registration, submit two proposals, open the voting session, cast votes, close it, and tally the result.

Run it with:

```shell
pnpm exec hardhat run scripts/run-workflow.ts
```

Expected output:

```
Deploying Voting from 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Voting deployed at 0x5FbDB2315678afecb367f032d93F642f64180aa3
Registered 3 voters
Collected proposals from alice and bob
Votes cast
Winning proposal #2: "Reduce commute time" with 2 vote(s)
```

## Deploying with Ignition

[`ignition/modules/Voting.ts`](../ignition/modules/Voting.ts) is the minimal deployment module — it just deploys the contract with no constructor arguments.

### Locally (ephemeral)

```shell
pnpm exec hardhat ignition deploy ignition/modules/Voting.ts
```

### To Sepolia

```shell
cp .env.example .env
# edit .env: set SEPOLIA_RPC_URL and SEPOLIA_PRIVATE_KEY

pnpm exec hardhat ignition deploy --network sepolia ignition/modules/Voting.ts
```

Expected output:

```
Hardhat Ignition 🚀

Deploying [ VotingModule ]

Batch #1
  Executing VotingModule#Voting...

Batch #1
  Executed VotingModule#Voting

[ VotingModule ] successfully deployed 🚀

Deployed Addresses

VotingModule#Voting - 0x1234567890abcdef1234567890abcdef12345678
```

Ignition records the deployment under `ignition/deployments/chain-11155111/` (Sepolia's chain ID), so re-running the same command later reuses the existing contract instead of redeploying. Look the address up at `https://sepolia.etherscan.io/address/<the address above>`, or interact with it the same way as [the local demo script](#full-voting-workflow) by pointing `network.create()` at `"sepolia"` instead of the default network.

## Reading contract tests as usage examples

[`test/Voting.ts`](../test/Voting.ts) and [`contracts/Voting.t.sol`](../contracts/Voting.t.sol) double as executable documentation for every function's expected behavior (who can call it, in which workflow phase, and what it reverts on).
