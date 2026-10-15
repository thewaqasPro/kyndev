# KYNDEV Agent Workflow Guidelines (Superpowers)

This project has **Superpowers** installed for coding agents.

## Superpowers Bootstrap
- Skills directory: `.gemini/skills/` and `.agents/skills/`
- Bootstrap skill: `.gemini/skills/using-superpowers/SKILL.md`
- Tool mapping: `.gemini/skills/using-superpowers/references/antigravity-tools.md`

## The Core Rule
Invoke relevant skills **BEFORE** taking any response or action:
- **Starting new features or architecture**: Invoke `brainstorming` first.
- **Executing multi-step work**: Invoke `writing-plans` and `executing-plans`.
- **Debugging issues**: Invoke `systematic-debugging` first.
- **Before claiming completion**: Invoke `verification-before-completion`.

## Project Conventions
- **Build Verification**: Run `npm run build` to ensure static page generation passes (all 34 static routes).
- **Documentation Integrity**: When modifying architecture or components, update `docs/MULTI_PAGE_AND_COMPONENT_GUIDE.md` and `documentation/`.
