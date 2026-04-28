import { History, Search, Filter, Download, CheckCircle, XCircle, Calendar } from "lucide-react";
import { useState } from "react";

export default function VerificationLogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const logs = [
    {
      id: "VER001234",
      certificateId: "CERT2026A123",
      verificationDate: "2026-04-26",
      verificationTime: "10:30 AM",
      result: "Valid",
      verifiedBy: "System",
      ipAddress: "192.168.1.100",
    },
    {
      id: "VER001233",
      certificateId: "CERT2026A122",
      verificationDate: "2026-04-26",
      verificationTime: "09:15 AM",
      result: "Valid",
      verifiedBy: "System",
      ipAddress: "192.168.1.101",
    },
    {
      id: "VER001232",
      certificateId: "CERT2026A121",
      verificationDate: "2026-04-25",
      verificationTime: "04:45 PM",
      result: "Valid",
      verifiedBy: "System",
      ipAddress: "192.168.1.102",
    },
    {
      id: "VER001231",
      certificateId: "CERT2026A120",
      verificationDate: "2026-04-25",
      verificationTime: "02:20 PM",
      result: "Valid",
      verifiedBy: "System",
      ipAddress: "192.168.1.103",
    },
    {
      id: "VER001230",
      certificateId: "CERT2026A119",
      verificationDate: "2026-04-25",
      verificationTime: "11:00 AM",
      result: "Invalid",
      verifiedBy: "System",
      ipAddress: "192.168.1.104",
    },
    {
      id: "VER001229",
      certificateId: "CERT2026A118",
      verificationDate: "2026-04-24",
      verificationTime: "03:30 PM",
      result: "Valid",
      verifiedBy: "System",
      ipAddress: "192.168.1.105",
    },
    {
      id: "VER001228",
      certificateId: "CERT2026A117",
      verificationDate: "2026-04-24",
      verificationTime: "01:15 PM",
      result: "Invalid",
      verifiedBy: "System",
      ipAddress: "192.168.1.106",
    },
    {
      id: "VER001227",
      certificateId: "CERT2026A116",
      verificationDate: "2026-04-24",
      verificationTime: "10:00 AM",
      result: "Valid",
      verifiedBy: "System",
      ipAddress: "192.168.1.107",
    },
  ];

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.certificateId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || log.result.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
            <History className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Verification Logs</h1>
            <p className="text-gray-600">Complete history of certificate verifications</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Certificate ID or Verification ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-12 pr-8 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="valid">Valid Only</option>
                <option value="invalid">Invalid Only</option>
              </select>
            </div>

            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-500/30 flex items-center gap-2">
              <Download className="w-5 h-5" />
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Verifications</p>
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{logs.length}</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Valid</p>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-600">
            {logs.filter((l) => l.result === "Valid").length}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Invalid</p>
            <XCircle className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-3xl font-bold text-red-600">
            {logs.filter((l) => l.result === "Invalid").length}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Success Rate</p>
            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-xs text-blue-600">%</span>
            </div>
          </div>
          <p className="text-3xl font-bold text-blue-600">
            {((logs.filter((l) => l.result === "Valid").length / logs.length) * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Verification ID
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Certificate ID
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Result
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Verified By
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">
                  IP Address
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-mono text-sm text-gray-900">{log.id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-mono text-sm font-medium text-blue-600">{log.certificateId}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm text-gray-900">{log.verificationDate}</p>
                      <p className="text-xs text-gray-600">{log.verificationTime}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        log.result === "Valid"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {log.result === "Valid" ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <XCircle className="w-3 h-3" />
                      )}
                      {log.result}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.verifiedBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-mono text-sm text-gray-600">{log.ipAddress}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLogs.length === 0 && (
          <div className="py-12 text-center">
            <History className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No verification logs found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
