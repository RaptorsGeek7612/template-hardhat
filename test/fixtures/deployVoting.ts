import { network } from "hardhat";

export const { ethers, networkHelpers } = await network.create();

export async function deployVotingFixture() {
    const [owner, alice, bob, stranger] = await ethers.getSigners();
    const voting = await ethers.deployContract("Voting");

    return { voting, owner, alice, bob, stranger };
}
