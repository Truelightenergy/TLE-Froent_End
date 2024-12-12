"use client";

import { useEffect, useState } from "react";
import Layout from "../home/layout";
import api from "../../api/auth/apibase";

const LogsPage: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);

  const fetchLogs = async () => {
    try {
      const response = await api.get("get_logs");
      console.log("Response:", response); 
      const logString: string = response; 
      const logArray = logString.split("\n"); 

    
      for (let i = 0; i < logArray.length; i++) {
        setTimeout(() => {
          setLogs((prevLogs) => [...prevLogs, logArray[i]]);
        }, 500 * i); 
      }
    } catch (error: any) {
      console.log("Error fetching logs:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs(); 
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
