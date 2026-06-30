/* AI Systems Architect Accelerator — HOME: Nav, Hero (+ Open House reg card), Marquee */
const { Button: HomeBtn, Input: HomeInput, Avatar: HomeAvatar } = window.ColaberryDesignSystem_098454;

/* Open-House date placeholder — swap once Sohail/Ali confirm the real session date. */
const HOME_DATE = 'New date announced soon';
const REGISTER_URL = 'register.html';

/* High-intent lead card for the home hero. One field (email) to cut friction —
   the phone + name are collected on register.html (step 2). Swap the redirect
   for a real /api/leads POST when the backend is ready. */
function HomeRegCard() {
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim());

  const submit = (e) => {
    e.preventDefault();
    if (!emailOk) { setError(email.trim() ? 'Enter a valid email address.' : 'Please add your email to continue.'); return; }
    setBusy(true);
    window.location.href = REGISTER_URL + '?e=' + encodeURIComponent(email.trim());
  };
  React.useEffect(() => { if (window.lucide && window.lucide.createIcons) window.lucide.createIcons(); }, []);

  const gets = [
    'A 90-minute live session: see it, then decide',
    'Real student projects, from idea to deployed',
    'Meet the Anthropic-certified team',
    'Find your path and your $149/mo plan',
  ];

  return (
    <div className="lead-card">
      <div className="lead-card__top">
        <span className="lead-card__live"><span className="lead-card__dot" />Live · Free Open House</span>
        <span className="lead-card__when"><I n="calendar-days" s={14} />{HOME_DATE}</span>
      </div>
      <div className="lead-card__body">
        <h2 className="lead-card__h">Save your free seat</h2>
        <p className="lead-card__sub">No payment, no pressure. See exactly how the accelerator works, then choose your path.</p>
        <ul className="lead-card__gets">
          {gets.map((g, i) => (<li key={i}><span className="lead-card__check"><I n="check" s={13} /></span>{g}</li>))}
        </ul>
        <form className="lead-card__form" onSubmit={submit} noValidate>
          <div className="lead-card__field" data-invalid={error ? 'true' : undefined}>
            <span className="lead-card__field-ic"><I n="mail" s={18} /></span>
            <input className="lead-card__input" type="email" inputMode="email" autoComplete="email" name="email"
              placeholder="Enter your email" aria-label="Your email"
              value={email} onChange={(e) => { setEmail(e.target.value); if (error) setError(''); }} />
          </div>
          {error ? <p className="lead-card__err"><I n="alert-circle" s={14} />{error}</p> : null}
          <Magnetic>
            <HomeBtn type="submit" size="lg" fullWidth disabled={busy} trailingIcon={<I n="arrow-right" s={18} />}>{busy ? 'Saving your seat…' : 'Save my free seat'}</HomeBtn>
          </Magnetic>
        </form>
        <div className="lead-card__proof">
          <span className="lead-card__stars" aria-label="Rated 5 out of 5">{[0,1,2,3,4].map((i) => <I key={i} n="star" s={15} />)}</span>
          <span className="lead-card__proof-t"><b>5,000+</b> careers changed since 2012</span>
        </div>
        <p className="lead-card__fine"><I n="shield-check" s={14} />Free to attend · takes 20 seconds · no spam, unsubscribe anytime</p>
      </div>
    </div>
  );
}

