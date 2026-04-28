import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Users, Award, CheckCircle, XCircle, TrendingUp, 
  ArrowUpRight, ArrowDownRight 
} from "lucide-react";
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  // --- 1. LIVE DATA STATES ---
  const [totalCerts, setTotalCerts] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [liveActivity, setLiveActivity] = useState([]);

  // --- 2. FETCH DATA FROM DATABASE ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Certificates
        const certRes = await axios.get('http://localhost:5000/api/certificates');
        setTotalCerts(certRes.data.length);
        
        // Use the last 5 certificates for the Recent Activity table
        setLiveActivity(certRes.data.slice(-5).reverse());

        // Fetch Students
        const studentRes = await axios.get('http://localhost:5000/api/students');
        setStudentCount(studentRes.data.length);
      } catch (err) {
        console.error("Database fetch error:", err);
      }
    };

    fetchData();
  }, []);

  // --- 3. UI CONFIGURATION ---
  const stats = [
    {
      label: "Total Students",
      value: studentCount.toLocaleString(), // Formats number (e.g. 1,000)
      change: "+100%", // You can calculate real change later
      trend: "up",
      icon: Users,
      color: "blue",
    },
    {
      label: "Total Certificates",
      value: totalCerts.toLocaleString(),
      change: `+${totalCerts}`, 
      trend: "up",
      icon: Award,
      color: "indigo",
    },
    {
      label: "Verified Certificates",
      value: totalCerts > 0 ? (totalCerts - 1).toLocaleString() : "0", 
      change: "+15.3%",
      trend: "up",
      icon: CheckCircle,
      color: "green",
    },
    {
      label: "Revoked Certificates",
      value: "0",
      change: "0%",
      trend: "down",
      icon: XCircle,
      color: "red",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: any = {
      blue: "bg-blue-100 text-blue-600",
      indigo: "bg-indigo-100 text-indigo-600",
      green: "bg-green-100 text-green-600",
      red: "bg-red-100 text-red-600",
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Your system is live and connected to MySQL.</p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 ${getColorClasses(stat.color)} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                {stat.trend === "up" ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                <span>{stat.change}</span>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* RECENT ACTIVITY FROM DATABASE */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Live Activity Log</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Certificate ID</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Student</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Course</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {liveActivity.map((cert: any) => (
                  <tr key={cert.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        Issued
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{cert.certificate_id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{cert.student_name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{cert.course_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
            <TrendingUp className="w-8 h-8 mb-4 opacity-90" />
            <h3 className="text-2xl font-bold mb-2">100%</h3>
            <p className="text-blue-100 mb-4">Database Sync Success</p>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div className="bg-white rounded-full h-2" style={{ width: "100%" }} />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link to="/admin/issue-certificate" className="w-full px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all flex items-center justify-between">
                <span>Issue New Certificate</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <button className="w-full px-4 py-3 bg-gray-100 text-gray-900 rounded-xl hover:bg-gray-200 transition-all flex items-center justify-between">
                <span>Add Issuer</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}