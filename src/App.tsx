import { useState } from 'react'
import type { FormEvent, MouseEvent } from 'react'
import './App.css'
import logo from './assets/keruvva-logo.png'
import heroVideo from './assets/keruvva-hero.mp4'
import heroPoster from './assets/keruvva-hero-poster.png'
import participationGapImage from './assets/citypeople.jpg';

const stages = [
  ['01', 'MAP', 'Represent physical environments digitally.'],
  ['02', 'UNDERSTAND', 'Combine spatial, project and contextual information.'],
  ['03', 'COORDINATE', 'Connect institutions, opportunities and participants.'],
  ['04', 'VERIFY', 'Capture evidence that real-world actions occurred.'],
  ['05', 'MEASURE', 'Turn participation into measurable outcomes.']
]
const applications = [
  ['01', 'URBAN DEVELOPMENT', 'Coordinate participation around physical development projects.', 'Connected planning and real-world activity.'],
  ['02', 'INFRASTRUCTURE', 'Bring projects, places, evidence and stakeholders into one view.', 'Greater visibility across complex delivery.'],
  ['03', 'SUSTAINABILITY', 'Make environmental action legible, participatory and measurable.', 'A clearer path from intent to impact.'],
  ['04', 'GOVERNMENT', 'Create an operational layer for public initiatives and feedback.', 'More context around public action.'],
  ['05', 'ENTERPRISE', 'Coordinate place-based programmes across distributed teams.', 'Shared intelligence for institutional work.'],
  ['06', 'CAMPUSES & DISTRICTS', 'Connect the people, assets and projects that shape a place.', 'A more responsive operating environment.']
]
const layers = [
  "BUILDINGS",
  "INFRASTRUCTURE",
  "PROJECTS",
  "PEOPLE",
  "ENVIRONMENT",
  "EVENTS",
];
function track(event: string) { window.dispatchEvent(new CustomEvent('keruvva:analytics', { detail: { event } })) }

export default function App() {
  const [menu, setMenu] = useState(false); const [modal, setModal] = useState(false); const [sent, setSent] = useState(false); const [duplicate, setDuplicate] = useState(false); const [submitting, setSubmitting] = useState(false); const [formError, setFormError] = useState(''); const [inviteCopied, setInviteCopied] = useState(false); const [layer, setLayer] = useState('PROJECT')
  const openAccess = () => { track('early_access_started'); setModal(true); setSent(false); setDuplicate(false); setFormError(''); setInviteCopied(false); setMenu(false) }
  const scrollToSection = (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault()
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    setMenu(false)
  }
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setSubmitting(true); setFormError('')
    const form = new FormData(event.currentTarget)
    const response = await fetch('/api/early-access', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: form.get('email'), organizationRole: form.get('organizationRole') }) }).catch(() => null)
    setSubmitting(false)
    if (!response?.ok) {
      const result = await response?.json().catch(() => null)
      if (response?.status === 409) { setDuplicate(true); return }
      setFormError(result?.error ?? 'We could not save your request. Please try again.')
      return
    }
    track('early_access_submitted'); setSent(true)
  }
  return <main>
    <section className={`hero ${menu ? 'menu-open' : ''}`} id="top">
      <div className="hero-fallback" />
      <video className="hero-video" autoPlay muted loop playsInline preload="auto" poster={heroPoster}>
        <source src={heroVideo} type="video/mp4" />
      </video>
      <nav className="nav" aria-label="Main navigation">
        <a className="wordmark" href="#top" onClick={event => scrollToSection(event, 'top')}>
          <img src={logo} alt="Keruvva" />
        </a>
      <button className="menu-toggle" type="button" aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? 'CLOSE ×' : 'MENU ＋'}</button>
      <div className={`nav-links ${menu ? 'open' : ''}`}>
        <a href="#platform" onClick={event => scrollToSection(event, 'platform')}>Platform</a><a href="#technology" onClick={event => scrollToSection(event, 'technology')}>Technology</a><a href="#applications" onClick={event => scrollToSection(event, 'applications')}>Applications</a><a href="#vision" onClick={event => scrollToSection(event, 'vision')}>Vision</a><a href="#about" onClick={event => scrollToSection(event, 'about')}>About</a><button className="nav-cta" type="button" onClick={openAccess}>Get early access ↗</button></div></nav>
    </section>
  <section className="hero-copy">
  <div className="wrap hero-copy-layout">
    <div className="hero-copy-content">
      <p className="eyebrow">DISCOVER AND INTERACT WITH<br /> THE DIGITAL TWIN OF YOUR WORLD</p>
      <h1>
        BUILD<br />
        <em>YOUR </em>WORLD
      </h1>

      <p className="hero-copy-message">
        Keruvva turns real places into living, interactive digital environments
        where people can explore what is happening around them, discover
        opportunities to participate, and help shape what happens next.
      </p>

      <button
        className="button button-primary"
        type="button"
        onClick={openAccess}
      >
        Get early access ↗
      </button>
    </div>

    <div
      className="city-scene"
      aria-label="Interactive digital twin of a city assembling block by block"
      role="img"
    >
      <div className="city-skyline" />

      <div className="city-ground">
        <span className="terrain-hill hill-one" />
        <span className="terrain-hill hill-two" />
      </div>

      <div className="city-roads">
        <span className="city-road road-main" />
        <span className="city-road road-branch" />
        <span className="city-road road-cross" />
      </div>

      <div className="city-buildings">
        {Array.from({ length: 12 }, (_, index) => (
          <span
            className={`city-block block-${index + 1}`}
            key={index}
          />
        ))}
      </div>

      <div className="city-trees">
        {Array.from({ length: 10 }, (_, index) => (
          <span
            className={`city-tree tree-${index + 1}`}
            key={index}
          >
            <i />
            <b />
          </span>
        ))}
      </div>
    </div>
  </div>
