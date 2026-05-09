import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";

import ResetPassword from "./pages/ResetPassword";

import UserDashboard from "./pages/UserDashboard";

import AdminDashboard from "./pages/AdminDashboard";

import Users from "./pages/Users";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  // ✅ Check token from both storages
  const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  // ✅ Get logged in user
  const user =
    JSON.parse(
      localStorage.getItem("user") || "null"
    ) ||
    JSON.parse(
      sessionStorage.getItem("user") || "{}"
    );

  return (
    <BrowserRouter>

      <Routes>

        {/* ========================= */}
        {/* LOGIN */}
        {/* ========================= */}

        <Route
          path="/"
          element={
            token ? (
              user?.role === 1 ? (
                <Navigate
                  to="/admin-dashboard"
                  replace
                />
              ) : (
                <Navigate
                  to="/user-dashboard"
                  replace
                />
              )
            ) : (
              <Login />
            )
          }
        />

        <Route
          path="/login"
          element={
            token ? (
              user?.role === 1 ? (
                <Navigate
                  to="/admin-dashboard"
                  replace
                />
              ) : (
                <Navigate
                  to="/user-dashboard"
                  replace
                />
              )
            ) : (
              <Login />
            )
          }
        />

        {/* ========================= */}
        {/* RESET PASSWORD */}
        {/* ========================= */}

        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />

        {/* ========================= */}
        {/* ADMIN DASHBOARD */}
        {/* ========================= */}

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute roleRequired={1}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* ========================= */}
        {/* USERS */}
        {/* ========================= */}

        <Route
          path="/users"
          element={
            <ProtectedRoute roleRequired={1}>
              <Users />
            </ProtectedRoute>
          }
        />

        {/* ========================= */}
        {/* USER DASHBOARD */}
        {/* ========================= */}

        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute roleRequired={2}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* ========================= */}
        {/* FALLBACK */}
        {/* ========================= */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;