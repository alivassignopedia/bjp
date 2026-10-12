import { useState, useEffect, useRef } from 'react'
import PageBanner from '../components/PageBanner.jsx'
import SectionTitle from '../components/SectionTitle.jsx'

const C = {
  saffron: '#ff6a00',
  saffronDark: '#d95500',
  green: '#138808',
  navy: '#0f1f3d',
}
const PHONE = '7980705054'
const ADDRESS = '28, Nalta Mahajati Rd, Nalta, Rajbari, Dum Dum, Kolkata, West Bengal 700028'

/* ---------- data ---------- */

const infoCards = [
  { icon: '📞', title: 'Call Us', text: PHONE, href: `tel:+91${PHONE}` },
  { icon: '💬', title: 'WhatsApp', text: 'Send a message', href: `https://wa.me/91${PHONE}`, external: true },
  { icon: '📍', title: 'Visit Us', text: ADDRESS, href: '#map' },
  { icon: '🕒', title: 'Office Hours', text: '6:30 PM – 10:30 PM', href: '#map' },
]

/* ---------- helpers ---------- */

function Reveal({ children, delay = 0, from = 'up', className = '' }) {
  const [v, setV] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setV(true)
          io.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const hidden =
    from === 'left' ? 'translateX(-50px)' : from === 'right' ? 'translateX(50px)' : 'translateY(40px)'
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: v ? 1 : 0,
        transform: v ? 'none' : hidden,
        transition: `all .8s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

function InfoCard({ icon, title, text, href, external }) {
  const [h, setH] = useState(false)
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      className="d-flex align-items-center gap-3 p-3 text-decoration-none h-100"
      style={{
        color: C.navy,
        background: '#fff',
        borderRadius: 16,
        transform: h ? 'translateY(-10px)' : 'none',
        boxShadow: h ? '0 18px 40px rgba(255,106,0,.22)' : '0 4px 18px rgba(15,31,61,.08)',
        borderBottom: `4px solid ${h ? C.saffron : 'transparent'}`,
        transition: 'all .35s ease',
      }}
    >
      <span
        className="d-grid flex-shrink-0"
        style={{
          width: 56,
          height: 56,
          placeItems: 'center',
          borderRadius: 14,
          fontSize: 26,
          background: h ? C.saffron : '#fff1e4',
          transform: h ? 'rotate(-10deg) scale(1.1)' : 'none',
          transition: 'all .35s ease',
        }}
      >
        {icon}
      </span>
      <span className="lh-sm">
        <strong className="d-block">{title}</strong>
        <span className="small text-secondary">{text}</span>
      </span>
    </a>
  )
}

/* ---------- page ---------- */

export default function Contact() {
  const [mapBtnHover, setMapBtnHover] = useState(false)

  return (
    <>
      <PageBanner
        title="Contact Us"
        subtitle="We are happy to help. Call, message or visit the ward office."
        current="Contact"
      />

      {/* ===== Info cards ===== */}
      <div className="container position-relative" style={{ marginTop: -44, zIndex: 5 }}>
        <div className="row g-3">
          {infoCards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1} className="col-12 col-sm-6 col-lg-3">
              <InfoCard {...c} />
            </Reveal>
          ))}
        </div>
      </div>

      {/* ===== Map ===== */}
      <section className="py-5 mt-4">
        <div className="container py-4">
          <SectionTitle>Find the Office</SectionTitle>

          <Reveal>
            <div
              id="map"
              className="p-4"
              style={{ background: '#fff', borderRadius: 20, boxShadow: '0 12px 40px rgba(15,31,61,.1)', scrollMarginTop: 100 }}
            >
              <div className="row g-4 align-items-center">
                <div className="col-12 col-lg-8">
                  <iframe
                    title="Office location map"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`}
                    width="100%"
                    height="360"
                    style={{ border: 0, borderRadius: 16 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>

                <div className="col-12 col-lg-4 d-flex flex-column">
                  <h5 className="fw-bold mb-3" style={{ color: C.navy }}>Ward Office</h5>
                  <div className="small text-secondary mb-2">📍 {ADDRESS}</div>
                  <div className="small text-secondary mb-2">🕒 Open daily: 6:30 PM – 10:30 PM</div>
                  <div className="small text-secondary mb-4">
                    📞{' '}
                    <a href={`tel:+91${PHONE}`} className="text-decoration-none fw-semibold" style={{ color: C.saffronDark }}>
                      {PHONE}
                    </a>
                  </div>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => setMapBtnHover(true)}
                    onMouseLeave={() => setMapBtnHover(false)}
                    className="btn rounded-pill fw-bold align-self-start px-4"
                    style={{
                      background: mapBtnHover ? C.navy : 'transparent',
                      color: mapBtnHover ? '#fff' : C.navy,
                      border: `2px solid ${C.navy}`,
                      transform: mapBtnHover ? 'translateY(-3px)' : 'none',
                      transition: 'all .3s ease',
                    }}
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}