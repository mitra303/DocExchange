import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  children,
  roleRequired,
}: {
  children: React.ReactNode;
  roleRequired: number;
}) => {

  // ✅ Check both storages
  const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    const decoded: any = JSON.parse(
      atob(token.split(".")[1])
    );

    // ✅ Role check
    if (decoded.role !== roleRequired) {
      return <Navigate to="/" replace />;
    }

    return children;

  } catch (err) {

    // ✅ Clear invalid token
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;