import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import SectionTitle from '../components/SectionTitle.jsx'

const C = {
  saffron: '#ff6a00',
  saffronDark: '#d95500',
  green: '#138808',
  navy: '#0f1f3d',
}

const PHONE = '8240696947'
const BANNER = new URL('../assets/images/banner.jpg', import.meta.url).href

/* ---------- অ্যানিমেটেড ব্যাকগ্রাউন্ড ক্যানভাস ও পার্টিকেল ---------- */

function AnimatedGradientBg() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId

    const resize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.offsetWidth
        canvas.height = canvas.parentElement.offsetHeight
      }
    }
    resize()
    window.addEventListener('resize', resize)

    // তেরঙা পার্টিকেল — গেরুয়া, সাদা, সবুজ
    const colors = [
      { rgb: '255, 106, 0', white: false },
      { rgb: '255, 255, 255', white: true },
      { rgb: '19, 136, 8', white: false },
    ]

   const COUNT = 60

const particles = Array.from({ length: COUNT }, (_, i) => {
  const c = colors[i % colors.length]
  return {
    x: Math.random() * (canvas.width || 800),
    y: Math.random() * (canvas.height || 600),
    radius: Math.random() * 1.5 + 2, // 2 – 3.5px (very small)
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    alpha: c.white ? 0.95 : Math.random() * 0.3 + 0.6,
    color: c.rgb,
    white: c.white,
  }
})
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < -15) p.x = canvas.width + 15
        if (p.x > canvas.width + 15) p.x = -15
        if (p.y < -15) p.y = canvas.height + 15
        if (p.y > canvas.height + 15) p.y = -15

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`
        ctx.shadowColor = p.white ? 'rgba(15,31,61,0.3)' : `rgba(${p.color}, 0.45)`
        ctx.shadowBlur = 10
        ctx.fill()

        if (p.white) {
          ctx.shadowBlur = 0
          ctx.lineWidth = 1.2
          ctx.strokeStyle = 'rgba(15,31,61,0.2)'
          ctx.stroke()
        }
      })

      ctx.shadowBlur = 0
      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden" style={{ pointerEvents: 'none', zIndex: 1 }}>
      <canvas ref={canvasRef} className="w-100 h-100 position-absolute top-0 start-0" />
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '-5%',
        width: '50vw',
        height: '50vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,106,0,0.18) 0%, rgba(255,106,0,0) 70%)',
        animation: 'floatOrb1 12s ease-in-out infinite alternate',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        right: '-5%',
        width: '55vw',
        height: '55vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(19,136,8,0.14) 0%, rgba(19,136,8,0) 70%)',
        animation: 'floatOrb2 15s ease-in-out infinite alternate',
      }} />
    </div>
  )
}

/* ---------- ভারতের জাতীয় পতাকা — অ্যানিমেটেড ফুল-পেজ ব্যাকগ্রাউন্ড ---------- */

function IndianFlagBg() {
  return (
    <div
      aria-hidden="true"
      className="position-fixed top-0 start-0 w-100 h-100"
      style={{ zIndex: -1, overflow: 'hidden', pointerEvents: 'none' }}
    >
      <div className="w-100 h-100 d-flex flex-column">
        <div
          style={{
            flex: 1,
            background: `linear-gradient(180deg, ${C.saffron}, #ff8a33)`,
            transformOrigin: 'left center',
            animation: 'flagWaveA 7s ease-in-out infinite',
          }}
        />
        <div
          style={{
            flex: 1,
            background: '#ffffff',
            position: 'relative',
            transformOrigin: 'right center',
            animation: 'flagWaveB 7s ease-in-out infinite',
          }}
        />
        <div
          style={{
            flex: 1,
            background: `linear-gradient(180deg, #1aa30f, ${C.green})`,
            transformOrigin: 'left center',
            animation: 'flagWaveC 7s ease-in-out infinite',
          }}
        />
      </div>
    </div>
  )
}

/* ---------- ছোট উড়ন্ত পতাকা — পেজের শীর্ষে ---------- */

