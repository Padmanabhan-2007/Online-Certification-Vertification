import { createBrowserRouter } from "react-router";
import LandingPage from "./pages/LandingPage";
import StudentRegistration from "./pages/StudentRegistration";
import CertificateIssuing from "./pages/IssueCertificate";
import CertificateVerification from "./pages/CertificateVerification";
import AdminDashboard from "./pages/AdminDashboard";
import IssuerManagement from "./pages/IssuerManagement";
import VerificationLogs from "./pages/VerificationLogs";
import AdminLayout from "./components/AdminLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/register",
    Component: StudentRegistration,
  },
  {
    path: "/verify",
    Component: CertificateVerification,
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      {
        index: true,
        Component: AdminDashboard,
      },
      {
        path: "issue-certificate",
        Component: CertificateIssuing,
      },
      {
        path: "issuers",
        Component: IssuerManagement,
      },
      {
        path: "logs",
        Component: VerificationLogs,
      },
    ],
  },
]);
