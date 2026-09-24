import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, Route, Switch, useLocation } from 'wouter';
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDownRight, ArrowRight, ArrowUpRight, Check, Instagram, Twitter, Youtube, Clock3, MapPin, Menu, Phone, X } from 'lucide-react';
import './la-forza.css';


function ForzaMark({ light = true }: { light?: boolean }) {
  return <span className={`forza-mark ${light ? 'forza-mark-light' : 'forza-mark-dark'}`} aria-hidden="true">F</span>;
}

function SiteHeader({ introDone, onIntroDone }: { introDone: boolean; onIntroDone?: () => void }) {
  const [location, navigate] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const home = location === '/';

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 46);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const goHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (home) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  return (
    <header className={`site-header ${compact ? 'is-compact' : ''} ${introDone || !home ? 'intro-finished' : 'intro-running'}`}>
      <div className="nav-inner">
        <Link
          href="/"
          className="nav-home group"
          onClick={goHome}
          onAnimationEnd={(e) => {
            if (
              home &&
              (e.animationName === 'brand-reveal' ||
                e.animationName === 'brand-reveal-mobile')
            ) {
              onIntroDone?.();
            }
          }}
        >
          <div className="nav-home-content">
            <img src="/la-forza.png" alt="La Forza logo" className="forza-image" />
            <span className="nav-brand">LA FORZA</span>
          </div>
        </Link>

        <nav className="nav-menu" aria-label="Primary">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/about" className="nav-link">About</Link>
          <Link href="/join" className="nav-link nav-link-cta">
            Join <ArrowUpRight size={13} />
          </Link>
        </nav>

        <button
          className="menu-button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen(v => !v)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            <Link href="/" onClick={goHome}>Home</Link>
            <Link href="/about">About</Link>
            <Link href="/join">Join</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Shell({ children, introDone, onIntroDone }: { children: React.ReactNode; introDone?: boolean; onIntroDone?: () => void }) {
  return <div className="app-shell"><SiteHeader introDone={introDone ?? false} onIntroDone={onIntroDone} />{children}</div>;
}

function SectionTag({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <div className={`section-tag ${light ? 'section-tag-light' : ''}`}><span className="tag-dot" />{children}</div>;
}

function ArrowLink({ href, children, filled = false, onClick }: { href: string; children: React.ReactNode; filled?: boolean; onClick?: () => void }) {
  return <Link href={href} onClick={onClick} className={`arrow-link ${filled ? 'arrow-link-filled' : ''}`}><span>{children}</span><ArrowUpRight size={17} /></Link>;
}

function Hero({ introDone }: { introDone: boolean }) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 25, mass: .25 });
  const titleY = useTransform(progress, [0, 1], [0, -210]);
  const titleScale = useTransform(progress, [0, 1], [1, .72]);
  const titleOpacity = useTransform(progress, [0, .68, 1], [1, .95, 0]);
  const imageY = useTransform(progress, [0, 1], [0, -120]);
  const imageScale = useTransform(progress, [0, 1], [1.02, 1.14]);
  const forzaX = useTransform(progress, [0, .55, 1], [0, -20, -130]);
  const forzaScale = useTransform(progress, [0, 1], [1, 1.18]);
  const flareX = useTransform(progress, [0, 1], ['-15%', '75%']);
  const gridY = useTransform(progress, [0, 1], ['0%', '18%']);

  return <section ref={heroRef} className="hero-stage">
    <div className={`hero-reveal ${introDone ? 'is-visible' : ''}`}>
      <div className="hero-viewport">
        <motion.div className="hero-grid" style={{ y: gridY }} />
        <motion.div className="hero-forza" aria-hidden="true" style={{ x: forzaX, scale: forzaScale }}>FORZA</motion.div>
        <motion.div className="hero-glow" aria-hidden="true" style={{ x: flareX }} />
        <motion.img src="/gym-hero.png" alt="Athlete training at La Forza" className="hero-athlete" style={{ y: imageY, scale: imageScale }} />
        <div className="hero-vignette" />
        <motion.div className="hero-main" style={{ y: titleY, scale: titleScale, opacity: titleOpacity }}>
          <div className="hero-copy">
            <div className="hero-kicker"><span /> BAHRIA TOWN LAHORE <b>•</b> PREMIUM FITNESS <b>•</b> EST. 2026</div>
            <h1><span className="hero-emphasis-1">Build</span><em className="hero-emphasis">YOUR BODY</em></h1>
            <p>State-of-the-art equipment, expert coaching, and an incredibly positive atmosphere, built for people who actually want to train.</p>
            <div className="hero-actions">
              <ArrowLink href="/join" filled>Start training</ArrowLink>
              <a className="arrow-link" href="#amenities">Explore the club <ArrowDownRight size={17} /></a>
            </div>
          </div>
          <div className="hero-stats">
            <div><span>RATING</span><strong>4.8<span>★</span></strong><small>105 reviews</small></div>
            <div><span>OPEN</span><strong>06:00</strong><small>to midnight</small></div>
            <div><span>FOCUS</span><strong>STRONG</strong><small>body + mind</small></div>
          </div>
        </motion.div>
        <div className="hero-footer"><span>SCROLL TO EXPLORE</span><span>01 / 04</span></div>
      </div>
    </div>
  </section>;
}