function WavingFlag({ height = 50 }) {
  const width = height * 1.5

  return (
    <div style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.18))' }}>
      <svg
        viewBox="0 0 150 100"
        width={width}
        height={height}
        style={{
          display: 'block',
          animation: 'flagWaveSmall 2.4s ease-in-out infinite',
          transformOrigin: 'left center',
        }}
      >
        <defs>
          <linearGradient id="flagWaveShadeSmall" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#000" stopOpacity="0.12" />
            <stop offset="20%" stopColor="#000" stopOpacity="0" />
            <stop offset="50%" stopColor="#fff" stopOpacity="0.15" />
            <stop offset="80%" stopColor="#000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.12" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width="4" height="100" fill="#8a8a8a" />
        <circle cx="2" cy="0" r="4" fill="#c9a227" />

        <rect x="4" y="0" width="146" height="33.3" fill="#FF9933" />
        <rect x="4" y="33.3" width="146" height="33.4" fill="#FFFFFF" />
        <rect x="4" y="66.7" width="146" height="33.3" fill="#138808" />

        <g transform="translate(77, 50)">
          <circle r="13" fill="none" stroke="#0f1f3d" strokeWidth="1.4" />
          <circle r="2" fill="#0f1f3d" />
          {Array.from({ length: 24 }).map((_, i) => (
            <line
              key={i}
              x1="0"
              y1="0"
              x2="0"
              y2="-13"
              stroke="#0f1f3d"
              strokeWidth="0.9"
              transform={`rotate(${(i * 360) / 24})`}
            />
          ))}
        </g>

        <rect x="4" y="0" width="146" height="100" fill="url(#flagWaveShadeSmall)" />
      </svg>
    </div>
  )
}

/* ---------- টেক্সট অ্যানিমেশন স্টাইল গ্লোবাল সিএসএস ---------- */

const AnimationStyles = () => (
  <style>{`
    @keyframes floatOrb1 {
      0% { transform: translate(0, 0) scale(1); }
      100% { transform: translate(60px, -50px) scale(1.15); }
    }
    @keyframes floatOrb2 {
      0% { transform: translate(0, 0) scale(1); }
      100% { transform: translate(-70px, 40px) scale(1.1); }
    }
    @keyframes textGradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes pulseGlow {
      0% { box-shadow: 0 0 0 0 rgba(255, 106, 0, 0.4); }
      70% { box-shadow: 0 0 0 12px rgba(255, 106, 0, 0); }
      100% { box-shadow: 0 0 0 0 rgba(255, 106, 0, 0); }
    }
    @keyframes borderFlow {
      0% { background-position: 0% 50% }
      100% { background-position: 300% 50% }
    }
    @keyframes kenBurns {
      0% { transform: scale(1) }
      100% { transform: scale(1.08) }
    }
    @keyframes pingRing {
      0% { transform: scale(1); opacity: .6 }
      100% { transform: scale(2); opacity: 0 }
    }
    @keyframes flagWaveA {
      0%, 100% { transform: skewY(0deg) scaleY(1); }
      50% { transform: skewY(-0.6deg) scaleY(1.015); }
    }
    @keyframes flagWaveB {
      0%, 100% { transform: skewY(0deg) scaleY(1); }
      50% { transform: skewY(0.5deg) scaleY(0.985); }
    }
    @keyframes flagWaveC {
      0%, 100% { transform: skewY(0deg) scaleY(1); }
      50% { transform: skewY(-0.4deg) scaleY(1.01); }
    }
    @keyframes flagWaveSmall {
      0%, 100% { transform: skewY(0deg) scaleY(1); }
      25% { transform: skewY(1.5deg) scaleY(0.98); }
      50% { transform: skewY(0deg) scaleY(1.02); }
      75% { transform: skewY(-1.5deg) scaleY(0.98); }
    }
    .animated-text-gradient {
      background: linear-gradient(90deg, #ff6a00, #ff9d4d, #138808, #0f1f3d, #ff6a00);
      background-size: 300% 300%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: textGradient 6s ease infinite;
    }
    @media (max-width: 767.98px) {
      .home-hero-content {
        padding-top: 125px !important;
      }
      .home-hero-flag svg {
        width: 54px;
        height: 36px;
      }
    }
    .animated-saffron-text {
      background: linear-gradient(90deg, #ff6a00, #ff9e00, #d95500, #ff6a00);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: textGradient 4s ease infinite;
    }
  `}</style>
)

