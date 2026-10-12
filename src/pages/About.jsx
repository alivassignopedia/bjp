
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner.jsx'
import SectionTitle from '../components/SectionTitle.jsx'

const C = {
  saffron: '#ff6a00',
  saffronDark: '#d95500',
  green: '#138808',
  navy: '#0f1f3d',
}

/* ---------- Mission, Vision & Values ---------- */

const mission = [
  {
    icon: '🎯',
    t: 'আমাদের লক্ষ্য | Our Mission',
    d: 'ওয়ার্ডের প্রতিটি মানুষের সমস্যার কথা শোনা এবং দ্রুত সহায়তার ব্যবস্থা করা। আমাদের অফিস সবার জন্য উন্মুক্ত।',
  },
  {
    icon: '👁️',
    t: 'আমাদের স্বপ্ন | Our Vision',
    d: 'একটি পরিচ্ছন্ন, নিরাপদ ও উন্নত ওয়ার্ড গড়ে তোলা, যেখানে প্রতিটি পরিবার সরকারি প্রকল্পের সুবিধা পেতে পারে।',
  },
  {
    icon: '🤝',
    t: 'আমাদের মূল্যবোধ | Our Values',
    d: 'সততা, দায়িত্ববোধ এবং সকল মানুষের প্রতি সম্মান রেখে জনসেবা করাই আমাদের প্রধান মূল্যবোধ।',
  },
]

const points = [
  'ওয়ার্ডের সকল বাসিন্দার জন্য খোলা দরজা | Open to all residents',
  'সরকারি প্রকল্প ও নথিপত্রের বিষয়ে সহায়তা | Scheme guidance',
  'নিয়মিত পরিচ্ছন্নতা ও সামাজিক কর্মসূচি | Community drives',
  'যুবক ও মহিলাদের স্বেচ্ছাসেবী দল | Youth and women volunteers',
]

const services = [
  {
    icon: '📝',
    t: 'অভিযোগ কেন্দ্র | Complaint Desk',
    d: 'রাস্তা, পানীয় জল, রাস্তার আলো ও নিকাশি সংক্রান্ত সমস্যার কথা জানান।',
    tag: 'Public Support',
  },
  {
    icon: '📄',
    t: 'সরকারি প্রকল্প | Scheme Information',
    d: 'সরকারি প্রকল্পের যোগ্যতা, আবেদন পদ্ধতি ও প্রয়োজনীয় নথি সম্পর্কে জানুন।',
    tag: 'Scheme Guidance',
  },
  {
    icon: '🩺',
    t: 'স্বাস্থ্য শিবির | Health Camps',
    d: 'বিনামূল্যে স্বাস্থ্য পরীক্ষা, স্বাস্থ্য সচেতনতা এবং চিকিৎসা সংক্রান্ত কর্মসূচি।',
    tag: 'Community Health',
  },
  {
    icon: '🧹',
    t: 'পরিচ্ছন্নতা অভিযান | Cleanliness Drives',
    d: 'এলাকা পরিষ্কার রাখা, বর্জ্য ব্যবস্থাপনা ও বৃক্ষরোপণে অংশগ্রহণ করুন।',
    tag: 'Clean Ward',
  },
  {
    icon: '🎓',
    t: 'যুব সহায়তা | Youth Support',
    d: 'যুবসমাজের জন্য দক্ষতা উন্নয়ন, খেলাধুলা ও কর্মজীবন সংক্রান্ত উদ্যোগ।',
    tag: 'Youth Development',
  },
  {
    icon: '🤝',
    t: 'স্বেচ্ছাসেবক দল | Volunteer Network',
    d: 'সমাজের উন্নয়নে অংশ নিন এবং এলাকার মানুষের পাশে দাঁড়ান।',
    tag: 'Join Our Team',
  },
]

const team = [
  { name: 'নাম যোগ করুন', role: 'ওয়ার্ড সভাপতি | Ward President', icon: '👤' },
  { name: 'নাম যোগ করুন', role: 'সম্পাদক | Secretary', icon: '👤' },
  { name: 'নাম যোগ করুন', role: 'যুব শাখা | Youth Wing', icon: '👤' },
  { name: 'নাম যোগ করুন', role: 'মহিলা শাখা | Women Wing', icon: '👤' },
]

