import Link from 'next/link';

export default function Pricing() {
  return (
    <>
      {/* PRICING */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-serif font-bold text-center mb-16 text-gray-900">
            Simple, transparent pricing
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="rounded-lg border border-gray-200 bg-white p-8">
              <h3 className="font-bold text-lg mb-6 text-gray-900">Free Proof</h3>
              <p className="text-3xl font-bold mb-6 text-gray-900">Free</p>
              <Link href="/signup" className="rounded-md border-2 border-gray-300 w-full py-3 text-center font-semibold hover:bg-gray-50 mb-6 block">
                Get Started Free
              </Link>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ 5 proof cards</li>
                <li>✓ Basic coach (3x/week)</li>
                <li>✓ Public profile</li>
                <li>✓ 1 source integration</li>
              </ul>
            </div>

            {/* Pro Plan */}
            <div className="rounded-lg border-2 border-emerald-500 bg-emerald-50 p-8 relative">
              <div className="absolute -top-4 left-6 bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                Most Popular
              </div>
              <h3 className="font-bold text-lg mb-6 text-gray-900">Pro Proof</h3>
              <p className="text-3xl font-bold mb-2 text-gray-900">
                ₹299<span className="text-gray-600 text-lg">/month</span>
              </p>
              <Link href="/signup" className="btn-green w-full py-3 rounded-lg font-semibold mb-6 block text-center">
                Start Free Trial
              </Link>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Unlimited proof cards</li>
                <li>✓ Daily AI coach</li>
                <li>✓ Unlimited integrations</li>
                <li>✓ Opportunity matching</li>
                <li>✓ Analytics dashboard</li>
                <li>✓ Priority support</li>
              </ul>
            </div>

            {/* Enterprise Plan */}
            <div className="rounded-lg border border-gray-200 bg-white p-8">
              <h3 className="font-bold text-lg mb-6 text-gray-900">Institutions</h3>
              <p className="text-3xl font-bold mb-6 text-gray-900">Custom</p>
              <Link href="/contact" className="rounded-md border-2 border-gray-300 w-full py-3 text-center font-semibold hover:bg-gray-50 mb-6 block">
                Contact
              </Link>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ All Pro features</li>
                <li>✓ Cohort dashboard</li>
                <li>✓ Outcome reporting</li>
                <li>✓ Dedicated support</li>
                <li>✓ Branded profiles</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* STYLES */}
      <style>{`
        .btn-green {
          background: linear-gradient(135deg, #059669, #10b981);
          color: white;
          font-weight: 500;
          transition: box-shadow 0.3s ease;
        }

        .btn-green:hover {
          box-shadow: 0 8px 25px rgba(5, 150, 105, 0.3);
        }
      `}</style>
    </>
  );
}