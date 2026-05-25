/* global React, ReactDOM */
const { useState, useEffect, useRef, useCallback, useMemo } = React;

/* ---------------- Data ---------------- */
const PROJECTS = [
  {
    id: 'fieldnotes',
    num: '01',
    title: 'Fieldnotes',
    tag: 'Editorial Platform',
    year: '2025',
    role: 'Lead Designer & Engineer',
    timeline: '8 months',
    swatch: 'var(--purple)',
    lede: 'A long-form publication for designers, built around the rhythm of slow reading and deep linking.',
    body: 'Fieldnotes is an indie publication for designers who think on paper before they think in pixels. I led the editorial system end-to-end — typesetting engine, citation graph, and a custom CMS that treats every essay as a node in a knowledge map. Subscriber growth: 0 → 12.4k in the first year.',
    stack: ['Next.js', 'MDX', 'Postgres', 'Stripe', 'Custom Type'],
    span: 'tall',
    shape: 'circle',
    link: 'fieldnotes.studio',
  },
  {
    id: 'kelp',
    num: '02',
    title: 'Kelp',
    tag: 'Mobile · iOS',
    year: '2024',
    role: 'Product Designer',
    timeline: '5 months',
    swatch: 'var(--green)',
    lede: 'A native iOS app that turns your camera roll into a private, searchable garden.',
    body: 'Kelp uses on-device ML to cluster photos by scene, mood, and color rather than by date. The interaction model is built around a vertical "stem" of weeks, with side branches you can prune. We shipped on the App Store with a featured spot in the Photography category.',
    stack: ['Swift', 'CoreML', 'SwiftUI', 'CloudKit'],
    span: 'half',
    shape: 'wave',
    link: 'kelp.app',
  },
  {
    id: 'undertow',
    num: '03',
    title: 'Undertow Records',
    tag: 'Brand · Web · Print',
    year: '2024',
    role: 'Creative Direction',
    timeline: '3 months',
    swatch: 'var(--maroon)',
    lede: 'Complete brand identity for an independent record label specializing in ambient and modular synthesis.',
    body: 'From the wordmark to a 96-page print catalog, every artifact is built off a single grid of tide tables. The site uses a generative cover system that responds to each release\'s waveform — no two product pages look the same.',
    stack: ['Brand', 'Type Design', 'WebGL', 'Print'],
    span: 'half',
    shape: 'triangle',
    link: 'undertow.fm',
  },
  {
    id: 'orbit',
    num: '04',
    title: 'Orbit OS',
    tag: 'Design System',
    year: '2023',
    role: 'Systems Lead',
    timeline: '14 months',
    swatch: 'var(--red)',
    lede: 'A design system adopted by 40+ product teams across a public B2B company.',
    body: 'Orbit consolidated three legacy systems into one tokenized library used by both web and native engineers. Tokens are authored once in Figma and shipped to React, SwiftUI, and Compose via a unified pipeline. Cut design review time by 64%.',
    stack: ['Figma', 'Tokens Studio', 'Style Dictionary', 'React', 'SwiftUI'],
    span: 'wide',
    shape: 'grid',
    link: 'github.com/orbit-os',
  },
  {
    id: 'meridian',
    num: '05',
    title: 'Meridian',
    tag: 'Tool · Web',
    year: '2023',
    role: 'Designer & Engineer',
    timeline: '2 months',
    swatch: 'var(--yellow)',
    lede: 'A browser-based timezone planner for distributed teams who hate calendar math.',
    body: 'Meridian started as a side project and now sees 30k WAU. The breakthrough was visualizing time as a horizontal river rather than a column of cells — you "fish" meetings out of overlapping waking-hour bands. Free, open source, no signup.',
    stack: ['SvelteKit', 'IndexedDB', 'D3', 'Vercel'],
    span: 'half',
    shape: 'sun',
    link: 'meridian.tools',
  },
  {
    id: 'cinder',
    num: '06',
    title: 'Cinder',
    tag: 'Game · Indie',
    year: '2022',
    role: 'UI & UX',
    timeline: '11 months',
    swatch: 'var(--purple)',
    lede: 'In-game interface for an award-winning narrative roguelike about memory and fire.',
    body: 'Designed every menu, HUD, and dialog in Cinder, a 2D roguelike that won the 2023 IGF Excellence in Narrative award. The UI is rendered entirely in the game engine and animates in response to the player\'s heartbeat (read from any compatible wearable).',
    stack: ['Godot', 'GDScript', 'Custom Shaders'],
    span: 'half',
    shape: 'spark',
    link: 'playcinder.com',
  },
];

