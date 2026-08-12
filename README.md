# AXIOM — AI Mentor Agent

A conversational mentorship agent built on Claude, with a React interface and a
versioned prompt architecture.

AXIOM is designed around a specific thesis: most coaching tools give people
answers, and answers rarely change behavior. AXIOM is built to ask instead — to
surface the question behind the question, name the tension a person is avoiding,
and end every exchange with something that moves the feet.

> <img width="603" height="1311" alt="IMG_0065" src="https://github.com/user-attachments/assets/465e40f5-4306-4be1-89b9-8ef047d8f7cd" /> <img width="603" height="1311" alt="IMG_0067" src="https://github.com/user-attachments/assets/35c33c1f-9520-4381-941b-c9c4c319ebe5" />



> 

---

## What this is

| | |
|---|---|
| **Model** | Claude (Anthropic Messages API) |
| **Front end** | React 18 + Vite |
| **Server** | Express proxy — keeps the API key server-side |
| **Prompt** | Versioned in `prompts/`, changelogged, loaded at runtime |

---

## Architecture

```
Browser (React)
      |
      |  POST /api/chat   { messages: [...] }
      v
Express proxy (server/index.js)
      |  - holds ANTHROPIC_API_KEY (never sent to the browser)
      |  - loads the system prompt from prompts/axiom.v1.md
      |  - forwards conversation history to the API
      v
Anthropic Messages API
```

**Why the proxy exists.** A browser-only React app has nowhere safe to put an API
key — anything bundled into the client is readable by anyone who opens devtools,
and a leaked key is billable to whoever finds it. The Express layer holds the
credential server-side and exposes exactly one endpoint. It costs about forty
lines and it is the difference between a demo and something you could put in
front of real users.

**Why the prompt is a file, not a string in the code.** The prompt *is* the
product here. Keeping it in `prompts/` as versioned markdown means it can be
diffed, reviewed, and rolled back like any other source. `prompts/CHANGELOG.md`
records what changed and why, so a behavior regression can be traced to the
revision that caused it.

---

## Running it locally

```bash
git clone https://github.com/[HANDLE]/axiom-mentor.git
cd axiom-mentor
npm install

cp .env.example .env      # then add your Anthropic API key to .env

npm run dev               # starts the proxy on :3001 and Vite on :5173
```

Open http://localhost:5173.

You will need an Anthropic API key from https://console.anthropic.com.

---

## Prompt design

The full system prompt lives at [`prompts/axiom.v1.md`](prompts/axiom.v1.md).
Its structure, and the reasoning behind it:

**1. Identity before instruction.** The prompt opens by establishing who AXIOM is
rather than what it should do. Persona-first framing produces more consistent
voice across long conversations than a rule list does, because the model has a
stable thing to reason *from* instead of a checklist to satisfy.

**2. Explicit negative space.** "You are not a coach. Not a consultant. Not a
therapist." Naming what the agent is *not* prevents drift toward the generic
supportive-assistant register that these conversations otherwise collapse into.

**3. Named philosophical sources.** Kemetic wisdom traditions, the Hermetic
principles, James Allen's *As a Man Thinketh*, and Adam Grant's work on
rethinking and intellectual humility. These give the model a specific well to
draw from, which is what keeps the output from sounding like every other
motivational chatbot.

**4. A four-question excavation frame.** Every goal a user brings gets tested
against four questions: is this actually your goal, what is the real obstacle,
what would this require of you in identity rather than effort, and what is the
cost of not moving. This is the operational core — it converts a persona into a
repeatable method.

**5. A closing constraint.** Every response ends with something actionable.
Stated as a hard rule because it is the single behavior most likely to erode
over a long conversation.

---

## Roadmap

- [ ] Conversation persistence across sessions
- [ ] Prompt evaluation harness — a fixed set of user inputs run against each
      prompt revision, so changes can be compared rather than eyeballed
- [ ] Streaming responses
- [ ] Session summaries the user can revisit

---

## Author

Kevin Williams — [LinkedIn](https://www.linkedin.com/in/kevin-williams-915736188

)
