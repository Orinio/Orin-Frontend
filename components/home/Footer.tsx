export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--color-ink)' }} className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-spark)' }}>
                <span className="text-sm font-bold" style={{ color: 'var(--color-ink)' }}>O</span>
              </div>
              <span className="text-xl font-bold" style={{ color: 'var(--color-paper)' }}>ORIN</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: '#94a3b8' }}>
              Turn your work into career proof.
            </p>
          </div>

          {/* Product */}
          <div>
            <p className="font-bold text-sm mb-4 uppercase tracking-wider" style={{ color: 'var(--color-paper)' }}>Product</p>
            <ul className="space-y-3">
              {['Features', 'Pricing', 'Security', 'Changelog'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm transition-colors duration-200 hover:text-white" style={{ color: '#94a3b8' }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="font-bold text-sm mb-4 uppercase tracking-wider" style={{ color: 'var(--color-paper)' }}>Company</p>
            <ul className="space-y-3">
              {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm transition-colors duration-200 hover:text-white" style={{ color: '#94a3b8' }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="font-bold text-sm mb-4 uppercase tracking-wider" style={{ color: 'var(--color-paper)' }}>Legal</p>
            <ul className="space-y-3">
              {['Privacy', 'Terms', 'Cookies'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm transition-colors duration-200 hover:text-white" style={{ color: '#94a3b8' }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="font-bold text-sm mb-4 uppercase tracking-wider" style={{ color: 'var(--color-paper)' }}>Connect</p>
            <ul className="space-y-3">
              {['Twitter', 'Discord', 'LinkedIn', 'GitHub'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm transition-colors duration-200 hover:text-white" style={{ color: '#94a3b8' }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: '#1e293b' }}>
          <p className="text-sm" style={{ color: '#64748b' }}>
            &copy; {new Date().getFullYear()} ORIN. Career proof for students building futures.
          </p>
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full" style={{ backgroundColor: '#1e293b', color: 'var(--color-bloom)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-bloom)' }} />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
