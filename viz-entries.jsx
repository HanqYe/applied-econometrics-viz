/* The visualization gallery. Three layout variants (cards / list / grid),
   chosen by the `layout` prop (a tweak on the landing page). The `cards`
   variant auto-scrolls slowly (marquee) and pauses on hover/drag. */

const VIZ_ENTRIES = [
  {
    n: '01', title: 'The FWL Theorem',
    topic: 'Projection · Orthogonality · OLS',
    blurb: 'Watch two correlated regressors become an orthogonal basis — the geometry behind Frisch–Waugh–Lovell.',
    status: 'live', href: 'fwl_demo_v10.html',
  },
  {
    n: '02', title: 'Fixed Effects',
    topic: 'The within transformation',
    blurb: 'How absorbing group means sweeps out unit-level confounding, one demeaning at a time.',
    status: 'live', href: 'fe_demo_v1.html',
  },
  {
    n: '03', title: 'To be continued',
    topic: 'Future construction',
    blurb: 'More chapters of the book, rendered as geometry.',
    status: 'future',
  },
];

const STATUS = {
  live: { label: 'Live', cls: 'st-live' },
  soon: { label: 'Coming soon', cls: 'st-soon' },
  future: { label: 'In construction', cls: 'st-future' },
};

function StatusChip({ status }) {
  const s = STATUS[status];
  return (
    <span className={'st ' + s.cls}>
      {status === 'live' && <span className="st-dot" />}
      {s.label}
    </span>
  );
}

/* A single card used by both `cards` and `grid` layouts. */
function VizCard({ e, clone }) {
  const live = e.status === 'live';
  const inner = (
    <React.Fragment>
      <div className="card-top">
        <span className="card-num">{e.n}</span>
        <StatusChip status={e.status} />
      </div>
      <div className="card-body">
        <h3 className="card-title">{e.title}</h3>
        <p className="card-topic">{e.topic}</p>
        <p className="card-blurb">{e.blurb}</p>
      </div>
      <div className="card-foot">
        {live
          ? <span className="card-go">Open visualization <i className="arr">↗</i></span>
          : <span className="card-go muted">{e.status === 'future' ? 'Not yet drawn' : 'On the way'}</span>}
      </div>
    </React.Fragment>
  );
  const cls = 'viz-card' + (live ? ' is-live' : '') + (e.status === 'future' ? ' is-future' : '');
  const extra = clone ? { 'aria-hidden': 'true', tabIndex: -1 } : {};
  return live
    ? <a className={cls} href={e.href} {...extra}>{inner}</a>
    : <div className={cls} aria-disabled="true" {...(clone ? { 'aria-hidden': 'true' } : {})}>{inner}</div>;
}

/* A single row used by the `list` layout. */
function VizRow({ e }) {
  const live = e.status === 'live';
  const inner = (
    <React.Fragment>
      <span className="row-num">{e.n}</span>
      <span className="row-main">
        <span className="row-title">{e.title}</span>
        <span className="row-topic">{e.topic}</span>
      </span>
      <span className="row-right">
        <StatusChip status={e.status} />
        <i className="arr row-arr">↗</i>
      </span>
    </React.Fragment>
  );
  const cls = 'viz-row' + (live ? ' is-live' : '') + (e.status === 'future' ? ' is-future' : '');
  return live
    ? <a className={cls} href={e.href}>{inner}</a>
    : <div className={cls} aria-disabled="true">{inner}</div>;
}

/* Horizontal rail with gentle auto-scroll. Entries are duplicated so the
   loop is seamless; motion pauses on hover / drag and when off-screen. */
function CardRail() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const N = VIZ_ENTRIES.length;
    let raf = 0, paused = false, onScreen = true, wrapAt = 0, pos = 0;
    const speed = 0.45;

    const measure = () => {
      const kids = el.children;
      if (kids.length > N) wrapAt = kids[N].offsetLeft - kids[0].offsetLeft;
    };
    measure();
    const ro = new ResizeObserver(measure); ro.observe(el);

    const tick = () => {
      if (!paused && wrapAt > 0) {
        pos += speed;
        if (pos >= wrapAt) pos -= wrapAt;
        el.scrollLeft = pos;
      }
      raf = onScreen ? requestAnimationFrame(tick) : 0;
    };
    const start = () => { if (!raf && onScreen) raf = requestAnimationFrame(tick); };
    const stop = () => { if (raf) { cancelAnimationFrame(raf); raf = 0; } };

    const io = new IntersectionObserver((e) => { onScreen = e[0].isIntersecting; if (onScreen) start(); else stop(); }, { threshold: 0 });
    io.observe(el);

    const on = () => { paused = true; };
    const off = () => { pos = el.scrollLeft; paused = false; };
    el.addEventListener('pointerenter', on);
    el.addEventListener('pointerleave', off);
    el.addEventListener('pointerdown', on);
    window.addEventListener('pointerup', off);
    start();

    return () => {
      stop(); ro.disconnect(); io.disconnect();
      el.removeEventListener('pointerenter', on);
      el.removeEventListener('pointerleave', off);
      el.removeEventListener('pointerdown', on);
      window.removeEventListener('pointerup', off);
    };
  }, []);

  const items = VIZ_ENTRIES.concat(VIZ_ENTRIES);
  return (
    <div className="gal-rail-wrap">
      <div className="gal-rail" ref={ref}>
        {items.map((e, i) => <VizCard key={i} e={e} clone={i >= VIZ_ENTRIES.length} />)}
      </div>
    </div>
  );
}

function EntryGallery({ layout = 'cards' }) {
  if (layout === 'list') {
    return (
      <div className="gal-list">
        {VIZ_ENTRIES.map((e) => <VizRow key={e.n} e={e} />)}
      </div>
    );
  }
  if (layout === 'grid') {
    return (
      <div className="gal-grid">
        {VIZ_ENTRIES.map((e) => <VizCard key={e.n} e={e} />)}
      </div>
    );
  }
  return <CardRail />;
}

Object.assign(window, { EntryGallery, VIZ_ENTRIES, StatusChip, STATUS });