const SKILLS = [
  { title: 'Design', swatch: 'var(--yellow)', items: ['Product · UX · UI', 'Brand & Identity', 'Type Design', 'Motion & Interaction', 'Design Systems'] },
  { title: 'Engineering', swatch: 'var(--green)', items: ['TypeScript · React', 'Swift · SwiftUI', 'Node · Postgres', 'WebGL · Shaders', 'Figma Plugin API'] },
  { title: 'Direction', swatch: 'var(--red)', items: ['Creative Direction', 'Editorial', 'Workshops', 'Mentorship', 'Speaking & Writing'] },
];

/* ---------------- SVG shapes ---------------- */
const Shape = ({ kind, size = 240, opacity = 0.25 }) => {
  const base = { width: size, height: size, fill: 'currentColor', opacity };
  switch (kind) {
    case 'circle':
      return <svg viewBox="0 0 100 100" style={base}><circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" /></svg>;
    case 'wave':
      return <svg viewBox="0 0 100 100" style={base}><path d="M0 60 Q 25 30, 50 60 T 100 60 V100 H0 Z" /></svg>;
    case 'triangle':
      return <svg viewBox="0 0 100 100" style={base}><polygon points="50,8 92,86 8,86" fill="none" stroke="currentColor" strokeWidth="2" /></svg>;
    case 'grid':
      return <svg viewBox="0 0 100 100" style={base}>{Array.from({length: 5}).map((_,i)=> <g key={i}><line x1="0" y1={i*25} x2="100" y2={i*25} stroke="currentColor" strokeWidth="1.5"/><line y1="0" x1={i*25} y2="100" x2={i*25} stroke="currentColor" strokeWidth="1.5"/></g>)}</svg>;
    case 'sun':
      return <svg viewBox="0 0 100 100" style={base}><circle cx="50" cy="50" r="22" /><g stroke="currentColor" strokeWidth="3">{Array.from({length:12}).map((_,i)=>{const a=(i*30)*Math.PI/180; const x1=50+30*Math.cos(a); const y1=50+30*Math.sin(a); const x2=50+44*Math.cos(a); const y2=50+44*Math.sin(a); return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}/>})}</g></svg>;
    case 'spark':
      return <svg viewBox="0 0 100 100" style={base}><path d="M50 5 L58 42 L95 50 L58 58 L50 95 L42 58 L5 50 L42 42 Z" /></svg>;
    default:
      return null;
  }
};

const Star = ({ size = 56, color }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} style={{ color: color || 'currentColor' }}>
    <path d="M50 5 L58 42 L95 50 L58 58 L50 95 L42 58 L5 50 L42 42 Z" fill="currentColor" />
  </svg>
);

const Arrow = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

