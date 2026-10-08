# Agent Reach — internet reach for DeepSeek Harness agents

Install and use [Agent Reach](https://github.com/Panniantong/agent-reach) (MIT, free) so you can read web pages, YouTube subtitles, GitHub, Twitter/X, Reddit, RSS, Bilibili, Xiaohongshu and run Exa semantic web search — via CLI tools, with platform backends that are re-selected upstream when they break.

## Step 1 — Install (first use only)

Check if it is already installed: `agent-reach --version`. If missing, install it (Python 3.10+ required):

**Windows PowerShell:**
```powershell
py -3 -m venv $env:USERPROFILE\.agent-reach-venv
& "$env:USERPROFILE\.agent-reach-venv\Scripts\python.exe" -m pip install https://github.com/Panniantong/agent-reach/archive/main.zip
# then either activate the venv or add $env:USERPROFILE\.agent-reach-venv\Scripts to PATH
```

**macOS / Linux:**
```bash
pipx install https://github.com/Panniantong/agent-reach/archive/main.zip
# if PEP 668 (externally-managed-environment):
python3 -m venv ~/.agent-reach-venv && ~/.agent-reach-venv/bin/pip install https://github.com/Panniantong/agent-reach/archive/main.zip
```

⚠️ Install from the GitHub archive, **never** the PyPI package named `agent-reach` — it is a different project.

Then run the read-only check:
```bash
agent-reach install --env=auto
```

Ask the user before any system-level changes:
```bash
agent-reach install --env=auto --system        # installs/configures core tools
agent-reach install --env=auto --system --channels=all   # everything, explicit approval
```

## Step 2 — Health check

```bash
agent-reach doctor        # per-channel status + which backend is active
agent-reach doctor --json # machine-readable
```

Fix ❌/⚠️ channels where possible; ask the user only for credentials or approvals.

## Step 3 — Optional channels (need user consent / credentials)

Channels needing cookies or browser sessions: `twitter`, `xiaohongshu`, `reddit`, `facebook`, `instagram`, `xueqiu`, `xiaoyuzhou` (free Groq key), `linkedin`, `boss`, `opencli` (desktop, one install covers Reddit/Facebook/Instagram/B站字幕/Twitter-fallback).

```bash
agent-reach install --env=auto --system --channels=twitter,xiaohongshu
agent-reach configure twitter-cookies   # hidden input; user exports cookies via Cookie-Editor
agent-reach configure proxy             # for regions that need it
agent-reach configure groq-key          # free key from console.groq.com
```

> 🔒 Recommend **dedicated secondary accounts** for cookie-based platforms (ban risk).

## Command reference (after install, call upstream tools directly)

| Task | Command |
|---|---|
| Read any web page | `curl -s "https://r.jina.ai/URL"` |
| YouTube subtitles/info | `yt-dlp --dump-json URL` |
| GitHub repos/issues | `gh repo view owner/repo` · `gh search repos "q"` |
| Exa semantic search | `mcporter call exa.web_search_exa query="..." numResults=5` |
| Twitter/X | set `TWITTER_AUTH_TOKEN` + `TWITTER_CT0`, then `twitter search "q" -n 10` |
| Bilibili | `bili search "q" --type video` (no login) |
| Reddit / Facebook / Instagram / 小红书 | `opencli reddit search "q" -f yaml` etc. |
| RSS | `python -c "import feedparser; ..."` |
| 小宇宙 podcast transcript | `bash ~/.agent-reach/tools/xiaoyuzhou/transcribe.sh <URL>` |

Active backend per platform: `agent-reach doctor --json` → `active_backend`.

## Boundaries

- Never `sudo` without explicit user approval; never touch files outside `~/.agent-reach/`
- Never clone repos or create files inside the agent workspace for this
- Update: `帮我更新 Agent Reach` → <https://raw.githubusercontent.com/Panniantong/agent-reach/main/docs/update.md>
