import { useState, useEffect, useRef } from 'react'
import PageBanner from '../components/PageBanner.jsx'
import SectionTitle from '../components/SectionTitle.jsx'

const C = {
  saffron: '#ff6a00',
  saffronDark: '#d95500',
  green: '#138808',
  navy: '#0f1f3d',
}
const PHONE = '8240696947'

/* ---------- data ---------- */

const infoCards = [
  { icon: '📞', title: 'Call Us', text: PHONE, href: `tel:+91${PHONE}` },
  { icon: '💬', title: 'WhatsApp', text: 'Send a message', href: `https://wa.me/91${PHONE}`, external: true },
  { icon: '📍', title: 'Visit Us', text: '7 No Ward Party Office (add full address)', href: '#map' },
  { icon: '🕒', title: 'Office Hours', text: '10:00 AM – 7:00 PM', href: '#form' },
]

const subjects = [
  'Complaint (road, water, light, drainage)',
  'Government scheme information',
  'Health camp',
  'Volunteer registration',
  'Other',
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

function Field({ label, error, as = 'input', children, ...props }) {
  const [f, setF] = useState(false)
  const Tag = as
  return (
    <div className="mb-3">
      <label
        className="form-label fw-semibold"
        style={{ color: error ? '#dc3545' : f ? C.saffron : C.navy, transition: 'color .3s ease' }}
      >
        {label}
      </label>
      <Tag
        {...props}
        onFocus={() => setF(true)}
        onBlur={() => setF(false)}
        className={as === 'select' ? 'form-select' : 'form-control'}
        style={{
          borderRadius: 12,
          padding: '12px 14px',
          borderColor: error ? '#dc3545' : f ? C.saffron : '#dee2e6',
          boxShadow: f ? '0 0 0 .25rem rgba(255,106,0,.18)' : 'none',
          transform: f ? 'translateY(-2px)' : 'none',
          transition: 'all .3s ease',
        }}
      >
        {children}
      </Tag>
      {error && <div className="small mt-1" style={{ color: '#dc3545' }}>{error}</div>}
    </div>
  )
}

/* ---------- page ---------- */

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', subject: subjects[0], msg: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [btnHover, setBtnHover] = useState(false)
  const [mapBtnHover, setMapBtnHover] = useState(false)
  const [bounce, setBounce] = useState(false)

  // bouncing pin on the map placeholder
  useEffect(() => {
    const id = setInterval(() => setBounce((b) => !b), 700)
    return () => clearInterval(id)
  }, [])

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' })
    if (sent) setSent(false)
  }

  const validate = () => {
    const er = {}
    if (!form.name.trim()) er.name = 'Please enter your name.'
    if (form.phone.trim() && !/^\d{10}$/.test(form.phone.trim()))
      er.phone = 'Enter a 10-digit phone number, or leave it empty.'
    if (!form.msg.trim()) er.msg = 'Please write your message.'
    return er
  }

  const send = () => {
    const er = validate()
    setErrors(er)
    if (Object.keys(er).length) return
    const text = encodeURIComponent(
      `Name: ${form.name}\nPhone: ${form.phone || '-'}\nSubject: ${form.subject}\nMessage: ${form.msg}`
    )
    window.open(`https://wa.me/91${PHONE}?text=${text}`, '_blank')
    setSent(true)
    setForm({ name: '', phone: '', subject: subjects[0], msg: '' })
  }

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

      {/* ===== Form + map ===== */}
      <section className="py-5 mt-4">
        <div className="container py-4">
          <SectionTitle>Send Us a Message</SectionTitle>

          <div className="row g-4">
            {/* Form */}
            <Reveal from="left" className="col-12 col-lg-7">
              <div
                id="form"
                className="p-4 p-md-5 h-100"
                style={{ background: '#fff', borderRadius: 20, boxShadow: '0 12px 40px rgba(15,31,61,.1)' }}
              >
                <h5 className="fw-bold mb-1" style={{ color: C.navy }}>Tell us how we can help</h5>
                <p className="text-secondary small mb-4">
                  Your message opens in WhatsApp so it reaches the office directly.
                </p>

                {sent && (
                  <div
                    className="p-3 mb-3 fw-semibold"
                    style={{
                      borderRadius: 12,
                      background: '#e7f6e7',
                      color: C.green,
                      borderLeft: `5px solid ${C.green}`,
                    }}
                  >
                    ✓ WhatsApp opened with your message. Please press send there to complete it.
                  </div>
                )}

                <div className="row">
                  <div className="col-12 col-md-6">
                    <Field label="Your Name" name="name" value={form.name} onChange={change} error={errors.name} placeholder="Full name" />
                  </div>
                  <div className="col-12 col-md-6">
                    <Field label="Phone Number" name="phone" type="tel" value={form.phone} onChange={change} error={errors.phone} placeholder="10-digit number (optional)" />
                  </div>
                </div>

                <Field label="Subject" as="select" name="subject" value={form.subject} onChange={change}>
                  {subjects.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </Field>

                <Field label="Message" as="textarea" rows="5" name="msg" value={form.msg} onChange={change} error={errors.msg} placeholder="Write your problem or message..." />

                <button
                  type="button"
                  onClick={send}
                  onMouseEnter={() => setBtnHover(true)}
                  onMouseLeave={() => setBtnHover(false)}
                  className="btn rounded-pill fw-bold px-4 py-2 d-inline-flex align-items-center gap-2"
                  style={{
                    background: btnHover ? C.saffronDark : C.saffron,
                    color: '#fff',
                    border: 0,
                    transform: btnHover ? 'translateY(-4px)' : 'none',
                    boxShadow: btnHover ? '0 14px 28px rgba(255,106,0,.45)' : '0 4px 12px rgba(255,106,0,.25)',
                    transition: 'all .3s ease',
                  }}
                >
                  Send via WhatsApp
                  <span
                    style={{
                      display: 'inline-block',
                      transform: btnHover ? 'translateX(6px) rotate(-20deg)' : 'none',
                      transition: 'transform .3s ease',
                    }}
                  >
                    ➤
                  </span>
                </button>
              </div>
            </Reveal>

            {/* Map + details */}
            <Reveal from="right" className="col-12 col-lg-5">
              <div
                id="map"
                className="p-4 h-100 d-flex flex-column"
                style={{ background: '#fff', borderRadius: 20, boxShadow: '0 12px 40px rgba(15,31,61,.1)' }}
              >
                <h5 className="fw-bold mb-3" style={{ color: C.navy }}>Find the Office</h5>

                {/* Replace this box with a Google Maps <iframe> embed when you have the address */}
                <div
                  className="d-grid position-relative overflow-hidden mb-3"
                  style={{
                    height: 230,
                    placeItems: 'center',
                    borderRadius: 16,
                    background:
                      'repeating-linear-gradient(45deg,#eef2f7 0 12px,#f8fafc 12px 24px)',
                    border: '2px dashed #cfd8e6',
                  }}
                >
                  <div className="text-center">
                    <div
                      style={{
                        fontSize: 44,
                        display: 'inline-block',
                        transform: bounce ? 'translateY(-14px)' : 'translateY(0)',
                        transition: 'transform .7s ease',
                      }}
                    >
                      📍
                    </div>
                    <div
                      className="mx-auto"
                      style={{
                        width: 26,
                        height: 7,
                        borderRadius: '50%',
                        background: 'rgba(15,31,61,.25)',
                        transform: bounce ? 'scale(.6)' : 'scale(1)',
                        transition: 'transform .7s ease',
                      }}
                    />
                    <div className="small text-secondary mt-2">Google Map will be placed here</div>
                  </div>
                </div>

                <div className="small text-secondary mb-1">📍 7 No Ward Party Office, (your full address here)</div>
                <div className="small text-secondary mb-1">🕒 Open daily: 10:00 AM – 7:00 PM</div>
                <div className="small text-secondary mb-3">
                  📞 <a href={`tel:+91${PHONE}`} className="text-decoration-none fw-semibold" style={{ color: C.saffronDark }}>{PHONE}</a>
                </div>

                <a
                  href="https://www.google.com/maps"
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => setMapBtnHover(true)}
                  onMouseLeave={() => setMapBtnHover(false)}
                  className="btn rounded-pill fw-bold mt-auto align-self-start px-4"
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
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}