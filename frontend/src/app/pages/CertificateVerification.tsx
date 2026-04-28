import { Link } from "react-router-dom";
import { Shield, ArrowLeft, Search, CheckCircle, XCircle, Award, Calendar, User, Building } from "lucide-react";
import { useState } from "react";
import axios from "axios";

export default function CertificateVerification() {
  const [certificateId, setCertificateId] = useState("");
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setVerificationResult(null);

    try {
      const res = await axios.get(`http://localhost:5000/api/certificates/${certificateId}`);
      const data = res.data;
      setVerificationResult({
        status: "valid",
        certificateId: data.certificate_id,
        studentName: data.student_name,
        courseName: data.course_name,
        issueDate: data.issue_date,
        issuerName: "CertifySecure Platform",
        issuerVerified: true,
      });
    } catch (error) {
      setVerificationResult({
        status: "invalid",
      });
    } finally {
      setIsVerifying(false);
    }
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
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6">
              <Search className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Verify Certificate
            </h1>
            <p className="text-lg text-gray-600">
              Enter the certificate ID to verify its authenticity
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12">
            <form onSubmit={handleVerify} className="space-y-6">
              <div>
                <label htmlFor="certificateId" className="block text-sm text-gray-700 mb-2">
                  Certificate ID
                </label>
                <input
                  type="text"
                  id="certificateId"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                  placeholder="e.g., CERT2026ABC123456"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isVerifying ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Verify Certificate
                  </>
                )}
              </button>
            </form>
          </div>

          {verificationResult && (
            <div className="mt-8 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className={`p-6 ${verificationResult.status === "valid" ? "bg-gradient-to-r from-green-500 to-emerald-500" : "bg-gradient-to-r from-red-500 to-rose-500"}`}>
                <div className="flex items-center gap-3">
                  {verificationResult.status === "valid" ? (
                    <CheckCircle className="w-8 h-8 text-white" />
                  ) : (
                    <XCircle className="w-8 h-8 text-white" />
                  )}
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {verificationResult.status === "valid" ? "Certificate Valid" : "Certificate Invalid"}
                    </h3>
                    <p className="text-white/90">
                      {verificationResult.status === "valid"
                        ? "This certificate has been verified successfully"
                        : "This certificate could not be verified"}
                    </p>
                  </div>
                </div>
              </div>

              {verificationResult.status === "valid" && (
                <div className="p-8 space-y-6">
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-1">Certificate ID</p>
                      <p className="font-semibold text-gray-900">{verificationResult.certificateId}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-1">Student Name</p>
                      <p className="font-semibold text-gray-900">{verificationResult.studentName}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-1">Course Name</p>
                      <p className="font-semibold text-gray-900">{verificationResult.courseName}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-cyan-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-1">Issue Date</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(verificationResult.issueDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-1">Issued By</p>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900">{verificationResult.issuerName}</p>
                        {verificationResult.issuerVerified && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                            <CheckCircle className="w-3 h-3" />
                            Verified
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
