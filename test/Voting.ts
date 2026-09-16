import { expect } from "chai";
import { ethers, networkHelpers } from "./fixtures/deployVoting.js";
import { deployVotingFixture } from "./fixtures/deployVoting.js";

describe("Voting", function () {
    describe("Deployment", function () {
        it("Starts in the RegisteringVoters phase", async function () {
            const { voting } = await networkHelpers.loadFixture(deployVotingFixture);

            expect(await voting.workflowStatus()).to.equal(0n);
        });
    });

    describe("Voter registration", function () {
        it("Lets the owner register a voter and emits VoterRegistered", async function () {
            const { voting, owner, alice } = await networkHelpers.loadFixture(deployVotingFixture);

            await expect(voting.connect(owner).addVoter(alice.address))
                .to.emit(voting, "VoterRegistered")
                .withArgs(alice.address);
        });

        it("Reverts when a non-owner tries to register a voter", async function () {
            const { voting, alice, stranger } = await networkHelpers.loadFixture(deployVotingFixture);

            await expect(voting.connect(alice).addVoter(stranger.address))
                .to.be.revertedWithCustomError(voting, "OwnableUnauthorizedAccount")
                .withArgs(alice.address);
        });

        it("Reverts when a non-voter reads voter data", async function () {
            const { voting, owner, stranger } = await networkHelpers.loadFixture(deployVotingFixture);

            await expect(voting.connect(stranger).getVoter(owner.address)).to.be.revertedWith(
                "You're not a voter",
            );
        });
    });

    describe("Full workflow", function () {
        async function runFullWorkflow() {
            const fixture = await networkHelpers.loadFixture(deployVotingFixture);
            const { voting, owner, alice, bob } = fixture;

            await voting.addVoter(owner.address);
            await voting.addVoter(alice.address);
            await voting.addVoter(bob.address);

            await voting.startProposalsRegistering();
            await voting.connect(alice).addProposal("Plant more trees"); // id 1
            await voting.connect(bob).addProposal("Reduce commute time"); // id 2

            return fixture;
        }

        it("Tallies the most voted proposal as the winner", async function () {
            const { voting, owner, alice, bob } = await runFullWorkflow();

            await voting.endProposalsRegistering();
            await voting.startVotingSession();

            await voting.connect(alice).setVote(2);
            await voting.connect(bob).setVote(2);
            await voting.connect(owner).setVote(1);

            await voting.endVotingSession();
            await expect(voting.tallyVotes()).to.emit(voting, "WorkflowStatusChange");

            expect(await voting.winningProposalID()).to.equal(2n);
            expect(await voting.workflowStatus()).to.equal(5n); // VotesTallied
        });

        it("Rejects a second vote from the same voter", async function () {
            const { voting, alice } = await runFullWorkflow();

            await voting.endProposalsRegistering();
            await voting.startVotingSession();

            await voting.connect(alice).setVote(0);
            await expect(voting.connect(alice).setVote(0)).to.be.revertedWith(
                "You have already voted",
            );
        });

        it("Reverts with no reason when reading a proposal that doesn't exist", async function () {
            const { voting } = await runFullWorkflow();

            await expect(voting.getOneProposal(99)).to.revert(ethers);
        });
    });
});
