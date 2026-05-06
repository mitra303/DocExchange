import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  children,
  roleRequired,
}: {
  children: React.ReactNode;
  roleRequired: number;
}) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    const decoded: any = JSON.parse(atob(token.split(".")[1]));

    if (decoded.role !== roleRequired) {
      return <Navigate to="/" replace />;
    }

    return children;

  } catch (err) {
    // invalid token → logout
    localStorage.removeItem("token");
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;