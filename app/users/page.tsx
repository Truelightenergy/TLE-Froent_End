"use client";

import { useEffect, useState } from "react";
import Layout from "../home/layout";
import api from "../../api/auth/apibase";

interface User {
  email: string;
  level: string;
}

const ViewUsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10); // Default to 10 entries per page
  const [totalUsers, setTotalUsers] = useState(0);

  // Function to fetch users
  const fetchUsers = async () => {
    try {
      const data = await api.get("view_user"); // Fetch users from the endpoint

      // Check if the data structure is as expected
      if (data && data.email && data.privileged_level) {
        // Map the response to an array of user objects
        const transformedUsers = data.email.map(
          (email: string, index: number) => ({
            email,
            level: data.privileged_level[index], // Combine email with corresponding level
          })
        );

        setUsers(transformedUsers); // Set the transformed users to state
        setTotalUsers(transformedUsers.length); // Set total users for pagination
      } else {
        console.log("Invalid data structure:", data);
      }
    } catch (error) {
      console.log("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.level.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page handler
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Handle entries per page change
  const handleEntriesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUsersPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page when entries per page change
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <Layout>
      <div className="p-7 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-gray-900 text-left pl-4">
            Users
          </h1>

          {/* Search Input and "Show Entries" Dropdown */}
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={handleSearch}
              className="px-4 py-2 border rounded-md w-60 text-sm text-black"
            />

            {/* Show Entries Dropdown */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-900">Show</span>
              <select
                title="users"
                value={usersPerPage}
                onChange={handleEntriesChange}
                className="px-4 py-2 border rounded-md text-sm text-black"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <p className="text-lg text-gray-700">Loading users...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full leading-normal text-sm border-collapse">
                <thead>
                  <tr className="text-sm font-semibold text-gray-700 bg-gray-200 text-center border-b border-gray-300">
                    <th className="px-4 py-2 border-r border-gray-300">
                      Email
                    </th>
                    <th className="px-4 py-2 border-r border-gray-300">
                      Level
                    </th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-100 transition duration-200 border-b border-gray-300"
                    >
                      <td className="px-4 py-2 text-left text-gray-900 border-r border-gray-300">
                        {user.email}
                      </td>
                      <td className="px-4 py-2 text-left text-gray-900 border-r border-gray-300">
                        {user.level}
                      </td>
                      <td className="px-4 py-2 text-left">
                        <div className="flex justify-start space-x-2">
                          <button className="bg-blue-500 text-white px-4 py-1 rounded-md transition duration-300 hover:bg-blue-600 focus:outline-none">
                            Disable
                          </button>
                          <button className="bg-yellow-500 text-white px-4 py-1 rounded-md transition duration-300 hover:bg-yellow-600 focus:outline-none">
                            Update
                          </button>
                          <button className="bg-red-500 text-white px-4 py-1 rounded-md transition duration-300 hover:bg-red-600 focus:outline-none">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6 space-x-2 mb-6">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-6 py-2 bg-gray-400 text-white rounded-md disabled:opacity-50 hover:bg-gray-500 focus:outline-none"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-6 py-2 rounded-md ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-black"
                } hover:bg-blue-600 focus:outline-none`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-6 py-2 bg-gray-400 text-white rounded-md disabled:opacity-50 hover:bg-gray-500 focus:outline-none"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ViewUsersPage;
