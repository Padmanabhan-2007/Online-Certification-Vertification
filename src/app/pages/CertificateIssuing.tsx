import React, { useState } from 'react';
import axios from 'axios';
import { Award, BookOpen, Calendar, User, CheckCircle, Shield } from 'lucide-react';

export default function CertificateIssuing() {
  const [formData, setFormData] = useState({
    certificate_id: '',
    student_name: '',
    course_name: '',
    issue_date: new Date().toISOString().split('T')[0],
    status: 'issued'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Connects to your Node.js backend
      const res = await axios.post('http://localhost:5000/api/issue-certificate', formData);
      alert("Success: " + res.data.message);
      // Reset form
      setFormData({ certificate_id: '', student_name: '', course_name: '', issue_date: '', status: 'issued' });
    } catch (err) {
      alert("Error: Make sure your backend (node server.js) is running!");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
          <Award size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Issue Certificate</h1>
          <p className="text-gray-500 text-sm">Create and issue a new digital certificate</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border p-8 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Certificate ID</label>
            <input 
              className="w-full p-3 bg-gray-50 border rounded-xl" placeholder="e.g. CERT2026A123"
              value={formData.certificate_id}
              onChange={(e) => setFormData({...formData, certificate_id: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Course Name</label>
            <input 
              className="w-full p-3 bg-gray-50 border rounded-xl" placeholder="e.g. Computer Science"
              value={formData.course_name}
              onChange={(e) => setFormData({...formData, course_name: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Student Name</label>
            <input 
              className="w-full p-3 bg-gray-50 border rounded-xl" placeholder="e.g. John Doe"
              value={formData.student_name}
              onChange={(e) => setFormData({...formData, student_name: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Issue Date</label>
            <input 
              type="date" className="w-full p-3 bg-gray-50 border rounded-xl"
              value={formData.issue_date}
              onChange={(e) => setFormData({...formData, issue_date: e.target.value})}
              required
            />
          </div>
        </div>

        <button type="submit" className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
          <CheckCircle size={20} /> Issue Certificate
        </button>
      </form>
    </div>
  );
}