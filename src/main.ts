import * as core from "@actions/core";
import * as github from "@actions/github";
import {addLabel} from "./addLabel";

export async function run() {
    try {
        const token = core.getInput("github-token");
        const label = core.getInput("label");

        const issueInfo = await addLabel(
            token,
            github.context,
            prOrIssueNumber(),
            label
        );

        if(issueInfo) {
            core.setOutput('pr_or_issue_title', issueInfo.title);
            core.setOutput('pr_or_issue_url', issueInfo.html_url);
        }
    } catch (error) {
        if (error instanceof Error) {
            core.setFailed(error.message);
        } else {
            core.setFailed("Unknown error");
        }
    }
}

function prOrIssueNumber(): number {
    if (core.getInput("pr-or-issue-number") !== "") {
        const prOrIssueNumber = parseInt(core.getInput("pr-or-issue-number"), 10);
        if (Number.isNaN(prOrIssueNumber)) {
            throw new Error("Invalid `pr-or-issue-number` value");
        }
        return prOrIssueNumber;
    }

    if (!github.context.payload.pull_request) {
        throw new Error(
            "This action must be run using a `pull_request` event or " +
            "have an explicit `pr-or-issue-number` provided"
        );
    }
    return github.context.payload.pull_request.number;
}

if (require.main === module) {
    run();
}