const contactCards = [
  { icon: '📞', title: 'ফোন করুন', text: PHONE, href: `tel:+91${PHONE}` },
  {
    icon: '💬',
    title: 'হোয়াটসঅ্যাপ',
    text: 'বার্তা পাঠান',
    href: `https://wa.me/91${PHONE}`,
    external: true,
  },
  { icon: '📍', title: 'আমাদের ঠিকানা', text: '৭ নং ওয়ার্ড পার্টি অফিস', to: '/contact' },
  { icon: '🕒', title: 'অফিসের সময়', text: 'সকাল ১০টা – সন্ধ্যা ৭টা', to: '/contact' },
]

const points = [
  'ওয়ার্ডের সকল বাসিন্দার জন্য উন্মুক্ত পরিষেবা',
  'নথিপত্র ও সরকারি প্রকল্প সম্পর্কে তথ্য',
  'নিয়মিত সামাজিক ও পরিচ্ছন্নতা কর্মসূচি',
  'যুবক-যুবতী ও মহিলাদের স্বেচ্ছাসেবী দল',
]

const stats = [
  { to: 7, label: 'ওয়ার্ড নম্বর' },
  { to: 500, suffix: '+', label: 'সহায়তাপ্রাপ্ত পরিবার' },
  { to: 50, suffix: '+', label: 'স্বেচ্ছাসেবক' },
  { text: '২৪/৭', label: 'ফোনে সহায়তা' },
]

const services = [
  {
    icon: '📝',
    t: 'অভিযোগ সহায়তা কেন্দ্র',
    d: 'রাস্তা, পানীয় জল, পথবাতি ও নিকাশি সংক্রান্ত সমস্যার কথা জানান।',
  },
  {
    icon: '📄',
    t: 'সরকারি প্রকল্পের তথ্য',
    d: 'বিভিন্ন সরকারি প্রকল্প এবং আবেদন পদ্ধতি সম্পর্কে নির্দেশনা নিন।',
  },
  {
    icon: '🩺',
    t: 'স্বাস্থ্য শিবির',
    d: 'বিনামূল্যে স্বাস্থ্য পরীক্ষা ও স্বাস্থ্য সচেতনতা কর্মসূচিতে অংশ নিন।',
  },
  {
    icon: '🧹',
    t: 'পরিচ্ছন্নতা অভিযান',
    d: 'এলাকার পরিচ্ছন্নতা ও বৃক্ষরোপণ কর্মসূচিতে যোগ দিন।',
  },
  {
    icon: '🎓',
    t: 'যুবসমাজের সহায়তা',
    d: 'ক্যারিয়ার পরামর্শ, খেলাধুলা ও দক্ষতা উন্নয়নের কর্মসূচি।',
  },
  {
    icon: '🤝',
    t: 'স্বেচ্ছাসেবী দল',
    d: 'নিজের এলাকার মানুষের পাশে দাঁড়াতে আমাদের সঙ্গে যুক্ত হন।',
  },
]

const events = [
  {
    d: '১৫',
    m: 'অক্টোবর',
    t: 'বিনামূল্যে স্বাস্থ্য পরীক্ষা শিবির',
    p: 'ওয়ার্ড কমিউনিটি হল • সকাল ১০টা',
  },
  {
    d: '২০',
    m: 'অক্টোবর',
    t: 'ওয়ার্ড পরিচ্ছন্নতা অভিযান',
    p: 'পার্টি অফিস • সকাল ৭টা',
  },
  {
    d: '২৮',
    m: 'অক্টোবর',
    t: 'বাসিন্দাদের সঙ্গে জনসভা',
    p: 'মতবিনিময় সভা • বিকেল ৫টা',
  },
]

