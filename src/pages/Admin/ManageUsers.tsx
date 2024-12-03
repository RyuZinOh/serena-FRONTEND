import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import useAuth from "../../context/useAuth";
import {
  FaEdit,
  FaTrashAlt,
  FaUser,
  FaPhoneAlt,
  FaMapMarkedAlt,
  FaQuestionCircle,
  FaEnvelope,
  FaUserTag,
} from "react-icons/fa";

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  securityQues: string;
  role: number;
}

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [auth] = useAuth();
  const token = auth.token;
  const [editUser, setEditUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    securityQues: "",
    role: 0,
  });

  useEffect(() => {
    if (token) fetchUsers(token);
  }, [token]);

  const fetchUsers = async (token: string) => {
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
      } else {
        console.error("Failed to fetch users.");
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (objectId: string) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmation) return;

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/admin/user/delete_user/${objectId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `${token}`,
        },
      }
    );

    if (response.ok) {
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== objectId)
      );
      alert("User deleted successfully.");
    } else {
      alert("Failed to delete user.");
    }
  };

  const handleEditClick = (user: User) => {
    setEditUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      securityQues: user.securityQues,
      role: user.role,
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editUser) {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/user/update_user/${
          editUser._id
        }`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const updatedUser = await response.json();
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === updatedUser._id ? updatedUser : user
          )
        );
        setEditUser(null);
        alert("User updated successfully.");
      } else {
        alert("Failed to update user.");
      }
    }
  };

  return (
    <Layout
      title="Manage Users - Admin Dashboard"
      description="Admin panel for managing users"
    >
      <div className="flex flex-col md:flex-row h-screen bg-white">
        <AdminMenu />
        <div className="flex-1 p-4 sm:p-8 overflow-y-auto max-h-screen">
          <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

          {loading ? (
            <div className="text-center text-lg text-gray-500">Loading...</div>
          ) : (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {users.map((user) => (
                  <div
                    key={user._id}
                    className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-all"
                  >
                    <h3 className="text-lg font-semibold truncate">
                      {user.name}
                    </h3>
                    <p className="text-sm text-gray-700">
                      <strong>Email:</strong> {user.email}
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Phone:</strong> {user.phone}
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Address:</strong> {user.address}
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Security Question:</strong> {user.securityQues}
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Role:</strong>{" "}
                      {user.role === 1 ? "Admin" : "User"}
                    </p>

                    <div className="mt-4 flex justify-between items-center">
                      <button
                        onClick={() => handleEditClick(user)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {editUser && (
            <div className="mt-6 bg-white shadow-lg rounded-lg p-4 w-full sm:w-[600px] mx-auto">
              <h2 className="text-xl font-semibold mb-4">Edit User</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center">
                  <FaUser className="mr-2 text-gray-600" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="input w-full border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Name"
                  />
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="mr-2 text-gray-600" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="input w-full border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Email"
                  />
                </div>
                <div className="flex items-center">
                  <FaPhoneAlt className="mr-2 text-gray-600" />
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="input w-full border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Phone"
                  />
                </div>
                <div className="flex items-center">
                  <FaMapMarkedAlt className="mr-2 text-gray-600" />
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="input w-full border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Address"
                  />
                </div>
                <div className="flex items-center">
                  <FaQuestionCircle className="mr-2 text-gray-600" />
                  <input
                    type="text"
                    id="securityQues"
                    name="securityQues"
                    value={formData.securityQues}
                    onChange={handleInputChange}
                    required
                    className="input w-full border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Security Question"
                  />
                </div>
                <div className="flex items-center">
                  <FaUserTag className="mr-2 text-gray-600" />
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="input w-full border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={0}>User</option>
                    <option value={1}>Admin</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full mt-4 bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
                >
                  Update User
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ManageUsers;
