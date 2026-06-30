/* Anthropic / Claude Partner Network — badge, proof cards, partnership band.
   Verified facts (do not embellish):
   • A 10-person Colaberry cohort completed Anthropic Academy's 4-course path.
   • That unlocked confirmed Claude Partner Network status for Colaberry.
   Source: Anthropic Partner Support email 2026-03-18, fwd by Ram 2026-05-27;
   cohort deadline 2026-06-12. */

const { Button: BgPartBtn } = window.ColaberryDesignSystem_098454;

/* Generic radiant "spark" — evokes the Claude/Anthropic mark without copying
   its exact trademark geometry. Used inside Colaberry-styled partner moments. */
function AnthropicGlyph({ s = 18, color = 'currentColor', stroke = 2.4 }) {
  const rays = [];
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4;
    const inner = i % 2 === 0 ? 3.4 : 4.4;
    const outer = i % 2 === 0 ? 10.4 : 8.6;
    rays.push(
      <line key={i}
        x1={12 + Math.cos(a) * inner} y1={12 + Math.sin(a) * inner}
        x2={12 + Math.cos(a) * outer} y2={12 + Math.sin(a) * outer}
        stroke={color} strokeWidth={stroke} strokeLinecap="round" />
    );
  }
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">{rays}</svg>;
}

/* The hero/nav co-brand badge */
function BgPartnerBadge({ href = '#partner' }) {
  return (
    <a className="bg-partbadge" href={href}>
      <span className="bg-partbadge__tile"><AnthropicGlyph s={18} color="#fff" /></span>
      <span className="bg-partbadge__tx">
        <b>Member · Claude Partner Network</b>
        <span>Colaberry × Anthropic · Certified team</span>
      </span>
    </a>
  );
}

/* Two Coursiv-style proof cards beneath the hero */
function BgProofCards() {
  return (
    <div className="bg-proof">
      <a className="bg-proofcard" href="#partner">
        <span className="bg-proofcard__media">
          <span className="bg-seal">
            <AnthropicGlyph s={26} color="var(--anthropic)" />
            <span className="bg-seal__chk"><I n="check" s={12} /></span>
          </span>
        </span>
        <span className="bg-proofcard__body">
          <span className="bg-proofcard__t">Anthropic Academy certified</span>
          <span className="bg-proofcard__d">Our team completed Anthropic's full <b>4-course</b> Claude path.</span>
        </span>
        <span className="bg-proofcard__arrow"><I n="arrow-right" s={20} /></span>
      </a>
      <a className="bg-proofcard" href="#partner">
        <span className="bg-proofcard__media">
          <span className="bg-ptile"><AnthropicGlyph s={28} color="#fff" /></span>
        </span>
        <span className="bg-proofcard__body">
          <span className="bg-proofcard__t">Claude Partner Network</span>
          <span className="bg-proofcard__d">Colaberry holds <b>confirmed partner status</b> with Anthropic.</span>
        </span>
        <span className="bg-proofcard__arrow"><I n="arrow-right" s={20} /></span>
      </a>
    </div>
  );
}

/* The full "official partnership" band */
function BgPartner() {
  const ref = React.useRef(null);
  const stats = [
    { count: 10, l: 'team members completed the certification cohort' },
    { count: 4, l: 'course Anthropic Academy learning path, in full' },
    { check: true, l: 'confirmed Claude Partner Network status' },
  ];
  React.useEffect(() => {
    if (!ref.current) return;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!window.gsap || !window.ScrollTrigger || reduce) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top 84%', once: true }, defaults: { ease: 'power3.out' } });
      tl.from('.bg-partband__kick', { opacity: 0, y: 18, duration: .5 })
        .from('.bg-partband h2', { opacity: 0, y: 30, duration: .7 }, '-=.25')
        .from('.bg-partband__p', { opacity: 0, y: 22, duration: .6 }, '-=.45')
        .from('.bg-partstat', { opacity: 0, y: 26, scale: .9, duration: .55, stagger: .12, ease: 'back.out(1.5)' }, '-=.3')
        .from('.bg-partband__cta', { opacity: 0, y: 18, duration: .5 }, '-=.15')
        .fromTo('.bg-certbig', { opacity: 0, y: 54, rotation: -10, scale: .9 }, { opacity: 1, y: 0, rotation: -1.4, scale: 1, duration: .9, ease: 'back.out(1.3)', clearProps: 'transform' }, '-=1.05')
        .from('.bg-certbig__seal', { scale: 0, rotation: -80, duration: .55, ease: 'back.out(2)', clearProps: 'transform' }, '-=.3');
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section className="bg-partband aw-grain aw-grain--light" id="partner" data-screen-label="Partnership" ref={ref}>
      <span className="bg-partband__glow" aria-hidden="true" />
      <div className="bg-partband__inner">
        <div>
          <span className="bg-partband__kick"><AnthropicGlyph s={17} color="var(--anthropic)" />Official partnership</span>
          <h2>Learn Claude from an<br /><em>Anthropic-certified</em> team.</h2>
          <p className="bg-partband__p">Most schools teach <i>about</i> AI. We went to the source. A cohort of our team members completed <b>Anthropic Academy's full four-course learning path</b>, earning Colaberry <b>confirmed status in the Claude Partner Network</b>. When you learn here, you learn the real Claude from people credentialed by the company that builds it.</p>
          <div className="bg-partstats">
            {stats.map((s, i) => (
              <div className="bg-partstat" key={i}>
                <div className="bg-partstat__n">{s.check ? <I n="check" s={30} /> : s.count}</div>
                <div className="bg-partstat__l">{s.l}</div>
              </div>
            ))}
          </div>
          <span className="bg-partband__cta">
          <Magnetic>
            <BgPartBtn size="lg" as="a" href="register.html" trailingIcon={<I n="arrow-right" s={18} />}>Learn with a certified team</BgPartBtn>
          </Magnetic>
          </span>
        </div>
        <div className="bg-certwrap">
          <div className="bg-certbig">
            <div className="bg-certbig__head">
              <span className="bg-certbig__brand"><AnthropicGlyph s={15} color="var(--anthropic)" />Anthropic Academy</span>
              <span className="bg-certbig__id">CPN · 2026</span>
            </div>
            <span className="bg-certbig__kick">Certificate of Completion</span>
            <h4 className="bg-certbig__name">Claude · 4-Course Learning Path</h4>
            <p className="bg-certbig__awarded">Awarded to the <b>Colaberry team cohort</b> for completing Anthropic Academy's full learning path and earning Claude Partner Network status.</p>
            <div className="bg-certbig__foot">
              <span className="bg-certbig__seal"><AnthropicGlyph s={24} color="#fff" /></span>
              <span className="bg-certbig__sig">
                <span className="bg-certbig__sigline" />
                <span className="bg-certbig__siglabel">Claude Partner Network</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { AnthropicGlyph, BgPartnerBadge, BgProofCards, BgPartner });