/* ---------------- Cursor ---------------- */
function Cursor() {
  const blobRef = useRef(null);
  const dotRef = useRef(null);
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const blob = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [hot, setHot] = useState(false);

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
      }
      const t = e.target;
      const isHot = !!(t && t.closest && t.closest('a, button, [data-hot]'));
      setHot(isHot);
    };
    window.addEventListener('mousemove', onMove);

    let raf;
    const tick = () => {
      blob.current.x += (mouse.current.x - blob.current.x) * 0.12;
      blob.current.y += (mouse.current.y - blob.current.y) * 0.12;
      if (blobRef.current) {
        blobRef.current.style.transform = `translate(${blob.current.x}px, ${blob.current.y}px) translate(-50%,-50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={blobRef} className="cursor-blob" />
      <div ref={dotRef} className={`cursor-dot${hot ? ' is-hot' : ''}`} />
    </>
  );
}

/* ---------------- Reveal-on-scroll ---------------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach((e) => e.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
}

/* ---------------- Hero ---------------- */
function Hero({ name, role, location, statement, available }) {
  const letters = useMemo(() => name.split(''), [name]);
  return (
    <section className="hero" data-screen-label="01 Hero" id="top">
      <div className="hero-meta reveal">
        <div>Portfolio · 2026 <span>v.04 · Updated May</span></div>
        <div>Currently <span>{role}</span></div>
        <div>Based in <span>{location}</span></div>
      </div>

      <div className="hero-title-wrap">
        <div className="hero-title-row">
          <span className="hero-title">
            {letters.slice(0, Math.ceil(letters.length / 2)).map((c, i) => (
              <span className="letter" key={i} data-hot>{c === ' ' ? '\u00A0' : c}</span>
            ))}
          </span>
        </div>
        <div className="hero-title-row right">
          <Star size={92} color="var(--accent)" />
          <span className="hero-title">
            {letters.slice(Math.ceil(letters.length / 2)).map((c, i) => (
              <span className="letter" key={i} data-hot>{c === ' ' ? '\u00A0' : c}</span>
            ))}
          </span>
        </div>
      </div>

      <div className="hero-foot reveal">
        <p className="hero-statement">
          {statement.split('—').map((p, i, arr) => (
            <React.Fragment key={i}>
              {i > 0 && <em> — </em>}
              {p}
            </React.Fragment>
          ))}
        </p>
        <div className="hero-cta">
          <a className="btn" href="#projects" data-hot>
            See selected work <span className="arrow"><Arrow /></span>
          </a>
          {available && <span className="btn-outline" data-hot>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 8px var(--green)' }} />
            Open for Q3 collaborations
          </span>}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Marquee ---------------- */
function Marquee({ words, reverse }) {
  const items = [...words, ...words, ...words];
  return (
    <div className={`marquee${reverse ? ' reverse' : ''}`}>
      <div className="marquee-track">
        {items.map((w, i) => (
          <span key={i} className={`marquee-item${i % 2 === 1 ? ' outline' : ''}`}>
            {w}
            <Star size={48} color="var(--accent)" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- About ---------------- */
function About({ name, role, location }) {
  return (
    <section className="section" data-screen-label="02 About" id="about">
      <div className="container">
        <div className="section-head reveal">
          <span className="section-num">— 01 / About</span>
          <h2 className="section-title">A designer who <em>writes code</em>, an engineer who <em>sweats kerning</em>.</h2>
        </div>
        <div className="about-grid">
          <div className="about-text reveal">
            <p>
              I'm {name.split(' ')[0]}, a <span className="h">multidisciplinary designer & engineer</span> based in {location}. I work at the seam between systems thinking and editorial craft — building products that are <span className="green">precise</span>, <span className="purple">considered</span>, and <span className="red">unmistakably opinionated</span>.
            </p>
            <p>
              Past lives: design lead at a 200-person SaaS, principal at a two-person studio, and a long detour into independent type design. Currently consulting and shipping a publication on the side.
            </p>
            <p>
              I'm at my best on small teams that want to ship beautiful, ambitious things — not pixel-pushing committees.
            </p>
          </div>
          <div className="about-side">
            <div className="stat-card reveal" style={{ '--swatch': 'var(--yellow)' }} data-hot>
              <div className="num">9<span style={{ color: 'inherit', opacity: 0.4, fontWeight: 700 }}>yr</span></div>
              <div className="label">Designing & shipping product</div>
            </div>
            <div className="stat-card reveal" style={{ '--swatch': 'var(--green)' }} data-hot>
              <div className="num">42</div>
              <div className="label">Products & brands shipped</div>
            </div>
            <div className="stat-card reveal" style={{ '--swatch': 'var(--purple)' }} data-hot>
              <div className="num">3</div>
              <div className="label">Awards · IGF, Awwwards, ADC</div>
            </div>
            <div className="stat-card reveal" style={{ '--swatch': 'var(--red)' }} data-hot>
              <div className="num">∞</div>
              <div className="label">Cups of coffee</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Skills ---------------- */
function Skills() {
  return (
    <section className="section" data-screen-label="03 Skills" id="skills" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="section-head reveal">
          <span className="section-num">— 02 / Toolkit</span>
          <h2 className="section-title">Tools I reach for, <em>without thinking</em>.</h2>
        </div>
        <div className="skills reveal">
          {SKILLS.map((s) => (
            <div key={s.title} className="skill-block" style={{ '--swatch': s.swatch }} data-hot>
              <h3>{s.title}</h3>
              <ul>{s.items.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Projects ---------------- */
function ProjectCard({ p, layoutMode, onOpen, index }) {
  const ref = useRef(null);
  const onMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width) * 100;
    const my = ((e.clientY - rect.top) / rect.height) * 100;
    ref.current.style.setProperty('--mx', mx + '%');
    ref.current.style.setProperty('--my', my + '%');
  };

  let cls = 'project';
  if (layoutMode === 'mosaic') {
    if (p.span === 'tall') cls += ' tall';
    else if (p.span === 'wide') cls += ' wide';
  } else if (layoutMode === 'thirds') {
    cls += ' third';
  }

  return (
    <article
      ref={ref}
      className={`${cls} reveal`}
      style={{ '--swatch': p.swatch, animationDelay: `${Math.min(index * 80, 480)}ms` }}
      onMouseMove={onMove}
      onClick={() => onOpen(p.id)}
      data-hot
    >
      <div className="project-mini-grid">
        {Array.from({ length: 48 }).map((_, i) => <div key={i} />)}
      </div>
      <Shape kind={p.shape} size={300} opacity={0.18} />
      <div style={{ position: 'absolute', top: -40, right: -40, opacity: 0.22, transform: 'rotate(8deg)' }}>
        <Shape kind={p.shape} size={260} opacity={1} />
      </div>

      <div className="project-head">
        <span className="project-num">/ {p.num}</span>
        <span className="project-year">{p.year}</span>
      </div>

      <div className="project-body">
        <span className="project-tag">{p.tag}</span>
        <h3 className="project-title">{p.title}</h3>
        <p className="project-desc">{p.lede}</p>
      </div>

      <div className="project-foot">
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 500, opacity: 0.7 }}>{p.role}</span>
        <span className="project-cta">View case <Arrow size={14} /></span>
      </div>
    </article>
  );
}

function Projects({ layoutMode, onOpen }) {
  return (
    <section className="section" data-screen-label="04 Projects" id="projects">
      <div className="container">
        <div className="section-head reveal">
          <span className="section-num">— 03 / Selected work</span>
          <h2 className="section-title">Six things I'm <em>proud</em> of.</h2>
        </div>
        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} p={p} index={i} layoutMode={layoutMode} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Modal ---------------- */
function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  const p = project;
  return (
    <div className={`modal-backdrop${p ? ' open' : ''}`} onClick={onClose}>
      {p && (
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6l-12 12"/></svg>
          </button>
          <div className="modal-cover" style={{ '--swatch': p.swatch, background: p.swatch }}>
            <div style={{ position: 'absolute', top: -40, right: -40, color: '#fff', opacity: 0.35 }}>
              <Shape kind={p.shape} size={320} opacity={1} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, opacity: 0.85, letterSpacing: '0.06em' }}>{p.tag.toUpperCase()}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, opacity: 0.85 }}>/ {p.num}</span>
            </div>
            <h3 className="modal-cover-title">{p.title}</h3>
            <div className="modal-cover-meta">
              <div>Year<strong>{p.year}</strong></div>
              <div>Role<strong>{p.role}</strong></div>
              <div>Timeline<strong>{p.timeline}</strong></div>
              <div>Status<strong>Shipped · Live</strong></div>
            </div>
          </div>
          <div className="modal-body">
            <div>
              <div className="modal-section-label">The work</div>
              <h2>{p.lede}</h2>
            </div>
            <p className="body-copy">{p.body}</p>
            <div>
              <div className="modal-section-label">Stack & disciplines</div>
              <div className="row">{p.stack.map((s) => <span key={s} className="chip">{s}</span>)}</div>
            </div>
            <div className="modal-links">
              <a className="btn" href="#" data-hot onClick={(e)=>e.preventDefault()}>Visit {p.link} <span className="arrow"><Arrow/></span></a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- Contact ---------------- */
function Contact({ email, socials }) {
  const words = "Let's make something good".split(' ');
  return (
    <section className="contact" data-screen-label="05 Contact" id="contact">
      <div className="contact-eyebrow reveal">— 04 / Contact</div>
      <h2 className="contact-title reveal">
        {words.map((w, i) => <span key={i} className="word" data-hot>{w}&nbsp;</span>)}
      </h2>
      <a className="contact-email reveal" href={`mailto:${email}`} data-hot>
        {email} <Arrow size={20} />
      </a>
      <div className="socials reveal">
        {socials.map((s) => (
          <a key={s.label} className="social" href={s.href} data-hot>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.color }} />
            {s.label}
          </a>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Top bar / Theme toggle ---------------- */
function TopBar({ theme, onToggleTheme }) {
  return (
    <header className="topbar">
      <div className="topbar-mark"><span className="dot" /> MAYA / CHEN</div>
      <nav className="topbar-nav">
        <a href="#about" data-hot>About</a>
        <a href="#projects" data-hot>Work</a>
        <a href="#skills" data-hot>Toolkit</a>
        <a href="#contact" data-hot>Contact</a>
      </nav>
      <div className="topbar-right">
        <div className="topbar-status">
          <span className="pip" /> Available · Q3
        </div>
        <button className="theme-toggle" onClick={onToggleTheme} aria-label="Toggle theme" data-hot>
          <span className="puck" />
        </button>
      </div>
    </header>
  );
}

function ThemeToggle() { return null; /* moved into TopBar */ }

/* ---------------- App ---------------- */
function App() {
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "theme": "dark",
    "accent": "#F0C808",
    "motion": 1,
    "layout": "mosaic",
    "cursor": true
  }/*EDITMODE-END*/;

  const [t, setTweak] = window.useTweaks(TWEAK_DEFAULTS);

  const [openId, setOpenId] = useState(null);
  const openProject = useMemo(() => PROJECTS.find((p) => p.id === openId), [openId]);

  useReveal();

  // Apply tweaks
  useEffect(() => {
    document.documentElement.style.setProperty('--motion', t.motion);
    document.documentElement.style.setProperty('--accent', t.accent);
    // Accent ink: if yellow, use dark; else use white
    const lightAccents = ['#f0c808'];
    const accentInk = lightAccents.includes(String(t.accent).toLowerCase()) ? '#0B0B0C' : '#FFFFFF';
    document.documentElement.style.setProperty('--accent-ink', accentInk);
    document.documentElement.setAttribute('data-theme', t.theme);
    document.body.style.cursor = t.cursor ? 'none' : 'auto';
  }, [t.motion, t.accent, t.theme, t.cursor]);

  const accentOptions = ['#F0C808', '#DD1C1A', '#317B22', '#783F8E', '#89043D'];

  const socials = [
    { label: 'github / mayachen', href: '#', color: 'var(--green)' },
    { label: 'twitter / @mayadraws', href: '#', color: 'var(--red)' },
    { label: 'read.cv / maya', href: '#', color: 'var(--purple)' },
    { label: 'linkedin / mayachen', href: '#', color: 'var(--yellow)' },
  ];

  return (
    <>
      {t.cursor && <Cursor />}
      <TopBar theme={t.theme} onToggleTheme={() => setTweak('theme', t.theme === 'dark' ? 'light' : 'dark')} />

      <div className="shell">
        <Hero
          name="MAYA CHEN"
          role="Independent design & code"
          location="Brooklyn, NY"
          statement="I design and build digital products that take craft seriously — from native iOS apps to editorial platforms. Lately: focusing on tools for thinking, indie publishing, and small teams that ship."
          available
        />

        <Marquee words={['DESIGN', 'CODE', 'TYPE', 'BRAND', 'MOTION', 'PRODUCT']} />

        <About name="Maya Chen" role="Independent design & code" location="Brooklyn, NY" />

        <Skills />

        <Marquee reverse words={['SELECTED · WORK', '2022 — 2025', 'INDEPENDENT', 'TAKE A LOOK']} />

        <Projects layoutMode={t.layout} onOpen={setOpenId} />

        <Contact email="hello@mayachen.studio" socials={socials} />

        <footer>
          <div>© 2026 Maya Chen · All rights reserved</div>
          <div>Built with care · No frameworks were harmed</div>
          <div>↑ <a href="#top" data-hot>Back to top</a></div>
        </footer>
      </div>

      <ProjectModal project={openProject} onClose={() => setOpenId(null)} />

      {/* Tweaks panel */}
      <window.TweaksPanel title="Tweaks">
        <window.TweakSection label="Theme" />
        <window.TweakRadio label="Mode" value={t.theme} onChange={(v) => setTweak('theme', v)} options={[{ label: 'Dark', value: 'dark' }, { label: 'Light', value: 'light' }]} />
        <window.TweakColor label="Accent" value={t.accent} onChange={(v) => setTweak('accent', v)} options={accentOptions} />
        <window.TweakSection label="Motion" />
        <window.TweakSlider label="Intensity" value={t.motion} onChange={(v) => setTweak('motion', v)} min={0.2} max={2.5} step={0.1} unit="×" />
        <window.TweakToggle label="Custom cursor" value={t.cursor} onChange={(v) => setTweak('cursor', v)} />
        <window.TweakSection label="Projects layout" />
        <window.TweakRadio label="Grid" value={t.layout} onChange={(v) => setTweak('layout', v)} options={[{ label: 'Mosaic', value: 'mosaic' }, { label: 'Even', value: 'even' }, { label: 'Thirds', value: 'thirds' }]} />
      </window.TweaksPanel>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
