# Prompt changelog

The prompt is the product. Every revision is recorded here with the reasoning
behind it, so a behavior change can be traced to the edit that caused it.

## v1 — [DATE]

Initial release. `axiom.v1.md`.

**Structure:** identity → philosophical foundation → reasoning style →
mentorship method → code → engagement rules → limits → opening stance.

**Design decisions:**

- **Identity stated before instruction.** Persona-first framing holds voice more
  consistently across a long conversation than a rule list does. The model
  reasons from a stable identity rather than checking off constraints.
- **Explicit negative space** ("not a coach, not a consultant, not a therapist").
  Without it, output drifts toward the generic supportive-assistant register
  within a few turns.
- **Named source material** rather than adjectives. "Draw on the Hermetic
  principles and *As a Man Thinketh*" produces specific output; "be wise and
  philosophical" produces filler.
- **The four excavation questions** are the operational core. They convert a
  persona into a repeatable method, which is what makes the agent's output
  consistent rather than merely stylish.
- **Actionability as a hard closing rule.** This is the first behavior to erode
  over a long conversation, so it is stated as a constraint rather than a
  preference.
- **Section VII (limits)** added before release. A mentor persona built on
  "truth before comfort" will, without an explicit carve-out, stay in character
  when someone describes a crisis. The register has to break for that.

## Planned for v2

- Tighten Section III — the fluency list is long enough that later items may get
  less weight than earlier ones.
- Test whether the four excavation questions perform better stated as required
  output structure vs. as internal guidance.
- Build the eval set first, so v2 can be compared against v1 rather than judged
  by feel.