function Marquee() {
  return <div className="marquee"><div className="marquee-track">{Array.from({ length: 6 }).map((_, i) => <div className="marquee-group" key={i}><span>TRAIN HARD</span><i>✳</i><span>MOVE WELL</span><i>✳</i><span>STAY CONSISTENT</span><i>✳</i><span>LA FORZA</span><i>✳</i></div>)}</div></div>;
}

const amenities = [
  ['01', 'Premium equipment', 'Olympic bars, bumper plates, latest cardio machines and power racks.'],
  ['02', 'Expert coaching', 'National-level athletes and experienced trainers who know how to push intelligently.'],
  ['03', 'Recovery suite', 'Dedicated sauna, stretching space and the room you need to recover properly.'],
  ['04', 'Huge parking', 'Convenient parking with plenty of space, so getting to training is never a hassle.'],
  ['05', 'Modern facilities', 'Clean, well-lit spaces with machine maintenance three times a week and deep cleans weekly.'],
  ['06', 'Positive community', 'A welcoming atmosphere that makes training enjoyable without turning it into theatre.'],
];

const reviews = [
  ['Litmus 618', 'La Forza has some unique machines and the ambiance is very fresh for Bahria Town. The parking is also huge so no issues there.'],
  ['Syed Ali Hameed Gul', 'One of the best gyms around, with top-tier equipment, great variety of machines, and an incredibly positive atmosphere.'],
  ['Hamza Wajid', 'Love this gym! It is the most well-equipped and northernmost gym. The admin team is supportive and helpful.'],
];