const timeline = [
  {
    year: '2020',
    t: 'কার্যালয়ের সূচনা | Office Opened',
    d: '৭ নং ওয়ার্ডের বাসিন্দাদের পাশে থাকার উদ্দেশ্যে কার্যালয়ের যাত্রা শুরু।',
  },
  {
    year: '2022',
    t: 'প্রথম স্বাস্থ্য শিবির | First Health Camp',
    d: 'স্থানীয় স্বেচ্ছাসেবকদের সহযোগিতায় স্বাস্থ্য পরীক্ষা কর্মসূচি আয়োজন।',
  },
  {
    year: '2024',
    t: 'স্বেচ্ছাসেবক নেটওয়ার্ক | Volunteer Network',
    d: 'এলাকার উন্নয়নে যুবক ও মহিলাদের অংশগ্রহণ আরও বাড়ানোর উদ্যোগ।',
  },
  {
    year: '2026',
    t: 'ডিজিটাল যোগাযোগ | Online Presence',
    d: 'বাসিন্দাদের কাছে তথ্য ও যোগাযোগের সুবিধা পৌঁছে দিতে এই ওয়েবসাইট।',
  },
]

/* ---------- Scroll Reveal Animation ---------- */

function Reveal({
  children,
  delay = 0,
  from = 'up',
  className = '',
}) {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12 }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const hiddenTransform =
    from === 'left'
      ? 'translate3d(-45px, 0, 0)'
      : from === 'right'
        ? 'translate3d(45px, 0, 0)'
        : from === 'scale'
          ? 'scale(.88)'
          : 'translate3d(0, 35px, 0)'

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : hiddenTransform,
        transition: `opacity .7s ease ${delay}s, transform .7s cubic-bezier(.2,.8,.2,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

/* ---------- Hover Card ---------- */

function HoverCard({
  children,
  style = {},
  lift = 8,
  accent = C.saffron,
}) {
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const active = hovered || focused

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setFocused(false)
        }
      }}
      style={{
        background: '#fff',
        borderRadius: 18,
        height: '100%',
        transform: active ? `translateY(-${lift}px)` : 'translateY(0)',
        boxShadow: active
          ? '0 18px 42px rgba(15,31,61,.14)'
          : '0 4px 18px rgba(15,31,61,.07)',
        borderBottom: `4px solid ${active ? accent : 'transparent'}`,
        transition:
          'transform .35s ease, box-shadow .35s ease, border-color .35s ease',
        ...style,
      }}
    >
      {children(active)}
    </div>
  )
}

/* ---------- Icon Box ---------- */

function IconBox({ icon, active = false, size = 64, round = false }) {
  return (
    <div
      className="d-grid flex-shrink-0"
      style={{
        width: size,
        height: size,
        placeItems: 'center',
        borderRadius: round ? '50%' : 18,
        fontSize: size * 0.45,
        background: active ? C.saffron : '#fff1e4',
        boxShadow: active ? '0 10px 24px rgba(255,106,0,.22)' : 'none',
        transform: active ? 'rotate(-6deg) scale(1.07)' : 'none',
        transition: 'all .35s ease',
      }}
    >
      {icon}
    </div>
  )
}

/* ---------- Primary Link ---------- */

function PrimaryLink({ to, children }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      to={to}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="btn rounded-pill fw-bold px-4 py-3 text-decoration-none d-inline-flex align-items-center gap-2"
      style={{
        background: hovered ? C.saffronDark : C.saffron,
        color: '#fff',
        border: 'none',
        transform: hovered ? 'translateY(-3px)' : 'none',
        boxShadow: hovered
          ? '0 12px 28px rgba(255,106,0,.32)'
          : '0 4px 12px rgba(255,106,0,.18)',
        transition: 'all .3s ease',
      }}
    >
      {children}
      <span
        aria-hidden="true"
        style={{
          display: 'inline-block',
          transform: hovered ? 'translateX(5px)' : 'none',
          transition: 'transform .3s ease',
        }}
      >
        →
      </span>
    </Link>
  )
}

/* ---------- Office Photo ---------- */

function OfficePhoto() {
  const [hovered, setHovered] = useState(false)
  const [imageError, setImageError] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        height: 'clamp(260px, 38vw, 390px)',
        borderRadius: 22,
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #fff1e4, #e4f2e2)',
        boxShadow: hovered
          ? '0 25px 55px rgba(15,31,61,.2)'
          : '0 12px 35px rgba(15,31,61,.12)',
        transition: 'box-shadow .4s ease',
      }}
    >
      {!imageError ? (
        <img
          src="/ofc.jpg"
          alt="৭ নং ওয়ার্ড কার্যালয় ও দল"
          onError={() => setImageError(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform .7s ease',
          }}
        />
      ) : (
        <div className="d-flex flex-column align-items-center justify-content-center h-100 text-center p-4">
          <span style={{ fontSize: 54 }}>🏢</span>
          <h5 className="fw-bold mt-3" style={{ color: C.navy }}>
            ওয়ার্ড কার্যালয়
          </h5>
          <p className="text-secondary mb-0">
            Office photo unavailable. Check <code>public/ofc.jpg</code>.
          </p>
        </div>
      )}
    </div>
  )
}

/* ---------- About Page ---------- */

export default function About() {
  return (
    <>
      <PageBanner
        title="আমাদের সম্পর্কে | About Us"
        subtitle="৭ নং ওয়ার্ড কার্যালয় — মানুষের পাশে, উন্নয়নের পথে"
        current="About"
      />

      {/* ===== Introduction ===== */}

      <section className="py-5">
        <div className="container py-4">
          {/* align-items-start aligns the image and text at the top */}
          <div className="row g-5 align-items-start">
            <Reveal
              from="left"
              className="col-12 col-md-6"
            >
              {/* Small top spacing; no large image margin */}
              <div style={{ paddingTop: '8px' }}>
                <OfficePhoto />
              </div>
            </Reveal>

            <Reveal from="right" className="col-12 col-md-6">
              <div className="fw-bold mb-2" style={{ color: C.saffron }}>
                ওয়ার্ডের মানুষের পাশে, সবার সাথে।
              </div>

              <h2
                className="fw-bold mb-3"
                style={{
                  color: C.navy,
                  fontSize: 'clamp(27px, 4vw, 38px)',
                  lineHeight: 1.4,
                }}
              >
                আমাদের কার্যালয়, আপনাদেরই কার্যালয়
              </h2>

              <h5 className="mb-3" style={{ color: C.saffronDark }}>
                About Our Office
              </h5>

              <p className="text-secondary" style={{ lineHeight: 1.95 }}>
                ৭ নং ওয়ার্ড কার্যালয় এলাকার মানুষের সঙ্গে যোগাযোগের একটি
                স্থানীয় কেন্দ্র। এখানে বাসিন্দারা তাঁদের সমস্যা জানাতে,
                সরকারি প্রকল্প সম্পর্কে তথ্য পেতে এবং বিভিন্ন সামাজিক
                কর্মসূচিতে অংশ নিতে পারেন।
              </p>

              <p className="text-secondary" style={{ lineHeight: 1.95 }}>
                Our aim is to listen to residents, share useful information
                and support community initiatives with care and responsibility.
              </p>

              <div className="mt-4 mb-4">
                {points.map((point, index) => (
                  <Reveal key={point} delay={index * 0.08}>
                    <div className="d-flex align-items-start gap-2 mb-3">
                      <span
                        className="d-grid text-white fw-bold flex-shrink-0"
                        style={{
                          width: 25,
                          height: 25,
                          placeItems: 'center',
                          borderRadius: '50%',
                          background: C.green,
                          fontSize: 13,
                          marginTop: 2,
                        }}
                      >
                        ✓
                      </span>
                      <span style={{ color: C.navy, lineHeight: 1.7 }}>
                        {point}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>

              <PrimaryLink to="/contact">
                যোগাযোগ করুন | Get in Touch
              </PrimaryLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== Mission / Vision / Values ===== */}

      <section className="py-5" style={{ background: '#fff3e3' }}>
        <div className="container py-4">
          <SectionTitle>
            আমাদের লক্ষ্য ও আদর্শ | Mission &amp; Vision
          </SectionTitle>

          <p className="text-secondary text-center mb-5">
            জনসেবা, সততা এবং সম্মিলিত প্রচেষ্টাই আমাদের কাজের ভিত্তি।
          </p>

          <div className="row g-4">
            {mission.map((item, index) => (
              <Reveal
                key={item.t}
                delay={index * 0.12}
                from="scale"
                className="col-12 col-md-4"
              >
                <HoverCard lift={9}>
                  {(active) => (
                    <div className="p-4 p-lg-5 text-center">
                      <div className="d-flex justify-content-center mb-4">
                        <IconBox
                          icon={item.icon}
                          active={active}
                          size={76}
                          round
                        />
                      </div>

                      <h5
                        className="fw-bold mb-3"
                        style={{ color: C.navy, lineHeight: 1.6 }}
                      >
                        {item.t}
                      </h5>

                      <p
                        className="text-secondary mb-0"
                        style={{ lineHeight: 1.9 }}
                      >
                        {item.d}
                      </p>
                    </div>
                  )}
                </HoverCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Services ===== */}

      <section className="py-5">
        <div className="container py-4">
          <SectionTitle>আমাদের পরিষেবা | Our Services</SectionTitle>

          <p className="text-secondary text-center mb-5">
            এলাকার মানুষের প্রয়োজন অনুযায়ী বিভিন্ন বিষয়ে তথ্য ও সহযোগিতার উদ্যোগ।
          </p>

          <div className="row g-4">
            {services.map((service, index) => (
              <Reveal
                key={service.t}
                delay={(index % 3) * 0.1}
                className="col-12 col-md-6 col-lg-4"
              >
                {index === 0 ? (
                  <Link to="/complain" className="d-block h-100 text-decoration-none" style={{ color: 'inherit' }}>
                    <HoverCard lift={8}>
                      {(active) => (
                        <div className="p-4 h-100">
                          <div className="d-flex align-items-start gap-3">
                            <IconBox icon={service.icon} active={active} size={60} />
                            <div className="flex-grow-1">
                              <span className="d-inline-block rounded-pill px-2 py-1 mb-2" style={{ background: '#edf7ed', color: C.green, fontSize: 11, fontWeight: 700 }}>{service.tag}</span>
                              <h6 className="fw-bold mb-2" style={{ color: C.navy, lineHeight: 1.6 }}>{service.t}</h6>
                            </div>
                          </div>
                          <p className="text-secondary mt-3 mb-0" style={{ lineHeight: 1.85 }}>{service.d}</p>
                          <div className="mt-3 fw-bold" style={{ color: C.saffron, fontSize: 13, opacity: active ? 1 : 0.8, transition: 'opacity .3s ease' }}>মানুষের সেবায় এগিয়ে আসুন →</div>
                        </div>
                      )}
                    </HoverCard>
                  </Link>
                ) : (
                <HoverCard lift={8}>
                  {(active) => (
                    <div className="p-4 h-100">
                      <div className="d-flex align-items-start gap-3">
                        <IconBox
                          icon={service.icon}
                          active={active}
                          size={60}
                        />

                        <div className="flex-grow-1">
                          <span
                            className="d-inline-block rounded-pill px-2 py-1 mb-2"
                            style={{
                              background: '#edf7ed',
                              color: C.green,
                              fontSize: 11,
                              fontWeight: 700,
                            }}
                          >
                            {service.tag}
                          </span>

                          <h6
                            className="fw-bold mb-2"
                            style={{ color: C.navy, lineHeight: 1.6 }}
                          >
                            {service.t}
                          </h6>
                        </div>
                      </div>

                      <p
                        className="text-secondary mt-3 mb-0"
                        style={{ lineHeight: 1.85 }}
                      >
                        {service.d}
                      </p>

                      <div
                        className="mt-3 fw-bold"
                        style={{
                          color: C.saffron,
                          fontSize: 13,
                          opacity: active ? 1 : 0.8,
                          transition: 'opacity .3s ease',
                        }}
                      >
                        মানুষের সেবায় এগিয়ে আসুন →
                      </div>
                    </div>
                  )}
                </HoverCard>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Journey / Timeline ===== */}

      <section className="py-5" style={{ background: '#fff3e3' }}>
        <div className="container py-4">
          <SectionTitle>আমাদের পথচলা | Our Journey</SectionTitle>

          <p className="text-secondary text-center mb-5">
            আমাদের কাজ ও উদ্যোগের কিছু গুরুত্বপূর্ণ মাইলফলক।
          </p>

          <div className="row justify-content-center">
            <div className="col-12 col-lg-8">
              <div className="position-relative" style={{ paddingLeft: 36 }}>
                <div
                  className="position-absolute"
                  style={{
                    left: 9,
                    top: 8,
                    bottom: 8,
                    width: 4,
                    borderRadius: 4,
                    background: `linear-gradient(180deg, ${C.saffron}, ${C.green})`,
                  }}
                />

                {timeline.map((item, index) => (
                  <Reveal key={item.year} delay={index * 0.1} from="left">
                    <div className="position-relative mb-4">
                      <div
                        className="position-absolute"
                        style={{
                          left: -36,
                          top: 20,
                          width: 22,
                          height: 22,
                          borderRadius: '50%',
                          background: '#fff',
                          border: `5px solid ${
                            index % 2 === 0 ? C.saffron : C.green
                          }`,
                          boxShadow: '0 0 0 4px rgba(255,255,255,.65)',
                        }}
                      />

                      <HoverCard lift={4}>
                        {(active) => (
                          <div className="p-3 p-md-4 d-flex align-items-center gap-3">
                            <div
                              className="text-center fw-bold"
                              style={{
                                color: active ? C.saffronDark : C.saffron,
                                fontSize: 25,
                                minWidth: 68,
                                transition: 'color .3s ease',
                              }}
                            >
                              {item.year}
                            </div>

                            <div>
                              <h6
                                className="fw-bold mb-2"
                                style={{ color: C.navy, lineHeight: 1.6 }}
                              >
                                {item.t}
                              </h6>

                              <p
                                className="text-secondary mb-0"
                                style={{ lineHeight: 1.8 }}
                              >
                                {item.d}
                              </p>
                            </div>
                          </div>
                        )}
                      </HoverCard>
                    </div>
                  </Reveal>
                ))}
              </div>

              <p className="small text-secondary text-center mt-4">
                Note: প্রকাশের আগে প্রকৃত তারিখ ও ইতিহাস যাচাই করে নিন।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Team ===== */}

      <section className="py-5">
        <div className="container py-4">
          <SectionTitle>আমাদের দল | Our Team</SectionTitle>

          <p className="text-secondary text-center mb-5">
            একসঙ্গে কাজ করি, এলাকার মানুষের পাশে থাকি।
          </p>

          <div className="row g-4">
            {team.map((member, index) => (
              <Reveal
                key={`${member.role}-${index}`}
                delay={index * 0.1}
                from="scale"
                className="col-6 col-lg-3"
              >
                <HoverCard lift={8}>
                  {(active) => (
                    <div className="p-3 p-md-4 text-center">
                      <div
                        className="d-grid mx-auto mb-3"
                        style={{
                          width: 100,
                          height: 100,
                          placeItems: 'center',
                          borderRadius: '50%',
                          fontSize: 42,
                          background: active
                            ? `linear-gradient(135deg, ${C.saffron}, ${C.green})`
                            : '#fff1e4',
                          boxShadow: active
                            ? '0 12px 30px rgba(15,31,61,.18)'
                            : 'none',
                          transform: active
                            ? 'translateY(-4px) scale(1.05)'
                            : 'none',
                          transition: 'all .35s ease',
                        }}
                      >
                        {member.icon}
                      </div>

                      <h6
                        className="fw-bold mb-2"
                        style={{ color: C.navy, lineHeight: 1.6 }}
                      >
                        {member.name}
                      </h6>

                      <small
                        className="fw-semibold"
                        style={{
                          color: C.saffronDark,
                          lineHeight: 1.7,
                        }}
                      >
                        {member.role}
                      </small>
                    </div>
                  )}
                </HoverCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Contact Call to Action ===== */}

      <section
        className="py-5"
        style={{
          background: `linear-gradient(125deg, ${C.navy}, #19345e)`,
        }}
      >
        <div className="container py-4 text-center">
          <Reveal from="scale">
            <div className="mx-auto" style={{ maxWidth: 760 }}>
              <span
                className="d-inline-block rounded-pill px-3 py-2 mb-3"
                style={{
                  background: 'rgba(255,255,255,.12)',
                  color: '#fff',
                  fontSize: 13,
                }}
              >
                জনসেবাই আমাদের অঙ্গীকার | Community First
              </span>

              <h2
                className="fw-bold text-white mb-3"
                style={{
                  fontSize: 'clamp(26px, 4vw, 38px)',
                  lineHeight: 1.5,
                }}
              >
                আপনার সমস্যা, আমাদের সঙ্গে ভাগ করে নিন
              </h2>

              <p
                className="mb-4"
                style={{
                  color: 'rgba(255,255,255,.8)',
                  lineHeight: 1.9,
                }}
              >
                Have a question or need information? যোগাযোগ করুন আমাদের
                সঙ্গে। আমরা আপনার কথা শুনতে প্রস্তুত।
              </p>

              <PrimaryLink to="/contact">
                যোগাযোগ করুন | Contact Us
              </PrimaryLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
