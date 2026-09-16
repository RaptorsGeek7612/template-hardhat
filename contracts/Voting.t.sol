// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import { Test } from "forge-std/Test.sol";
import { Voting } from "./Voting.sol";

// Solidity tests are compatible with foundry, so they
// use the same syntax and offer the same functionality.

contract VotingTest is Test {
    Voting voting;

    address owner = address(this);
    address alice = makeAddr("alice");
    address bob = makeAddr("bob");
    address stranger = makeAddr("stranger");

    function setUp() public {
        voting = new Voting();
        voting.addVoter(owner);
        voting.addVoter(alice);
        voting.addVoter(bob);
    }

    function test_StartsInRegisteringVotersPhase() public view {
        require(
            voting.workflowStatus() == Voting.WorkflowStatus.RegisteringVoters,
            "Should start in RegisteringVoters"
        );
    }

    function test_OwnerCanRegisterVoters() public view {
        Voting.Voter memory voter = voting.getVoter(alice);
        require(voter.isRegistered, "alice should be registered");
    }

    function test_OnlyOwnerCanAddVoter() public {
        vm.prank(alice);
        vm.expectRevert();
        voting.addVoter(stranger);
    }

    function test_CannotRegisterTheSameVoterTwice() public {
        vm.expectRevert("Already registered");
        voting.addVoter(alice);
    }

    function test_NonVoterCannotCallVoterOnlyFunctions() public {
        vm.prank(stranger);
        vm.expectRevert("You're not a voter");
        voting.getVoter(owner);
    }

    function test_CannotAddProposalBeforeRegistrationStarts() public {
        vm.prank(alice);
        vm.expectRevert("Proposals are not allowed yet");
        voting.addProposal("Reduce taxes");
    }

    function test_CannotAddEmptyProposal() public {
        voting.startProposalsRegistering();

        vm.prank(alice);
        vm.expectRevert("You can't submit an empty proposal");
        voting.addProposal("");
    }

    function test_FullWorkflow_WinnerIsMostVotedProposal() public {
        voting.startProposalsRegistering();

        vm.prank(alice);
        voting.addProposal("Proposal A"); // id 1 (id 0 is the GENESIS proposal)
        vm.prank(bob);
        voting.addProposal("Proposal B"); // id 2

        voting.endProposalsRegistering();
        voting.startVotingSession();

        vm.prank(alice);
        voting.setVote(2);
        vm.prank(bob);
        voting.setVote(2);
        voting.setVote(1); // owner votes for proposal 1

        voting.endVotingSession();
        voting.tallyVotes();

        require(
            voting.workflowStatus() == Voting.WorkflowStatus.VotesTallied,
            "Should end in VotesTallied"
        );
        require(voting.winningProposalID() == 2, "Proposal B should win with 2 votes");
    }

    function test_CannotVoteTwice() public {
        voting.startProposalsRegistering();
        voting.endProposalsRegistering();
        voting.startVotingSession();

        vm.startPrank(alice);
        voting.setVote(0);
        vm.expectRevert("You have already voted");
        voting.setVote(0);
        vm.stopPrank();
    }

    function test_CannotVoteForANonExistentProposal() public {
        voting.startProposalsRegistering();
        voting.endProposalsRegistering();
        voting.startVotingSession();

        vm.expectRevert("Proposal not found");
        voting.setVote(99);
    }
}
