# Contributing

This project uses 3 deployment environments: **Local**, **Sandbox**, and **Production**.

_Note: continuous deployment, once added, should be detailed here._

**Master should always be in a state where it could be deployed to production**. As a result, each PR should be self-contained and shippable. Features being locked behind feature flags is an acceptable approach for merging into the main branch. Code changes should be associated with a JIRA ticket. The focus of the JIRA issue tracker is to reflect the reality of current progress in any given task. Document questions, resolutions, and considerations in the ticket.

**All changes should go through the PR review process.**

1. **Discuss your planned approach and consider alternatives** with another team member or project lead. Use your judgement on how much discussion is needed.

- For changes involving new or changed user-visible functionality, discuss whether a feature flag is required so the change can still be deployed without being revealed to users.
- More complex changes often require more discussion before writing code. Consider a spec document or Engineering Requirements Document (ERD) prior to development.

2. **Create a branch from master**.

- This is typically done via the Bitbucket issue or JIRA interface.
- Alternatively, create a branch off of `master` with the JIRA id in the branch name.

3. **Push your branch early and often**, so the team can participate, and we can all help each other.
   - If you want feedback from specific team members, reach out for discussion and contribute to the branch together.
   - Note any todos, resolutions, and alternative options in the JIRA ticket.
4. **Open a PR** once you feel it's ready for a complete review.
   - If you're not sure who should review, reach out to the project lead or a team member. Everyone is here to help!
5. **Expect discussion, suggestions, and rework**, as you work together with reviewers to iterate on the PR. As you push new changes to the PR:
   - Resolve review conversations that you've addressed to help reviewers re-review those parts of the PR.
   - Document items that were todos as you complete them.
   - **Re-request reviews** as needed.
6. **Code will be merged by a project lead**.
7. Celebrate! 🙌🎉

## As a PR Reviewer

**As a reviewer, you share ownership equally with the PR author** for the quality of the PR. For example:

- You're able to explain to other team members why the particular approach was chosen
- If the original author is on vacation, you're able to answer questions about and/or make further changes to code in the PR.

You'll be an active participant in the development of the PR, and it's your responsibility to help in making it the best code the team can write together!

However, _perfection is not the goal_. Favor approving a PR once it is in a state where you believe it _definitely improves the overall code health_, even if it isn't perfect.

### Before Reviewing a PR

Before starting to review a PR, ensure you have enough context to review it effectively.

1. Ensure you understand the goals and acceptance critera
   a. Read the PR description
   b. Read the associated JIRA ticket(s)
   c. Discuss and ask questions to clarify the goals
2. Ensure you understand the architecture of the larger application that is affected by the change

### Reviewing a PR

When reviewing the PR, here are some things to consider. Does the change:

1. Solve the problem, i.e. meet the acceptance criteria of the JIRA ticket? Does it _only_ include things related to solving the problem? PRs should focus on solving a single problem, and not include unrelated changes. Sometimes there are gray areas. If it's unclear, discuss with the PR author and/or team.
2. Use semantic HTML and follow current naming conventions.
3. Follow other existing conventions for code style, organization, and naming.
