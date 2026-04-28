import { Link } from "react-router-dom";
import { Shield, CheckCircle, Lock, FileCheck, Award, Search } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-semibold text-gray-900">CertifySecure</span>
          </div>
          <Link
            to="/admin"
            className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            Admin Login
          </Link>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-8">
            <Shield className="w-4 h-4" />
            <span className="text-sm">Blockchain-Verified Certificates</span>
          </div>

          <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Secure Online Certificate
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Verification System
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Prevent certificate fraud with our advanced digital verification platform.
            Issue, manage, and verify academic certificates with tamper-proof security.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              to="/verify"
              className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-500/30 flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              Verify Certificate
            </Link>
            <Link
              to="/register"
              className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-200 rounded-xl hover:border-blue-600 transition-all hover:shadow-lg flex items-center gap-2"
            >
              <Award className="w-5 h-5" />
              Student Registration
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to manage digital certificates securely
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl border border-blue-200/50 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Tamper-Proof Security
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Blockchain-backed verification ensures certificates cannot be forged or altered after issuance.
              </p>
            </div>

            <div className="p-8 bg-gradient-to-br from-indigo-50 to-indigo-100/50 rounded-2xl border border-indigo-200/50 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Instant Verification
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Verify any certificate in seconds using its unique ID. No manual checks required.
              </p>
            </div>

            <div className="p-8 bg-gradient-to-br from-violet-50 to-violet-100/50 rounded-2xl border border-violet-200/50 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-violet-600 rounded-xl flex items-center justify-center mb-6">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Role-Based Access
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Secure admin dashboard with granular permissions for issuers and administrators.
              </p>
            </div>

            <div className="p-8 bg-gradient-to-br from-cyan-50 to-cyan-100/50 rounded-2xl border border-cyan-200/50 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-cyan-600 rounded-xl flex items-center justify-center mb-6">
                <FileCheck className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Automated Issuance
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Streamline certificate generation with automated workflows and bulk operations.
              </p>
            </div>

            <div className="p-8 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl border border-purple-200/50 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Custom Templates
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Design professional certificates with customizable templates and branding.
              </p>
            </div>

            <div className="p-8 bg-gradient-to-br from-pink-50 to-pink-100/50 rounded-2xl border border-pink-200/50 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-pink-600 rounded-xl flex items-center justify-center mb-6">
                <Search className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Audit Trail
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Complete verification history with detailed logs for compliance and analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-6 h-6 text-blue-400" />
                <span className="font-semibold">CertifySecure</span>
              </div>
              <p className="text-gray-400 text-sm">
                The trusted platform for digital certificate management and verification.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/verify" className="hover:text-white transition-colors">Verify Certificate</Link></li>
                <li><Link to="/register" className="hover:text-white transition-colors">Register Student</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            © 2026 CertifySecure. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
