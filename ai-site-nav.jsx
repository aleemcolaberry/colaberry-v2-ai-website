/* Unified site navigation — React component (home + landing pages).
   Mirrors the vanilla nav in site-chrome.js exactly (.snav markup).
   Uses I + AnthropicGlyph from the shared parts files. */
const SITE_HOME = 'AI Systems Architect Accelerator - Home.html';
const SITE_LINKS = [
  { id: 'accelerator', label: 'Accelerator', href: SITE_HOME + '#paths' },
  { id: 'our-story', label: 'Our Story', href: 'our-story.html' },
  { id: 'events', label: 'Events', href: 'events.html' },
  { id: 'blog', label: 'Blog', href: 'blog.html' },
  { id: 'faq', label: 'FAQ', href: 'faq.html' },
  { id: 'contact', label: 'Contact', href: 'contact.html' },
];

function SiteSpark({ s = 15, color = '#fff' }) {
  const rays = [];
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4;
    const inner = i % 2 === 0 ? 3.4 : 4.4;
    const outer = i % 2 === 0 ? 10.4 : 8.6;
    rays.push(<line key={i} x1={12 + Math.cos(a) * inner} y1={12 + Math.sin(a) * inner}
      x2={12 + Math.cos(a) * outer} y2={12 + Math.sin(a) * outer} stroke={color} strokeWidth="2.4" strokeLinecap="round" />);
  }
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">{rays}</svg>;
}

function SitePartner() {
  return (
    <a className="snav-partner" href={SITE_HOME + '#partner'} aria-label="Colaberry is an Anthropic Partner, member of the Claude Partner Network">
      <span className="snav-partner__ic"><SiteSpark s={15} color="#fff" /></span>
      <span className="snav-partner__tx"><small>Member</small><b>Anthropic Partner</b></span>
    </a>
  );
}

function SiteNav({ active = '' }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    // remove any vanilla nav carried over from in-app navigation (content pages)
    document.querySelectorAll('#siteNav, #siteMenu').forEach((e) => { if (!e.closest('#root')) e.remove(); });
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  React.useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; }, [open]);

  const cur = (id) => (id === active ? 'page' : undefined);

  return (
    <React.Fragment>
      <header className="snav" data-scrolled={scrolled}>
        <div className="snav__in">
          <a className="snav__logo" href={SITE_HOME} aria-label="Colaberry home">
            <img src="assets/logo/colaberry-horizontal.png" alt="Colaberry" />
          </a>
          <nav className="snav__links" aria-label="Primary">
            {SITE_LINKS.map((l) => (
              <a className="snav__link" key={l.id} href={l.href} aria-current={cur(l.id)}>{l.label}</a>
            ))}
          </nav>
          <div className="snav__meta">
            <SitePartner />
            <a className="snav__cta" href="register.html">Join the free Open House<span className="cb-i"><i data-lucide="arrow-right" /></span></a>
            <button className="snav__burger" aria-label="Open menu" onClick={() => setOpen(true)}><span className="cb-i"><i data-lucide="menu" /></span></button>
          </div>
        </div>
      </header>

      <div className="snav-menu" data-open={open}>
        <div className="snav-menu__top">
          <img src="assets/logo/colaberry-horizontal.png" alt="Colaberry" />
          <button className="snav-menu__close" aria-label="Close menu" onClick={() => setOpen(false)}><span className="cb-i"><i data-lucide="x" /></span></button>
        </div>
        <nav className="snav-menu__links">
          {SITE_LINKS.map((l) => (
            <a key={l.id} href={l.href} aria-current={cur(l.id)} onClick={() => setOpen(false)}>{l.label}<span className="cb-i"><i data-lucide="arrow-up-right" /></span></a>
          ))}
        </nav>
        <div className="snav-menu__foot">
          <a className="snav-menu__partner" href={SITE_HOME + '#partner'} onClick={() => setOpen(false)}>
            <span className="snav-partner__ic"><SiteSpark s={17} color="#fff" /></span>
            <span><small>Claude Partner Network</small><b>Anthropic Partner</b></span>
          </a>
          <a className="snav-menu__cta" href="register.html">Join the free Open House</a>
        </div>
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { SiteNav, SitePartner });
