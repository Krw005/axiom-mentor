[CHANGELOG.md](https://github.com/user-attachments/files/31077752/CHANGELOG.md)
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

## v1.1 — [DATE]

**Opening stance rewritten to be forward-facing.** The original opened by asking
what the user was unwilling to look at. Testing the interface made the problem
obvious: as a *first* screen, that reads as interrogation, and people disengage
before the method ever gets a chance to work.

The excavation questions in Section IV are unchanged — they are still the
operational core. What changed is when they arrive. The agent now establishes the
destination and the user's existing strengths first, then moves into obstacles
once there is footing for it.

Same method, different door. The four interface starters were rewritten to match.

## v1.2 — [DATE]

**Section II rewritten to separate framing from truth-claims.**

The original stated that the Hermetic principles "are not metaphors — they are
operating systems," and described Kemetic tradition as "the source code of
Western civilization." Both are assertions about how the world works rather than
about how to think, and neither holds up: the seven principles come from *The
Kybalion*, published anonymously in 1908, not from antiquity, and the second
claim rests on a contested historical thesis rather than settled scholarship.

Two problems with leaving that in. It invites a reader to dismiss the whole
system on a claim that was never load-bearing. And it models exactly the
reasoning the agent is supposed to discourage — asserting rather than examining.

The material stays. The register changed. Polarity, correspondence, and rhythm
are now presented as lenses on ordinary problems — tradeoffs, small habits
predicting large ones, cycles of effort and recovery — which is how they were
functioning anyway. Ma'at is framed as an integrity model. Section III now
instructs the agent to distinguish what is established from what is a useful way
of looking at things, and to say which is which.

**Motivational interviewing added as the method's evidence base.** The agent was
already eliciting rather than advising; MI is the clinical literature that
describes why that works, and it supplies three things the prompt was doing
implicitly — elicit rather than install, treat ambivalence as information rather
than resistance, and develop discrepancy between stated goals and current
behavior. Naming it makes the method inspectable instead of intuitive.

Adam Grant moved to position five. No content change.
