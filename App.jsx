import { useState, useRef, useEffect } from 'react';

/**
 * The four excavation questions from Section IV of the prompt. They are the
 * agent's method, so they double as the empty state — the screen tells you how
 * AXIOM thinks before you have said anything to it.
 */
const OPENERS = [
  {
    label: 'Whose goal is it',
    text: "I have a goal I keep circling but never start. Help me work out whether it's actually mine.",
  },
  {
    label: 'The real obstacle',
    text: "I know what's in my way externally. I'm less sure what's in my way internally. Help me name it.",
  },
  {
    label: 'What it asks of you',
    text: 'I want to become someone different than I am now. What would that actually require of me?',
  },
  {
    label: 'The cost of waiting',
    text: "I've been telling myself I'll start later. Show me what waiting is costing me.",
  },
];

export default function App() {
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, pending]);

  async function send(content) {
    const trimmed = content.trim();
    if (!trimmed || pending) return;

    const next = [...messages, { role: 'user', content: trimmed }];
    setMessages(next);
    setDraft('');
    setPending(true);
    setError(null);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        // Full history every turn — the API is stateless.
        body: JSON.stringify({ messages: next }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'The model could not be reached. Try again.');
        return;
      }

      setMessages([...next, { role: 'assistant', content: data.text }]);
    } catch {
      setError('The model could not be reached. Check that the server is running.');
    } finally {
      setPending(false);
    }
  }

  function onKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(draft);
    }
  }

  return (
    <div className="shell">
      <header className="masthead">
        <div className="mark" aria-hidden="true" />
        <div>
          <h1>AXIOM</h1>
          <p className="epigraph">Hold up the mirror. Light the path.</p>
        </div>
      </header>

      <main className="thread">
        {messages.length === 0 && (
          <section className="opening">
            <p className="opening-lead">
              Begin where you actually are. Not where you would prefer to be.
            </p>
            <div className="openers">
              {OPENERS.map((o) => (
                <button
                  key={o.label}
                  className="opener"
                  onClick={() => send(o.text)}
                >
                  <span className="opener-label">{o.label}</span>
                  <span className="opener-text">{o.text}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {messages.map((m, i) => (
          <article key={i} className={`turn turn--${m.role}`}>
            <span className="speaker">{m.role === 'user' ? 'You' : 'AXIOM'}</span>
            <div className="body">
              {m.content.split('\n').map((line, j) =>
                line.trim() ? <p key={j}>{line}</p> : null
              )}
            </div>
          </article>
        ))}

        {pending && (
          <article className="turn turn--assistant">
            <span className="speaker">AXIOM</span>
            <div className="body thinking">
              <span />
              <span />
              <span />
            </div>
          </article>
        )}

        {error && <p className="error">{error}</p>}

        <div ref={endRef} />
      </main>

      <footer className="composer">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="What are you actually working on?"
          rows={2}
          aria-label="Your message"
        />
        <button onClick={() => send(draft)} disabled={pending || !draft.trim()}>
          Send
        </button>
      </footer>
    </div>
  );
}
