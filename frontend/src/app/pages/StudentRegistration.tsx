import { Link } from "react-router-dom";
import { Shield, ArrowLeft, UserPlus } from "lucide-react";
import { useState } from "react";
import axios from "axios";

export default function StudentRegistration() {
  const [formData, setFormData] = useState({
    studentId: "",
    fullName: "",
    email: "",
    dateOfBirth: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const res = await axios.post("http://localhost:5000/api/students", formData);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setFormData({
        studentId: "",
        fullName: "",
        email: "",
        dateOfBirth: "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to register student.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-semibold text-gray-900">CertifySecure</span>
          </div>
          <Link
            to="/"
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6">
              <UserPlus className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Student Registration
            </h1>
            <p className="text-lg text-gray-600">
              Register to receive verified digital certificates
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12">
            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-green-800">Registration successful! Your student ID has been created.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="studentId" className="block text-sm text-gray-700 mb-2">
                  Student ID
                </label>
                <input
                  type="text"
                  id="studentId"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  placeholder="e.g., STU2026001"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label htmlFor="fullName" className="block text-sm text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="student@university.edu"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label htmlFor="dateOfBirth" className="block text-sm text-gray-700 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2"
              >
                <UserPlus className="w-5 h-5" />
                Register Student
              </button>
            </form>

            <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-sm text-blue-900">
                <strong>Note:</strong> After registration, you'll be eligible to receive digital certificates
                that can be verified through our secure platform.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have a certificate?{" "}
              <Link to="/verify" className="text-blue-600 hover:underline">
                Verify it here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
