import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const C = {
  saffron: '#ff6a00',
  saffronDark: '#d95500',
  green: '#138808',
  navy: '#0f1f3d',
}
const PHONE = '8240696947'

function NavItem({ to, end, children }) {
  const [hover, setHover] = useState(false)
  return (
    <li className="nav-item">
      <NavLink
        to={to}
        end={end}
        className="nav-link position-relative px-2 py-2"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={({ isActive }) => ({
          color: isActive || hover ? C.saffron : C.navy,
          fontWeight: 600,
          fontSize: 15,
          transition: 'color .3s ease',
        })}
      >
        {({ isActive }) => (
          <>
            {children}
            <span
              style={{
                position: 'absolute',
                left: 8,
                right: 8,
                bottom: 2,
                height: 3,
                borderRadius: 3,
                background: C.saffron,
                transformOrigin: 'left',
                transform: isActive || hover ? 'scaleX(1)' : 'scaleX(0)',
                transition: 'transform .35s ease',
              }}
            />
          </>
        )}
      </NavLink>
    </li>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [shown, setShown] = useState(false)
  const [logoHover, setLogoHover] = useState(false)
  const [btnHover, setBtnHover] = useState(false)
  const { pathname } = useLocation()

  // slide-down entrance
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 50)
    return () => clearTimeout(t)
  }, [])

  // shadow after scrolling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // close mobile menu on page change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header
      className="sticky-top"
      style={{
        background: 'rgba(255,255,255,.96)',
        backdropFilter: 'blur(8px)',
        boxShadow: scrolled ? '0 6px 24px rgba(15,31,61,.14)' : '0 1px 0 rgba(0,0,0,.06)',
        transform: shown ? 'translateY(0)' : 'translateY(-100%)',
        opacity: shown ? 1 : 0,
        transition: 'transform .6s ease, opacity .6s ease, box-shadow .3s ease',
        zIndex: 1030,
      }}
    >
      <nav className="navbar navbar-expand-md py-2">
        <div className="container">
          {/* Brand */}
          <NavLink
            to="/"
            className="navbar-brand d-flex align-items-center gap-3 m-0"
            onMouseEnter={() => setLogoHover(true)}
            onMouseLeave={() => setLogoHover(false)}
          >
            <img
              src="/image.png"
              alt="BJP logo"
              style={{
                height: 50,
                width: 'auto',
                objectFit: 'contain',
                transform: logoHover ? 'rotate(-6deg) scale(1.1)' : 'rotate(0) scale(1)',
                filter: logoHover ? 'drop-shadow(0 4px 8px rgba(255,106,0,.45))' : 'none',
                transition: 'all .35s ease',
              }}
            />
            <span className="lh-1">
              <strong
                className="d-block"
                style={{ color: C.saffron, fontSize: 19, letterSpacing: '.2px' }}
              >
                BJP Party Office
              </strong>
              <small style={{ color: C.navy, fontWeight: 600, fontSize: 14 }}>7 No Ward</small>
            </span>
          </NavLink>

          {/* Mobile toggle */}
          <button
            className="navbar-toggler border-0 shadow-none"
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Links */}
          <div className={`collapse navbar-collapse ${open ? 'show' : ''}`}>
            <ul className="navbar-nav mx-auto gap-md-3 align-items-md-center pt-3 pt-md-0">
              <NavItem to="/" end>Home</NavItem>
              <NavItem to="/about">About</NavItem>
              <NavItem to="/events">Events</NavItem>
              <NavItem to="/contact">Contact</NavItem>
            </ul>

            <a
              href={`tel:+91${PHONE}`}
              className="btn rounded-pill fw-bold d-inline-flex align-items-center gap-2 mt-3 mt-md-0 px-4"
              onMouseEnter={() => setBtnHover(true)}
              onMouseLeave={() => setBtnHover(false)}
              style={{
                background: btnHover ? C.saffronDark : C.saffron,
                color: '#fff',
                border: 0,
                transform: btnHover ? 'translateY(-3px)' : 'translateY(0)',
                boxShadow: btnHover
                  ? '0 10px 22px rgba(255,106,0,.45)'
                  : '0 4px 12px rgba(255,106,0,.25)',
                transition: 'all .3s ease',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  transform: btnHover ? 'rotate(-15deg) scale(1.15)' : 'rotate(0)',
                  transition: 'transform .3s ease',
                }}
              >
                📞
              </span>
              {PHONE}
            </a>
          </div>
        </div>
      </nav>

      {/* Tricolour stripe */}
      <div className="d-flex" style={{ height: 4 }}>
        <div style={{ flex: 1, background: C.saffron }} />
        <div style={{ flex: 1, background: '#ffffff', borderTop: '1px solid #eee' }} />
        <div style={{ flex: 1, background: C.green }} />
      </div>
    </header>
  )
}