function HomeNav() {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className="aw-nav" data-scrolled={scrolled}>
      <div className="aw-nav__inner">
        <a className="cbx-logo" href="#top" style={{ display: 'inline-flex', alignItems: 'center', gap: 14, textDecoration: 'none' }}>
          <Logo />
          <span style={{ width: 1, height: 26, background: 'var(--border-default)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, lineHeight: 1.2, letterSpacing: '.02em', color: 'var(--text-muted)' }}>AI Systems Architect<br/>Accelerator</span>
        </a>
        <nav className="aw-nav__links" aria-label="Primary">
          <a href="#paths">Accelerator</a>
          <a href="our-story.html">Our Story</a>
          <a href="events.html">Events</a>
          <a href="blog.html">Blog</a>
          <a href="faq.html">FAQ</a>
          <a href="contact.html">Contact</a>
        </nav>
        <div className="aw-nav__meta">
          <a className="bg-navpartner" href="#partner"><span className="bg-navpartner__g"><AnthropicGlyph s={14} color="var(--anthropic)" /></span>Anthropic Partner</a>
          <HomeBtn size="sm" as="a" href={REGISTER_URL} target="_blank" rel="noopener" trailingIcon={<I n="arrow-right" s={15} />}>Join the free Open House</HomeBtn>
        </div>
      </div>
    </header>
  );
}

function HomeHero() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!window.gsap || !ref.current) return;
    let ctx = null;
    const cancel = awWhenVisible(() => {
      if (!ref.current) return;
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
        tl.from(ref.current.querySelectorAll('.home-hero__line > span'), { yPercent: 115, duration: .9, stagger: .1 }, .15)
          .from(ref.current.querySelector('.home-eyebrow'), { opacity: 0, y: 10, duration: .5 }, '-=.7')
          .from(ref.current.querySelectorAll('.home-hero__sub, .home-pills, .home-hero__price, .home-hero__cta, .home-hero__trust'),
            { opacity: 0, y: 22, duration: .6, stagger: .09 }, '-=.45')
          .from(ref.current.querySelector('.aw-hero__card'), { opacity: 0, y: 34, duration: .8 }, '-=.5');
      }, ref);
    });
    return () => { cancel(); if (ctx) ctx.revert(); };
  }, []);

  const pills = [
    { t: 'Working professionals', c: 'var(--blue-500)', href: '#paths' },
    { t: 'Beginners & career switchers', c: 'var(--green-600)', href: '#paths' },
    { t: 'Builders & founders', c: 'var(--red-500)', href: '#paths' },
  ];

  return (
    <section className="aw-hero aw-grain" ref={ref} id="top">
      <AwCanvas />
      <div className="aw-hero__grid">
        <div className="aw-hero__copy">
          <span className="home-eyebrow"><span className="home-eyebrow__dot" />AI Systems Architect Accelerator · Free Open House</span>
          <h1 className="home-hero__h1" aria-label="From AI curious to AI Systems Architect">
            <span className="home-hero__line"><span>From AI curious</span></span>
            <span className="home-hero__line"><span>to <span className="is-red">AI architect.</span></span></span>
          </h1>
          <p className="home-hero__sub">Go from <em>using</em> AI to <strong>architecting real systems with Claude</strong>, through guided projects, a 12-week build path, and an Anthropic-certified team. One membership, three ways in.</p>
          <div className="home-pills">
            {pills.map((p, i) => (
              <a className="home-pill" key={i} href={p.href} style={{ '--_c': p.c }}><span className="home-pill__dot" />{p.t}</a>
            ))}
          </div>
          <p className="home-hero__price">
            <span className="home-hero__price-ic"><I n="ticket" s={14} /></span>
            <span>Membership is <b>$149/month</b> · cancel anytime</span>
          </p>
          <div className="home-hero__cta">
            <Magnetic>
              <HomeBtn size="lg" as="a" href={REGISTER_URL} target="_blank" rel="noopener" trailingIcon={<I n="arrow-right" s={18} />}>Join the free Open House</HomeBtn>
            </Magnetic>
            <HomeBtn size="lg" variant="ghost" as="a" href="#paths" trailingIcon={<I n="arrow-down" s={18} />}>Choose your path</HomeBtn>
          </div>
          <div className="home-hero__trust">
            <div className="cb-avatar-group">
              <HomeAvatar name="Mika Rivera" size="sm" style={{ background: 'var(--blue-600)' }} />
              <HomeAvatar name="Owen Brooks" size="sm" style={{ background: 'var(--green-700)' }} />
              <HomeAvatar name="Ada Lovelace" size="sm" style={{ background: 'var(--red-600)' }} />
              <HomeAvatar name="Sam Okafor" size="sm" style={{ background: 'var(--blue-700)' }} />
            </div>
            <span className="home-hero__trust-label"><b>5,000+</b> careers changed since 2012 · Texas Workforce Commission approved</span>
          </div>
        </div>
        <div className="aw-hero__card">
          <HomeRegCard />
        </div>
      </div>
    </section>
  );
}

function HomeMarquee() {
  const items = [
    <span key="a">Learn with <em className="is-blue">Claude</em></span>,
    <span key="b">Build <em className="is-green">real systems</em></span>,
    <span key="c">Deploy in the <em className="is-red">real world</em></span>,
    <span key="d">Membership · $149/month</span>,
  ];
  const list = (hidden) => (
    <div className="aw-mq__list" aria-hidden={hidden || undefined}>
      {items.map((it, i) => (
        <span className="aw-mq__item" key={i}>{it}<span className="aw-mq__dot" /></span>
      ))}
    </div>
  );
  return (
    <div className="aw-mq">
      <div className="aw-mq__inner">{list(false)}{list(true)}</div>
    </div>
  );
}

Object.assign(window, { HomeNav, HomeHero, HomeMarquee, HomeRegCard, HOME_DATE, REGISTER_URL });
