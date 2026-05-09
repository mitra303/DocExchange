import {
  useNavigate,
  useLocation,
} from "react-router-dom";

type Props = {
  role: number;
};

const Sidebar = ({ role }: Props) => {

  const navigate = useNavigate();

  const location = useLocation();

  const activeClass =
    "bg-indigo-100 text-indigo-700";

  const normalClass =
    "hover:bg-gray-100";

  return (
    <aside className="w-64 min-h-screen bg-white border-r p-5">

      <div className="space-y-4">

        {/* Dashboard */}
        <button
          onClick={() =>
            navigate("/admin-dashboard")
          }
          className={`block w-full text-left px-4 py-3 rounded ${
            location.pathname ===
            "/admin-dashboard"
              ? activeClass
              : normalClass
          }`}
        >
          Dashboard
        </button>

        {/* Admin Menu */}
        {role === 1 && (
          <>

            <button
              onClick={() =>
                navigate("/users")
              }
              className={`block w-full text-left px-4 py-3 rounded ${
                location.pathname ===
                "/users"
                  ? activeClass
                  : normalClass
              }`}
            >
              Users
            </button>

            <button
              className={`block w-full text-left px-4 py-3 rounded ${
                location.pathname ===
                "/document-request"
                  ? activeClass
                  : normalClass
              }`}
            >
              Document Request
            </button>

          </>
        )}

        {/* Sub User */}
        {role === 2 && (
          <button
            className={`block w-full text-left px-4 py-3 rounded ${
              location.pathname ===
              "/documents"
                ? activeClass
                : normalClass
            }`}
          >
            Documents
          </button>
        )}

      </div>

    </aside>
  );
};

export default Sidebar;