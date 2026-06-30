/* AI Systems Architect Accelerator — HOME: Nav, Hero (+ Open House reg card), Marquee */
const { Button: HomeBtn, Input: HomeInput, Avatar: HomeAvatar } = window.ColaberryDesignSystem_098454;

/* Open-House date placeholder — swap once Sohail/Ali confirm the real session date. */
const HOME_DATE = 'New date announced soon';
const REGISTER_URL = 'register.html';

/* Reuses the approved .cbx-regcard. On submit we capture email + mobile and
   send the lead to the live registration. Swap for the real /api/leads POST. */
function HomeRegCard() {
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [errors, setErrors] = React.useState({});
  const [busy, setBusy] = React.useState(false);
  const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim());
  const phoneOk = (phone.match(/\d/g) || []).length >= 10;

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!emailOk) next.email = email.trim() ? 'Enter a valid email address.' : 'Please add your email.';
    if (!phoneOk) next.phone = phone.trim() ? 'Enter a valid mobile number.' : 'Please add your mobile number.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setBusy(true);
    window.location.href = REGISTER_URL + '?e=' + encodeURIComponent(email.trim()) + '&p=' + encodeURIComponent(phone.trim());
  };
  React.useEffect(() => { if (window.lucide && window.lucide.createIcons) window.lucide.createIcons(); }, []);

  const rows = [
    { icon: 'calendar-days', l: 'Open House', v: HOME_DATE },
    { icon: 'monitor', l: 'Format', v: 'Live online event' },
    { icon: 'ticket', l: 'Price', v: 'Free to attend' },
  ];

  return (
    <div className="cbx-regcard">
      <div className="cbx-regcard__head">
        <span className="cbx-regcard__live"><span className="cbx-regcard__dot" />Free Open House</span>
        <span className="cbx-regcard__seats"><I n="users" s={13} />Limited seats</span>
      </div>
      <div className="cbx-regcard__body">
        <div className="cbx-regcard__rows">
          {rows.map((r, i) => (
            <div className="cbx-regcard__row" key={i}>
              <span className="cbx-regcard__rowicon"><I n={r.icon} s={18} /></span>
              <span className="cbx-regcard__rowl">{r.l}</span>
              <span className="cbx-regcard__rowv">{r.v}</span>
            </div>
          ))}
        </div>
        <form className="cbx-regcard__form" onSubmit={submit} noValidate>
          <HomeInput id="home-email" label="Email" type="email" placeholder="you@email.com"
            required autoComplete="email" inputMode="email" name="email" error={errors.email || undefined}
            value={email} onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((p) => ({ ...p, email: undefined })); }} />
          <HomeInput id="home-phone" label="Mobile number" type="tel" placeholder="(555) 012-3456"
            required autoComplete="tel" inputMode="tel" name="phone" error={errors.phone || undefined}
            value={phone} onChange={(e) => { setPhone(e.target.value); if (errors.phone) setErrors((p) => ({ ...p, phone: undefined })); }} />
          <HomeBtn type="submit" fullWidth disabled={busy} trailingIcon={<I n="arrow-right" s={17} />}>{busy ? 'Saving your seat…' : 'Join the free Open House'}</HomeBtn>
          <p className="cbx-regcard__fine"><I n="shield-check" s={14} />Free to attend · membership starts at $149/month · no spam.</p>
        </form>
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
          <span className="aw-nav__date"><I n="ticket" s={15} />FROM $149/MO</span>
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
          <p className="home-hero__sub">Colaberry's AI Systems Architect Accelerator is a membership that takes you from <em>using</em> AI to <strong>architecting real systems with Claude</strong>. You'll learn through guided projects, a 12-week build path, and an Anthropic-certified team. Join the free Open House and see how professionals, career switchers, and builders all start here.</p>
          <div className="home-pills">
            {pills.map((p, i) => (
              <a className="home-pill" key={i} href={p.href} style={{ '--_c': p.c }}><span className="home-pill__dot" />{p.t}</a>
            ))}
          </div>
          <p className="home-hero__price">
            <span className="home-hero__price-ic"><I n="ticket" s={14} /></span>
            <span>Membership starts at <b>$149/month</b> · cancel anytime</span>
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
    <span key="d">Membership from $149/month</span>,
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
