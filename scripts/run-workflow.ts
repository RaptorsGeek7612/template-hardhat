import { network } from "hardhat";

const { ethers } = await network.create();

const [owner, alice, bob] = await ethers.getSigners();

console.log("Deploying Voting from", owner.address);
const voting = await ethers.deployContract("Voting");
console.log("Voting deployed at", await voting.getAddress());

await voting.addVoter(owner.address);
await voting.addVoter(alice.address);
await voting.addVoter(bob.address);
console.log("Registered 3 voters");

await voting.startProposalsRegistering();
await voting.connect(alice).addProposal("Plant more trees");
await voting.connect(bob).addProposal("Reduce commute time");
console.log("Collected proposals from alice and bob");

await voting.endProposalsRegistering();
await voting.startVotingSession();

await voting.connect(alice).setVote(2);
await voting.connect(bob).setVote(2);
await voting.setVote(1);
console.log("Votes cast");

await voting.endVotingSession();
await voting.tallyVotes();

const winningId = await voting.winningProposalID();
const winner = await voting.getOneProposal(winningId);
console.log(
    `Winning proposal #${winningId}: "${winner.description}" with ${winner.voteCount} vote(s)`,
);
