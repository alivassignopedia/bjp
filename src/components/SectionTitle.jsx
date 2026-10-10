import { useState, useEffect, useRef } from 'react'

const C = {
  saffron: '#ff6a00',
  green: '#138808',
  navy: '#0f1f3d',
}

// Usage: <SectionTitle bn="আমরা কী করি">What We Do</SectionTitle>
// Add `light` when the section background is dark.
export default function SectionTitle({ children, bn, light = false }) {
  const [visible, setVisible] = useState(false)
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
      { threshold: 0.3 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="text-center mb-5">
      {bn && (
        <div
          style={{
            color: C.saffron,
            fontWeight: 700,
            fontSize: 18,
            marginBottom: 4,
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(-14px)',
            transition: 'all .6s ease',
          }}
        >
          {bn}
        </div>
      )}

      <h3
        className="fw-bold mb-0"
        style={{
          color: light ? '#ffffff' : C.navy,
          fontSize: 'clamp(26px, 4vw, 36px)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'all .7s ease .1s',
        }}
      >
        {children}
      </h3>

      {/* Animated tricolour underline */}
      <div
        className="d-flex mx-auto mt-3 overflow-hidden"
        style={{
          width: visible ? 90 : 0,
          height: 4,
          borderRadius: 4,
          transition: 'width .8s ease .35s',
        }}
      >
        <div style={{ flex: 1, background: C.saffron }} />
        <div style={{ flex: 1, background: light ? '#ffffff' : '#e3e3e3' }} />
        <div style={{ flex: 1, background: C.green }} />
      </div>
    </div>
  )
}