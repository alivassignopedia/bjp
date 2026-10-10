
import { useState, useEffect, useRef } from 'react'
import PageBanner from '../components/PageBanner.jsx'
import SectionTitle from '../components/SectionTitle.jsx'

const C = {
  saffron: '#ff6a00',
  saffronDark: '#d95500',
  green: '#138808',
  navy: '#0f1f3d',
}

/* ---------- কর্মসূচি / Events ---------- */

const events = [
  {
    d: '১৫',
    m: 'অক্টোবর',
    t: 'বিনামূল্যে স্বাস্থ্য পরীক্ষা শিবির',
    time: 'সকাল ১০টা থেকে',
    place: 'ওয়ার্ড কমিউনিটি হল',
  },
  {
    d: '২০',
    m: 'অক্টোবর',
    t: 'ওয়ার্ড পরিচ্ছন্নতা অভিযান',
    time: 'সকাল ৭টা',
    place: 'পার্টি অফিস থেকে যাত্রা',
  },
  {
    d: '২৮',
    m: 'অক্টোবর',
    t: 'বাসিন্দাদের সঙ্গে জনসভা',
    time: 'বিকেল ৫টা',
    place: 'এলাকার সমস্যা নিয়ে আলোচনা',
  },
]

/* ---------- বিজ্ঞপ্তি / Notices ---------- */

const notices = [
  {
    t: 'সরকারি ছুটির দিনে কার্যালয় বন্ধ থাকবে।',
    date: '০৫ অক্টোবর ২০২৬',
  },
  {
    t: 'সরকারি প্রকল্পের সহায়তা কেন্দ্রে আসার সময় প্রয়োজনীয় নথিপত্র সঙ্গে আনুন।',
    date: '০৩ অক্টোবর ২০২৬',
  },
  {
    t: 'নতুন স্বেচ্ছাসেবকরা সকাল ১০টা থেকে বিকেল ৫টার মধ্যে কার্যালয়ে নাম নথিভুক্ত করতে পারবেন।',
    date: '০১ অক্টোবর ২০২৬',
  },
]

/* ---------- Photo Gallery ---------- */
/* ছবিগুলি অনলাইন সোর্স থেকে লোড হয়।
   নিজের এলাকার আসল ছবি থাকলে সেগুলি ব্যবহার করা ভালো। */

const photos = [
  {
    label: 'স্বাস্থ্য শিবির | Health Camp',
    img: 'https://media.assettype.com/english-sentinelassam%2Fimport%2Fh-upload%2F2023%2F01%2F21%2F432007-hal.webp?ar=40%3A21&auto=format%2Ccompress&enlarge=true&mode=crop&ogImage=true&overlay=false&overlay_position=bottom&overlay_width=100&w=1200',
    alt: 'গ্রামীণ স্বাস্থ্য শিবিরে চিকিৎসা পরিষেবা',
  },
  {
    label: 'পরিচ্ছন্নতা অভিযান | Cleanliness Drive',
    img: 'https://www.hindustantimes.com/ht-img/img/2025/04/13/1600x900/Residents-during-the-cleaning-drive-on-Sunday---HT_1744571002561.jpg',
    alt: 'এলাকার পরিচ্ছন্নতা অভিযানে স্বেচ্ছাসেবকরা',
  },
  {
    label: 'জনসভা | Public Meeting',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxommwom15tHNMdAAud7BhPvyTNQELz94ymF-uC5zKnQ&s=10',
    alt: 'স্থানীয় বাসিন্দাদের সঙ্গে জনসভা',
  },
  {
    label: 'বৃক্ষরোপণ | Tree Plantation',
    img: 'https://drop.ndtv.com/albums/NEWS/tree-plantation-in-india/tree-plantation-in-india_640x480.jpg',
    alt: 'বৃক্ষরোপণ কর্মসূচিতে অংশগ্রহণকারী স্বেচ্ছাসেবকরা',
  },
  {
    label: 'যুব কর্মসূচি | Youth Programme',
    img: 'https://www.technoserve.org/files/blog_employing_a_future_generation.jpg',
    alt: 'যুবসমাজের দলগত কর্মশালা',
  },
  {
    label: 'স্বেচ্ছাসেবক সভা | Volunteer Meet',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlTc6ZOr6bcZ65pp36UyMv56Btjv9X55sq_pJTZnN2hZeKm7eRNs16TL2s&s=10',
    alt: 'সামাজিক উন্নয়ন পরিকল্পনা নিয়ে দলগত আলোচনা',
  },
]

