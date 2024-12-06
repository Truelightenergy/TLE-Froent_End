// 'use client';

// import { useState } from 'react';
// import Layout from '../home/layout';
// import { ResponsiveLine } from '@nivo/line';

// const GraphViewPage: React.FC = () => {
//   const [formData, setFormData] = useState({
//     dataType: 'Energy',
//     iso: 'ERCOT',
//     format: 'Standardized',
//     intraday: 'All Curves',
//     operatingStartDay: '',
//     operatingEndDay: '',
//     startDate: '',
//     endDate: '',
//   });

//   const [errors, setErrors] = useState<string[]>([]);
//   const [showSampleResults, setShowSampleResults] = useState(false);
//   const [selectedGraph, setSelectedGraph] = useState<'ERCOT' | 'NYISO' | 'Compare'>('ERCOT');

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     setErrors((prevErrors) => prevErrors.filter((error) => error !== name));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const requiredFields = ['dataType', 'iso', 'format', 'intraday', 'operatingStartDay', 'operatingEndDay', 'startDate', 'endDate'];
//     const missingFields = requiredFields.filter((field) => !formData[field as keyof typeof formData]);
//     if (missingFields.length > 0) {
//       setErrors(missingFields);
//       return;
//     }
//     alert('Graph view successfully generated!');
//   };

//   const sampleData = [
//     {
//       id: 'Sample Energy Data',
//       data: [
//         { x: '2025-01', y: 30 }, { x: '2025-06', y: 50 },
//         { x: '2026-01', y: 70 }, { x: '2026-06', y: 40 },
//         { x: '2027-01', y: 60 }, { x: '2027-06', y: 30 },
//         { x: '2028-01', y: 80 }, { x: '2028-06', y: 45 },
//         { x: '2029-01', y: 75 }, { x: '2029-06', y: 50 },
//         { x: '2030-01', y: 35 },
//       ],
//     },
//   ];

//   const tableData = sampleData[0].data;

//   return (
//     <Layout>
//       <div className="p-8 bg-gray-100 min-h-screen">
//         <h3 className="text-2xl text-black font-semibold mb-2">Graph Parameters</h3>
//         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//            {/* Data Type Dropdown */}
//            <div>
//             <label className="block text-gray-700 mb-1">Data Type</label>
//            <select
//               title="datatype"
//               name="dataType"
//               value={formData.dataType}
//               onChange={handleInputChange}
//               className={`form-select w-full border rounded-md px-3 py-2 text-black ${
//                 errors.includes('dataType') ? 'border-red-500' : ''
//               }`}
//             >
//               {['Energy', 'Non Energy', 'REC', 'PTC', 'Matrix Pricing', 'Headroom', 'LoadProfile', 'Shaping Curves', 'LineLoss', 'All'].map((option) => (
//                 <option key={option} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//             {errors.includes('dataType') && <p className="text-red-500 text-sm mt-1">Please select a data type.</p>}
//           </div>

//           {/* ISO Dropdown */}
//           <div>
//             <label className="block text-gray-700 mb-1">ISO</label>
//             <select
//               title="iso"
//               name="iso"
//               value={formData.iso}
//               onChange={handleInputChange}
//               className={`form-select w-full border rounded-md px-3 py-2 text-black ${
//                 errors.includes('iso') ? 'border-red-500' : ''
//               }`}
//             >
//               {['ERCOT', 'ISONE', 'NYISO', 'MISO', 'PJM', 'All'].map((option) => (
//                 <option key={option} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//             {errors.includes('iso') && <p className="text-red-500 text-sm mt-1">Please select an ISO.</p>}
//           </div>

//           {/* Format Dropdown */}
//           <div>
//             <label className="block text-gray-700 mb-1">Format</label>
//             <select
//               title="format"
//               name="format"
//               value={formData.format}
//               onChange={handleInputChange}
//               className={`form-select w-full border rounded-md px-3 py-2 text-black ${
//                 errors.includes('format') ? 'border-red-500' : ''
//               }`}
//             >
//               {['Standardized', 'Non Standardized'].map((option) => (
//                 <option key={option} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//             {errors.includes('format') && <p className="text-red-500 text-sm mt-1">Please select a format.</p>}
//           </div>