function Home() {
  const [introDone, setIntroDone] = useState(true);
  const storyRef = useRef<HTMLElement>(null);
  const storyTrackRef = useRef<HTMLDivElement>(null);
  const [storyTravel, setStoryTravel] = useState(0);

  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ['start start', 'end end'],
  });

  const storyX = useTransform(scrollYProgress, [0, 1], [0, -storyTravel]);
  const storyProgressLeft = useTransform(scrollYProgress, [0, 1], ['0%', '82%']);

  useLayoutEffect(() => {
    const measure = () => {
      const track = storyTrackRef.current;

      if (!track || window.innerWidth < 768) {
        setStoryTravel(0);
        return;
      }

      const travel = track.scrollWidth - window.innerWidth;
      setStoryTravel(Math.max(0, travel));
    };

    measure();

    const observer = new ResizeObserver(measure);
    if (storyTrackRef.current) {
      observer.observe(storyTrackRef.current);
    }

    window.addEventListener('resize', measure);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <Shell
      introDone={introDone}
      onIntroDone={() => setIntroDone(true)}
    >
      <main>
        <Hero introDone={introDone} />
        <Marquee />

        <section className="intro-section section-dark">
          <div className="section-wrap split-intro">
            <div><SectionTag>Experience the difference</SectionTag><h2>THE ROOM<br /><span>MATTERS</span></h2></div>
            <div className="intro-copy"><p className="lead-copy">La Forza is a premium fitness destination in Bahria Town built around serious training, not posturing.</p><p>We combine advanced machines, Olympic equipment, expert coaching, a welcoming community and the small operational details that make coming back feel easy.</p><ArrowLink href="/about">Inside La Forza</ArrowLink></div>
          </div>
          <div className="stat-ribbon section-wrap"><div><strong>4.8★</strong><span>105 REVIEWS</span></div><div><strong>24/7</strong><span>OPEN HOURS</span></div><div><strong>3×</strong><span>MACHINE MAINTENANCE / WEEK</span></div><div><strong>01</strong><span>PLACE TO GET BETTER</span></div></div>
        </section>

        <section
          ref={storyRef}
          className="story-section"
          id="amenities"
          style={{
            height: storyTravel
              ? `calc(100vh + ${storyTravel}px)`
              : '300vh',
          }}
        >
          <div className="story-sticky">
            <div className="section-wrap story-head">
              <SectionTag light>World-class amenities</SectionTag>
              <span className="story-counter">02 / 04</span>
            </div>

            <motion.div
              ref={storyTrackRef}
              className="story-track"
              style={{ x: storyX }}
            >
              {amenities.map(([n, t, d], i) => (
                <article
                  className="story-card"
                  key={n}
                >
                  <span className="card-number">{n}</span>
                  <div className="card-index">LA FORZA / {n}</div>
                  <div className="card-content">
                    <h3>{t}</h3>
                    <p>{d}</p>
                  </div>
                  <ArrowRight className="card-arrow" />
                </article>
              ))}
            </motion.div>

            <div className="story-progress">
              <span>SCROLL TO CONTINUE</span>
              <div><motion.i style={{ left: storyProgressLeft }} /></div>
            </div>
          </div>
        </section>

        <section className="method-section section-paper">
          <div className="section-wrap method-grid"><div><SectionTag>Why people stay</SectionTag><h2>TRAINING<br /><span>WITHOUT NOISE</span></h2></div><div className="method-list">{['National athletes / powerlifters as trainers','Olympic equipment + Powerbar + bumper plates','Clean AF + deep cleans every week','Open Sundays','Supportive admin team','A room that makes consistency easier'].map((x,i)=><div key={x}><span>0{i+1}</span><b>{x}</b><ArrowUpRight size={16}/></div>)}</div></div>
        </section>

        <section className="reviews-section section-dark" id="reviews">
          <div className="section-wrap"><div className="reviews-head"><div><SectionTag>Member voices</SectionTag><h2>WHAT MEMBERS<br /><span>SAY</span></h2></div><div className="review-score"><strong>4.8</strong><span>★ ★ ★ ★ ★</span><small>105 reviews</small></div></div>
            <div className="review-grid">{reviews.map(([name,text])=><motion.article key={name} className="review-card" whileHover={{ y: -8 }} transition={{ duration: .25 }}><div className="stars">★★★★★</div><p>“{text}”</p><strong>{name}</strong><span>VERIFIED MEMBER</span></motion.article>)}</div>
          </div>
        </section>

        <section className="membership-banner"><div className="section-wrap membership-inner"><div><SectionTag light>Membership is a practice</SectionTag><h2>YOUR BEST<br /><span>IS TRAINED</span></h2></div><div><p>One club. Three ways to start. Pick the track that fits your life and we'll show you exactly where to begin.</p><ArrowLink href="/join" filled>See membership options</ArrowLink></div></div></section>
        <FooterStrip />
      </main>
    </Shell>
  );
}

