import React, { useState } from 'react';
import axios from 'axios';
import { Send } from 'lucide-react';

export default function IssueCertificate() {
  const [formData, setFormData] = useState({
    certificate_id: '',
    student_name: '',
    course_name: '',
    issue_date: new Date().toISOString().split('T')[0] // Defaults to today
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/issue-certificate', formData);
      alert(response.data.message);
      // Clear form after success
      setFormData({ certificate_id: '', student_name: '', course_name: '', issue_date: '' });
    } catch (error) {
      console.error("Error issuing certificate:", error);
      alert("Failed to issue certificate. Check console.");
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Issue New Certificate</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Certificate ID</label>
          <input 
            type="text" required className="w-full mt-1 p-2 border rounded-lg"
            value={formData.certificate_id}
            onChange={(e) => setFormData({...formData, certificate_id: e.target.value})}
            placeholder="e.g. CERT-2026-001"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Student Name</label>
          <input 
            type="text" required className="w-full mt-1 p-2 border rounded-lg"
            value={formData.student_name}
            onChange={(e) => setFormData({...formData, student_name: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Course Name</label>
          <input 
            type="text" required className="w-full mt-1 p-2 border rounded-lg"
            value={formData.course_name}
            onChange={(e) => setFormData({...formData, course_name: e.target.value})}
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700">
          <Send className="w-4 h-4" /> Issue Certificate
        </button>
      </form>
    </div>
  );
}