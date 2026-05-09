import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../components/layout/DashboardLayout";

import AddUserModal from "../components/users/AddUserModal";

import EditUserModal from "../components/users/EditUserModal";

import UserTable from "../components/users/UserTable";

import { getUsers } from "../services/userService";

const Users = () => {

  const user =
    JSON.parse(
      localStorage.getItem("user") || "null"
    ) ||
    JSON.parse(
      sessionStorage.getItem("user") || "{}"
    );

  const [users, setUsers] = useState<any[]>([]);

  const [search, setSearch] =
    useState("");

  const [openAdd, setOpenAdd] =
    useState(false);

  const [openEdit, setOpenEdit] =
    useState(false);

  const [selectedUser, setSelectedUser] =
    useState<any>(null);

  const fetchUsers = async () => {
    try {

      const res = await getUsers();

      setUsers(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const filteredUsers = users.filter(
    (u: any) =>
      u.name
        .toLowerCase()
        .includes(search.toLowerCase())
  );


  const indexOfLastUser =
    currentPage * usersPerPage;

  const indexOfFirstUser =
    indexOfLastUser - usersPerPage;

  const currentUsers =
    filteredUsers.slice(
      indexOfFirstUser,
      indexOfLastUser
    );

  const totalPages = Math.ceil(
    filteredUsers.length / usersPerPage
  );

  return (
    <DashboardLayout
      role={user.role}
      user={user}
    >

      <div className="space-y-6">

        <div className="flex items-center justify-between">

          <h1 className="text-4xl font-bold">
            Users List
          </h1>

          <button
            onClick={() =>
              setOpenAdd(true)
            }
            className="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-xl transition"
          >
            + Add User
          </button>

        </div>

        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full max-w-xl border rounded-xl px-5 py-4"
        />

        <UserTable
          users={currentUsers}
          onEdit={(item) => {

            setSelectedUser(item);

            setOpenEdit(true);

          }}
        />

        <div className="flex items-center justify-center gap-2 mt-6">

          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage(
                currentPage - 1
              )
            }
            className="h-10 px-5 border rounded-xl hover:bg-gray-100 transition disabled:opacity-50"
          >
            Previous
          </button>

          {Array.from(
            { length: totalPages },
            (_, index) => (
              <button
                key={index}
                onClick={() =>
                  setCurrentPage(index + 1)
                }
                className={`px-4 py-2 rounded-lg ${currentPage === index + 1
                  ? "bg-gray-900 text-white"
                  : "border hover:bg-gray-100"
                  }`}
              >
                {index + 1}
              </button>
            )
          )}

          <button
            disabled={
              currentPage === totalPages
            }
            onClick={() =>
              setCurrentPage(
                currentPage + 1
              )
            }
            className="h-10 px-5 border rounded-xl hover:bg-gray-100 transition disabled:opacity-50"
          >
            Next
          </button>

        </div>


      </div>

      <AddUserModal
        open={openAdd}
        onClose={() =>
          setOpenAdd(false)
        }
        onSuccess={fetchUsers}
      />

      <EditUserModal
        open={openEdit}
        onClose={() =>
          setOpenEdit(false)
        }
        onSuccess={fetchUsers}
        user={selectedUser}
      />

    </DashboardLayout>
  );
};

export default Users;