/* ---------- স্ক্রল অ্যানিমেশন ---------- */

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
        opacity: v ? 1 : 0,
        transform: v ? 'none' : hidden,
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

/* ---------- হোভার কার্ড ---------- */

function HoverCard({ children, style = {}, lift = 12 }) {
  const [h, setH] = useState(false)

  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: '#fff',
        borderRadius: 20,
        height: '100%',
        transform: h ? `translateY(-${lift}px) scale(1.02)` : 'translateY(0px) scale(1)',
        boxShadow: h
          ? '0 25px 50px rgba(255,106,0,0.18), 0 10px 20px rgba(15,31,61,0.08)'
          : '0 8px 30px rgba(15,31,61,0.06)',
        border: `1px solid ${h ? 'rgba(255,106,0,0.3)' : 'rgba(15,31,61,0.04)'}`,
        borderBottom: `4px solid ${h ? C.saffron : 'transparent'}`,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        ...style,
      }}
    >
      {children(h)}
    </div>
  )
}

function IconBox({ icon, h, size = 64 }) {
  return (
    <div
      className="d-grid flex-shrink-0"
      style={{
        width: size,
        height: size,
        placeItems: 'center',
        borderRadius: 18,
        fontSize: size * 0.45,
        background: h ? `linear-gradient(135deg, ${C.saffron}, ${C.saffronDark})` : '#fff3e3',
        color: h ? '#fff' : 'inherit',
        boxShadow: h ? '0 10px 20px rgba(255,106,0,0.35)' : 'none',
        transform: h ? 'rotate(-6deg) scale(1.12)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {icon}
    </div>
  )
}

/* ---------- সংখ্যা গণনার অ্যানিমেশন ---------- */

function Counter({ to, suffix = '', text }) {
  const [n, setN] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    if (text) return

    const el = ref.current
    if (!el) return

    let timer

    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return

        io.disconnect()

        const steps = 50
        let i = 0

        timer = setInterval(() => {
          i++
          setN(Math.round((to * i) / steps))

          if (i >= steps) clearInterval(timer)
        }, 30)
      },
      { threshold: 0.4 }
    )

    io.observe(el)

    return () => {
      io.disconnect()
      clearInterval(timer)
    }
  }, [to, text])

  return <span ref={ref}>{text || `${n}${suffix}`}</span>
}

/* ---------- যোগাযোগ কার্ড ---------- */

function ContactCard({ icon, title, text, href, to, external }) {
  const Tag = to ? Link : 'a'

  const linkProps = to
    ? { to }
    : {
        href,
        target: external ? '_blank' : undefined,
        rel: external ? 'noreferrer' : undefined,
      }

  return (
    <HoverCard lift={8}>
      {(h) => (
        <Tag
          {...linkProps}
          className="d-flex align-items-center gap-3 p-3 text-decoration-none h-100"
          style={{ color: C.navy }}
        >
          <IconBox icon={icon} h={h} size={54} />

          <span className="lh-sm">
            <strong className="d-block mb-1">{title}</strong>
            <span className="small text-secondary">{text}</span>
          </span>
        </Tag>
      )}
    </HoverCard>
  )
}

/* ---------- বোতাম ---------- */

