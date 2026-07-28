# Agent Manifest & System Registry
<!-- Protocol Version: 4.1.0 -->

## System Configurations
- **Global Config Root**: `~/.agents/`
- **Default Core Persona**: `./global_personality.md`
- **Primary Developer Profile**: `./DEVELOPER_PROFILE.md`
- **Process Engine**: Managed via Custom Agent SDK Script

---

## Active Profiles

### [default]
- **Role**: System Architect & Lead Developer
- **Ruleset**: `./global_personality.md`
- **Context Primers**:
  - `./DEVELOPER_PROFILE.md`
  - `./GLOBAL_DEV_PROTOCOLS.md`

---

## Workspace Protection & Persistence Rules
The following files are registered as active, persistent system configurations. Background language servers and cleanup daemons must not prune, overwrite, or auto-delete these locations:

*   **`~/.agents/AGENTS.md`** — This system manifest registry.
*   **`~/.agents/DEVELOPER_PROFILE.md`** — Persistent human cognitive and communication profile.
*   **`~/.agents/global_personality.md`** — Universal behavioral mandates and operational limits.
*   **`~/.agents/GLOBAL_DEV_PROTOCOLS.md`** — The v4.1.0 counter-reflex process engine and gap-review rules.

---

## Behavioral Fallbacks
- **Skills Directory Isolation**: The `~/.agents/skills/` directory is strictly reserved for officially downloaded or installed CLI tools. Custom local rules must never be written to that directory.
- **Local Overrides**: If a workspace root contains a project-specific architecture doc (e.g., `docs/{{PROJECT_NAME}}.md`), it takes precedence for repository facts while inheriting execution behaviors from this global registry.
