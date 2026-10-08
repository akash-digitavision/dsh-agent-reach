// dsh-agent-reach: registers the Agent Reach skill into the DSH skill registry
// (ctx.skills) so every agent on the profile can discover and load it.
//
// Agent Reach (https://github.com/Panniantong/agent-reach) is a CLI capability
// layer — NOT an MCP server — so this bundle integrates via the skills system
// instead of @deepseek-ai/dsh-mcp-client. The skill body lives in skill/agent-reach.md
// and teaches the agent how to install the CLI on first use and drive its upstream
// tools afterwards.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const name = "agent-reach-skill";
const inject = ["skills"];

function apply(ctx) {
	let content;
	try {
		content = readFileSync(
			join(dirname(fileURLToPath(import.meta.url)), "skill", "agent-reach.md"),
			"utf8"
		);
	} catch (error) {
		ctx.logger?.warn?.(`agent-reach: skill body missing: ${error?.message ?? error}`);
		return;
	}
	try {
		return ctx.skills.register({
			name: "agent-reach",
			description:
				"Give the agent internet reach: install and use Agent Reach — web reading, YouTube, GitHub, Twitter/X, Reddit, RSS, Exa search, Bilibili, Xiaohongshu and more — via CLI tools.",
			whenToUse:
				"When the user asks to install/configure Agent Reach, or a task needs web pages, YouTube subtitles, tweets, Reddit, RSS feeds, semantic web search, or content behind bot-blocked or login-walled platforms.",
			content,
			source: "dsh-agent-reach",
			invocation: { modelInvocable: true, userInvocable: true }
		});
	} catch (error) {
		ctx.logger?.warn?.(`agent-reach: could not register skill: ${error?.message ?? error}`);
	}
}

export { apply, inject, name };
