import DashboardLayout from "../components/layout/DashboardLayout";

const AdminDashboard = () => {

  const user =
    JSON.parse(
      localStorage.getItem("user") || "null"
    ) ||
    JSON.parse(
      sessionStorage.getItem("user") || "{}"
    );

  return (
    <DashboardLayout
      role={user.role}
      user={user}
    >

      <div className="space-y-8">

        {/* Welcome Section */}
        {/* <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-8 text-white shadow-lg"> */}
          <div className="bg-white border rounded-3xl p-8 shadow-sm">

          <h1 className="text-4xl font-bold mb-3 text-gray-900">
            Welcome to DocExchange 
          </h1>

          <p className="text-lg text-gray-500">
            Manage document requests,
            users, and workflows from
            one centralized dashboard.
          </p>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          {/* Total Users */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border">

            <p className="text-gray-500 text-sm">
              Total Users
            </p>

            <h2 className="text-4xl font-bold mt-3">
              120
            </h2>

          </div>

          {/* Document Requests */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border">

            <p className="text-gray-500 text-sm">
              Document Requests
            </p>

            <h2 className="text-4xl font-bold mt-3">
              86
            </h2>

          </div>

          {/* Approved */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border">

            <p className="text-gray-500 text-sm">
              Approved Requests
            </p>

            <h2 className="text-4xl font-bold mt-3 text-green-600">
              58
            </h2>

          </div>

          {/* Pending */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border">

            <p className="text-gray-500 text-sm">
              Pending Requests
            </p>

            <h2 className="text-4xl font-bold mt-3 text-orange-500">
              28
            </h2>

          </div>

        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl border shadow-sm p-6">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-2xl font-bold">
              Recent Activity
            </h2>

            <button className="text-blue-600 hover:underline">
              View All
            </button>

          </div>

          <div className="space-y-5">

            <div className="flex items-center justify-between border-b pb-4">

              <div>
                <h3 className="font-semibold">
                  User registration completed
                </h3>

                <p className="text-sm text-gray-500">
                  New admin user added
                </p>
              </div>

              <span className="text-sm text-gray-400">
                2 mins ago
              </span>

            </div>

            <div className="flex items-center justify-between border-b pb-4">

              <div>
                <h3 className="font-semibold">
                  Document request approved
                </h3>

                <p className="text-sm text-gray-500">
                  HR onboarding files
                </p>
              </div>

              <span className="text-sm text-gray-400">
                15 mins ago
              </span>

            </div>

            <div className="flex items-center justify-between">

              <div>
                <h3 className="font-semibold">
                  Password reset requested
                </h3>

                <p className="text-sm text-gray-500">
                  User account security update
                </p>
              </div>

              <span className="text-sm text-gray-400">
                1 hour ago
              </span>

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default AdminDashboard;