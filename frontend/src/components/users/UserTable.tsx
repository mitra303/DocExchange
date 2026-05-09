type Props = {
  users: any[];
  onEdit: (user: any) => void;
};

const UserTable = ({
  users,
  onEdit,
}: Props) => {

  return (
    <div className="bg-white border rounded-2xl overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-50 border-b">

          <tr>

            <th className="text-left px-6 py-4">
              S.No
            </th>

            <th className="text-left px-6 py-4">
              Name
            </th>

            <th className="text-left px-6 py-4">
              Email
            </th>

            <th className="text-left px-6 py-4">
              Role
            </th>

            <th className="text-left px-6 py-4">
              Status
            </th>

            <th className="text-left px-6 py-4">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {users.length > 0 ? (

            users.map(
              (
                item: any,
                index
              ) => (

                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="px-6 py-4">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4">
                    {item.name}
                  </td>

                  <td className="px-6 py-4">
                    {item.email}
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        item.role === 1
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {item.role === 1
                        ? "Admin"
                        : "Sub User"}
                    </span>

                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        item.status === 1
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status === 1
                        ? "Active"
                        : "Inactive"}
                    </span>

                  </td>

                  <td className="px-6 py-4">

                    <button
                      onClick={() =>
                        onEdit(item)
                      }
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>

                  </td>

                </tr>
              )
            )

          ) : (

            <tr>

              <td
                colSpan={6}
                className="text-center py-10 text-gray-500"
              >
                No users found
              </td>

            </tr>
          )}

        </tbody>

      </table>

    </div>
  );
};

export default UserTable;