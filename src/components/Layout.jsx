
import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

const C = {
  saffron: '#ff6a00',
  saffronDark: '#d95500',
}

const PHONE = '8240696947'

function FloatBtn({ href, bg, label, bottom, external, pulse, children }) {
  const [h, setH] = useState(false)

  return (
    <a
      href={href}
      aria-label={label}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      className="position-fixed d-grid text-decoration-none"
      style={{
        right: 18,
        bottom,
        width: 54,
        height: 54,
        placeItems: 'center',
        borderRadius: '50%',
        background: h ? C.saffronDark : bg,
        color: '#fff',
        fontSize: 24,
        zIndex: 1040,
        transform: h ? 'scale(1.15) rotate(-8deg)' : 'scale(1)',
        boxShadow: pulse
          ? `0 0 0 14px ${bg}00, 0 8px 20px rgba(0,0,0,.3)`
          : `0 0 0 0 ${bg}88, 0 8px 20px rgba(0,0,0,.3)`,
        transition: 'transform .3s ease, box-shadow 1.1s ease, background .3s ease',
      }}
    >
      {children}
    </a>
  )
}

export default function Layout() {
  const { pathname } = useLocation()
  const [fade, setFade] = useState(false)
  const [pulse, setPulse] = useState(false)

  // Scroll to top and fade in on every route change
  useEffect(() => {
    window.scrollTo(0, 0)
    setFade(false)

    const t = setTimeout(() => setFade(true), 40)
    return () => clearTimeout(t)
  }, [pathname])

  // Breathing glow on the floating buttons
  useEffect(() => {
    const id = setInterval(() => setPulse((p) => !p), 1200)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ overflowX: 'hidden' }}>
      <Navbar />

      <main
        style={{
          opacity: fade ? 1 : 0,
          transform: fade ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity .5s ease, transform .5s ease',
          minHeight: '60vh',
        }}
      >
        <Outlet />
      </main>

      <Footer />

      {/* WhatsApp Button — Saffron */}
      <FloatBtn
        href={`https://wa.me/91${PHONE}`}
        bg={C.saffron}
        label="WhatsApp"
        bottom={88}
        external
        pulse={!pulse}
      >
        💬
      </FloatBtn>

      {/* Call Button — Saffron */}
      <FloatBtn
        href={`tel:+91${PHONE}`}
        bg={C.saffron}
        label="Call office"
        bottom={22}
        pulse={pulse}
      >
        📞
      </FloatBtn>
    </div>
  )
}