function ArrowLink({ to, filled, children }) {
  const [h, setH] = useState(false)

  return (
    <Link
      to={to}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      className="btn rounded-pill fw-bold px-4 py-3 text-decoration-none d-inline-flex align-items-center gap-2"
      style={{
        background: filled
          ? h
            ? C.saffronDark
            : C.saffron
          : h
            ? C.navy
            : 'rgba(255,255,255,0.9)',
        color: filled || h ? '#fff' : C.navy,
        border: filled ? '2px solid transparent' : `2px solid ${C.navy}`,
        transform: h ? 'translateY(-4px)' : 'none',
        boxShadow: h
          ? filled
            ? '0 15px 30px rgba(255,106,0,0.4)'
            : '0 15px 30px rgba(15,31,61,0.25)'
          : '0 6px 15px rgba(0,0,0,0.08)',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}

      <span
        style={{
          display: 'inline-block',
          transform: h ? 'translateX(6px)' : 'none',
          transition: 'transform 0.3s ease',
        }}
      >
        →
      </span>
    </Link>
  )
}

/* ---------- হিরো ছবির অ্যানিমেশন ---------- */

function HeroImage({ shown }) {
  const [hover, setHover] = useState(false)

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="position-relative"
      style={{
        width: '100%',
        maxWidth: 620,
        marginBottom: 70,
        cursor: 'pointer',
        clipPath: shown ? 'inset(-30px -30px -30px -30px)' : 'inset(0 100% 0 0)',
        opacity: shown ? 1 : 0,
        transition: 'clip-path 1.4s cubic-bezier(.77,0,.18,1) .4s, opacity .6s ease .4s',
      }}
    >
      <div
        style={{
          padding: 6,
          borderRadius: 28,
          background: `linear-gradient(90deg, ${C.saffron}, #ffffff, ${C.green}, ${C.saffron})`,
          backgroundSize: '300% 100%',
          animation: `borderFlow ${hover ? 2 : 6}s linear infinite`,
          boxShadow: hover
            ? '0 30px 60px rgba(255,106,0,0.4)'
            : '0 20px 40px rgba(15,31,61,0.2)',
          transition: 'box-shadow .5s ease',
        }}
      >
        <div
          className="position-relative overflow-hidden"
          style={{ borderRadius: 22, background: '#000' }}
        >
          <div
            style={{
              transform: hover ? 'scale(1.08)' : 'scale(1)',
              transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <img
              src="/bjp.png"
              alt="৭ নং ওয়ার্ড পার্টি অফিস"
              style={{
                width: '100%',
                display: 'block',
                animation: 'kenBurns 14s ease-in-out infinite alternate',
                filter: hover ? 'saturate(1.15) brightness(1.05)' : 'none',
                transition: 'filter .6s ease',
              }}
            />
          </div>

          <div
            className="position-absolute start-0 end-0 bottom-0 text-white fw-semibold"
            style={{
              padding: '40px 20px 18px',
              background: 'linear-gradient(0deg, rgba(15,31,61,0.95), rgba(15,31,61,0))',
              transform: hover ? 'translateY(0)' : 'translateY(100%)',
              opacity: hover ? 1 : 0,
              transition: 'all 0.4s ease',
            }}
          >
            <span style={{ color: '#ffb36b' }}>বিজেপি</span> &nbsp;•&nbsp; ৭ নং ওয়ার্ড পার্টি অফিস
          </div>
        </div>
      </div>

      <div
        className="position-absolute"
        style={{ left: -16, bottom: -20, zIndex: 3 }}
      >
        <span
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 20,
            background: C.saffron,
            animation: 'pingRing 2.4s ease-out infinite',
          }}
        />

        <div
          className="position-relative text-center fw-bold"
          style={{
            background: '#fff',
            color: C.navy,
            padding: '12px 20px',
            borderRadius: 20,
            boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
            transform: hover ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div style={{ color: C.saffron, fontSize: 28, lineHeight: 1 }}>৭</div>
          <small>নং ওয়ার্ড</small>
        </div>
      </div>
    </div>
  )
}

/* ---------- হোম পেজ ---------- */

export default function Home() {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShown(true), 80)
    return () => clearTimeout(t)
  }, [])

  const rise = (delay) => ({
    opacity: shown ? 1 : 0,
    transform: shown ? 'translateY(0)' : 'translateY(34px)',
    transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
  })

  return (
    <>
      <IndianFlagBg />
      <AnimationStyles />

      {/* ===== প্রধান ব্যানার ===== */}
      <section
        className="position-relative overflow-hidden d-flex align-items-center"
        style={{
          minHeight: 'min(92vh, 720px)',
          background: 'linear-gradient(135deg, rgba(255,246,238,0.88) 0%, rgba(255,243,227,0.88) 100%)',
        }}
      >
        <AnimatedGradientBg />

        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundImage: `url(${BANNER}), linear-gradient(120deg, #ffe2bd, #ff9d4d 60%, #ff6a00)`,
            backgroundSize: 'cover',
            backgroundPosition: 'right center',
            opacity: 0.12,
            transform: shown ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 15s ease-out',
          }}
        />

        {/* ===== পতাকা — একদম উপরে, পেজের শীর্ষে ===== */}
        <div
          className="home-hero-flag position-absolute top-0 start-50 translate-middle-x d-flex flex-column align-items-center"
          style={{
            zIndex: 4,
            paddingTop: 18,
            opacity: shown ? 1 : 0,
            transform: shown ? 'translate(-50%, 0)' : 'translate(-50%, -16px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
          }}
        >
          <WavingFlag height={50} />
          <span
            className="fw-bold mt-2"
            style={{
              fontSize: 13,
              letterSpacing: '0.04em',
              color: C.navy,
              opacity: 0.6,
            }}
          >
            জয় হিন্দ
          </span>
        </div>

        <div
          className="home-hero-content container position-relative py-5"
          style={{ zIndex: 2, paddingTop: 96, paddingBottom: 110 }}
        >
          <div className="row align-items-center g-4">
            <div className="col-12 col-lg-6">
              <div
                className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill small fw-bold mb-3 shadow-sm"
                style={{
                  background: 'rgba(255,106,0,0.12)',
                  color: C.saffronDark,
                  border: '1px solid rgba(255,106,0,0.25)',
                  animation: 'pulseGlow 3s infinite',
                  ...rise(0.1),
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: C.saffron, display: 'inline-block' }} />
                দেশ আগে &nbsp;|&nbsp; দল পরে &nbsp;|&nbsp; সবার শেষে নিজে
              </div>

              <div
                className="fw-bold mb-2"
                style={{
                  color: C.green,
                  fontSize: 'clamp(16px, 2.2vw, 22px)',
                  ...rise(0.2),
                }}
              >
                ৭ নং ওয়ার্ড পার্টি অফিসে আপনাকে স্বাগতম
              </div>

              <h1
                className="fw-bold mb-3"
                style={{
                  fontSize: 'clamp(38px, 6vw, 68px)',
                  lineHeight: 1.15,
                  ...rise(0.3),
                }}
              >
                <span style={{ color: C.navy }}>শক্তিশালী ওয়ার্ড</span>
                <br />
                <span className="animated-saffron-text">উজ্জ্বল ভবিষ্যৎ</span>
              </h1>

              <p
                className="mb-4"
                style={{
                  maxWidth: 520,
                  fontSize: 18,
                  lineHeight: 1.8,
                  color: '#4a5568',
                  ...rise(0.45),
                }}
              >
                আসুন, একসঙ্গে আমাদের এলাকার উন্নয়নে কাজ করি। আপনার সমস্যা জানান,
                প্রয়োজনীয় তথ্য নিন এবং ৭ নং ওয়ার্ড পার্টি অফিসের বিভিন্ন জনকল্যাণমূলক
                কর্মসূচিতে অংশগ্রহণ করুন।
              </p>

              <div className="d-flex flex-wrap gap-3" style={rise(0.6)}>
                <ArrowLink to="/about" filled>আমাদের কাজ</ArrowLink>
                <ArrowLink to="/contact">যোগাযোগ করুন</ArrowLink>
              </div>
            </div>

            <div className="col-12 col-lg-6 d-flex align-items-start justify-content-center justify-content-lg-end pb-lg-5 px-lg-4">
              <HeroImage shown={shown} />
            </div>
          </div>
        </div>

        <div
          className="position-absolute bottom-0 start-0 end-0 d-flex"
          style={{ height: 8, zIndex: 3 }}
        >
          <div style={{ flex: 1, background: C.saffron }} />
          <div style={{ flex: 1, background: '#fff' }} />
          <div style={{ flex: 1, background: C.green }} />
        </div>
      </section>

      {/* ===== যোগাযোগের তথ্য ===== */}
      <div className="container position-relative" style={{ marginTop: -56, zIndex: 5 }}>
        <div className="row g-3">
          {contactCards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1} className="col-12 col-sm-6 col-lg-3">
              <ContactCard {...c} />
            </Reveal>
          ))}
        </div>
      </div>

      {/* ===== আমাদের কার্যালয় সম্পর্কে ===== */}
      <section className="py-5 mt-4" style={{ background: 'rgba(255,255,255,0.85)' }}>
        <div className="container py-4">
          <div className="row g-5 align-items-center">
            <Reveal from="left" className="col-12 col-md-6">
              <div className="position-relative">
                <img
                  src={`${import.meta.env.BASE_URL}ofc.jpg`}
                  alt="৭ নং ওয়ার্ড পার্টি অফিসের ছবি"
                  style={{
                    width: '100%',
                    height: 360,
                    objectFit: 'cover',
                    display: 'block',
                    borderRadius: 24,
                    boxShadow: '0 25px 50px rgba(15,31,61,0.15)',
                  }}
                />

                <div
                  className="position-absolute bg-white fw-bold text-center"
                  style={{
                    right: -10,
                    bottom: -22,
                    padding: '16px 24px',
                    borderRadius: 20,
                    boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
                    color: C.navy,
                  }}
                >
                  <div style={{ color: C.saffron, fontSize: 32, lineHeight: 1 }}>৭</div>
                  <small>নং ওয়ার্ড</small>
                </div>
              </div>
            </Reveal>

            <Reveal from="right" className="col-12 col-md-6">
              <div className="fw-bold mb-1 animated-saffron-text" style={{ fontSize: 18 }}>
                ওয়ার্ডের মানুষের পাশে, সবার সাথে।
              </div>

              <h3
                className="fw-bold mb-3"
                style={{
                  color: C.navy,
                  fontSize: 'clamp(26px, 4vw, 36px)',
                }}
              >
                আমাদের কার্যালয় সম্পর্কে
              </h3>

              <p className="text-secondary" style={{ lineHeight: 1.9 }}>
                ৭ নং ওয়ার্ড পার্টি অফিস এলাকার বাসিন্দাদের সঙ্গে যোগাযোগের একটি
                গুরুত্বপূর্ণ কেন্দ্র। এখানে আপনারা এলাকার সমস্যা জানাতে পারেন,
                সরকারি প্রকল্প সম্পর্কে তথ্য পেতে পারেন এবং বিভিন্ন সামাজিক
                কর্মসূচিতে অংশ নিতে পারেন।
              </p>

              <ul className="list-unstyled mb-4">
                {points.map((p, i) => (
                  <Reveal key={p} delay={0.15 + i * 0.1}>
                    <li className="d-flex align-items-center gap-3 mb-3">
                      <span
                        className="d-grid text-white fw-bold flex-shrink-0 shadow-sm"
                        style={{
                          width: 26,
                          height: 26,
                          placeItems: 'center',
                          borderRadius: '50%',
                          background: C.green,
                          fontSize: 13,
                        }}
                      >
                        ✓
                      </span>

                      <span style={{ color: C.navy, fontWeight: 500 }}>{p}</span>
                    </li>
                  </Reveal>
                ))}
              </ul>

              <ArrowLink to="/about" filled>আরও জানুন</ArrowLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== পরিসংখ্যান ===== */}
      <section
        className="py-5 text-white text-center position-relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, rgba(15,31,61,0.92), rgba(27,53,102,0.92))`,
        }}
      >
        <div className="container py-3 position-relative" style={{ zIndex: 2 }}>
          <div className="row g-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.12} className="col-6 col-md-3">
                <div
                  style={{
                    fontSize: 'clamp(36px, 5vw, 54px)',
                    fontWeight: 800,
                    color: C.saffron,
                    lineHeight: 1.1,
                    textShadow: '0 10px 20px rgba(0,0,0,0.3)',
                  }}
                >
                  <Counter {...s} />
                </div>

                <div className="fw-semibold mt-2">{s.label}</div>
              </Reveal>
            ))}
          </div>

          <div className="small mt-4" style={{ opacity: 0.6 }}>
            এখানে দেখানো পরিসংখ্যানগুলি নমুনা। প্রয়োজন অনুযায়ী প্রকৃত তথ্য যোগ করুন।
          </div>
        </div>
      </section>

      {/* ===== আমাদের পরিষেবা ===== */}
      <section className="py-5" style={{ background: 'rgba(255,249,242,0.9)' }}>
        <div className="container py-4">
          <SectionTitle>আমাদের পরিষেবা</SectionTitle>

          <div className="row g-4">
            {services.map((s, i) => (
              <Reveal
                key={s.t}
                delay={(i % 3) * 0.12}
                className="col-12 col-md-6 col-lg-4"
              >
                {i === 0 ? (
                  <Link to="/contact?subject=complaint#form" className="d-block h-100 text-decoration-none" style={{ color: 'inherit' }}>
                    <HoverCard>
                      {(h) => (
                        <div className="p-4 h-100">
                          <div className="mb-3"><IconBox icon={s.icon} h={h} size={64} /></div>
                          <h5 className="fw-bold mb-2" style={{ color: C.navy }}>{s.t}</h5>
                          <p className="mb-0 text-secondary" style={{ lineHeight: 1.8 }}>{s.d}</p>
                        </div>
                      )}
                    </HoverCard>
                  </Link>
                ) : (
                  <HoverCard>
                    {(h) => (
                    <div className="p-4">
                      <div className="mb-3">
                        <IconBox icon={s.icon} h={h} size={64} />
                      </div>

                      <h5 className="fw-bold mb-2" style={{ color: C.navy }}>
                        {s.t}
                      </h5>

                      <p className="mb-0 text-secondary" style={{ lineHeight: 1.8 }}>
                        {s.d}
                      </p>
                    </div>
                    )}
                  </HoverCard>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== আসন্ন কর্মসূচি ===== */}
      <section className="py-5" style={{ background: 'rgba(255,255,255,0.85)' }}>
        <div className="container py-4">
          <SectionTitle>আসন্ন কর্মসূচি</SectionTitle>

          <div className="row g-4">
            {events.map((e, i) => (
              <Reveal
                key={e.t}
                delay={i * 0.12}
                className="col-12 col-md-4"
              >
                <HoverCard lift={8}>
                  {(h) => (
                    <div className="p-3 d-flex align-items-center gap-3">
                      <div
                        className="text-center text-white flex-shrink-0"
                        style={{
                          minWidth: 78,
                          padding: '12px 8px',
                          borderRadius: 16,
                          background: h ? C.saffronDark : C.saffron,
                          boxShadow: h ? '0 10px 20px rgba(255,106,0,0.3)' : 'none',
                          transform: h ? 'rotate(-6deg) scale(1.06)' : 'none',
                          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                      >
                        <b
                          className="d-block"
                          style={{ fontSize: 26, lineHeight: 1 }}
                        >
                          {e.d}
                        </b>
                        <small className="fw-semibold">{e.m}</small>
                      </div>

                      <div>
                        <h6 className="fw-bold mb-1" style={{ color: C.navy }}>
                          {e.t}
                        </h6>
                        <small className="text-secondary">{e.p}</small>
                      </div>
                    </div>
                  )}
                </HoverCard>
              </Reveal>
            ))}
          </div>

          <div className="text-center mt-5">
            <ArrowLink to="/events" filled>সব কর্মসূচি দেখুন</ArrowLink>
          </div>
        </div>
      </section>
    </>
  )
}
