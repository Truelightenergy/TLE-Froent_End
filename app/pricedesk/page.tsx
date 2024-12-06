"use client";

import { useState } from "react";
import Image from "next/image";
import Layout from "../home/layout";
import Script from "next/script";
import Plot from "react-plotly.js";

const PriceDesk: React.FC = () => {
  // const [showOutput, setShowOutput] = useState(false);
  // const [showDataTable, setShowDataTable] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false); // Track if file is uploaded
  const [showWarning, setShowWarning] = useState(false); // State to control warning message
  const [showSampleResults, setShowSampleResults] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the uploaded file
    if (file) {
      setFileUploaded(true); // File is uploaded
      setShowWarning(false); // Hide warning when file is uploaded
    } else {
      setFileUploaded(false); // No file uploaded
    }
  };

  const fetchPriceModel = async () => {
    if (!fileUploaded) {
      setShowWarning(true);
      return;
    }

    // setShowOutput(true); // Show the output section (charts, tables)

    // setTimeout(() => {
    //   setShowDataTable(true); // Show the data table after the API response
    // }, 2000); // Replace with your actual API call logic
  };

  const sampleData = [
    { component: "sleeve_fee", value: 1.25 },
    { component: "rec", value: 0.1375 },
    { component: "margin", value: 10.0 },
    { component: "other2", value: 2.0 },
    { component: "cr auction revenue", value: -2.7629 },
    { component: "lineloss_factor", value: 2.6522 },
    { component: "other1", value: 1.0 },
    { component: "utility_billing_surcharge", value: 0.5 },
    { component: "energy", value: 52.3655 },
    { component: "vlr", value: 117.672 },
    { component: "nonenergy_ancillaries", value: 25.439 },
    { component: "Usage (MWh)", value: 103.7609 },
    { component: "Full Requirements Price", value: 208.3484 },
  ];

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Upload Price Request Form */}
        <div className="bg-white shadow-lg rounded-lg p-6 col-span-1 md:col-span-2 xl:col-span-4">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Upload Price Request Form
          </h3>
          <p className="text-gray-600 mb-2">
            Upload CSV file here with the following rules:
          </p>
          <ul className="text-gray-600 list-disc ml-6 mb-4 space-y-1">
            <li>
              Sheet will extract the exact operating day from energy curves.
            </li>
            <li>
              Sheet will extract the latest operating day for the remaining
              curves.
            </li>
            <li>
              Price desk will match intersecting values in the database for
              required curves.
            </li>
          </ul>
          <div className="mt-4">
            <input
              title="priedesk"
              type="file"
              onChange={handleFileUpload}
              className="form-control w-full border rounded-md px-3 py-2"
              required
            />
          </div>
          <button
            onClick={fetchPriceModel}
            className="w-full bg-blue-400 text-white font-semibold py-2 rounded-lg flex items-center justify-center hover:bg-blue-500 transition-all duration-200 shadow-lg"
          >
            <Image
              src="/images/upload.svg"
              alt="upload"
              width={20}
              height={20}
              className="mr-2"
            />
            Fetch Price Model
          </button>
        </div>
      </div>

      {/* Sample Results Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
        <button
          onClick={() => setShowSampleResults(!showSampleResults)}
          className="w-full bg-green-400 text-white font-semibold py-2 rounded-lg hover:bg-green-500 transition-all duration-200 shadow-lg"
        >
          Sample Results
        </button>

        {showSampleResults && (
          <div className="mt-6 space-y-6">
            {/* Top Section: Left and Right Div */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
              {/* Left Div - Table */}
              <div className="bg-white shadow-lg rounded-lg p-4 xl:col-span-1">
                <h4 className="text-xl font-semibold text-gray-800 mb-4">
                  Cost Components Table
                </h4>
                <div className="overflow-x-auto w-full md:w-3/4 xl:w-3/4 mx-auto">
                  <table className="min-w-full text-sm border-collapse">
                    <thead>
                      <tr>
                        <th className="border-b-2 p-2 text-black font-semibold">
                          Cost Component
                        </th>
                        <th className="border-b-2 p-2 text-black font-semibold">
                          $ / MWh
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sampleData.map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-2 text-black">{item.component}</td>
                          <td className="p-2 text-right text-black">
                            {item.value.toFixed(4)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Right Div - Charts */}
              <div className="charts bg-white shadow-lg rounded-lg p-4 space-y-6 xl:col-span-2 overflow-y-auto">
                {/* Pie Chart */}
                <div className="bg-gray-300 rounded-lg shadow-md">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3 text-center">
                    Cost Components Breakdown
                  </h4>
                  <Plot
                    data={[
                      {
                        labels: sampleData.map((item) => item.component),
                        values: sampleData.map((item) => item.value),
                        type: "pie",
                        hole: 0.3,
                      },
                    ]}
                    layout={{ height: 600, width: 700 }}
                    config={{ responsive: true, displayModeBar: true }}
                  />
                </div>

                {/* Line Chart (FFR Monthly Pricing) */}
                <div className="bg-gray-300 rounded-lg shadow-md">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3 text-center">
                    FFR Monthly Pricing
                  </h4>
                  <Plot
                    data={[
                      {
                        x: [
                          "Sep 2024",
                          "Nov 2024",
                          "Jan 2025",
                          "Mar 2025",
                          "May 2025",
                          "Jul 2025",
                          "Sep 2025",
                        ],
                        y: [200, 300, 400, 600, 350, 250, 200],
                        type: "scatter",
                        mode: "lines+markers",
                        name: "Monthly Full Requirements",
                      },
                      {
                        x: [
                          "Sep 2024",
                          "Nov 2024",
                          "Jan 2025",
                          "Mar 2025",
                          "May 2025",
                          "Jul 2025",
                          "Sep 2025",
                        ],
                        y: [500, 500, 500, 500, 500, 500, 500],
                        type: "scatter",
                        mode: "lines",
                        name: "Fixed Full Requirements",
                        line: { dash: "dash" },
                      },
                    ]}
                    layout={{
                      height: 600,
                      width: 700,
                      legend: {
                        orientation: "h", // Legend horizontal
                        y: -0.3, // Legend placed below the chart
                      },
                    }}
                    config={{ responsive: true, displayModeBar: true }}
                  />
                </div>

                {/* Hourly Usage Bar Chart */}
                <div className="bg-gray-300 rounded-lg shadow-md">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3 text-center">
                    Hourly Usage
                  </h4>
                  <Plot
                    data={[
                      {
                        x: Array.from(
                          { length: 24 },
                          (_, i) => `Hour ${i + 1}`
                        ),
                        y: Array.from(
                          { length: 24 },
                          () => Math.random() * 10 + 10
                        ),
                        type: "bar",
                        marker: { color: "steelblue" },
                      },
                    ]}
                    layout={{ height: 600, width: 700 }}
                    config={{ responsive: true, displayModeBar: true }}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Section: Buttons */}
            <div className="flex justify-between gap-1 mt-6">
              <button className="w-1/5 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all duration-200">
                Detailed Calculation
              </button>
              <button className="w-1/5 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all duration-200">
                Detailed Cost
              </button>
              <button className="w-1/5 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all duration-200">
                Grouped Cost
              </button>
              <button className="w-1/5 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all duration-200">
                Monthly Summary
              </button>
              <button className="w-1/5 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all duration-200">
                Summary
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Floating Warning Notification */}
      {showWarning && (
        <div className="fixed top-0 left-0 right-0 bg-red-600 text-white p-4 text-center z-50">
          <p>Please upload a file before fetching the price model.</p>
        </div>
      )}

      <Script
        src="https://code.jquery.com/jquery-3.6.0.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdn.plot.ly/plotly-latest.min.js"
        strategy="afterInteractive"
      />
      <Script src="/pricedesk_upload.js" strategy="afterInteractive"/>
    </Layout>
  );
};

export default PriceDesk;

