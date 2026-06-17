import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  X,
  Search,
  Bell,
  Check,
  LayoutDashboard,
  Users,
  BarChart3,
  FileText,
  Settings,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'

const NAV_LINKS = ['Home', 'Features', 'Company', 'Contact']

const STATS = [
  { label: 'Total Sales', value: '$48,250', trend: '+12.5%', up: true, bars: [40, 55, 45, 70, 60, 80, 65] },
  { label: 'Operating Expenses', value: '$12,840', trend: '-3.2%', up: false, bars: [60, 50, 55, 42, 48, 35, 44] },
  { label: 'Gross Profit', value: '$35,410', trend: '+8.1%', up: true, bars: [30, 45, 40, 55, 60, 72, 84] },
]

const REVENUE = [45, 62, 38, 70, 55, 80, 48, 66, 72, 58, 86, 64]

const DEALS = [
  { name: 'Enterprise License', amount: '$24,500', date: 'Jun 12, 2026', owner: 'AK', color: 'bg-indigo-100 text-indigo-700' },
  { name: 'Cloud Migration', amount: '$18,200', date: 'Jun 09, 2026', owner: 'MR', color: 'bg-pink-100 text-pink-700' },
  { name: 'Annual Support Plan', amount: '$9,800', date: 'Jun 05, 2026', owner: 'JL', color: 'bg-amber-100 text-amber-700' },
]

const SIDEBAR_ICONS = [LayoutDashboard, Users, BarChart3, FileText, Settings]

/** Star with a blue gradient fill for the "Trusted by" badge. */
function StarBadgeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="tk-star" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#60a5fa" />
          <stop offset="1" stopColor="#2563eb" />
        </linearGradient>
      </defs>
      <path
        fill="url(#tk-star)"
        d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77 5.82 21l1.18-6.88-5-4.87 7.1-1.01L12 2z"
      />
    </svg>
  )
}

