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

const subjects = [
  'রাস্তা সংক্রান্ত অভিযোগ',
  'পানীয় জলের অভিযোগ',
  'রাস্তার আলোর অভিযোগ',
  'নিকাশি / ড্রেনেজ সংক্রান্ত অভিযোগ',
  'আবর্জনা / ময়লা সংক্রান্ত অভিযোগ',
  'বিদ্যুৎ সংক্রান্ত অভিযোগ',
  'অন্যান্য অভিযোগ',
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

const empty = { name: '', ward: '', phone: '', address: '', subject: subjects[0], msg: '' }

export default function Complaint() {
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [btnHover, setBtnHover] = useState(false)

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' })
    if (sent) setSent(false)
  }

  const validate = () => {
    const er = {}
    if (!form.name.trim()) er.name = 'অনুগ্রহ করে আপনার নাম লিখুন।'
    if (!form.ward.trim()) er.ward = 'অনুগ্রহ করে ওয়ার্ড নম্বর লিখুন।'
    if (!/^\d{10}$/.test(form.phone.trim())) er.phone = 'সঠিক ১০ সংখ্যার ফোন নম্বর লিখুন।'
    if (!form.msg.trim()) er.msg = 'অনুগ্রহ করে অভিযোগের বিবরণ লিখুন।'
    return er
  }

  const send = () => {
    const er = validate()
    setErrors(er)
    if (Object.keys(er).length) return
    const text = encodeURIComponent(
      `*অভিযোগ জানান*\n\n` +
        `নাম: ${form.name}\n` +
        `ওয়ার্ড নম্বর: ${form.ward}\n` +
        `ফোন নম্বর: ${form.phone}\n` +
        `ঠিকানা / ল্যান্ডমার্ক: ${form.address || '-'}\n` +
        `অভিযোগের ধরন: ${form.subject}\n\n` +
        `বিবরণ: ${form.msg}`
    )
    window.open(`https://wa.me/91${PHONE}?text=${text}`, '_blank')
    setSent(true)
    setForm(empty)
  }

  return (
    <>
      <PageBanner
        title="অভিযোগ জানান"
        subtitle="আপনার এলাকার সমস্যা আমাদের জানান। ওয়ার্ড অফিস দ্রুত ব্যবস্থা নেবে।"
        current="অভিযোগ জানান"
      />

      <section className="py-5">
        <div className="container py-4" style={{ maxWidth: 820 }}>
          <SectionTitle>অভিযোগ ফর্ম</SectionTitle>

          <Reveal>
            <div
              className="p-4 p-md-5"
              style={{ background: '#fff', borderRadius: 20, boxShadow: '0 12px 40px rgba(15,31,61,.1)' }}
            >
              <h5 className="fw-bold mb-1" style={{ color: C.navy }}>আপনার অভিযোগ লিখুন</h5>
              <p className="text-secondary small mb-4">
                ফর্ম পূরণ করে নিচের বোতামে চাপ দিলে আপনার তথ্য সহ WhatsApp খুলবে। সেখানে "Send" চাপলেই অভিযোগ ওয়ার্ড অফিসে পৌঁছে যাবে।
              </p>

              {sent && (
                <div
                  className="p-3 mb-3 fw-semibold"
                  style={{ borderRadius: 12, background: '#e7f6e7', color: C.green, borderLeft: `5px solid ${C.green}` }}
                >
                  ✓ WhatsApp খুলেছে। অভিযোগ পাঠাতে সেখানে "Send" চাপুন।
                </div>
              )}

              <div className="row">
                <div className="col-12 col-md-6">
                  <Field label="আপনার নাম *" name="name" value={form.name} onChange={change} error={errors.name} placeholder="পুরো নাম" />
                </div>
                <div className="col-12 col-md-6">
                  <Field label="ওয়ার্ড নম্বর *" name="ward" value={form.ward} onChange={change} error={errors.ward} placeholder="আপনার ওয়ার্ড নম্বর" />
                </div>
                <div className="col-12 col-md-6">
                  <Field label="ফোন নম্বর *" name="phone" type="tel" inputMode="numeric" maxLength={10} value={form.phone} onChange={change} error={errors.phone} placeholder="১০ সংখ্যার মোবাইল নম্বর" />
                </div>
                <div className="col-12 col-md-6">
                  <Field label="ঠিকানা / ল্যান্ডমার্ক" name="address" value={form.address} onChange={change} placeholder="সমস্যাটি কোথায়?" />
                </div>
              </div>

              <Field label="অভিযোগের ধরন *" as="select" name="subject" value={form.subject} onChange={change}>
                {subjects.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </Field>

              <Field
                label="অভিযোগের বিবরণ *"
                as="textarea"
                rows="5"
                name="msg"
                value={form.msg}
                onChange={change}
                error={errors.msg}
                placeholder="সমস্যাটি এবং তার জায়গা বিস্তারিত লিখুন..."
              />

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
                WhatsApp-এ পাঠান
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
        </div>
      </section>
    </>
  )
}