</section>
    <section className="north-star" aria-labelledby="north-star-title">
  <div className="wrap north-star-layout">
    <div className="north-star-intro">
      <p className="eyebrow">THE KERUVVA NORTH STAR</p>

      <h2 id="north-star-title">
        From reality<br />
        to <em>impact.</em>
      </h2>

      <p>
        Keruvva creates a living digital twin of the physical world,
        connecting places, people, projects and organisations through an
        interactive layer built for real-world participation.
      </p>
    </div>

    <div
      className="participation-loop"
      aria-label="Real world to digital twin to participation to measurable impact feedback loop"
    >
      <div className="loop-line" />

      <article>
        <span>01</span>
        <strong>THE PHYSICAL WORLD</strong>
        <small>Places, people, assets, projects and context</small>
      </article>

      <article>
        <span>02</span>
        <strong>THE DIGITAL TWIN</strong>
        <small>A living, interactive representation of reality</small>
      </article>

      <article>
        <span>03</span>
        <strong>PEOPLE PARTICIPATE</strong>
        <small>Explore, contribute, collaborate and act</small>
      </article>

      <article>
        <span>04</span>
        <strong>KERUVVA COORDINATES</strong>
        <small>Connect people, projects and organisations and verify participation</small>
      </article>

      <article>
        <span>05</span>
        <strong>REAL-WORLD IMPACT</strong>
        <small>Participation becomes visible, measurable and connected to outcomes</small>
      </article>
    </div>
  </div>
