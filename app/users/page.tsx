"use client";

import { useEffect, useState } from "react";
import Layout from "../home/layout";
import api from "../../api/auth/apibase";

// Define the structure of the uploads data
interface UploadData {
  email: string;
  file: string;
  timestamp: string;
}

const RecentUploads: React.FC = () => {
  const [uploads, setUploads] = useState<UploadData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Function to fetch uploads and parse the HTML response
  const fetchUploads = async () => {
    try {
      const response = await api.get ("/upload_status");

      // Log the response for debugging
      console.log("HTML response:", response);

      // Parse the HTML response using DOMParser
      const parser = new DOMParser();
      const doc = parser.parseFromString(response, "text/html");

      // Query the DOM to get the relevant data
      const rows = doc.querySelectorAll("table tbody tr"); // Assuming data is in <table> rows
      const uploadsData: UploadData[] = [];

      rows.forEach((row) => {
        const email = row.querySelector("td:nth-child(1)")?.textContent?.trim() || "";
        const file = row.querySelector("td:nth-child(2)")?.textContent?.trim() || "";
        const timestamp = row.querySelector("td:nth-child(3)")?.textContent?.trim() || "";

        uploadsData.push({ email, file, timestamp });
      });

      // Set the extracted data in state
      setUploads(uploadsData);
    } catch (error: any) {
      console.error("Error fetching uploads:", error.message);
      if (error.response) {
        console.error("Response error data:", error.response.data);
        console.error("Response error status:", error.response.status);
      } else if (error.request) {
        console.error("Request error:", error.request);
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch uploads when the component mounts
  useEffect(() => {
    fetchUploads();
  }, []);

  return (
    <Layout>
      <div className="p-7 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-semibold mb-4 text-gray-800">Recent Uploads</h1>
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <p className="text-lg text-gray-600">Loading uploads...</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">File</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Time Stamp</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {uploads.map((upload, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{upload.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{upload.file}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{upload.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RecentUploads;