/** Small Amazon-style smile mark for the deals table. */
function AmazonMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 15c4.5 3 11.5 3 16 0" stroke="#FF9900" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M17 16.5l1.5 1.2" stroke="#FF9900" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    </svg>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-1/2 top-4 z-50 w-[calc(100%-1.5rem)] max-w-4xl -translate-x-1/2"
    >
      <div className="flex items-center justify-between rounded-full border border-white/10 bg-white/10 px-4 py-2.5 backdrop-blur-md">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white">
            <Check size={16} className="text-black" strokeWidth={3} />
          </span>
          <span className="font-intertight text-lg font-semibold tracking-tight text-white">Taskora</span>
        </div>

        {/* Center links (desktop) */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 font-inter text-sm text-white/75 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <a href="#" className="transition-colors hover:text-white">
                {l}
              </a>
            </li>
          ))}
        </ul>

        {/* Auth (desktop) */}
        <div className="hidden items-center gap-3 md:flex">
          <button className="font-inter text-sm text-white/75 transition-colors hover:text-white">Sign Up</button>
          <button className="rounded-full bg-white px-4 py-1.5 font-inter text-sm font-medium text-black transition hover:bg-white/90">
            Sign In
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mt-2 rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col gap-1 font-inter text-sm text-white/80">
              {NAV_LINKS.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-2 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-3">
              <button className="rounded-full px-3 py-2 text-left font-inter text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white">
                Sign Up
              </button>
              <button className="rounded-full bg-white px-3 py-2 font-inter text-sm font-medium text-black transition hover:bg-white/90">
                Sign In
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

function StatCard({ label, value, trend, up, bars }: (typeof STATS)[number]) {
  return (
    <div className="rounded-xl border border-black/5 bg-white p-4">
      <div className="font-inter text-xs text-gray-500">{label}</div>
      <div className="mt-2 flex items-end justify-between">
        <div className="font-intertight text-2xl font-semibold tracking-tight text-gray-900">{value}</div>
        <span
          className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[11px] font-medium ${
            up ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
          }`}
        >
          {up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {trend}
        </span>
      </div>
      <div className="mt-4 flex h-10 items-end gap-[3px]">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-[2px]"
            style={{
              height: `${h}%`,
              backgroundColor:
                i === bars.length - 1
                  ? up
                    ? '#22c55e'
                    : '#ef4444'
                  : up
                    ? '#bbf7d0'
                    : '#fecaca',
            }}
          />
        ))}
      </div>
    </div>
  )
}

function RevenueChart() {
  return (
    <div className="rounded-xl border border-black/5 bg-white p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-inter text-sm font-semibold text-gray-900">Revenue</div>
          <div className="font-inter text-xs text-gray-400">Last 12 months</div>
        </div>
        <div className="font-intertight text-xl font-semibold tracking-tight text-gray-900">$248,500</div>
      </div>
      <div className="mt-5 flex h-32 items-end gap-1.5 sm:gap-2">
        {REVENUE.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-md bg-gradient-to-t from-indigo-500/70 to-indigo-400"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  )
}

function DealsTable() {
  return (
    <div className="rounded-xl border border-black/5 bg-white">
      <div className="flex items-center justify-between border-b border-black/5 px-4 py-3 sm:px-5">
        <div className="font-inter text-sm font-semibold text-gray-900">Recent Deals</div>
        <button className="font-inter text-xs text-gray-400 transition-colors hover:text-gray-600">View all</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[620px] text-left">
          <thead>
            <tr className="font-inter text-[11px] uppercase tracking-wide text-gray-400">
              <th className="px-4 py-2.5 font-medium sm:px-5">Deal Name</th>
              <th className="px-3 py-2.5 font-medium">Company</th>
              <th className="px-3 py-2.5 font-medium">Amount</th>
              <th className="px-3 py-2.5 font-medium">Date</th>
              <th className="px-3 py-2.5 font-medium">Owner</th>
              <th className="px-3 py-2.5 font-medium">Stage</th>
            </tr>
          </thead>
          <tbody className="font-inter text-sm text-gray-700">
            {DEALS.map((d) => (
              <tr key={d.name} className="border-t border-black/5">
                <td className="px-4 py-3 font-medium text-gray-900 sm:px-5">{d.name}</td>
                <td className="px-3 py-3">
                  <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                    <AmazonMark />
                    Amazon.com
                  </span>
                </td>
                <td className="px-3 py-3">{d.amount}</td>
                <td className="px-3 py-3 whitespace-nowrap text-gray-500">{d.date}</td>
                <td className="px-3 py-3">
                  <span
                    className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold ${d.color}`}
                  >
                    {d.owner}
                  </span>
                </td>
                <td className="px-3 py-3">
                  <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-600">New</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function DashboardPreview() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#F9F9FA] shadow-2xl shadow-black/60">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden w-14 flex-col items-center gap-6 border-r border-black/5 bg-white py-5 sm:flex">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-black">
            <Check size={16} className="text-white" strokeWidth={3} />
          </span>
          <nav className="flex flex-col items-center gap-5">
            {SIDEBAR_ICONS.map((Icon, i) => (
              <button
                key={i}
                className={`transition-colors ${i === 0 ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-700'}`}
                aria-label="Sidebar nav item"
              >
                <Icon size={19} />
              </button>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <div className="min-w-0 flex-1">
          {/* Header */}
          <header className="flex items-center justify-between gap-4 border-b border-black/5 px-4 py-3 sm:px-6">
            <div className="flex w-40 items-center gap-2 rounded-lg bg-gray-100 px-3 py-1.5 sm:w-72">
              <Search size={15} className="text-gray-400" />
              <span className="font-inter text-xs text-gray-400">Search deals, people…</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <button className="relative text-gray-400 transition-colors hover:text-gray-700" aria-label="Notifications">
                <Bell size={18} />
                <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-red-500" />
              </button>
              <div className="flex -space-x-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-200 text-[10px] font-semibold text-indigo-700 ring-2 ring-white">
                  AK
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-pink-200 text-[10px] font-semibold text-pink-700 ring-2 ring-white">
                  ML
                </span>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="space-y-5 p-4 sm:p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {STATS.map((s) => (
                <StatCard key={s.label} {...s} />
              ))}
            </div>
            <RevenueChart />
            <DealsTable />
          </div>
        </div>
      </div>
    </div>
  )
}

const fadeUp = {
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
}
const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function TaskoraHero() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#050505]">
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-50"
        src="/videos/bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />
      {/* Gradient overlay -> fades into #050505 at the bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#050505]/70 to-[#050505]" />

      <Navbar />

      {/* Hero content */}
      <main className="relative z-10 flex flex-col items-center px-4 pt-36 text-center sm:pt-40 md:pt-48">
        <motion.div {...fadeUp} transition={{ duration: 0.6, ease, delay: 0.1 }}>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-1.5 font-manrope text-xs text-white/90 backdrop-blur-md sm:text-sm">
            <StarBadgeIcon />
            Trusted by +30.000 of clients globally
          </div>
        </motion.div>

        <motion.h1
          {...fadeUp}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
          className="mt-6 max-w-4xl font-intertight text-5xl font-semibold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-[80px]"
        >
          Simplify Your <span className="font-serif font-normal italic">Workflow.</span> Stay Focused.
        </motion.h1>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.6, ease, delay: 0.35 }}
          className="mt-5 max-w-xl font-manrope text-base text-gray-400 sm:text-lg"
        >
          Taskora helps teams manage projects, tasks, and deadlines with clarity.
        </motion.p>

        <motion.div {...fadeUp} transition={{ duration: 0.6, ease, delay: 0.5 }}>
          <button className="mt-8 rounded-full bg-white px-7 py-3.5 font-cabin text-base font-medium text-black shadow-lg shadow-white/10 transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-white/20">
            Book a Free Demo
          </button>
        </motion.div>

        {/* Dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.65 }}
          className="mt-16 w-full max-w-6xl pb-24"
        >
          <DashboardPreview />
        </motion.div>
      </main>
    </div>
  )
}
