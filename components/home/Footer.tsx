export default function Footer() {
  return (
    <>
      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-8 mb-8">
          <div>
            <p className="font-serif font-bold text-white text-lg">ORIN</p>
            <p className="text-sm mt-2">Turn your work into career proof.</p>
          </div>
          <div>
            <p className="font-bold text-white text-sm mb-4">Product</p>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="hover:text-white">Features</a></li>
              <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
              <li><a href="#" className="hover:text-white">Security</a></li>
            </ul>
          </div>
          <div>
            <p className="font-bold text-white text-sm mb-4">Company</p>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
            </ul>
          </div>
          <div>
            <p className="font-bold text-white text-sm mb-4">Legal</p>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Privacy</a></li>
              <li><a href="#" className="hover:text-white">Terms</a></li>
              <li><a href="#" className="hover:text-white">Cookies</a></li>
            </ul>
          </div>
          <div>
            <p className="font-bold text-white text-sm mb-4">Connect</p>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Twitter</a></li>
              <li><a href="#" className="hover:text-white">Discord</a></li>
              <li><a href="#" className="hover:text-white">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          © 2025 ORIN. Career proof for students building futures.
        </div>
      </footer>
    </>
  );
}