</section>
<section className="section architecture" id="platform">
  <div className="wrap">
    <div className="section-intro">
      <p className="eyebrow">01 / THE SYSTEM</p>
      <h2>
        The physical world is full of signals.
        <br />
        <span>Keruvva turns them into action.</span>
      </h2>
      <p>
        Keruvva connects the physical world to its digital twin, then gives
        people and organisations the intelligence, participation and
        verification layers needed to turn intent into coordinated,
        measurable action.
      </p>
    </div>

    <div
      className="system-stack"
      aria-label="Keruvva platform architecture"
    >
      {[
        {
          number: "01",
          title: "PHYSICAL WORLD",
          description:
            "Cities, campuses, infrastructure, places and context",
        },
        {
          number: "02",
          title: "DIGITAL TWIN",
          description:
            "A living digital representation of the real world",
        },
        {
          number: "03",
          title: "INTELLIGENCE",
          description:
            "AI interprets context, opportunities and activity",
        },
        {
          number: "04",
          title: "PARTICIPATION",
          description:
            "People discover, interact, contribute and collaborate",
        },
        {
          number: "05",
          title: "VERIFICATION",
          description:
            "Activity and contributions become trusted evidence",
        },
        {
          number: "06",
          title: "REAL-WORLD ACTION",
          description:
            "Coordinated participation produces measurable outcomes",
        },
      ].map((item, i, items) => (
        <div
          className={`system-node system-node-${i + 1}`}
          key={item.title}
        >
          <span>{item.number}</span>

          <div className="system-node-copy">
            <b>{item.title}</b>
            <small>{item.description}</small>
          </div>

          {i < items.length - 1 && (
            <i className="system-arrow" aria-hidden="true">
              ↓
            </i>
          )}

          <div className="system-signal" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>
      ))}
    </div>

    <div
      className="system-feedback"
      aria-hidden="true"
    >
      <span className="feedback-particle particle-one" />
      <span className="feedback-particle particle-two" />
      <span className="feedback-particle particle-three" />
    </div>
  </div>
</section>
<section className="section gap-section" id="vision">
  <img
    className="gap-background-image"
    src={participationGapImage}
    alt=""
    aria-hidden="true"
  />

  <div className="gap-background-overlay" aria-hidden="true" />

  <div className="wrap">
    <p className="eyebrow">02 / THE PARTICIPATION GAP</p>

    <div className="gap-layout">
      <h2>
        Intent <span>→</span> coordination
        <br />
        <span>→</span> action <span>→</span> verification
        <br />
        <span>→</span> impact
      </h2>

      <div className="gap-copy">
        <p>
          Institutions can define projects. People can express interest.
          Sensors can describe environments. AI can generate recommendations.
        </p>

        <p>
          But the systems connecting these signals are often fragmented,
          leaving a gap between what is planned, what people do, and what
          actually changes on the ground.
        </p>

        <strong>
          Keruvva is being built to close that gap.
        </strong>
      </div>
    </div>

    <div className="gap-signal" aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
  </div>
