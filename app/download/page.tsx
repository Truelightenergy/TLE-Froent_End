"use client";

import { useState } from "react";
import Layout from "../home/layout";

const DownloadPage: React.FC = () => {
  const [dataType, setDataType] = useState("Energy");
  const [iso, setIso] = useState("ERCOT");
  const [format, setFormat] = useState("Standardized");
  const [intradayOrCob, setIntradayOrCob] = useState("All Curves");
  const [fileType, setFileType] = useState("Excel");
  const [operatingDayStart, setOperatingDayStart] = useState("");
  const [operatingDayEnd, setOperatingDayEnd] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleDownload = () => {
    console.log("Download initiated with the following settings:");
    console.log({
      dataType,
      iso,
      format,
      intradayOrCob,
      fileType,
      operatingDayStart,
      operatingDayEnd,
      startDate,
      endDate,
    });
  };

  return (
    <Layout>
      <div className="flex items-center justify-center">
        <div className="bg-white shadow-2xl rounded-lg p-7 w-full max-w-2xl">
          <h3 className="text-3xl font-semibold text-gray-900 mb-4 text-center">
            Download Data
          </h3>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Data Type */}
            <div>
              <label className="block text-gray-900 mb-2 font-medium">
                Data Type
              </label>
              <select
                title="datatype"
                value={dataType}
                onChange={(e) => setDataType(e.target.value)}
                className="form-select w-full border border-gray-300 rounded-lg px-4 py-3 text-black bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Energy</option>
                <option>Non Energy</option>
                <option>REC</option>
                <option>PTC</option>
                <option>Matrix Pricing</option>
                <option>Line Loss</option>
                <option>Headroom Heatmap</option>
                <option>Shaping Curve</option>
              </select>
            </div>

            {/* ISO */}
            <div>
              <label className="block text-gray-900 mb-2 font-medium">
                ISO
              </label>
              <select
                title="ISO"
                value={iso}
                onChange={(e) => setIso(e.target.value)}
                className="form-select w-full border border-gray-300 rounded-lg px-4 py-3 text-black bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>ERCOT</option>
                <option>ISONE</option>
                <option>NYISO</option>
                <option>PJM</option>
                <option>MISO</option>
                <option>All</option>
              </select>
            </div>

            {/* Format */}
            <div>
              <label className="block text-gray-900 mb-2 font-medium">
                Format
              </label>
              <select
                title="format"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="form-select w-full border border-gray-300 rounded-lg px-4 py-3 text-black bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Standardized</option>
                <option>Non Standardized</option>
              </select>
            </div>

            {/* Intraday or Close of Business */}
            <div>
              <label className="block text-gray-900 mb-2 font-medium">
                Intraday or Close of Business
              </label>
              <select
                title="day"
                value={intradayOrCob}
                onChange={(e) => setIntradayOrCob(e.target.value)}
                className="form-select w-full border border-gray-300 rounded-lg px-4 py-3 text-black bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Intraday</option>
                <option>All Curves</option>
              </select>
            </div>

            {/* Operating Day Start */}
            <div>
              <label className="block text-gray-900 mb-2 font-medium">
                Operating Day Start
              </label>
              <input
                title="operatingdaystart"
                type="date"
                value={operatingDayStart}
                onChange={(e) => setOperatingDayStart(e.target.value)}
                className="form-control w-full border border-gray-300 rounded-lg px-4 py-3 text-black bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Operating Day End */}
            <div>
              <label className="block text-gray-900 mb-2 font-medium">
                Operating Day End
              </label>
              <input
                title="operatingdayend"
                type="date"
                value={operatingDayEnd}
                onChange={(e) => setOperatingDayEnd(e.target.value)}
                className="form-control w-full border border-gray-300 rounded-lg px-4 py-3 text-black bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-gray-900 mb-2 font-medium">
                Start Date
              </label>
              <input
                title="startdate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="form-control w-full border border-gray-300 rounded-lg px-4 py-3 text-black bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-gray-900 mb-2 font-medium">
                End Date
              </label>
              <input
                title="enddate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="form-control w-full border border-gray-300 rounded-lg px-4 py-3 text-black bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* File Type - Radio Buttons */}
          <div className="my-6">
            <label className="block text-gray-900 mb-2 font-medium">
              File Type
            </label>
            <div className="flex space-x-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="fileType"
                  value="Excel"
                  checked={fileType === "Excel"}
                  onChange={() => setFileType("Excel")}
                  className="form-radio text-black"
                />
                <span className="ml-2 text-black">Excel</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="fileType"
                  value="CSV"
                  checked={fileType === "CSV"}
                  onChange={() => setFileType("CSV")}
                  className="form-radio text-black"
                />
                <span className="ml-2 text-black">CSV</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="fileType"
                  value="JSON"
                  checked={fileType === "JSON"}
                  onChange={() => setFileType("JSON")}
                  className="form-radio text-black"
                />
                <span className="ml-2 text-black">JSON</span>
              </label>
            </div>
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="w-full bg-blue-400 text-white font-semibold py-2 rounded-lg flex items-center justify-center hover:bg-blue-500 transition-all duration-200 shadow-lg"
          >
            Download
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default DownloadPage;
