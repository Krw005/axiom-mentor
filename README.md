[README.md](https://github.com/user-attachments/files/31077475/README.md)
# AXIOM — A Mentorship Agent

A system prompt that turns a general-purpose language model into a specific kind
of mentor: one that opens with where you're going, builds from what you already
bring, and ends every exchange with something that moves the feet.

The prompt is versioned, changelogged, and documented — the reasoning behind each
structural decision is recorded so revisions can be traced rather than guessed
at.

> <img width="603" height="1311" alt="IMG_0067" src="https://github.com/user-attachments/assets/225c31aa-fd32-4235-8c6b-68146eaafadd" /><img width="603" height="1311" alt="IMG_0065" src="https://github.com/user-attachments/assets/8af0f0df-1d87-4744-b48d-3070ddf0c7db" />


> AXIOM running in a chat client, mid-conversation.

---

## What this repo is

**The artifact is the prompt.** `prompts/axiom.v1.md` is a designed system
prompt, not a saved chat. It can be loaded into any model that accepts a system
prompt — Claude, or any chat client that supports custom instructions — and it
produces consistent behavior across long conversations because of how it's
structured.

`prompts/CHANGELOG.md` records what changed between revisions and why. That file
exists because prompt behavior degrades in ways that are hard to diagnose after
the fact: version 3 feels worse than version 2 and nobody remembers what moved.
A changelog makes a behavior regression traceable to the edit that caused it.

The repository also contains a working reference implementation of a chat
interface — React front end and an Express proxy that keeps the API key
server-side. **It is scaffolding, not a shipped product.** It has not been
deployed. See the roadmap.

---

## Design thesis

Most coaching tools give people answers. Answers rarely change behavior.

AXIOM is built to ask instead — and, critically, to ask in a particular order.
It opens on the destination and on what the person already has going for them.
Only once that footing is set does it move into obstacles. The reasoning is
practical rather than sentimental: people move further from a clear picture of
where they're headed than from an inventory of what's wrong with them, and an
opening that leads with what you're avoiding gets you an honest answer far less
often than one that leads with what you're building.

---

## Prompt architecture

The full prompt is at [`prompts/axiom.v1.md`](prompts/axiom.v1.md). The
structural decisions, and why each one is there:

**1. Identity before instruction.** The prompt establishes who AXIOM is before it
says what to do. Persona-first framing holds voice more consistently across a
long conversation than a rule list does, because the model reasons *from* a
stable identity rather than checking off constraints one at a time.

**2. Explicit negative space.** "You are not a coach. Not a consultant. Not a
therapist." Naming what the agent is *not* prevents the drift toward the generic
supportive-assistant register that these conversations otherwise collapse into
within a few turns.

**3. Named sources, not adjectives.** Kemetic wisdom tradition, Hermetic framing,
James Allen's *As a Man Thinketh*, motivational interviewing, and Adam Grant on
rethinking. Naming specific material gives the model a well to draw from — "be
wise and philosophical" produces filler, while a named text produces specificity.

**3a. Framing separated from truth-claims.** The wisdom traditions are scoped
explicitly as lenses for reflection rather than as assertions about how the world
works, and the agent is instructed to distinguish what is established from what
is a useful way of looking at things. This was a correction in v1.2 — the
original register asserted where it should have framed, which both invited easy
dismissal and modeled the reasoning the agent exists to discourage.

**3b. An evidence base under the method.** Motivational interviewing supplies the
clinical grounding for what the agent was already doing: eliciting a person's own
reasons for change rather than supplying them, treating ambivalence as
information rather than resistance, and developing discrepancy between stated
goals and current behavior. It is standard practice in case management and
reentry work.

**4. A four-question excavation frame.** Goals get tested against four questions:
whose goal is this, what is the real obstacle, what would this require in
identity rather than effort, and what is the cost of not moving. This is the
operational core — it converts a persona into a repeatable method, which is what
makes output consistent rather than merely stylish.

**5. Sequencing as a design decision.** The excavation questions are explicitly
scoped to the middle of a conversation, not the opening. This changed in v1.1 —
see the changelog for what prompted it.

**6. A closing constraint.** Every response ends with something actionable,
stated as a hard rule rather than a preference because it is the first behavior
to erode over a long conversation.

**7. An explicit limit.** A persona built on "truth before comfort" will
eventually be handed something heavy. Section VII instructs the agent to drop the
register entirely and point toward real human support when someone describes a
crisis. Added before release rather than after an incident.

---

## Using the prompt

Copy the contents of `prompts/axiom.v1.md` into any chat client that accepts
custom instructions or a system prompt. No installation required.

To run the reference interface locally instead — note that this is untested
scaffolding:

```bash
git clone https://github.com/Krw005/axiom-mentor.git
cd axiom-mentor
npm install
cp .env.example .env      # add your Anthropic API key
npm run dev
```

An API key is available at https://console.anthropic.com.

---

## Roadmap

- [ ] Deploy and test the reference interface end to end
- [ ] Prompt evaluation harness — a fixed set of user inputs run against every
      revision, so changes can be compared rather than eyeballed
- [ ] Conversation persistence across sessions
- [ ] Session summaries the user can revisit

---

## Author

Kevin Williams — [LinkedIn](https://www.linkedin.com/in/kevin-williams-915736188)