</section>
<section className="section twin-section" id="technology">
  <div className="wrap">
    <div className="section-intro split">
      <div>
        <p className="eyebrow">03 / DIGITAL TWIN</p>

        <h2>
          A digital twin that
          <br />
          does <em>more</em> than represent.
        </h2>
      </div>

      <p>
        Keruvva turns places into interactive digital environments where
        physical context, projects, infrastructure, people, data and
        opportunities can exist in one continuously evolving system.
      </p>
    </div>

    <div className="twin-visual">
  <div className="twin-console">

    {/* DIGITAL TWIN VIEW */}
    <div className="twin-map">

      <div className="map-header">
        <div>
          <span className="live-dot" />
          <span>KERUVVA DIGITAL TWIN</span>
        </div>

        <small>CALGARY · AB</small>
      </div>

      {/* Stylised city/map layer */}
      <div className="city-map" aria-hidden="true">

        <div className="map-river" />

        <div className="map-road road-a" />
        <div className="map-road road-b" />
        <div className="map-road road-c" />
        <div className="map-road road-d" />
        <div className="map-road road-e" />

        <div className="map-district district-one" />
        <div className="map-district district-two" />
        <div className="map-district district-three" />

        {/* Dynamic markers */}
        <div className={`map-marker marker-one ${layer === "BUILDINGS" ? "visible active" : ""}`}>
          <span />
        </div>

        <div className={`map-marker marker-two ${layer === "INFRASTRUCTURE" ? "visible active" : ""}`}>
          <span />
        </div>

        <div className={`map-marker marker-three ${layer === "PROJECTS" ? "visible active" : ""}`}>
          <span />
        </div>

        <div className={`map-marker marker-four ${layer === "PEOPLE" ? "visible active" : ""}`}>
          <span />
        </div>

        <div className={`map-marker marker-five ${layer === "ENVIRONMENT" ? "visible active" : ""}`}>
          <span />
        </div>

        <div className={`map-marker marker-six ${layer === "EVENTS" ? "visible active" : ""}`}>
          <span />
        </div>

        {/* Scanning effect */}
        <div className="map-scan" />
      </div>

      <div className="map-footer">
        <span>LIVE CONTEXT</span>
        <span>51.0447° N · 114.0719° W</span>
      </div>
    </div>


    {/* LAYER CONTROLS */}
    <div className="layer-panel">

      <div className="layer-panel-header">
        <p className="eyebrow">ENVIRONMENT LAYERS</p>
        <span>INTERACTIVE</span>
      </div>

      {layers.map((item) => (
        <button
          className={layer === item ? "active" : ""}
          key={item}
          type="button"
          onMouseEnter={() => setLayer(item)}
          onFocus={() => setLayer(item)}
          onClick={() => setLayer(item)}
        >
          <span className="layer-indicator" />
          <strong>{item}</strong>
          <b>{layer === item ? "ACTIVE" : "VIEW"}</b>
        </button>
      ))}

      <div className="layer-readout">
        <small>ACTIVE LAYER</small>

        <strong>{layer}</strong>

        <span>
          {layer === "BUILDINGS" &&
            "Buildings, occupancy and spatial context"}

          {layer === "INFRASTRUCTURE" &&
            "Roads, assets, services and infrastructure status"}

          {layer === "PROJECTS" &&
            "Active initiatives and opportunities for participation"}

          {layer === "PEOPLE" &&
            "Participation, activity and community signals"}

          {layer === "ENVIRONMENT" &&
            "Environmental conditions and local indicators"}

          {layer === "EVENTS" &&
            "Live events, activities and local opportunities"}
        </span>
      </div>
    </div>
  </div>


  {/* DYNAMIC INTELLIGENCE PANEL */}
  <div className="twin-data-panel">

    <div className="twin-data-heading">
      <div>
        <span className="live-dot" />
        LIVE DIGITAL CONTEXT
      </div>

      <span>CALGARY / 01</span>
    </div>


    {/* BUILDINGS */}
    {layer === "BUILDINGS" && (
      <div className="twin-data-content">
        <small>SPATIAL INTELLIGENCE</small>

        <h3>
          Buildings become
          <em> interactive.</em>
        </h3>

        <p>
          A digital representation can expose building context,
          occupancy, activity and opportunities connected to a place.
        </p>

        <div className="twin-metrics">
          <div>
            <strong>128</strong>
            <span>Mapped assets</span>
          </div>

          <div>
            <strong>42</strong>
            <span>Active spaces</span>
          </div>

          <div>
            <strong>17</strong>
            <span>Open opportunities</span>
          </div>
        </div>
      </div>
    )}


    {/* INFRASTRUCTURE */}
    {layer === "INFRASTRUCTURE" && (
      <div className="twin-data-content">
        <small>INFRASTRUCTURE INTELLIGENCE</small>

        <h3>
          See what needs
          <em> attention.</em>
        </h3>

        <p>
          Infrastructure becomes a living layer that can expose
          conditions, activity, maintenance signals and intervention
          opportunities.
        </p>

        <div className="twin-status-list">
          <div>
            <span className="status-warning" />
            Road maintenance
            <b>3 signals</b>
          </div>

          <div>
            <span className="status-live" />
            Public infrastructure
            <b>12 active</b>
          </div>

          <div>
            <span className="status-live" />
            Mobility network
            <b>98% available</b>
          </div>
        </div>
      </div>
    )}


    {/* PROJECTS */}
    {layer === "PROJECTS" && (
      <div className="twin-data-content">
        <small>PARTICIPATION OPPORTUNITIES</small>

        <h3>
          Projects become
          <em> discoverable.</em>
        </h3>

        <p>
          Organisations can place real initiatives directly into the
          digital environment, where people can discover and participate.
        </p>

        <div className="project-card">
          <div>
            <span>OPEN</span>
            <strong>Neighbourhood Greening</strong>
          </div>

          <small>12 participants · 3.4 km away</small>

          <button type="button">
            Explore project ↗
          </button>
        </div>
      </div>
    )}


    {/* PEOPLE */}
    {layer === "PEOPLE" && (
      <div className="twin-data-content">
        <small>PARTICIPATION SIGNALS</small>

        <h3>
          People become
          <em> part of the system.</em>
        </h3>

        <p>
          Participation is no longer hidden inside forms, apps or
          disconnected platforms. Activity becomes part of the place.
        </p>

        <div className="participation-visual">
          <div>
            <strong>247</strong>
            <span>People active</span>
          </div>

          <div className="participation-bars">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
    )}


    {/* ENVIRONMENT */}
    {layer === "ENVIRONMENT" && (
      <div className="twin-data-content">
        <small>ENVIRONMENTAL CONTEXT</small>

        <h3>
          Context changes
          <em> what is possible.</em>
        </h3>

        <p>
          Environmental conditions become part of the digital twin,
          helping people and organisations understand the context around
          real-world activity.
        </p>

        <div className="environment-readout">
          <div>
            <strong>LIVE</strong>
            <span>Environmental context</span>
          </div>

          <div>
            <strong>24</strong>
            <span>Active indicators</span>
          </div>
        </div>
      </div>
    )}


    {/* EVENTS */}
    {layer === "EVENTS" && (
      <div className="twin-data-content">
        <small>LIVE LOCAL ACTIVITY</small>

        <h3>
          Places become
          <em> alive with activity.</em>
        </h3>

        <p>
          Events, activities and opportunities can exist directly inside
          the digital representation of a place.
        </p>

        <div className="event-feed">
          <div>
            <span>NOW</span>
            <strong>Community activity</strong>
            <small>East Village · 84 participants</small>
          </div>

          <div>
            <span>18:30</span>
            <strong>Local sustainability event</strong>
            <small>Downtown · Open participation</small>
          </div>
        </div>
      </div>
    )}
  </div>
