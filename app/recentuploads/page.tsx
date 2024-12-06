"use client";

import { useEffect, useState } from "react";
import Layout from "../home/layout";

// Define the structure of the upload data
interface UploadData {
  email: string;
  filename: string;  // Match the field name with the API response
  timestamp: string;
}

const RecentUploads: React.FC = () => {
  const [uploads, setUploads] = useState<UploadData[]>([]);  // Store uploads data
  const [loading, setLoading] = useState<boolean>(true);  // Handle loading state

  const fetchUploads = async () => {
    try {
      const response = await fetch('/app/api/auth/api_others.tsx');  // Fetch data from your API route
      if (!response.ok) {
        throw new Error('Failed to fetch uploads');
      }
      const data = await response.json();
      setUploads(data);  
    } catch (error) {
      console.error('Error fetching uploads:', error);
    } finally {
      setLoading(false);
    }
  };

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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Timestamp</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {uploads.map((upload, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{upload.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{upload.filename}</td>
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