//           {/* Intraday Dropdown */}
//           <div>
//             <label className="block text-gray-700 mb-1">Intraday</label>
//             <select
//               title="intraday"
//               name="intraday"
//               value={formData.intraday}
//               onChange={handleInputChange}
//               className={`form-select w-full border rounded-md px-3 py-2 text-black ${
//                 errors.includes('intraday') ? 'border-red-500' : ''
//               }`}
//             >
//               {['All Curves', 'Close of Business'].map((option) => (
//                 <option key={option} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//             {errors.includes('intraday') && <p className="text-red-500 text-sm mt-1">Please select an intraday option.</p>}
//           </div>

//           {/* Calendar Inputs */}
//           {['operatingStartDay', 'operatingEndDay', 'startDate', 'endDate'].map((field) => (
//             <div key={field}>
//               <label className="block text-gray-700 mb-1 capitalize">
//                 {field.replace(/([A-Z])/g, ' $1').trim()}
//               </label>
//               <input
//                 title="dates"
//                 type="date"
//                 name={field}
//                 value={formData[field as keyof typeof formData]}
//                 onChange={handleInputChange}
//                 className={`form-input w-full border rounded-md px-3 py-2 text-black ${
//                   errors.includes(field) ? 'border-red-500' : ''
//                 }`}
//               />
//               {errors.includes(field) && <p className="text-red-500 text-sm mt-1">Please select a date for {field.replace(/([A-Z])/g, ' $1').toLowerCase()}.</p>}
//             </div>
//           ))}
//           <div className="md:col-span-2">
//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200"
//             >
//               GENERATE GRAPH VIEW
//             </button>
//           </div>
//         </form>

//         {/* Sample Results Section */}
//         <button
//           onClick={() => setShowSampleResults(!showSampleResults)}
//           className="w-full mt-4 bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition duration-200"
//         >
//           SAMPLE RESULTS
//         </button>

//         {showSampleResults && (
//           <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
//             {/* Nivo Line Chart */}
//             <div className="h-96">
//               <ResponsiveLine
//                 data={sampleData}
//                 margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
//                 xScale={{ type: 'point' }}
//                 yScale={{ type: 'linear', min: 0, max: 100 }}
//                 axisBottom={{ legend: 'Year', legendOffset: 36, legendPosition: 'middle' }}
//                 axisLeft={{ legend: 'Price ($)', legendOffset: -40, legendPosition: 'middle' }}
//                 colors={{ scheme: 'category10' }}
//                 pointSize={10}
//                 pointBorderWidth={2}
//                 theme={{
//                   axis: { ticks: { text: { fill: '#000' } }, legend: { text: { fill: '#000' } } },
//                   legends: { text: { fill: '#000' } },
//                   tooltip: { container: { color: '#000' } },
//                 }}
//                 useMesh={true}
//               />
//             </div>

//             {/* Data Table */}
//             <div className="mt-6 overflow-x-auto">
//               <table className="min-w-full table-auto border-collapse border border-gray-300">
//                 <thead>
//                   <tr className="bg-gray-200">
//                     <th className="border border-gray-300 px-4 py-2 text-black">Year</th>
//                     <th className="border border-gray-300 px-4 py-2 text-black">Price ($)</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {tableData.map((item, index) => (
//                     <tr key={index} className="text-black">
//                       <td className="border border-gray-300 px-4 py-2">{item.x}</td>
//                       <td className="border border-gray-300 px-4 py-2">{item.y}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default GraphViewPage;

"use client";

import { useState } from "react";
import Layout from "../home/layout";
import { ResponsiveLine } from "@nivo/line";

