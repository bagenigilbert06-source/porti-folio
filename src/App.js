import React, { useState } from "react";
import { FiArrowUpRight, FiDatabase, FiGithub, FiLayers, FiLinkedin, FiMail, FiMenu, FiServer, FiX } from "react-icons/fi";
import { FaReact, FaPython } from "react-icons/fa";
import { SiNextdotjs, SiFlask, SiJavascript, SiTailwindcss } from "react-icons/si";
import { projectOne, projectTwo, projectThree } from "./assets";

const links = ["about", "services", "work", "skills", "contact"];
const services = [
  { icon: <FiLayers />, title: "Frontend engineering", text: "Fast, accessible interfaces built with React, Next.js and modern component systems." },
  { icon: <FiServer />, title: "Backend development", text: "Reliable APIs and server-side applications with Python, Flask and clean data flows." },
  { icon: <FiDatabase />, title: "Full-stack products", text: "Thoughtful products from database and API design through to polished user experiences." },
];
const projects = [
  { image: projectOne, title: "Social Platform", type: "Full-stack application", text: "A responsive community experience with authentication, profiles and real-time-ready architecture.", stack: ["React", "API", "Database"] },
  { image: projectTwo, title: "Commerce Experience", type: "Web application", text: "A conversion-focused storefront with a clean catalogue, cart journey and scalable component system.", stack: ["Next.js", "JavaScript", "UI/UX"] },
  { image: projectThree, title: "Messaging Workspace", type: "Product build", text: "A focused communication interface designed for speed, clarity and effortless collaboration.", stack: ["React", "Flask", "REST API"] },
];
const skills = [
  { icon: <FaReact />, name: "React" }, { icon: <SiNextdotjs />, name: "Next.js" },
  { icon: <SiJavascript />, name: "JavaScript" }, { icon: <FaPython />, name: "Python" },
  { icon: <SiFlask />, name: "Flask" }, { icon: <SiTailwindcss />, name: "Tailwind CSS" },
];

