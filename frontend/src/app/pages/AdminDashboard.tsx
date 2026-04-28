import { useEffect, useState } from "react";
import axios from "axios";
import { Users, Award, CheckCircle, XCircle, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function AdminDashboard() {
  // 1. State for our dynamic data
  const [totalStudents, setTotalStudents] = useState<number>(0);
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 2. Fetch data from backend on mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch student count
        const statsRes = await axios.get("http://localhost:5000/api/stats");
        setTotalStudents(statsRes.data.totalStudents);

        // Fetch recent activities (Using certificates endpoint)
        const activityRes = await axios.get("http://localhost:5000/api/certificates");
        setActivities(activityRes.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // 3. Updated Stats Configuration (Now using state)
  const stats = [
    {
      label: "Total Students",
      value: totalStudents.toLocaleString(), // Uses the real number from DB
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "blue",
    },
    {
      label: "Total Certificates",
      value: "1,832", // You can create a backend route for this later
      change: "+8.2%",
      trend: "up",
      icon: Award,
      color: "indigo",
    },
    {
      label: "Verified Certificates",
      value: "1,789",
      change: "+15.3%",
      trend: "up",
      icon: CheckCircle,
      color: "green",
    },
    {
      label: "Revoked Certificates",
      value: "43",
      change: "-2.1%",
      trend: "down",
      icon: XCircle,
      color: "red",
    },
  ];

  // Helper functions for UI colors
  const getColorClasses = (color: string) => {
    const colors: any = {
      blue: "bg-blue-100 text-blue-600",
      indigo: "bg-indigo-100 text-indigo-600",
      green: "bg-green-100 text-green-600",
      red: "bg-red-100 text-red-600",
    };
    return colors[color] || colors.blue;
  };

  const getStatusColor = (type: string) => {
    const colors: any = {
      issued: "bg-blue-100 text-blue-700",
      verified: "bg-green-100 text-green-700",
      revoked: "bg-red-100 text-red-700",
    };
    return colors[type] || colors.issued;
  };

  // If still loading data from backend
  if (loading) return <div className="p-6">Loading Dashboard...</div>;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
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
        {/* Activity Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Certificate ID</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Course</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Date & Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {activities.slice().reverse().map((activity: any, index: number) => (
                  <tr key={activity.certificate_id || index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor('issued')}`}>
                        Issued
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{activity.certificate_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{activity.student_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{activity.course_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div>
                        <p>{new Date(activity.issue_date).toLocaleDateString()}</p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar Cards */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
            <TrendingUp className="w-8 h-8 mb-4 opacity-90" />
            <h3 className="text-2xl font-bold mb-2">98.5%</h3>
            <p className="text-blue-100 mb-4">Verification Success Rate</p>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div className="bg-white rounded-full h-2" style={{ width: "98.5%" }} />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all text-left flex items-center justify-between">
                <span>Issue New Certificate</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <button className="w-full px-4 py-3 bg-gray-100 text-gray-900 rounded-xl hover:bg-gray-200 transition-all text-left flex items-center justify-between">
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