</div>
  </div>
</section>
<section className="section intelligence">
  <div className="wrap">
    <p className="eyebrow">04 / INFRASTRUCTURE INTELLIGENCE</p>

    <div className="intelligence-head">
      <h2>
        A digital twin becomes powerful when it
        <br />
        becomes <em>intelligent.</em>
      </h2>

      <p>
        Keruvva brings environmental context, institutional objectives,
        human participation, project data and verification into the same
        operating environment—allowing the system to surface connections,
        opportunities and actions.
      </p>
    </div>

    <div className="equation">
      <div className="equation-inputs">
        {[
          "DATA",
          "ENVIRONMENT",
          "AI",
          "PEOPLE",
          "PROJECTS",
          "VERIFICATION",
        ].map((x) => (
          <span key={x}>{x}</span>
        ))}
      </div>

      <b>=</b>
      <strong>
        INFRASTRUCTURE
        <br />
        INTELLIGENCE
      </strong>
    </div>
  </div>
</section> 
<section className="section process">
  <div className="wrap">
    <div className="section-intro split">
      <div>
        <p className="eyebrow">05 / HOW IT WORKS</p>

        <h2>
          A system designed
          <br />
          for the <em>real world.</em>
        </h2>
      </div>

      <p>
        Five connected stages create a continuous loop between context,
        participation, verification and consequence.
      </p>
    </div>

    <div className="stage-list">
      {stages.map(([n, title, text]) => (
        <article className="stage" key={n}>
          <span>{n}</span>

          <div className="stage-content">
            <h3>{title}</h3>
            <p>{text}</p>
          </div>

          <i aria-hidden="true">↗</i>

          <div className="stage-progress" aria-hidden="true" />
        </article>
      ))}
    </div>
  </div>