const Icon = {
  Instagram: () => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  ),
  Mail: () => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  ),
  Phone: () => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </svg>
  ),
  Pin: () => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  ),
};

function FooterStrip() {
  return (
    <section className="contact-strip">
      <div className="section-wrap contact-grid">
        <div className="contact-left">
          <SectionTag>Find us</SectionTag>

          <div className="footer-socials">
            
            <a
              href="https://www.instagram.com/laforzagyms/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>

            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
            >
              <Twitter size={18} />
            </a>

            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
            >
              <Youtube size={18} />
            </a>
          </div>

          <div className="footer-hours">
            <Clock3 size={18} />
            <span>OPEN DAILY</span>
            <b>6:00 AM — 12:00 AM</b>
            <small>Women Only Hours: 11:00 AM — 3:00 PM</small>
          </div>
        </div>


        {/* RIGHT SIDE */}
        <div className="footer-right">

          <div className="footer-menu">
            <a
              href="#top"
              className="footer-brand"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              <img src="/la-forza.png" alt="La Forza" />
              <span className="locations">LA FORZA</span>
            </a>

            
          </div>


          <div className="footer-contact-details">

            <div className="footer-contact-item">
              <Phone size={18} />
              <a href="tel:+923033332905">
                +923033332905
              </a>
            </div>

            <div className="footer-contact-item">
              <span className="footer-contact-icon">@</span>
              <a href="mailto:info@laforzagyms.com">
                info@laforzagyms.com
              </a>
            </div>

            <div className="footer-contact-item">
              <a
                href="https://maps.google.com/?q=Winter+Land+Complex+Ghaznavi+Block+Bahria+Town+Lahore"
                target="_blank"
                rel="noreferrer"
              >
                <MapPin size={18} />
              </a>

              <div>
                <a
                  href="https://maps.google.com/?q=Winter+Land+Complex+Ghaznavi+Block+Bahria+Town+Lahore"
                  target="_blank"
                  rel="noreferrer"
                >
                  <b className="locations">Winter Land Complex</b>
                </a>
                <small>
                  Ghaznavi Block, Sector F, Bahria Town, Lahore
                </small>
              </div>
            </div>

          </div>
        </div>
      </div>


      {/* BOTTOM FOOTER */}
      <div className="footer-bottom">
        <div className='line'></div>
        <div className="section-wrap footer-bottom-inner">
          <span>Est 2026</span>

          <div>
            <b>LA FORZA 2026</b>
            <span>|</span>
            <a href="https://laforzagyms.com/#privacy">
              <b>Privacy Policy</b>
            </a>
            <span>|</span>
            <a href="https://laforzagyms.com/#terms">
              <b>Terms of Service</b>
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}

function About() {
  return <Shell><main className="inner-page"><section className="page-hero section-wrap"><SectionTag>Inside La Forza</SectionTag><h1>BUILT FOR<br /><span>THE WORK</span></h1><div className="page-intro"><p className="lead-copy">La Forza means strength. Not the kind you perform for a mirror, the kind you earn when the plan gets hard and you stay with it.</p><p>We built this club for the person who wants more than access. A clear method, coaches who pay attention, and a room that makes consistency feel electric. No posturing. Just serious training with good people.</p></div></section>
    <section className="code-section section-paper"><div className="section-wrap code-grid"><div><SectionTag>Our code</SectionTag><span className="mono-note">03 NON-NEGOTIABLES</span></div><div>{[['01','Purpose over noise','You should know what you are doing and why it matters.'],['02','Intensity with intelligence','Hard is not the same as useful. Train with ambition and enough care to keep showing up.'],['03','The room is a resource','Your progress is personal. Your energy is shared. We celebrate the quiet wins and the loud ones.']].map(([n,t,d])=><div className="code-row" key={n}><span>{n}</span><div><h2>{t}</h2><p>{d}</p></div></div>)}</div></div></section>
    <section className="expect-section section-dark"><div className="section-wrap expect-grid"><div><SectionTag>What to expect</SectionTag><h2>LEAVE<br /><span>DIFFERENT</span></h2></div><div className="expect-list">{['A program you can understand','Coaching that remembers your name','A baseline worth beating','A room with no spectators'].map((x,i)=><div key={x}><span>0{i+1}</span><b>{x}</b></div>)}<ArrowLink href="/join" >Come train with us</ArrowLink></div></div></section><FooterStrip /></main></Shell>;
}

const plans = [
  ['Basic', 'Rs 12,000', 'Build the habit', 'Gym access', 'All equipment included', 'Changing room access', 'Monthly membership'],
  ['La Forza Membership', 'Rs 21,000', 'Build the numbers'],
  ['Students / Groups', 'Rs 10,000', 'Build with friends'],
];

function Join() {
  const [plan, setPlan] = useState(plans[0][0]);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string,string>>({});
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget); const next: Record<string,string> = {};
    ['name','email','phone'].forEach(k => { if (!String(data.get(k)||'').trim()) next[k]='Required'; });
    if (String(data.get('email')||'').trim() && !String(data.get('email')).includes('@')) next.email='Use a valid email';
    setErrors(next); if (!Object.keys(next).length) setSubmitted(true);
  };
  return <Shell><main className="join-page"><div className="section-wrap join-grid"><div className="join-copy"><SectionTag>Start your run</SectionTag><h1>FIND YOUR<br /><span>PLACE</span></h1><p>Choose how you want to train. We'll take care of the rest, including showing you where to start on day one.</p><div className="join-points"><span>WHAT SEPARATES US?</span>{['National athletes / powerlifters as trainers','Machine maintenance 3× per week','Open on Sundays','Clean AF + deep cleans weekly','Olympic equipment / Powerbar + bumper plates'].map(x=><div key={x}><Check size={15}/>{x}</div>)}<b>And a lot more...</b></div></div>
    <div className="join-form-wrap">{submitted ? <div className="success-card"><span>REQUEST RECEIVED</span><h2>YOU ARE<br /><em>IN MOTION</em></h2><p>A coach from the club will reach out within one business day with your first session details.</p><ArrowLink href="/" filled>Back to home</ArrowLink></div> : <form className="join-form" onSubmit={submit} noValidate><div className="form-head"><span>01 / CHOOSE YOUR TRACK</span><b>STEP 01</b></div><div className="plan-grid">{plans.map(([name,price,copy])=><button type="button" key={name} className={plan===name?'selected':''} onClick={()=>setPlan(name)}><span>{name}</span><strong>{price}</strong><small>{copy}</small></button>)}</div><p className="selected-plan">SELECTED: <b>{plan}</b></p><div className="form-head form-head-2"><span>02 / TELL US WHO YOU ARE</span><b>STEP 02</b></div><div className="fields">{[['name','Your name','e.g. Alex Rivera','text'],['email','Email address','you@example.com','email'],['phone','Phone number','0300 0000000','tel']].map(([n,l,p,t])=><label key={n}><span>{l}</span><input name={n} type={t} placeholder={p} aria-invalid={Boolean(errors[n])}/>{errors[n]&&<small>{errors[n]}</small>}</label>)}</div><p className="form-note">By sending this, you are asking for a conversation, not signing a contract.</p><button className="submit-button" type="submit">Request your intro <ArrowUpRight size={17}/></button></form>}</div></div></main></Shell>;
}

function Router() {
  return <Switch><Route path="/" component={Home}/><Route path="/about" component={About}/><Route path="/join" component={Join}/><Route><Home/></Route></Switch>;
}
export default function App(){ return <Router/>; }
