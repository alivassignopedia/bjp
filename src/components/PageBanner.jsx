import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const C = {
  saffron: '#ff6a00',
  saffronDark: '#d95500',
  green: '#138808',
  navy: '#0f1f3d',
}

// floating decorative circles; `depth` controls how far each one moves with the mouse
const circles = [
  { size: 240, top: -90, left: '4%', depth: 28, opacity: 0.1 },
  { size: 150, top: '58%', left: '82%', depth: -38, opacity: 0.14 },
  { size: 90, top: '12%', left: '72%', depth: 55, opacity: 0.18 },
  { size: 320, top: '45%', left: '-6%', depth: -22, opacity: 0.08 },
  { size: 60, top: '70%', left: '40%', depth: 45, opacity: 0.16 },
]

function Crumb({ to, children }) {
  const [hover, setHover] = useState(false)
  return (
    <Link
      to={to}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="text-decoration-none"
      style={{
        color: '#fff',
        opacity: hover ? 1 : 0.85,
        borderBottom: `2px solid ${hover ? '#fff' : 'transparent'}`,
        transition: 'all .3s ease',
      }}
    >
      {children}
    </Link>
  )
}

// Usage: <PageBanner title="About Our Office" subtitle="Our story, our work, our team" current="About" />
export default function PageBanner({ title, subtitle, current }) {
  const [shown, setShown] = useState(false)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const t = setTimeout(() => setShown(true), 80)
    return () => clearTimeout(t)
  }, [])

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    setMouse({
      x: (e.clientX - r.left) / r.width - 0.5,
      y: (e.clientY - r.top) / r.height - 0.5,
    })
  }
  const onLeave = () => setMouse({ x: 0, y: 0 })

  const rise = (delay) => ({
    opacity: shown ? 1 : 0,
    transform: shown ? 'translateY(0)' : 'translateY(28px)',
    transition: `all .7s ease ${delay}s`,
  })

  return (
    <section
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="position-relative overflow-hidden text-center text-white"
      style={{
        padding: '70px 0 64px',
        background: `linear-gradient(120deg, ${C.saffron}, ${C.saffronDark} 70%, #b84700)`,
      }}
    >
      {/* subtle diagonal pattern */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, rgba(255,255,255,.06) 0 10px, rgba(255,255,255,0) 10px 20px)',
          pointerEvents: 'none',
        }}
      />

      {/* mouse-parallax circles */}
      {circles.map((c, i) => (
        <div
          key={i}
          className="position-absolute rounded-circle"
          style={{
            width: c.size,
            height: c.size,
            top: c.top,
            left: c.left,
            background: '#ffffff',
            opacity: shown ? c.opacity : 0,
            transform: `translate(${mouse.x * c.depth}px, ${mouse.y * c.depth}px) scale(${shown ? 1 : 0.6})`,
            transition: 'transform .35s ease-out, opacity 1s ease',
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* content */}
      <div className="container position-relative" style={{ zIndex: 1 }}>
        <h2
          className="fw-bold mb-2"
          style={{
            fontSize: 'clamp(30px, 5vw, 48px)',
            textShadow: '0 4px 18px rgba(0,0,0,.2)',
            ...rise(0.1),
          }}
        >
          {title}
        </h2>

        {subtitle && (
          <p
            className="mx-auto mb-3"
            style={{ maxWidth: 560, fontSize: 17, opacity: 0.95, ...rise(0.2) }}
          >
            {subtitle}
          </p>
        )}

        {/* breadcrumb */}
        <div
          className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill small fw-semibold"
          style={{ background: 'rgba(255,255,255,.18)', ...rise(0.3) }}
        >
          <Crumb to="/">Home</Crumb>
          <span style={{ opacity: 0.7 }}>›</span>
          <span>{current || title}</span>
        </div>
      </div>

      {/* tricolour stripe */}
      <div className="position-absolute bottom-0 start-0 end-0 d-flex" style={{ height: 8, zIndex: 2 }}>
        <div style={{ flex: 1, background: C.saffron }} />
        <div style={{ flex: 1, background: '#ffffff' }} />
        <div style={{ flex: 1, background: C.green }} />
      </div>
    </section>
  )
}