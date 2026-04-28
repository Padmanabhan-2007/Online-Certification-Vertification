import { FileText, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function CertificateIssuing() {
  const [formData, setFormData] = useState({
    certificateId: "",
    courseName: "",
    issueDate: "",
    status: "Valid",
    studentId: "",
    issuerId: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        certificateId: "",
        courseName: "",
        issueDate: "",
        status: "Valid",
        studentId: "",
        issuerId: "",
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Issue Certificate</h1>
            <p className="text-gray-600">Create and issue a new digital certificate</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        {submitted && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-3 h-3 text-white" />
            </div>
            <p className="text-green-800">Certificate issued successfully!</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="certificateId" className="block text-sm text-gray-700 mb-2">
                Certificate ID
              </label>
              <input
                type="text"
                id="certificateId"
                name="certificateId"
                value={formData.certificateId}
                onChange={handleChange}
                placeholder="e.g., CERT2026ABC123"
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label htmlFor="courseName" className="block text-sm text-gray-700 mb-2">
                Course Name
              </label>
              <input
                type="text"
                id="courseName"
                name="courseName"
                value={formData.courseName}
                onChange={handleChange}
                placeholder="e.g., Bachelor of Computer Science"
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label htmlFor="issueDate" className="block text-sm text-gray-700 mb-2">
                Issue Date
              </label>
              <input
                type="date"
                id="issueDate"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label htmlFor="status" className="block text-sm text-gray-700 mb-2">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="Valid">Valid</option>
                <option value="Revoked">Revoked</option>
              </select>
            </div>

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
              <label htmlFor="issuerId" className="block text-sm text-gray-700 mb-2">
                Issuer ID
              </label>
              <input
                type="text"
                id="issuerId"
                name="issuerId"
                value={formData.issuerId}
                onChange={handleChange}
                placeholder="e.g., ISS001"
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-sm text-blue-900">
              <strong>Note:</strong> This certificate will be recorded on the blockchain and cannot be
              modified after issuance. Please verify all information before submitting.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2"
            >
              <FileText className="w-5 h-5" />
              Issue Certificate
            </button>
            <button
              type="button"
              onClick={() =>
                setFormData({
                  certificateId: "",
                  courseName: "",
                  issueDate: "",
                  status: "Valid",
                  studentId: "",
                  issuerId: "",
                })
              }
              className="px-8 py-4 bg-gray-100 text-gray-900 rounded-xl hover:bg-gray-200 transition-all"
            >
              Clear Form
            </button>
          </div>
        </form>
      </div>

      <div className="mt-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-3">Recently Issued Certificates</h3>
        <div className="space-y-3">
          {[
            { id: "CERT2026A123", course: "Computer Science", student: "John Doe", date: "2026-04-26" },
            { id: "CERT2026A122", course: "Data Science", student: "Jane Smith", date: "2026-04-26" },
            { id: "CERT2026A121", course: "Software Engineering", student: "Mike Johnson", date: "2026-04-25" },
          ].map((cert) => (
            <div key={cert.id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200">
              <div>
                <p className="font-medium text-gray-900">{cert.id}</p>
                <p className="text-sm text-gray-600">
                  {cert.student} - {cert.course}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">{cert.date}</p>
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full mt-1">
                  <CheckCircle className="w-3 h-3" />
                  Valid
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
