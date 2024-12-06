"use client";

import { useEffect, useState } from "react";
import Layout from "../home/layout";
import api from "../../api/auth/apibase";

const LogsPage: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]); // Correct state type as an array of strings
  const [loading, setLoading] = useState<boolean>(true);

  const fetchLogs = async () => {
    try {
      const response = await api.get("/127.0.0.1:5000/get_logs"); // Correct API call
      console.log("Response:", response); // Debug the response
      const logString: string = response; // Assuming response.data is a string
      const logArray = logString.split("\n"); // Split logs into an array of strings

      // Now, print each line one by one with a delay
      for (let i = 0; i < logArray.length; i++) {
        setTimeout(() => {
          setLogs((prevLogs) => [...prevLogs, logArray[i]]);
        }, 500 * i); // 500ms delay for each log line
      }
    } catch (error: any) {
      console.error("Error fetching logs:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs(); // Fetch logs on component mount
  }, []);

  return (
    <Layout>
      <div className="p-7 bg-gray-800 min-h-screen">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <p className="text-lg text-gray-400">Loading logs...</p>
          </div>
        ) : logs.length > 0 ? (
          <div className="text-gray-200">
            {logs.map((log, index) => (
              <div key={index} className="whitespace-pre-line">
                {log}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No logs available</p>
        )}
      </div>
    </Layout>
  );
};

export default LogsPage;
