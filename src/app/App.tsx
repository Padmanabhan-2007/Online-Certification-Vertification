import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";

// --- IMPORT YOUR REAL COMPONENTS HERE ---
// import Login from "./pages/Login"; 
// import Dashboard from "./pages/Dashboard";
// import IssueCertificate from "./pages/IssueCertificate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. LOGIN PAGE (Public) */}
        {/* This route is OUTSIDE AdminLayout so the sidebar doesn't show up */}
        <Route path="/login" element={
          <div className="flex items-center justify-center h-screen bg-gray-100">
             {/* Replace this div with your <Login /> component */}
             <div className="bg-white p-8 rounded shadow-md">
               <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
               <button className="bg-blue-600 text-white px-4 py-2 rounded">Sign In</button>
             </div>
          </div>
        } />

        {/* 2. ADMIN PORTAL (Protected) */}
        {/* Everything inside this Route will show your Sidebar and Header */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* Matches exactly "/admin" */}
          <Route index element={<div className="p-8">Welcome to the Dashboard</div>} />
          
          {/* Matches "/admin/issue-certificate" */}
          <Route path="issue-certificate" element={<div className="p-8">Certificate Issuance Form</div>} />
          
          {/* Matches "/admin/issuers" */}
          <Route path="issuers" element={<div className="p-8">Manage Issuers</div>} />
          
          {/* Matches "/admin/logs" */}
          <Route path="logs" element={<div className="p-8">Activity Logs</div>} />
        </Route>

        {/* 3. CATCH-ALL REDIRECT */}
        {/* If the user goes to any unknown URL, send them to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;