</section>
    <section className="section product-section">
      <div className="wrap">
        <div className="product-kicker">
          <p className="eyebrow">06 / PRODUCT EXPERIENCE</p>
          <span>CONCEPT / PROTOTYPE UI</span>
        </div>
        <div className="product-heading">
          <h2>See the place.<br /><em>Understand the system.</em></h2>
          <p>A conceptual glimpse of the Keruvva digital environment: a shared operational view for projects, participants, evidence and impact.</p>
        </div>
        <div className="product-ui">
          <aside>
          <div className="mini-brand">
            <img src={logo} alt="Keruvva" />
          </div>
          <small>ENVIRONMENT / ALEXANDRIA</small>{['Overview', 'Projects', 'Opportunities', 'Participants', 'Verification'].map((x, i) => 
          <button className={i === 0 ? 'selected' : ''} key={x} type="button">{x}<span>0{i + 1}</span></button>)}
          <div className="ai-note">
            <span>✦</span>
            <small>AI INSIGHT</small>
            <p>3 connected opportunities found in this environment.</p>
          </div>
          </aside>
          <div className="map-ui">
            <div className="map-top">
              <span>ALX / DISTRICT 04</span>
              <span><i className="pulse" /> LIVE MODEL</span>
            </div>
            <div className="map-lines">
              <div className="map-block one" />
              <div className="map-block two" />
              <div className="map-block three" />
              <div className="map-route" />
              <div className="map-dot d1" />
              <div className="map-dot d2" />
              <div className="map-dot d3" />
            </div>
            <div className="map-card">
              <small>ACTIVE PROJECT</small>
              <strong>Canal edge restoration</strong>
              <span>▣ 12 actions · 86% verified</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="section applications" id="applications">
      <div className="wrap">
        <p className="eyebrow">07 / POTENTIAL APPLICATIONS</p>
        <div className="applications-head">
          <h2>Designed for places<br />where <em>outcomes</em> matter.</h2>
          <p>Keruvva's intended platform can support the coordination layer across complex physical environments. These are potential applications, not current customer claims.</p>
        </div>
        <div className="application-grid">{applications.map(([n, title, problem, outcome]) => 
          <article className="application" key={title} onClick={() => track('application_card_clicked')}>
            <span>{n}</span>
            <h3>{title}</h3>
            <p>{problem}</p>
            <small>Potential outcome</small>
            <strong>{outcome}</strong>
            <i>↗</i>
          </article>)}
        </div>
      </div>
    </section>
    <section className="section now">
      <div className="wrap">
        <div className="now-top">
          <p className="eyebrow">08 / WHY NOW</p>
          <h2>A convergence is<br /><em>opening a new layer.</em></h2>
        </div>
        <div className="convergence">{['DIGITAL TWINS', 'AI', 'SPATIAL COMPUTING', 'REAL-TIME DATA', 'COMPUTER VISION', 'CONNECTED INFRASTRUCTURE'].map((x, i) => 
          <span key={x}>{x}{i < 5 && <b>+</b>}</span>)}
          <strong>= NEW INFRASTRUCTURE LAYER</strong>
        </div>
        <div className="research-strip">
          <span>[ VERIFIED MARKET STATISTIC ]</span>
          <span>[ VERIFIED DIGITAL TWIN STATISTIC ]</span>
          <span>[ VERIFIED AI ADOPTION STATISTIC ]</span>
        </div>
      </div>
    </section>
    <section className="section business">
      <div className="wrap">
        <div className="business-head">
          <p className="eyebrow">09 / BUSINESS MODEL</p>
          <h2>Built for<br /><em>institutional value.</em></h2>
          <p>Keruvva is intended to create value where coordination, visibility, participation and measurable outcomes matter.</p>
        </div>
        <div className="business-layers">{['INSTITUTIONAL PLATFORM', 'PROJECT / DEPLOYMENT LAYER', 'DATA & INTELLIGENCE', 'VERIFICATION', 'ECOSYSTEM SERVICES'].map((x, i) => 
          <div key={x}>
            <span>0{i + 1}</span>{x}<i>+</i>
          </div>)}
        </div>
        <div className="customer-line">CITIES 
          <span>·</span> INFRASTRUCTURE ORGANIZATIONS 
          <span>·</span> DEVELOPERS 
          <span>·</span> ENTERPRISES 
          <span>·</span> UNIVERSITIES
        </div>
      </div>
    </section>
    <section className="section trust" id="about">
      <div className="wrap">
        <p className="eyebrow">10 / PRINCIPLES</p>
        <div className="trust-head">
          <h2>Built with the<br /><em>real world</em> in mind.</h2>
          <p>The infrastructure layer must earn trust from the places and people it touches.</p>
        </div>
        <div className="principles">{['PRIVACY BY DESIGN', 'INTEROPERABILITY', 'VERIFIABLE ACTION', 'HUMAN OVERSIGHT', 'RESPONSIBLE AI', 'SECURITY', 'OPEN STANDARDS WHERE APPROPRIATE'].map((x, i) => 
          <div key={x}>
            <span>0{i + 1}</span>{x}
          </div>)}
        </div>
      </div>
    </section>
    <section className="section founder">
      <div className="wrap founder-layout">
        <div className="founder-mark">
          <img src={logo} alt="Keruvva" />
        </div>
        <div>
          <p className="eyebrow">11 / THE BUILDER</p>
          <h2>Goodness<br /><em>Ononogbu</em></h2>
          <p className="role">Founder, Keruvva</p>
          <p className="founder-copy">Building at the intersection of AI, digital twins, urban innovation, sustainability and systems thinking.</p>
        </div>
      </div>
    </section>
    <section className="section early-access" id="early-access">
      <div className="wrap">
        <p className="eyebrow">12 / EARLY ACCESS</p>
        <h2>The next layer of the physical world<br /><em>is being built.</em></h2>
        <p>Keruvva is currently being developed with early users, institutions, technology collaborators and people who want to explore what participation infrastructure can become.</p>
        <button className="button button-light" type="button" onClick={openAccess}>Join the early network ↗</button>
        <div className="early-foot">
        </div>
      </div>
    </section>
    <footer className="site-footer">
      <div className="wrap footer-content">
        <a className="footer-brand" href="#top" onClick={event => scrollToSection(event, 'top')}>
          <img src={logo} alt="Keruvva" />
        </a>
        <p>BUILD YOUR WORLD!</p>
        <small>KERUVVA © 2026</small>
      </div>
    </footer>
    {modal && (
      <div className="modal-backdrop" onMouseDown={e => e.target === e.currentTarget && setModal(false)}>
        <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <button className="modal-close" type="button" onClick={() => setModal(false)} aria-label="Close dialog">×</button>
          {sent || duplicate ? (
            <div className="success">
              <span>{duplicate ? '!' : '✓'}</span>
              <p className="eyebrow">EARLY NETWORK</p>
              <h2>{duplicate ? <>You have<br /><em>already registered.</em></> : <>You're on the<br /><em>early network.</em></>}</h2>
              <p>{duplicate ? 'This email address is already registered for early access.' : 'Your request has been received. We will be in touch with the next steps.'}</p>
              {!duplicate && (
                <button className="button button-primary" type="button" onClick={async () => {
                  track('referral_clicked');
                  const link = window.location.href;
                  try {
                    await navigator.clipboard.writeText(link);
                    setInviteCopied(true);
                  } catch {
                    window.prompt('Copy this invite link', link);
                  }
                }}>
                  {inviteCopied ? 'Link copied ✓' : 'Invite someone ↗'}
                </button>
              )}
            </div>
          ) : (
            <form onSubmit={submit}>
              <p className="eyebrow">REQUEST ACCESS</p>
              <h2 id="modal-title">Join the<br /><em>early network.</em></h2>
              <p>Get first access to the Keruvva platform, pilots and early product opportunities.</p>
              <label>Email
                <input name="email" type="email" required placeholder="you@organisation.com" />
              </label>
              <label>Organization / role
                <small>OPTIONAL</small>
                <input name="organizationRole" type="text" placeholder="Your context" />
              </label>
              <button className="button button-primary" type="submit" disabled={submitting}>
                {submitting ? 'Sending...' : 'Request early access ↗'}
              </button>
              {formError && (
                <small className="form-note form-error" role="alert">
                  {formError}
                </small>
              )}
            </form>
          )}
        </div>
      </div>
    )}
  </main>
}
