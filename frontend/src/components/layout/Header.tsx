import { useState } from "react";

import { useNavigate } from "react-router-dom";

import ResetPasswordModal from "../auth/ResetPasswordModal";

type Props = {
  user: {
    name: string;
    role: number;
  };
};

const Header = ({ user }: Props) => {

  const navigate = useNavigate();

  const [open, setOpen] =
    useState(false);

  const [
    openResetModal,
    setOpenResetModal,
  ] = useState(false);

  // ✅ Logout
  const handleLogout = () => {

    // local storage
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    // session storage
    sessionStorage.removeItem(
      "token"
    );

    sessionStorage.removeItem(
      "user"
    );

    // redirect
    navigate("/login", {
      replace: true,
    });
  };

  return (
    <>
      <header className="h-16 bg-indigo-600 flex items-center justify-between px-6 text-white shadow-sm">

        {/* Logo */}
        <h1 className="text-2xl font-bold">
          DocExchange
        </h1>

        {/* Profile */}
        <div className="relative">

          <button
            onClick={() =>
              setOpen(!open)
            }
            className="flex items-center gap-3"
          >

            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-white text-indigo-600 flex items-center justify-center font-bold">

              {user?.name
                ?.charAt(0)
                ?.toUpperCase() || "U"}

            </div>

            {/* Username */}
            <span className="font-medium">
              {user?.name || "User"}
            </span>

          </button>

          {/* Dropdown */}
          {open && (

            <div className="absolute right-0 mt-3 bg-white shadow-xl rounded-xl w-56 text-black overflow-hidden z-50 border">

              {/* Reset Password */}
              <button
                onClick={() => {

                  setOpen(false);

                  setOpenResetModal(
                    true
                  );

                }}
                className="block w-full text-left px-4 py-3 hover:bg-gray-100 transition"
              >
                Reset Password
              </button>

              {/* Logout */}
              <button
                onClick={
                  handleLogout
                }
                className="block w-full text-left px-4 py-3 hover:bg-red-50 text-red-500 transition"
              >
                Logout
              </button>

            </div>
          )}

        </div>

      </header>

      {/* Reset Password Modal */}
      <ResetPasswordModal
        open={openResetModal}
        onClose={() =>
          setOpenResetModal(false)
        }
      />
    </>
  );
};

export default Header;