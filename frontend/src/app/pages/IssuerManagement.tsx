import { Users, Plus, Edit, Trash2, CheckCircle, Building } from "lucide-react";
import { useState } from "react";

export default function IssuerManagement() {
  const [showModal, setShowModal] = useState(false);
  const [editingIssuer, setEditingIssuer] = useState<any>(null);
  const [formData, setFormData] = useState({
    issuerId: "",
    issuerName: "",
    email: "",
    department: "",
    status: "Active",
  });

  const issuers = [
    {
      id: "ISS001",
      name: "Dr. Sarah Johnson",
      email: "s.johnson@university.edu",
      department: "Computer Science",
      status: "Active",
      certificatesIssued: 342,
    },
    {
      id: "ISS002",
      name: "Prof. Michael Chen",
      email: "m.chen@university.edu",
      department: "Data Science",
      status: "Active",
      certificatesIssued: 256,
    },
    {
      id: "ISS003",
      name: "Dr. Emily Williams",
      email: "e.williams@university.edu",
      department: "Software Engineering",
      status: "Active",
      certificatesIssued: 189,
    },
    {
      id: "ISS004",
      name: "Prof. David Brown",
      email: "d.brown@university.edu",
      department: "Cybersecurity",
      status: "Inactive",
      certificatesIssued: 421,
    },
  ];

  const handleAddIssuer = () => {
    setEditingIssuer(null);
    setFormData({
      issuerId: "",
      issuerName: "",
      email: "",
      department: "",
      status: "Active",
    });
    setShowModal(true);
  };

  const handleEditIssuer = (issuer: any) => {
    setEditingIssuer(issuer);
    setFormData({
      issuerId: issuer.id,
      issuerName: issuer.name,
      email: issuer.email,
      department: issuer.department,
      status: issuer.status,
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Issuer Management</h1>
            <p className="text-gray-600">Manage authorized certificate issuers</p>
          </div>
        </div>
        <button
          onClick={handleAddIssuer}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-500/30 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Issuer
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {issuers.map((issuer) => (
          <div
            key={issuer.id}
            className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
                {issuer.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  issuer.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {issuer.status}
              </span>
            </div>

            <h3 className="font-semibold text-gray-900 mb-1">{issuer.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{issuer.email}</p>

            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Building className="w-4 h-4 text-gray-600" />
                <p className="text-sm text-gray-900">{issuer.department}</p>
              </div>
              <p className="text-xs text-gray-600">ID: {issuer.id}</p>
            </div>

            <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-2xl font-bold text-blue-600">{issuer.certificatesIssued}</p>
              <p className="text-xs text-blue-900">Certificates Issued</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEditIssuer(issuer)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingIssuer ? "Edit Issuer" : "Add New Issuer"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
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
                    placeholder="e.g., ISS005"
                    required
                    disabled={!!editingIssuer}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50"
                  />
                </div>

                <div>
                  <label htmlFor="issuerName" className="block text-sm text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="issuerName"
                    name="issuerName"
                    value={formData.issuerName}
                    onChange={handleChange}
                    placeholder="e.g., Dr. John Smith"
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
                    placeholder="issuer@university.edu"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="department" className="block text-sm text-gray-700 mb-2">
                    Department
                  </label>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="e.g., Computer Science"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="md:col-span-2">
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
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  {editingIssuer ? "Update Issuer" : "Add Issuer"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-8 py-4 bg-gray-100 text-gray-900 rounded-xl hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
