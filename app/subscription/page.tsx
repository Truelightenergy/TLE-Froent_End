"use client";

import { useEffect, useState } from "react";
import Layout from "../home/layout";
import api from "../../api/auth/apibase";

interface SubscriptionData {
  id: number;
  user: string;
  start: string;
  end: string;
}

const SubscriptionManagement: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<SubscriptionData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

//   const fetchSubscriptions = async () => {
//     try {
//       const response = await api.get("subscription_management");
//       console.log(response)
//       if (!response.ok) {
//         throw new Error("Failed to fetch subscription data");
//       }
//       const data = await response.json();
//       setSubscriptions(data);
//     } catch (error) {
//       console.error("Error fetching subscriptions:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

  // Load subscriptions on component mount
  useEffect(() => {
   
    // fetchSubscriptions();

    // Dynamically load the JavaScript file
    const script = document.createElement("script");
    script.src = "public/js/package_management.js"; 
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up by removing the script if necessary
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Layout>
      <div className="p-7 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-semibold mb-4 text-gray-800">
          Subscription Management
        </h1>
        <form id="download_forms" className="bg-white p-6 shadow rounded-lg">
          <h3 className="text-xl font-bold text-gray-700 mb-4">Downloads</h3>
          <div className="mb-6">
            <label
              htmlFor="user"
              className="block text-sm font-medium text-gray-600"
            >
              User
            </label>
            <select name="user" id="user" className="w-full p-2 border rounded-md mt-2 text-gray-600">
              {subscriptions.map((sub) => (
                <option key={sub.id} value={sub.user}>
                  {sub.user}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="start"
                className="block text-sm font-medium text-gray-600"
              >
                Start
              </label>
              <input
                type="date"
                id="start"
                name="start"
                required
                className="w-full p-2 border rounded-md mt-2 text-gray-600"
              />
            </div>
            <div>
              <label
                htmlFor="end"
                className="block text-sm font-medium text-gray-600"
              >
                End
              </label>
              <input
                type="date"
                id="end"
                name="end"
                required
                className="w-full p-2 border rounded-md mt-2 text-gray-600"
              />
            </div>
          </div>

          <div className="flex justify-center items-center mt-6 gap-4">
            <button
              type="button"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Add Filter
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-yellow-500 text-white rounded-md"
            >
              Reset
            </button>
          </div>
        </form>

        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Subscription Data
          </h3>
          {loading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : (
            <table className="w-full bg-white shadow rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                    User
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                    Start Date
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                    End Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((sub) => (
                  <tr
                    key={sub.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-2 text-sm text-gray-600">
                      {sub.user}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600">
                      {sub.start}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600">
                      {sub.end}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SubscriptionManagement;

