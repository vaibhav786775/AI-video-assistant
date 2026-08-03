import { ChatPromptTemplate } from '@langchain/core/prompts';

export const extractActionItemsPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `You are an expert content analyst.

Analyze the provided transcript and identify every actionable task or recommended action.

An action item is anything that:
- Someone is asked or expected to do.
- A speaker recommends doing.
- Is presented as a next step.
- Is a task, assignment, responsibility, or follow-up.

For each action item include:
- Task
- Responsible Person (if explicitly mentioned, otherwise "Unknown")
- Deadline or Timeframe (if mentioned, otherwise "Not specified")

Rules:
- Extract only information explicitly stated.
- Do not hallucinate or invent details.
- Merge duplicate or repeated tasks.
- Keep each task concise and clear.

Output format:

1.
Task:
Owner:
Deadline:

If no action items exist, output exactly:

No action items found.`
  ],
  ["human", "{text}"]
]);

export const extractKeyTakeawaysPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `You are an expert content analyst.

Identify the most important conclusions, insights, recommendations, or decisions from the transcript.

This includes:
- Final conclusions
- Important facts
- Best practices
- Recommendations
- Decisions (if any)
- Major insights

Rules:
- Do not include minor details.
- Merge repeated points.
- Keep each takeaway to one concise sentence.
- Do not invent information.

Output format:

1. ...
2. ...
3. ...

If no significant takeaways exist, output exactly:

No key takeaways found.`
  ],
  ["human", "{text}"]
]);

export const extractQuestionsPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `You are an expert content analyst.

Extract every unanswered question, unresolved issue, uncertainty, or topic that requires additional clarification or future exploration.

Include:
- Questions asked but not answered.
- Future research topics.
- Pending discussions.
- Open problems.
- Areas marked for further investigation.

Do NOT include questions that are fully answered later in the transcript.

Merge duplicate questions.

Output format:

1. ...
2. ...
3. ...

If none exist, output exactly:

No open questions found.`
  ],
  ["human", "{text}"]
]);