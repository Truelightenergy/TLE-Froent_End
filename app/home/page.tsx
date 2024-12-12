"use client"; 


import withAuth from "../page";


const tableData = [
  { utility_name: "FGE (WCMASS)", utility_price: "$0.19304", headroom_dollar: "$0.07945", headroom_percent: "41.16%" },
  { utility_name: "FGE (WCMASS)", utility_price: "$0.19304", headroom_dollar: "$0.07521", headroom_percent: "38.96%" },
  { utility_name: "OE (ATSI)", utility_price: "$0.12155", headroom_dollar: "$0.05744", headroom_percent: "47.26%" },
  { utility_name: "CECO (SEMA)", utility_price: "$0.15677", headroom_dollar: "$0.03970", headroom_percent: "25.32%" },
  { utility_name: "CECO (SEMA)", utility_price: "$0.15772", headroom_dollar: "$0.03958", headroom_percent: "25.10%" }
];

const StateHeatmap = () => {
  return (
    <div className="w-full p-4 bg-gray-50 cotent-container"> 
      <div className="text-center mb-4">
        <div className="text-3xl font-semibold text-gray-800 tracking-wide">Headroom Heatmap</div>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col md:flex-row gap-6"> {/* Reduced gap */}
        {/* Left Section: US States Map */}
        <div className="w-full md:w-1/2 p-4 bg-white shadow-lg rounded-lg transform transition-transform duration-300 ease-in-out">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">US States Map</h2> {/* Reduced font size and margin */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
            <p className="text-center text-gray-400">US States map will go here.</p>
          </div>
        </div>

        {/* Right Section: Table */}
        <div className="w-full md:w-1/2 p-4 bg-white shadow-lg rounded-lg transform transition-transform duration-300 ease-in-out">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Top Utilities by Headroom Nationwide ($/kWh)</h2> {/* Reduced font size and margin */}
          <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white">
              <tr>
                <th className="py-3 px-4 text-left font-medium tracking-wide">Utility</th>
                <th className="py-3 px-4 text-left font-medium tracking-wide">Utility ($)</th>
                <th className="py-3 px-4 text-left font-medium tracking-wide">Headroom ($)</th>
                <th className="py-3 px-4 text-left font-medium tracking-wide">Headroom (%)</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-100 transition-all duration-300 ease-in-out`}
                >
                  <td className="py-3 px-4 text-gray-800">{row.utility_name}</td>
                  <td className="py-3 px-4 text-gray-800">{row.utility_price}</td>
                  <td className="py-3 px-4 text-gray-800">{row.headroom_dollar}</td>
                  <td className="py-3 px-4 text-gray-800">{row.headroom_percent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


export default withAuth(StateHeatmap);