function App() {
  const [menu, setMenu] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [sending, setSending] = useState(false);

  async function submitContact(event) {
    event.preventDefault();
    setSending(true); setStatus({ type: "", message: "" });
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(form)) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not send your message.");
      event.currentTarget.reset();
      setStatus({ type: "success", message: "Thanks — your message is now in my inbox." });
    } catch (error) { setStatus({ type: "error", message: error.message }); }
    finally { setSending(false); }
  }

  return <div className="site-shell">
    <header className="nav-wrap">
      <a className="brand" href="#home" aria-label="DEV GILBERT home"><span>DG</span> DEV GILBERT</a>
      <nav className={menu ? "nav-links open" : "nav-links"} aria-label="Main navigation">
        {links.map(link => <a key={link} href={`#${link}`} onClick={() => setMenu(false)}>{link}</a>)}
        <a className="nav-cta" href="#contact" onClick={() => setMenu(false)}>Let’s talk <FiArrowUpRight /></a>
      </nav>
      <button className="menu-button" onClick={() => setMenu(!menu)} aria-label="Toggle menu">{menu ? <FiX /> : <FiMenu />}</button>
    </header>

    <main>
      <section id="home" className="hero section">
        <div className="hero-copy">
          <p className="eyebrow"><span /> AVAILABLE FOR GREAT PROJECTS</p>
          <h1>I build digital products that <em>work beautifully.</em></h1>
          <p className="hero-text">Hi, I’m <strong>Gilbert</strong> — a software developer turning complex ideas into fast, thoughtful and dependable web experiences.</p>
          <div className="hero-actions"><a className="button primary" href="#work">Explore my work <FiArrowUpRight /></a><a className="button secondary" href="#contact">Start a project</a></div>
          <div className="quick-stats"><div><strong>Full-stack</strong><span>Development</span></div><div><strong>Web-first</strong><span>Experiences</span></div><div><strong>Clean code</strong><span>Built to scale</span></div></div>
        </div>
        <div className="hero-visual" aria-label="Developer code illustration">
          <div className="orbit orbit-one"/><div className="orbit orbit-two"/>
          <div className="code-card"><div className="code-top"><i/><i/><i/><span>gilbert.py</span></div><pre><code><b>class</b> <strong>Developer</strong>:{`\n  `}<span>name</span> = <q>"Gilbert"</q>{`\n  `}<span>focus</span> = [{`\n    `}<q>"useful"</q>,{`\n    `}<q>"beautiful"</q>,{`\n    `}<q>"reliable"</q>{`\n  `}]{`\n\n  `}<b>def</b> <strong>build</strong>(idea):{`\n    `}<b>return</b> product</code></pre></div>
          <div className="float-badge badge-react"><FaReact /> React</div><div className="float-badge badge-python"><FaPython /> Python</div>
        </div>
      </section>

      <section id="about" className="section split-section"><div><p className="section-index">01 / ABOUT</p><h2>Code with purpose.<br/><span>Design with clarity.</span></h2></div><div className="about-copy"><p>I’m a software developer who enjoys the whole journey — understanding a real problem, shaping the experience, and building the technology that brings it to life.</p><p>My toolkit spans modern frontend engineering with React and Next.js, and backend development with Python and Flask. I care about maintainable code, intuitive interfaces and the small details that make software feel great.</p><a href="#contact">Let’s build something meaningful <FiArrowUpRight /></a></div></section>

      <section id="services" className="section"><div className="section-heading"><div><p className="section-index">02 / SERVICES</p><h2>How I can help.</h2></div><p>From a first idea to a production-ready product, I build practical software around your goals.</p></div><div className="service-grid">{services.map((s,i)=><article className="service-card" key={s.title}><span className="number">0{i+1}</span><div className="service-icon">{s.icon}</div><h3>{s.title}</h3><p>{s.text}</p></article>)}</div></section>

      <section id="work" className="section work-section"><div className="section-heading"><div><p className="section-index">03 / SELECTED WORK</p><h2>Things I’ve built.</h2></div><p>Selected product concepts that show my approach to full-stack problem solving. Replace links and details with your live case studies as they launch.</p></div><div className="project-grid">{projects.map((p,i)=><article className="project-card" key={p.title}><div className="project-image"><img src={p.image} alt=""/><span>0{i+1}</span></div><div className="project-content"><p className="project-type">{p.type}</p><h3>{p.title}</h3><p>{p.text}</p><div className="tags">{p.stack.map(x=><span key={x}>{x}</span>)}</div></div></article>)}</div></section>

      <section id="skills" className="section skills-section"><div><p className="section-index">04 / TOOLKIT</p><h2>Technology I use to make ideas real.</h2><p>Strong foundations, modern tools and the flexibility to choose what fits the product.</p></div><div className="skill-grid">{skills.map(s=><div className="skill" key={s.name}>{s.icon}<span>{s.name}</span></div>)}</div></section>

      <section id="contact" className="section contact-section"><div className="contact-copy"><p className="section-index">05 / CONTACT</p><h2>Have an idea?<br/><span>Let’s make it happen.</span></h2><p>Tell me what you’re working on, what you need, and where you’d like to take it. I’ll get back to you as soon as I can.</p><a href="mailto:hello@devgilbert.com"><FiMail/> hello@devgilbert.com</a><small>Update this placeholder email and your social links before publishing.</small></div><form onSubmit={submitContact}><div className="field-row"><label>Your name<input required name="name" minLength="2" placeholder="Jane Doe" /></label><label>Email address<input required name="email" type="email" placeholder="jane@company.com" /></label></div><label>What can I help with?<input required name="subject" minLength="3" placeholder="Website, app, API..." /></label><label>Tell me about the project<textarea required name="message" minLength="10" rows="5" placeholder="A little about your idea, goals and timeline..." /></label><button className="button primary" disabled={sending}>{sending ? "Sending..." : "Send message"} <FiArrowUpRight /></button>{status.message && <p className={`form-status ${status.type}`}>{status.message}</p>}</form></section>
    </main>
    <footer><a className="brand" href="#home"><span>DG</span> DEV GILBERT</a><p>Software developer crafting useful digital experiences.</p><div><a href="https://github.com/" aria-label="GitHub"><FiGithub/></a><a href="https://linkedin.com/" aria-label="LinkedIn"><FiLinkedin/></a><a href="mailto:hello@devgilbert.com" aria-label="Email"><FiMail/></a><a href="#home" aria-label="Back to top"><FiArrowUpRight/></a></div><small>© {new Date().getFullYear()} Dev Gilbert. Built with React & care.</small></footer>
  </div>;
}
export default App;
