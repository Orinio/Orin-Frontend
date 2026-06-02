'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import {
  User,
  Bell,
  Shield,
  Plug,
  CreditCard,
  AlertTriangle,
  Camera,
  Copy,
  Check,
  Download,
  Github,
  Linkedin,
  ExternalLink,
  Loader2,
  X,
} from 'lucide-react';

/* ─── Types ─── */
type Section = 'account' | 'notifications' | 'privacy' | 'integrations' | 'billing';

interface NavItem {
  id: Section;
  label: string;
  icon: React.ReactNode;
}

/* ─── Toggle Switch ─── */
function Toggle({
  enabled,
  onToggle,
  id,
}: {
  enabled: boolean;
  onToggle: () => void;
  id: string;
}) {
  return (
    <button
      id={id}
      role="switch"
      aria-checked={enabled}
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-emerald)] focus-visible:ring-offset-2 ${
        enabled ? 'bg-[var(--color-primary-emerald)]' : 'bg-[var(--color-neutral-border-strong)]'
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition-transform duration-200 ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

/* ─── Nav items ─── */
const navItems: NavItem[] = [
  { id: 'account', label: 'Account', icon: <User size={18} /> },
  { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
  { id: 'privacy', label: 'Privacy', icon: <Shield size={18} /> },
  { id: 'integrations', label: 'Integrations', icon: <Plug size={18} /> },
  { id: 'billing', label: 'Billing', icon: <CreditCard size={18} /> },
];

/* ─── Main ─── */
export default function SettingsPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<Section>('account');

  /* Account state */
  const [fullName, setFullName] = useState('');
  const [headline, setHeadline] = useState('');
  const [location, setLocation] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  /* Notification toggles */
  const [notifs, setNotifs] = useState({
    weeklySummary: true,
    recruiterViews: true,
    verificationStatus: false,
    opportunityMatch: true,
    coachTips: false,
  });

  /* Privacy state */
  const [profilePublic, setProfilePublic] = useState(true);
  const [hideEmail, setHideEmail] = useState(false);
  const [copied, setCopied] = useState(false);

  /* Integrations */
  const integrations = [
    {
      name: 'GitHub',
      icon: <Github size={20} />,
      connected: true,
      lastSync: '2 hours ago',
      color: '#333',
    },
    {
      name: 'Kaggle',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.281.18.046.149.034.233-.036.315L12.1 15.271l6.689 8.275c.07.093.092.186.036.313z" />
        </svg>
      ),
      connected: false,
      lastSync: null,
      color: '#20beff',
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin size={20} />,
      connected: true,
      lastSync: '1 day ago',
      color: '#0077b5',
    },
  ];

  /* Delete modal */
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState('');

  /* ─── Fetch user ─── */
  useEffect(() => {
    const fetchUser = async () => {
      if (!supabase) return;
      const {
        data: { user: activeUser },
      } = await supabase.auth.getUser();
      if (!activeUser) {
        router.push('/signin');
        return;
      }
      setFullName(activeUser.user_metadata?.full_name || '');
      setHeadline(activeUser.user_metadata?.headline || '');
      setLocation(activeUser.user_metadata?.location || '');
      setUsername(activeUser.user_metadata?.username || '');
      setBio(activeUser.user_metadata?.bio || '');
    };
    fetchUser();
  }, [router]);

  /* ─── Save handler ─── */
  const handleSave = useCallback(async () => {
    setSaving(true);
    setSaved(false);
    if (supabase) {
      await supabase.auth.updateUser({
        data: { full_name: fullName, headline, location, username, bio },
      });
    }
    // Simulate slight delay for demo mode
    await new Promise((r) => setTimeout(r, 600));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }, [fullName, headline, location, username, bio]);

  /* ─── Copy link ─── */
  const handleCopy = () => {
    navigator.clipboard.writeText(`https://orin.app/${username || 'yourname'}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /* ─── Initials ─── */
  const initials = fullName
    ? fullName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'AG';

  /* ─── Toggle helper ─── */
  const toggleNotif = (key: keyof typeof notifs) =>
    setNotifs((prev) => ({ ...prev, [key]: !prev[key] }));

  /* ─── Section Renderers ─── */
  const renderAccount = () => (
    <div className="space-y-6">
      {/* Avatar */}
      <div className="rounded-xl border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface)] p-6">
        <h2 className="text-lg font-semibold text-[var(--color-neutral-text)]">Profile photo</h2>
        <div className="mt-4 flex items-center gap-6">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-primary-emerald)] to-[var(--color-primary-emerald-light)] text-2xl font-bold text-white">
              {initials}
            </div>
            <button
              type="button"
              aria-label="Upload photo"
              className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--color-neutral-surface)] bg-[var(--color-neutral-surface-alt)] text-[var(--color-neutral-text-secondary)] shadow-sm transition hover:bg-[var(--color-primary-soft)] hover:text-[var(--color-primary-emerald)]"
            >
              <Camera size={14} />
            </button>
          </div>
          <div>
            <button
              type="button"
              className="rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-bg)] px-4 py-2 text-sm font-medium text-[var(--color-neutral-text)] transition hover:border-[var(--color-primary-emerald)] hover:text-[var(--color-primary-emerald)]"
            >
              Upload new photo
            </button>
            <p className="mt-1.5 text-xs text-[var(--color-neutral-text-tertiary)]">
              JPG, PNG or GIF. Max 2 MB.
            </p>
          </div>
        </div>
      </div>

      {/* Profile fields */}
      <div className="rounded-xl border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface)] p-6">
        <h2 className="text-lg font-semibold text-[var(--color-neutral-text)]">
          Personal information
        </h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="fullName"
              className="mb-1.5 block text-sm font-medium text-[var(--color-neutral-text)]"
            >
              Full name
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="Aditi Gupta"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-bg)] px-3.5 py-2.5 text-sm text-[var(--color-neutral-text)] placeholder:text-[var(--color-neutral-text-tertiary)] transition focus:border-[var(--color-primary-emerald)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-soft)]"
            />
          </div>
          <div>
            <label
              htmlFor="headline"
              className="mb-1.5 block text-sm font-medium text-[var(--color-neutral-text)]"
            >
              Headline
            </label>
            <input
              id="headline"
              type="text"
              placeholder="Frontend engineer · Builder"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-bg)] px-3.5 py-2.5 text-sm text-[var(--color-neutral-text)] placeholder:text-[var(--color-neutral-text-tertiary)] transition focus:border-[var(--color-primary-emerald)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-soft)]"
            />
          </div>
          <div>
            <label
              htmlFor="location"
              className="mb-1.5 block text-sm font-medium text-[var(--color-neutral-text)]"
            >
              Location
            </label>
            <input
              id="location"
              type="text"
              placeholder="Bengaluru, India"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-bg)] px-3.5 py-2.5 text-sm text-[var(--color-neutral-text)] placeholder:text-[var(--color-neutral-text-tertiary)] transition focus:border-[var(--color-primary-emerald)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-soft)]"
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="mb-1.5 block text-sm font-medium text-[var(--color-neutral-text)]"
            >
              Username / slug
            </label>
            <div className="flex items-center rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-bg)] transition focus-within:border-[var(--color-primary-emerald)] focus-within:ring-2 focus-within:ring-[var(--color-primary-soft)]">
              <span className="pl-3.5 text-sm text-[var(--color-neutral-text-tertiary)]">
                orin.app/
              </span>
              <input
                id="username"
                type="text"
                placeholder="aditi"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border-0 bg-transparent px-1 py-2.5 text-sm text-[var(--color-neutral-text)] placeholder:text-[var(--color-neutral-text-tertiary)] focus:outline-none"
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <label
              htmlFor="bio"
              className="mb-1.5 block text-sm font-medium text-[var(--color-neutral-text)]"
            >
              Bio
            </label>
            <textarea
              id="bio"
              rows={4}
              placeholder="Write a short bio about yourself..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full resize-none rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-bg)] px-3.5 py-2.5 text-sm text-[var(--color-neutral-text)] placeholder:text-[var(--color-neutral-text-tertiary)] transition focus:border-[var(--color-primary-emerald)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-soft)]"
            />
            <p className="mt-1 text-xs text-[var(--color-neutral-text-tertiary)]">
              {bio.length}/280 characters
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            className="btn-green inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Saving…
              </>
            ) : saved ? (
              <>
                <Check size={16} />
                Saved!
              </>
            ) : (
              'Save changes'
            )}
          </button>
          {saved && (
            <span className="text-sm text-[var(--color-primary-emerald)]">
              Changes saved successfully
            </span>
          )}
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => {
    const items: { key: keyof typeof notifs; label: string; desc: string }[] = [
      {
        key: 'weeklySummary',
        label: 'Weekly proof summary',
        desc: 'Receive a digest of your proof activity every Monday',
      },
      {
        key: 'recruiterViews',
        label: 'New recruiter view alerts',
        desc: 'Get notified when a recruiter views your profile',
      },
      {
        key: 'verificationStatus',
        label: 'Verification status updates',
        desc: 'Updates when your proof cards are verified or need attention',
      },
      {
        key: 'opportunityMatch',
        label: 'Opportunity match alerts',
        desc: 'Be alerted when new roles match your proof profile',
      },
      {
        key: 'coachTips',
        label: 'Coach tip notifications',
        desc: 'Personalized tips on improving your career proof',
      },
    ];

    return (
      <div className="rounded-xl border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface)] p-6">
        <h2 className="text-lg font-semibold text-[var(--color-neutral-text)]">
          Email notifications
        </h2>
        <p className="mt-1 text-sm text-[var(--color-neutral-text-secondary)]">
          Choose when ORIN should reach you.
        </p>
        <div className="mt-6 divide-y divide-[var(--color-neutral-border)]">
          {items.map((item) => (
            <div key={item.key} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
              <div className="pr-4">
                <p className="text-sm font-medium text-[var(--color-neutral-text)]">{item.label}</p>
                <p className="mt-0.5 text-xs text-[var(--color-neutral-text-tertiary)]">
                  {item.desc}
                </p>
              </div>
              <Toggle
                id={`toggle-${item.key}`}
                enabled={notifs[item.key]}
                onToggle={() => toggleNotif(item.key)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPrivacy = () => (
    <div className="space-y-6">
      <div className="rounded-xl border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface)] p-6">
        <h2 className="text-lg font-semibold text-[var(--color-neutral-text)]">
          Profile visibility
        </h2>
        <p className="mt-1 text-sm text-[var(--color-neutral-text-secondary)]">
          Control who can see your profile and proof cards.
        </p>
        <div className="mt-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--color-neutral-text)]">
                Public profile
              </p>
              <p className="mt-0.5 text-xs text-[var(--color-neutral-text-tertiary)]">
                {profilePublic
                  ? 'Anyone with the link can view your profile'
                  : 'Only you can see your profile'}
              </p>
            </div>
            <Toggle
              id="toggle-profile-public"
              enabled={profilePublic}
              onToggle={() => setProfilePublic(!profilePublic)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--color-neutral-text)]">Hide email</p>
              <p className="mt-0.5 text-xs text-[var(--color-neutral-text-tertiary)]">
                Your email won&apos;t be visible on your public profile
              </p>
            </div>
            <Toggle
              id="toggle-hide-email"
              enabled={hideEmail}
              onToggle={() => setHideEmail(!hideEmail)}
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface)] p-6">
        <h2 className="text-lg font-semibold text-[var(--color-neutral-text)]">
          Public profile link
        </h2>
        <p className="mt-1 text-sm text-[var(--color-neutral-text-secondary)]">
          Share this link so others can view your career proof.
        </p>
        <div className="mt-4 flex items-center gap-2">
          <div className="flex flex-1 items-center rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-bg)] px-3.5 py-2.5">
            <span className="truncate text-sm text-[var(--color-neutral-text)]">
              https://orin.app/{username || 'yourname'}
            </span>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-bg)] px-4 py-2.5 text-sm font-medium text-[var(--color-neutral-text)] transition hover:border-[var(--color-primary-emerald)] hover:text-[var(--color-primary-emerald)]"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface)] p-6">
        <h2 className="text-lg font-semibold text-[var(--color-neutral-text)]">Your data</h2>
        <p className="mt-1 text-sm text-[var(--color-neutral-text-secondary)]">
          Export all your proof data as a JSON file.
        </p>
        <button
          type="button"
          className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-bg)] px-4 py-2.5 text-sm font-medium text-[var(--color-neutral-text)] transition hover:border-[var(--color-primary-emerald)] hover:text-[var(--color-primary-emerald)]"
        >
          <Download size={16} />
          Export data
        </button>
      </div>
    </div>
  );

  const renderIntegrations = () => (
    <div className="rounded-xl border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface)] p-6">
      <h2 className="text-lg font-semibold text-[var(--color-neutral-text)]">
        Connected services
      </h2>
      <p className="mt-1 text-sm text-[var(--color-neutral-text-secondary)]">
        Connect platforms to automatically import your proof of work.
      </p>
      <div className="mt-6 divide-y divide-[var(--color-neutral-border)]">
        {integrations.map((int) => (
          <div key={int.name} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-neutral-surface-alt)] text-[var(--color-neutral-text)]">
                {int.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--color-neutral-text)]">{int.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span
                    className={`inline-block h-1.5 w-1.5 rounded-full ${
                      int.connected
                        ? 'bg-[var(--color-primary-emerald)]'
                        : 'bg-[var(--color-neutral-text-tertiary)]'
                    }`}
                  />
                  <span className="text-xs text-[var(--color-neutral-text-tertiary)]">
                    {int.connected
                      ? `Connected · Synced ${int.lastSync}`
                      : 'Not connected'}
                  </span>
                </div>
              </div>
            </div>
            <button
              type="button"
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                int.connected
                  ? 'border-[var(--color-neutral-border)] text-[var(--color-neutral-text-secondary)] hover:border-[var(--color-danger)] hover:text-[var(--color-danger)]'
                  : 'border-[var(--color-primary-emerald)] text-[var(--color-primary-emerald)] hover:bg-[var(--color-primary-soft)]'
              }`}
            >
              {int.connected ? 'Disconnect' : 'Connect'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBilling = () => (
    <div className="rounded-xl border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface)] p-6">
      <h2 className="text-lg font-semibold text-[var(--color-neutral-text)]">
        Plan &amp; billing
      </h2>
      <p className="mt-1 text-sm text-[var(--color-neutral-text-secondary)]">
        Manage your subscription and payment details.
      </p>
      <div className="mt-6 rounded-lg border border-[var(--color-primary-emerald)]/20 bg-[var(--color-bg-emerald-light)] p-5">
        <div className="flex items-center justify-between">
          <div>
            <span className="inline-block rounded-full bg-[var(--color-primary-emerald)] px-3 py-0.5 text-xs font-semibold text-white">
              Free Plan
            </span>
            <p className="mt-2 text-sm text-[var(--color-neutral-text)]">
              You&apos;re on the free tier. Upgrade to unlock unlimited proof cards, analytics, and
              priority verification.
            </p>
          </div>
        </div>
        <button
          type="button"
          className="btn-green mt-4 rounded-lg px-5 py-2.5 text-sm font-semibold text-white"
        >
          Upgrade plan
        </button>
      </div>
    </div>
  );

  const sectionRenderers: Record<Section, () => React.ReactNode> = {
    account: renderAccount,
    notifications: renderNotifications,
    privacy: renderPrivacy,
    integrations: renderIntegrations,
    billing: renderBilling,
  };

  const sectionTitles: Record<Section, { title: string; subtitle: string }> = {
    account: {
      title: 'Account settings',
      subtitle: 'Control how your profile appears and how ORIN communicates with you.',
    },
    notifications: {
      title: 'Notification preferences',
      subtitle: 'Choose when and how ORIN should reach you.',
    },
    privacy: {
      title: 'Privacy & data',
      subtitle: 'Control your profile visibility and manage your data.',
    },
    integrations: {
      title: 'Integrations',
      subtitle: 'Connect external services to import your work automatically.',
    },
    billing: {
      title: 'Plan & billing',
      subtitle: 'Manage your subscription and payment details.',
    },
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      {/* ─── Sidebar ─── */}
      <aside>
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-neutral-text-tertiary)]">
          Settings
        </h2>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveSection(item.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-all duration-150 ${
                activeSection === item.id
                  ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary-emerald)]'
                  : 'text-[var(--color-neutral-text-secondary)] hover:bg-[var(--color-neutral-surface-alt)] hover:text-[var(--color-neutral-text)]'
              }`}
            >
              <span
                className={
                  activeSection === item.id
                    ? 'text-[var(--color-primary-emerald)]'
                    : 'text-[var(--color-neutral-text-tertiary)]'
                }
              >
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* ─── Content ─── */}
      <section className="min-w-0 space-y-6">
        {/* Section header */}
        <header>
          <h1 className="font-serif text-2xl font-semibold text-[var(--color-neutral-text)]">
            {sectionTitles[activeSection].title}
          </h1>
          <p className="mt-1 text-sm text-[var(--color-neutral-text-secondary)]">
            {sectionTitles[activeSection].subtitle}
          </p>
        </header>

        {/* Active section content */}
        {sectionRenderers[activeSection]()}

        {/* ─── Danger zone (always visible) ─── */}
        <div className="rounded-xl border border-[var(--color-danger)]/20 bg-[var(--color-neutral-surface)] p-6">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-danger)]/10 text-[var(--color-danger)]">
              <AlertTriangle size={18} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[var(--color-danger)]">Danger zone</h2>
              <p className="mt-1 text-sm text-[var(--color-neutral-text-secondary)]">
                Deleting your account permanently removes all proof data, analytics, and profile
                information. This action cannot be undone.
              </p>
              <button
                className="mt-4 rounded-lg bg-[var(--color-danger)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--color-danger-strong)]"
                type="button"
                onClick={() => setShowDeleteModal(true)}
              >
                Delete account
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Delete Modal ─── */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Confirm account deletion"
            className="relative w-full max-w-md rounded-2xl border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface)] p-6 shadow-2xl"
          >
            <button
              type="button"
              onClick={() => {
                setShowDeleteModal(false);
                setDeleteConfirm('');
              }}
              className="absolute right-4 top-4 text-[var(--color-neutral-text-tertiary)] transition hover:text-[var(--color-neutral-text)]"
              aria-label="Close dialog"
            >
              <X size={20} />
            </button>

            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-danger)]/10">
              <AlertTriangle size={24} className="text-[var(--color-danger)]" />
            </div>

            <h3 className="text-lg font-semibold text-[var(--color-neutral-text)]">
              Delete your account?
            </h3>
            <p className="mt-2 text-sm text-[var(--color-neutral-text-secondary)]">
              This action is permanent and cannot be undone. All proof cards, analytics, and profile
              data will be permanently removed.
            </p>

            <div className="mt-4">
              <label
                htmlFor="deleteConfirm"
                className="mb-1.5 block text-sm font-medium text-[var(--color-neutral-text)]"
              >
                Type <span className="font-mono font-bold text-[var(--color-danger)]">DELETE</span>{' '}
                to confirm
              </label>
              <input
                id="deleteConfirm"
                type="text"
                value={deleteConfirm}
                onChange={(e) => setDeleteConfirm(e.target.value)}
                placeholder="DELETE"
                className="w-full rounded-lg border border-[var(--color-neutral-border)] bg-[var(--color-neutral-bg)] px-3.5 py-2.5 text-sm text-[var(--color-neutral-text)] placeholder:text-[var(--color-neutral-text-tertiary)] focus:border-[var(--color-danger)] focus:outline-none focus:ring-2 focus:ring-[var(--color-danger)]/20"
              />
            </div>

            <div className="mt-6 flex gap-3">
              <button
                className="flex-1 rounded-lg bg-[var(--color-danger)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--color-danger-strong)] disabled:cursor-not-allowed disabled:opacity-40"
                type="button"
                disabled={deleteConfirm !== 'DELETE'}
              >
                Yes, delete my account
              </button>
              <button
                className="flex-1 rounded-lg border border-[var(--color-neutral-border)] px-4 py-2.5 text-sm font-semibold text-[var(--color-neutral-text)] transition hover:bg-[var(--color-neutral-surface-alt)]"
                type="button"
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirm('');
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}