/* ---------- Scroll Reveal ---------- */

function Reveal({ children, delay = 0, from = 'up', className = '' }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const hidden =
    from === 'left'
      ? 'translateX(-50px)'
      : from === 'right'
        ? 'translateX(50px)'
        : 'translateY(40px)'

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : hidden,
        transition: `all .8s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

/* ---------- Event Row ---------- */

function EventRow({ d, m, t, time, place }) {
  const [hover, setHover] = useState(false)

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="d-flex align-items-center gap-3 p-3 mb-3"
      style={{
        background: '#fff',
        borderRadius: 16,
        transform: hover ? 'translateX(8px)' : 'none',
        boxShadow: hover
          ? '0 16px 36px rgba(255,106,0,.2)'
          : '0 4px 16px rgba(15,31,61,.08)',
        borderLeft: `5px solid ${hover ? C.saffron : 'transparent'}`,
        transition: 'all .35s ease',
      }}
    >
      <div
        className="text-center text-white flex-shrink-0"
        style={{
          minWidth: 76,
          padding: '10px 8px',
          borderRadius: 14,
          background: hover ? C.saffronDark : C.saffron,
          transform: hover ? 'rotate(-5deg) scale(1.05)' : 'none',
          transition: 'all .35s ease',
        }}
      >
        <b className="d-block" style={{ fontSize: 28, lineHeight: 1 }}>
          {d}
        </b>
        <small className="fw-semibold">{m}</small>
      </div>

      <div className="flex-grow-1">
        <h5 className="fw-bold mb-2" style={{ color: C.navy }}>
          {t}
        </h5>

        <div className="small text-secondary d-flex flex-wrap gap-3">
          <span>🕒 {time}</span>
          <span>📍 {place}</span>
        </div>
      </div>

      <span
        className="d-none d-sm-inline fw-bold"
        style={{
          color: C.saffron,
          fontSize: 24,
          opacity: hover ? 1 : 0,
          transform: hover ? 'translateX(0)' : 'translateX(-12px)',
          transition: 'all .35s ease',
        }}
      >
        →
      </span>
    </div>
  )
}

/* ---------- Notice Card ---------- */

function NoticeCard({ t, date }) {
  const [hover, setHover] = useState(false)

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="d-flex gap-3 p-3 mb-3"
      style={{
        background: '#fff',
        borderRadius: 14,
        borderLeft: `5px solid ${C.green}`,
        transform: hover ? 'translateY(-5px)' : 'none',
        boxShadow: hover
          ? '0 14px 30px rgba(19,136,8,.2)'
          : '0 3px 12px rgba(15,31,61,.06)',
        transition: 'all .35s ease',
      }}
    >
      <span
        style={{
          fontSize: 26,
          display: 'inline-block',
          transform: hover ? 'rotate(-20deg) scale(1.2)' : 'none',
          transition: 'transform .35s ease',
        }}
      >
        📌
      </span>

      <div>
        <p className="mb-1" style={{ color: C.navy, fontWeight: 600, lineHeight: 1.8 }}>
          {t}
        </p>
        <small className="text-secondary">
          প্রকাশিত | Posted: {date}
        </small>
      </div>
    </div>
  )
}

/* ---------- Gallery Tile ---------- */

function GalleryTile({ photo, onOpen }) {
  const [hover, setHover] = useState(false)

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${photo.label} ছবিটি বড় করে দেখুন`}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpen()
        }
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="position-relative overflow-hidden"
      style={{
        height: 230,
        borderRadius: 16,
        cursor: 'pointer',
        background: '#e9edf3',
        boxShadow: hover
          ? '0 18px 40px rgba(15,31,61,.28)'
          : '0 4px 16px rgba(15,31,61,.12)',
        transform: hover ? 'translateY(-6px)' : 'none',
        transition: 'all .4s ease',
      }}
    >
      <img
        src={photo.img}
        alt={photo.alt}
        loading="lazy"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          transform: hover ? 'scale(1.08)' : 'scale(1)',
          transition: 'transform .6s ease',
        }}
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
      />

      <div
        className="position-absolute bottom-0 start-0 end-0 text-white p-3 d-flex justify-content-between align-items-center"
        style={{
          background: 'linear-gradient(0deg, rgba(15,31,61,.92), rgba(15,31,61,0))',
          opacity: hover ? 1 : 0.95,
          transform: hover ? 'translateY(0)' : 'translateY(5px)',
          transition: 'all .4s ease',
        }}
      >
        <span className="fw-semibold">{photo.label}</span>
        <span aria-hidden="true">🔍</span>
      </div>
    </div>
  )
}