const GraphViewPage: React.FC = () => {
  const [formData, setFormData] = useState({
    dataType: "Energy",
    iso: "ERCOT",
    format: "Standardized",
    intraday: "All Curves",
    operatingStartDay: "",
    operatingEndDay: "",
    startDate: "",
    endDate: "",
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [showSampleResults, setShowSampleResults] = useState(false);
  const [plotMode, setPlotMode] = useState("ERCOT");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prevErrors) => prevErrors.filter((error) => error !== name));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const requiredFields = [
      "dataType",
      "iso",
      "format",
      "intraday",
      "operatingStartDay",
      "operatingEndDay",
      "startDate",
      "endDate",
    ];
    const missingFields = requiredFields.filter(
      (field) => !formData[field as keyof typeof formData]
    );
    if (missingFields.length > 0) {
      setErrors(missingFields);
      return;
    }
    alert("Graph view successfully generated!");
  };

  // const sampleData = [
  //   {
  //     id: 'Sample Energy Data',
  //     data: [
  //       { x: '2024-01', y: 30 }, { x: '2024-02', y: 35 },
  //       { x: '2024-03', y: 40 }, { x: '2024-04', y: 50 },
  //       { x: '2024-05', y: 45 }, { x: '2024-06', y: 55 },
  //       { x: '2024-07', y: 60 }, { x: '2024-08', y: 70 },
  //       { x: '2024-09', y: 65 }, { x: '2024-10', y: 75 },
  //       { x: '2024-11', y: 80 }, { x: '2024-12', y: 90 },
  //     ],
  //   },
  // ];

  // const tableData = sampleData[0].data;

  const sampleDataERCOT = [
    {
      id: "ERCOT",
      data: [
        { x: "Jan", y: 100 },
        { x: "Feb", y: 110 },
        { x: "Mar", y: 115 },
        { x: "Apr", y: 120 },
        { x: "May", y: 130 },
        { x: "Jun", y: 140 },
        { x: "Jul", y: 150 },
        { x: "Aug", y: 160 },
        { x: "Sep", y: 170 },
        { x: "Oct", y: 180 },
        { x: "Nov", y: 190 },
        { x: "Dec", y: 200 },
      ],
    },
  ];

  const sampleDataNYISO = [
    {
      id: "NYISO",
      data: [
        { x: "Jan", y: 95 },
        { x: "Feb", y: 105 },
        { x: "Mar", y: 110 },
        { x: "Apr", y: 115 },
        { x: "May", y: 125 },
        { x: "Jun", y: 135 },
        { x: "Jul", y: 145 },
        { x: "Aug", y: 155 },
        { x: "Sep", y: 165 },
        { x: "Oct", y: 175 },
        { x: "Nov", y: 185 },
        { x: "Dec", y: 195 },
      ],
    },
  ];

  const handlePlotModeChange = (mode: 'ERCOT' | 'NYISO' | 'Compare') => {
    setPlotMode(mode);
  };

  // Toggle button click handler
  const handleToggle = (mode: string) => {
    setPlotMode(mode);
  };
  const renderTable = () => {
    const data =
      plotMode === "ERCOT"
        ? sampleDataERCOT[0].data
        : plotMode === "NYISO"
        ? sampleDataNYISO[0].data
        : [...sampleDataERCOT[0].data, ...sampleDataNYISO[0].data];

    return (
      <table className="table-auto w-full mt-4">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-black">Month</th>
            {plotMode === "Compare" && (
              <th className="border px-4 py-2 text-black">NYISO</th>
            )}
            <th className="border px-4 py-2 text-black">
              {plotMode === "ERCOT" ? "ERCOT" : "NYISO"}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="border px-4 py-2 text-black">{item.x}</td>
              {plotMode === "Compare" && (
                <td className="border px-4 py-2 text-black">{item.y}</td>
              )}
              <td className="border px-4 py-2 text-black">{item.y}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <Layout>
      <div className="p-8 bg-gray-100 min-h-screen">
        <h3 className="text-2xl text-black font-semibold mb-2">
          Graph Parameters
        </h3>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Data Type Dropdown */}
          <div>
            <label className="block text-gray-700 mb-1">Data Type</label>
            <select
              title="datatype"
              name="dataType"
              value={formData.dataType}
              onChange={handleInputChange}
              className={`form-select w-full border rounded-md px-3 py-2 text-black ${
                errors.includes("dataType") ? "border-red-500" : ""
              }`}
            >
              {[
                "Energy",
                "Non Energy",
                "REC",
                "PTC",
                "Matrix Pricing",
                "Headroom",
                "LoadProfile",
                "Shaping Curves",
                "LineLoss",
                "All",
              ].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.includes("dataType") && (
              <p className="text-red-500 text-sm mt-1">
                Please select a data type.
              </p>
            )}
          </div>

          {/* ISO Dropdown */}
          <div>
            <label className="block text-gray-700 mb-1">ISO</label>
            <select
              title="iso"
              name="iso"
              value={formData.iso}
              onChange={handleInputChange}
              className={`form-select w-full border rounded-md px-3 py-2 text-black ${
                errors.includes("iso") ? "border-red-500" : ""
              }`}
            >
              {["ERCOT", "ISONE", "NYISO", "MISO", "PJM", "All"].map(
                (option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                )
              )}
            </select>
            {errors.includes("iso") && (
              <p className="text-red-500 text-sm mt-1">Please select an ISO.</p>
            )}
          </div>

          {/* Format Dropdown */}
          <div>
            <label className="block text-gray-700 mb-1">Format</label>
            <select
              title="format"
              name="format"
              value={formData.format}
              onChange={handleInputChange}
              className={`form-select w-full border rounded-md px-3 py-2 text-black ${
                errors.includes("format") ? "border-red-500" : ""
              }`}
            >
              {["Standardized", "Non Standardized"].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.includes("format") && (
              <p className="text-red-500 text-sm mt-1">
                Please select a format.
              </p>
            )}
          </div>

          {/* Intraday Dropdown */}
          <div>
            <label className="block text-gray-700 mb-1">Intraday</label>
            <select
              title="intraday"
              name="intraday"
              value={formData.intraday}
              onChange={handleInputChange}
              className={`form-select w-full border rounded-md px-3 py-2 text-black ${
                errors.includes("intraday") ? "border-red-500" : ""
              }`}
            >
              {["All Curves", "Close of Business"].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.includes("intraday") && (
              <p className="text-red-500 text-sm mt-1">
                Please select an intraday option.
              </p>
            )}
          </div>

          {/* Calendar Inputs */}
          {["operatingStartDay", "operatingEndDay", "startDate", "endDate"].map(
            (field) => (
              <div key={field}>
                <label className="block text-gray-700 mb-1 capitalize">
                  {field.replace(/([A-Z])/g, " $1").trim()}
                </label>
                <input
                  title="dates"
                  type="date"
                  name={field}
                  value={formData[field as keyof typeof formData]}
                  onChange={handleInputChange}
                  className={`form-input w-full border rounded-md px-3 py-2 text-black ${
                    errors.includes(field) ? "border-red-500" : ""
                  }`}
                />
                {errors.includes(field) && (
                  <p className="text-red-500 text-sm mt-1">
                    Please select a date for{" "}
                    {field.replace(/([A-Z])/g, " $1").toLowerCase()}.
                  </p>
                )}
              </div>
            )
          )}

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              GENERATE GRAPH VIEW
            </button>
          </div>
        </form>

        {/* Sample Results Section */}
        <button
          onClick={() => setShowSampleResults(!showSampleResults)}
          className="w-full mt-4 bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition duration-200"
        >
          SAMPLE RESULTS
        </button>

        {showSampleResults && (
          <div className="mt-8">
            <h3 className="text-xl text-black font-semibold mb-2">
              Sample Results
            </h3>
            <div className="flex space-x-4 mb-4">
              <button
                onClick={() => handlePlotModeChange("ERCOT")}
                className={`py-2 px-4 mr-2 ${
                  plotMode === "ERCOT"
                    ? "bg-blue-500 text-black"
                    : "bg-gray-200 text-black"
                }`}
              >
                Show ERCOT
              </button>
              <button
                onClick={() => handlePlotModeChange("NYISO")}
                className={`py-2 px-4 mr-2 ${
                  plotMode === "NYISO"
                    ? "bg-blue-500 text-black"
                    : "bg-gray-200 text-black "
                }`}
              >
                Show NYISO
              </button>
              <button
                onClick={() => handlePlotModeChange("Compare")}
                className={`py-2 px-4 ${
                  plotMode === "Compare"
                    ? "bg-blue-500 text-black"
                    : "bg-gray-200 text-black"
                }`}
              >
                Compare
              </button>
            </div>

            {/* Graph */}
            <div style={{ height: 400, width: "100%" }}>
              <ResponsiveLine
                data={
                  plotMode === "ERCOT"
                    ? sampleDataERCOT
                    : plotMode === "NYISO"
                    ? sampleDataNYISO
                    : [...sampleDataERCOT, ...sampleDataNYISO]
                }
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: "point" }}
                yScale={{
                  type: "linear",
                  min: "auto",
                  max: "auto",
                  stacked: true,
                  reverse: false,
                }}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "Month",
                  legendOffset: 36,
                  legendPosition: "middle",
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "Energy",
                  legendOffset: -40,
                  legendPosition: "middle",
                }}
                enableGridX={false}
                enableGridY={true}
                colors={{ scheme: "nivo" }}
                lineWidth={3}
                pointSize={7}
                pointColor={{ theme: "background" }}
                pointBorderWidth={2}
                pointBorderColor={{ theme: "background" }}
                useMesh={true}
              />
            </div>
            {showSampleResults && renderTable()}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default GraphViewPage;
