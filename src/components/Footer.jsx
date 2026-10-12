import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const C = {
  saffron: '#ff6a00',
  saffronDark: '#d95500',
  green: '#138808',
  navy: '#0f1f3d',
  navyDark: '#0a1530',
}
const PHONE = '7980705054'

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/events', label: 'Events & Notices' },
  { to: '/contact', label: 'Contact' },
]

const services = [
  'Complaint Desk',
  'Scheme Information',
  'Health Camps',
  'Cleanliness Drives',
  'Youth Support',
]

const socials = [
  { name: 'Facebook', href: '#', path: 'M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z' },
  { name: 'X', href: '#', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
  { name: 'YouTube', href: '#', path: 'M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z' },
  { name: 'Instagram', href: '#', path: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM17.5 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z' },
]

/* ---------- small helper components ---------- */

function ColumnHeading({ children }) {
  return (
    <h6
      className="text-white text-uppercase fw-bold mb-4 pb-2 d-inline-block"
      style={{ letterSpacing: 1, borderBottom: `3px solid ${C.saffron}` }}
    >
      {children}
    </h6>
  )
}

function FooterLink({ to, children }) {
  const [hover, setHover] = useState(false)
  const style = {
    color: hover ? C.saffron : '#c9d3e6',
    transform: hover ? 'translateX(8px)' : 'translateX(0)',
    transition: 'all .3s ease',
    fontSize: 15,
  }
  const arrow = (
    <span
      style={{
        display: 'inline-block',
        width: hover ? 14 : 0,
        opacity: hover ? 1 : 0,
        overflow: 'hidden',
        transition: 'all .3s ease',
        color: C.saffron,
      }}
    >
      ›
    </span>
  )
  return (
    <Link
      to={to}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="text-decoration-none d-inline-flex align-items-center"
      style={style}
    >
      {arrow}
      {children}
    </Link>
  )
}

function SocialIcon({ name, href, path }) {
  const [hover, setHover] = useState(false)
  return (
    <a
      href={href}
      aria-label={name}
      title={name}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="d-grid"
      style={{
        width: 42,
        height: 42,
        placeItems: 'center',
        borderRadius: '50%',
        border: `2px solid ${hover ? C.saffron : 'rgba(255,255,255,.25)'}`,
        background: hover ? C.saffron : 'transparent',
        transform: hover ? 'translateY(-5px) rotate(360deg)' : 'translateY(0) rotate(0)',
        boxShadow: hover ? '0 10px 20px rgba(255,106,0,.4)' : 'none',
        transition: 'all .5s ease',
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff" aria-hidden="true">
        <path d={path} />
      </svg>
    </a>
  )
}

function ContactRow({ icon, children }) {
  const [hover, setHover] = useState(false)
  return (
    <div
      className="d-flex align-items-start gap-3 mb-3"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        transform: hover ? 'translateX(6px)' : 'translateX(0)',
        transition: 'transform .3s ease',
        fontSize: 15,
      }}
    >
      <span
        className="d-grid flex-shrink-0"
        style={{
          width: 34,
          height: 34,
          placeItems: 'center',
          borderRadius: 10,
          background: hover ? C.saffron : 'rgba(255,255,255,.08)',
          transition: 'background .3s ease',
        }}
      >
        {icon}
      </span>
      <span style={{ paddingTop: 5 }}>{children}</span>
    </div>
  )
}

/* ---------- main footer ---------- */

export default function Footer() {
  const [visible, setVisible] = useState(false)
  const [topHover, setTopHover] = useState(false)
  const [ctaHover, setCtaHover] = useState(false)
  const [callHover, setCallHover] = useState(false)
  const [waHover, setWaHover] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const reveal = (delay) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(30px)',
    transition: `all .7s ease ${delay}s`,
  })

  const pillBtn = (hover, bg, bgHover) => ({
    background: hover ? bgHover : bg,
    color: '#fff',
    border: 0,
    transform: hover ? 'translateY(-3px)' : 'translateY(0)',
    boxShadow: hover ? '0 10px 22px rgba(0,0,0,.35)' : '0 4px 12px rgba(0,0,0,.2)',
    transition: 'all .3s ease',
  })

  return (
    <footer ref={ref} style={{ background: C.navyDark, color: '#c9d3e6' }}>
      {/* ===== Call-to-action band ===== */}
      <div
        style={{
          background: `linear-gradient(120deg, ${C.saffron}, ${C.saffronDark})`,
          ...reveal(0),
        }}
      >
        <div className="container py-4 d-flex flex-wrap justify-content-between align-items-center gap-3">
          <div className="text-white">
            <div className="fw-bold" style={{ fontSize: 'clamp(18px, 2.5vw, 24px)' }}>
              কোনো সমস্যা আছে? আমাদের সাথে যোগাযোগ করুন
            </div>
            <div style={{ opacity: 0.95 }}>Have a problem? Reach out to the ward office today.</div>
          </div>
          <Link
            to="/contact"
            className="btn rounded-pill fw-bold px-4 py-2 text-decoration-none"
            onMouseEnter={() => setCtaHover(true)}
            onMouseLeave={() => setCtaHover(false)}
            style={{
              background: '#fff',
              color: C.saffronDark,
              border: 0,
              transform: ctaHover ? 'translateY(-4px) scale(1.04)' : 'translateY(0) scale(1)',
              boxShadow: ctaHover ? '0 12px 26px rgba(0,0,0,.3)' : '0 4px 12px rgba(0,0,0,.15)',
              transition: 'all .3s ease',
            }}
          >
            Contact Us{' '}
            <span
              style={{
                display: 'inline-block',
                transform: ctaHover ? 'translateX(6px)' : 'translateX(0)',
                transition: 'transform .3s ease',
              }}
            >
              →
            </span>
          </Link>
        </div>
      </div>

      {/* ===== Main columns ===== */}
      <div className="container py-5">
        <div className="row g-5">
          {/* Brand + social */}
          <div className="col-12 col-lg-4" style={reveal(0.1)}>
            <div className="d-flex align-items-center gap-3 mb-3">
              <span
                className="d-grid text-white fw-bold"
                style={{
                  width: 54,
                  height: 54,
                  placeItems: 'center',
                  borderRadius: '50%',
                  fontSize: 24,
                  background: `linear-gradient(135deg, ${C.saffron}, ${C.green})`,
                }}
              >
                ৭
              </span>
              <div className="lh-1">
                <strong className="d-block text-white fs-5">BJP Party Office</strong>
                <small style={{ color: C.saffron, fontWeight: 600 }}>7 No Ward</small>
              </div>
            </div>
            <p className="fw-semibold mb-2" style={{ color: C.saffron }}>
              ওয়ার্ডের মানুষের পাশে, সবার সাথে
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.7, maxWidth: 360 }}>
              A local point of contact for the residents of 7 No Ward. Share your problems,
              learn about government schemes and join our community programmes.
            </p>
            <div className="d-flex gap-2 mt-4">
              {socials.map((s) => (
                <SocialIcon key={s.name} {...s} />
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="col-6 col-lg-2" style={reveal(0.2)}>
            <ColumnHeading>Quick Links</ColumnHeading>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <FooterLink to={l.to}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="col-6 col-lg-3" style={reveal(0.3)}>
            <ColumnHeading>Our Services</ColumnHeading>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
              {services.map((s) => (
                <li key={s}>
                  <FooterLink to="/about">{s}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-12 col-lg-3" style={reveal(0.4)}>
            <ColumnHeading>Contact</ColumnHeading>
            <ContactRow icon="📍">28, Nalta Mahajati Rd, Nalta, Rajbari, Dum Dum, Kolkata, West Bengal 700028</ContactRow>
            <ContactRow icon="📞">
              <a href={`tel:+91${PHONE}`} className="text-decoration-none" style={{ color: '#fff', fontWeight: 600 }}>
                {PHONE}
              </a>
            </ContactRow>
            <ContactRow icon="🕒">Open: 6:30 PM – 10:30 PM</ContactRow>
            <div className="d-flex flex-wrap gap-2 mt-2">
              <a
                href={`tel:+91${PHONE}`}
                className="btn btn-sm rounded-pill fw-bold px-3"
                onMouseEnter={() => setCallHover(true)}
                onMouseLeave={() => setCallHover(false)}
                style={pillBtn(callHover, C.saffron, C.saffronDark)}
              >
                Call Now
              </a>
              <a
                href={`https://wa.me/91${PHONE}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm rounded-pill fw-bold px-3"
                onMouseEnter={() => setWaHover(true)}
                onMouseLeave={() => setWaHover(false)}
                style={pillBtn(waHover, '#1faa59', '#168a47')}
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Bottom bar ===== */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,.1)', background: 'rgba(0,0,0,.25)' }}>
        <div className="container py-3 d-flex flex-wrap justify-content-between align-items-center gap-2">
          <small style={{ opacity: 0.8 }}>
            © 2026 BJP Party Office, 7 No Ward 
          </small>
          <button
            type="button"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            onMouseEnter={() => setTopHover(true)}
            onMouseLeave={() => setTopHover(false)}
            className="d-grid fw-bold"
            style={{
              width: 40,
              height: 40,
              placeItems: 'center',
              borderRadius: '50%',
              border: `2px solid ${C.saffron}`,
              background: topHover ? C.saffron : 'transparent',
              color: topHover ? '#fff' : C.saffron,
              transform: topHover ? 'translateY(-5px)' : 'translateY(0)',
              transition: 'all .3s ease',
              cursor: 'pointer',
            }}
          >
            ↑
          </button>
        </div>
      </div>

      {/* Tricolour stripe at the very bottom */}
      <div className="d-flex" style={{ height: 6 }}>
        <div style={{ flex: 1, background: C.saffron }} />
        <div style={{ flex: 1, background: '#ffffff' }} />
        <div style={{ flex: 1, background: C.green }} />
      </div>
    </footer>
  )
}