/* ---------- Events Page ---------- */

export default function Events() {
  const [open, setOpen] = useState(null)
  const [closeHover, setCloseHover] = useState(false)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(null)
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const current = open !== null ? photos[open] : null

  return (
    <>
      {/* ===== Page Banner ===== */}
      <PageBanner
        title="কর্মসূচি ও বিজ্ঞপ্তি | Events & Notices"
        subtitle="৭ নং ওয়ার্ডের আসন্ন কর্মসূচি এবং সর্বশেষ খবরাখবর"
        current="Events"
      />

      {/* ===== Upcoming Events ===== */}
      <section className="py-5">
        <div className="container py-4">
          <SectionTitle>আসন্ন কর্মসূচি | Upcoming Events</SectionTitle>

          <div className="row justify-content-center">
            <div className="col-12 col-lg-9">
              {events.map((event, i) => (
                <Reveal
                  key={event.t}
                  delay={i * 0.12}
                  from={i % 2 ? 'right' : 'left'}
                >
                  <EventRow {...event} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Notice Board ===== */}
      <section className="py-5" style={{ background: '#fff3e3' }}>
        <div className="container py-4">
          <SectionTitle>বিজ্ঞপ্তি বোর্ড | Notice Board</SectionTitle>

          <div className="row justify-content-center">
            <div className="col-12 col-lg-9">
              {notices.map((notice, i) => (
                <Reveal key={notice.t} delay={i * 0.12}>
                  <NoticeCard {...notice} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Photo Gallery ===== */}
      <section className="py-5">
        <div className="container py-4">
          <SectionTitle>ছবির গ্যালারি | Photo Gallery</SectionTitle>

          <p className="text-secondary text-center mb-4">
            আমাদের সামাজিক কর্মসূচি, জনসেবা ও এলাকার বিভিন্ন উদ্যোগের কিছু ছবি।
          </p>

          <div className="row g-3">
            {photos.map((photo, i) => (
              <Reveal
                key={photo.label}
                delay={(i % 3) * 0.12}
                className="col-6 col-md-4"
              >
                <GalleryTile
                  photo={photo}
                  onOpen={() => setOpen(i)}
                />
              </Reveal>
            ))}
          </div>

          <p className="text-secondary small mt-3 text-center">
           
          </p>
        </div>
      </section>

      {/* ===== Image Lightbox ===== */}
      <div
        onClick={() => setOpen(null)}
        aria-hidden={!current}
        className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
        style={{
          zIndex: 2000,
          background: 'rgba(10,21,48,.90)',
          opacity: current ? 1 : 0,
          pointerEvents: current ? 'auto' : 'none',
          transition: 'opacity .35s ease',
          padding: 16,
        }}
      >
        {current && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={current.label}
            onClick={(e) => e.stopPropagation()}
            className="position-relative"
            style={{
              width: 'min(900px, 94vw)',
              maxHeight: '85vh',
              borderRadius: 18,
              overflow: 'hidden',
              boxShadow: '0 30px 80px rgba(0,0,0,.5)',
              background: C.navy,
            }}
          >
            <img
              src={current.img}
              alt={current.alt}
              style={{
                width: '100%',
                maxHeight: '75vh',
                objectFit: 'contain',
                display: 'block',
                background: '#0f1f3d',
              }}
              onError={(e) => {
                e.currentTarget.alt = 'ছবিটি লোড করা যায়নি'
              }}
            />

            <div
              className="text-white p-3 fw-semibold"
              style={{
                background: C.navy,
                lineHeight: 1.7,
              }}
            >
              {current.label}
            </div>

            <button
              type="button"
              aria-label="Close image"
              onClick={() => setOpen(null)}
              onMouseEnter={() => setCloseHover(true)}
              onMouseLeave={() => setCloseHover(false)}
              className="position-absolute d-grid border-0 fw-bold"
              style={{
                top: 12,
                right: 12,
                width: 42,
                height: 42,
                placeItems: 'center',
                borderRadius: '50%',
                background: closeHover ? C.saffron : '#fff',
                color: closeHover ? '#fff' : C.navy,
                transform: closeHover ? 'rotate(90deg)' : 'none',
                transition: 'all .3s ease',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </>
  )
}
