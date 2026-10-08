# dsh-agent-reach

[![Listed on dsh-plugin.org](https://dsh-plugin.org/badges/listed.svg)](https://dsh-plugin.org/plugins/akash-digitavision/dsh-agent-reach)

**One-line value:** install this and every DeepSeek Harness agent gains one-command internet reach — web reading, YouTube, GitHub, Twitter/X, Reddit, RSS, Exa semantic search, Bilibili, Xiaohongshu and more — via the [Agent Reach](https://github.com/Panniantong/agent-reach) CLI.

> **How it differs from MCP bundles:** Agent Reach is a CLI capability layer + agent skill, **not** an MCP server. This bundle therefore registers an **in-process DSH skill** (`ctx.skills.register`) instead of an `mcp-client` row — the skill teaches the agent to install the CLI on first use and drive its upstream tools (yt-dlp, gh, opencli, twitter-cli, bili-cli, mcporter/Exa, feedparser).

## What it adds to every agent on the profile

| Row | Module | Purpose |
|---|---|---|
| `agent-reach-skill` | `dsh-agent-reach` (this bundle's own module) | Registers the `agent-reach` skill in the DSH skill registry — install guide, health checks (`agent-reach doctor`), optional channels (cookies/proxy/keys), and the full upstream command reference |

**Capability category:** 工具与能力 (Tools & Capabilities)
**License:** MIT · **Compatibility:** DSH ≥ 0.2.0-rc.2 (skills service); agent-reach CLI needs Python ≥ 3.10

## Install

```bash
dsh plugin --profile web add github:akash-digitavision/dsh-agent-reach
```

or in **Settings → Plugin Market** (DSH Plugin Hub), search for `dsh-agent-reach`.

After install, restart or re-apply, then ask any agent: *"use the agent-reach skill to give yourself internet access"* — it will install the CLI and run `agent-reach doctor`.

## Requirements & permissions

- The **skill** itself is self-contained (no runtime deps beyond DSH)
- The **CLI** is installed by the agent on first use: Python ≥ 3.10 (+ pipx or venv); core channels (web, YouTube, GitHub, RSS, Exa search, V2EX, Bilibili) are free and keyless; optional channels (Twitter, Reddit, Xiaohongshu, Facebook, Instagram, LinkedIn, Boss直聘) need cookies/login and your explicit approval
- Cookies stay local in `~/.agent-reach/`; nothing is uploaded
- Upstream tools are re-selected upstream when platforms break — you don't maintain them

## Publish / uninstall

Push updates to the GitHub repo and bump `"version"`; hub users get update prompts. Remove from the profile `bundles` + `dependencies` to uninstall.

## Credits

Upstream project: [Panniantong/agent-reach](https://github.com/Panniantong/agent-reach) (MIT) — this bundle only packages its skill for the DeepSeek Harness skill registry.
