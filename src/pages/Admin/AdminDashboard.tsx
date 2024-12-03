import React, { useEffect, useState, useCallback } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import useAuth from "../../context/useAuth";
import { FiSearch } from "react-icons/fi"; // Search Icon
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"; // Pagination Icons

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  securityQues: string;
  role: number;
}

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [usersPerPage] = useState<number>(10);
  const [auth] = useAuth();
  const token = auth.token;

  const fetchUsers = useCallback(async (token: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/user/get_all_users`,
        {
          method: "GET",
          headers: { Authorization: `${token}` },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
        setFilteredUsers(data.users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchUsers(token);
    }
  }, [token, fetchUsers]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = query
      ? users.filter((user) =>
          user.name.toLowerCase().includes(query.toLowerCase())
        )
      : users;
    setFilteredUsers(filtered);
  };

  const indexOfLastUser = page * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setPage(pageNumber);

  return (
    <Layout
      title="Admin Dashboard - Serena"
      description="Admin Dashboard page"
      author="Serena Admin Team"
      keywords="admin, dashboard, management"
      viewport="width=device-width, initial-scale=1.0"
    >
      <div className="flex h-screen bg-white">
        <AdminMenu />
        <div className="flex-1 p-4 sm:p-8 overflow-y-auto max-h-screen">
          <h1 className="text-4xl font-semibold mb-6 text-gray-900">
            Admin Index
          </h1>

          <div className="mb-6 relative">
            <input
              type="text"
              placeholder="Search by username..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full p-3 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FiSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
          </div>

          {loading ? (
            <div className="flex justify-center items-center space-x-2">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-lg text-gray-500">Loading...</span>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-300">
                <table className="min-w-full table-auto border-collapse">
                  <thead>
                    <tr className="bg-blue-100 text-gray-700">
                      <th className="border p-4 text-left">Name</th>
                      <th className="border p-4 text-left">Email</th>
                      <th className="border p-4 text-left">Phone</th>
                      <th className="border p-4 text-left">Address</th>
                      <th className="border p-4 text-left">
                        Security Question
                      </th>
                      <th className="border p-4 text-left">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUsers.map((user) => (
                      <tr key={user._id} className="border-b hover:bg-gray-50">
                        <td className="border p-4">{user.name}</td>
                        <td className="border p-4">{user.email}</td>
                        <td className="border p-4">{user.phone}</td>
                        <td className="border p-4">{user.address}</td>
                        <td className="border p-4">{user.securityQues}</td>
                        <td className="border p-4">
                          {user.role === 1 ? "Admin" : "User"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex justify-center items-center">
                <button
                  onClick={() => paginate(page - 1)}
                  disabled={page === 1}
                  className="px-4 py-2 mx-1 bg-blue-500 text-white rounded disabled:opacity-50 flex items-center"
                >
                  <FiArrowLeft className="mr-2" />
                  Previous
                </button>
                <span className="px-4 py-2">{page}</span>
                <button
                  onClick={() => paginate(page + 1)}
                  disabled={indexOfLastUser >= filteredUsers.length}
                  className="px-4 py-2 mx-1 bg-blue-500 text-white rounded disabled:opacity-50 flex items-center"
                >
                  Next
                  <FiArrowRight className="ml-2" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
