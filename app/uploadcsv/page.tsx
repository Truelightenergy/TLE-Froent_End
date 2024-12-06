'use client'

import { useState } from 'react';
import Layout from '../home/layout';
import Script from 'next/script';
import Image from 'next/image';

const UploadCSVPage: React.FC = () => {
  const [showWarning, setShowWarning] = useState(false); // State to control warning message
  const [fileUploaded, setFileUploaded] = useState(false); // Track if file is uploaded

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the uploaded file
    if (file) {
      setFileUploaded(true); // File is uploaded
      setShowWarning(false); // Hide warning when file is uploaded
    } else {
      setFileUploaded(false); // No file uploaded
    }
  };

  const testFileUpload = async () => {
    if (!fileUploaded) {
      setShowWarning(true);
      return;
    }

    console.log('File uploaded successfully!');
  };

  return (
    <Layout>
      <div className="p-8 bg-gray-100 min-h-screen">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Uploads</h3>
          <p className="text-gray-600 mb-2">
            Upload CSV file here with the following rules:
          </p>
          <ul className="text-gray-600 list-disc ml-6 mb-4 space-y-1">
            <li>If no data exists, data is inserted.</li>
            <li>If data exists, newer data is inserted.</li>
            <li>If data exists, same timestamp will archive existing data then update it.</li>
            <li>If energy file has &quot;_cob&quot; marker in filename, same time rules apply.</li>
            <li>If database has cob-marked data for timestamp, any same/newer same data is ignored.</li>
          </ul>
          <div className="mt-4">
            <input title="uploadcsv"
              type="file"
              onChange={handleFileUpload}
              className="form-control w-full border rounded-md px-3 py-2"
              required
            />
          </div>
          <button onClick={testFileUpload} className="btn bg-blue-400 text-white font-semibold w-full mt-4 py-2 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-all duration-200">
            <Image src="/images/upload.svg" alt="upload" width={20} height={20} className="mr-2" />
            Test Upload File
          </button>
        </div>
      </div>

      {/* Floating Warning Notification */}
      {showWarning && (
        <div className="fixed top-0 left-0 right-0 bg-red-600 text-white p-4 text-center z-50">
          <p>Please upload a file before testing.</p>
        </div>
      )}

      {/* Include Scripts */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js"
        strategy="afterInteractive"
      />
    </Layout>
  );
};

export default UploadCSVPage;
