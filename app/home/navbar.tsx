import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/images/TLE_Logo.png';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-lg h-screen w-64 fixed">
      <div className="flex items-center justify-center h-16 border-b">
        <Image src={logo} alt="TRUE Light Logo" width={100} height={30} />
      </div>
      <ul className="mt-6 space-y-4 px-4">
        <li><Link href="/home" className="flex items-center text-gray-700 hover:text-blue-500"><span className="mr-2">🏠</span> My TRUEPrice</Link></li>
        <li><Link href="/uploadcsv" className="flex items-center text-gray-700 hover:text-blue-500"><span className="mr-2">📤</span> Upload CSV</Link></li>
        <li><Link href="/recentuploads" className="flex items-center text-gray-700 hover:text-blue-500"><span className="mr-2">🕒</span> Recent Uploads</Link></li>
        <li><Link href="/download" className="flex items-center text-gray-700 hover:text-blue-500"><span className="mr-2">⬇️</span> Download Data</Link></li>
        <li><Link href="/subscription" className="flex items-center text-gray-700 hover:text-blue-500"><span className="mr-2">💳</span> Subscription</Link></li>
        <li><Link href="/logs" className="flex items-center text-gray-700 hover:text-blue-500"><span className="mr-2">📜</span> Logs</Link></li>
        <li><Link href="/users" className="flex items-center text-gray-700 hover:text-blue-500"><span className="mr-2">👤</span> Users</Link></li>
        <li><Link href="/graphview" className="flex items-center text-gray-700 hover:text-blue-500"><span className="mr-2">📊</span> Graph View</Link></li>
        <li><Link href="/heatmap" className="flex items-center text-gray-700 hover:text-blue-500"><span className="mr-2">🌡️</span> Headroom Heatmap</Link></li>
        <li><Link href="/pricedesk" className="flex items-center text-gray-700 hover:text-blue-500"><span className="mr-2">💲</span> Price Desk</Link></li>
      </ul>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 w-full p-4 flex justify-between items-center border-t">
        <div className="text-sm font-semibold">AN</div>
        <div className="text-sm">Anwar</div>
      </div>
    </nav>
  );
};

export default Navbar;
