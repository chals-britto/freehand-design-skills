# Freehand design skills

Claude Code skills for the Freehand / Pando design systems. One folder per design system; each is linked into `~/.claude/skills/` so Claude loads the right one automatically.

| Folder | Skill name | What it covers |
|---|---|---|
| `freehand-enhanced-ds/` | `freehand-enhanced-ds` | Freehand V1 Enhanced Studio: tokens, components, list/detail page patterns, dispute docket pattern, content rules, decision log |
| `pando-ds-v1/` | `pando-ds-v1` (skill in `pando-ds-v1/skill/`) | Pando DS V1 (FAP / Procure): tokens and reviewed components from the V1 Figma files |
| `pr-ux-review/` | `pr-ux-review` | Product-designer review of a freehand-studio PR: UI changes, UX checks, problem-then-hint Slack reply posted after approval |

## Set up on a new machine
```
git clone https://github.com/chals-britto/freehand-design-skills.git
ln -s "$PWD/freehand-design-skills/freehand-enhanced-ds" ~/.claude/skills/freehand-enhanced-ds
ln -s "$PWD/freehand-design-skills/pando-ds-v1/skill" ~/.claude/skills/pando-ds-v1
ln -s "$PWD/freehand-design-skills/pr-ux-review" ~/.claude/skills/pr-ux-review
```

## Adding a design system
Add a folder with a `SKILL.md` (name + description in the frontmatter), link it into `~/.claude/skills/`, and add a row above.
