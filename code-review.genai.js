import dotenv from "dotenv";

dotenv.config();
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const changes = await git.diff({ staged: true });

// Provide the required 3rd argument (e.g., a label or options object as per defDiff's definition)
defDiff("CODE_CHANGES", changes, "Staged Changes");

$`## Role
You are a senior developer whose job is to review code changes and provide meaningful feedback.

## Task
Review <CODE_CHANGES>, point out possible mistakes or bad practices, and provide suggestions for improvement.
- Be specific about what's wrong and why it's wrong
- Reference proper coding standards and best practices
- Be brief to get your point across
`;