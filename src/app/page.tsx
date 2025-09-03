"use client";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function Home() {
  const { isAuthenticated, totalDrives, isLoading, isPcDrive, pcUrl } = useAuth();
  const [selectedDrive, setSelectedDrive] = useState(null);

  console.log(isAuthenticated, totalDrives, isLoading, isPcDrive, pcUrl);

  // Format drive size for display
  const formatDriveSize = () => {
    const sizes = ['2.1 TB', '1.5 TB', '3.2 TB', '512 GB'];
    return totalDrives.map((drive, index) => ({
      name: drive,
      size: sizes[index] || '1.0 TB',
      used: Math.floor(Math.random() * 60) + 20 // Random usage between 20-80%
    }));
  };

  const drivesWithInfo = formatDriveSize();

  const handleDriveClick = (drive: any) => {
    setSelectedDrive(drive);
    // In a real application, this would navigate to the drive contents
    console.log(`Navigating to drive: ${drive}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading your drives...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-md w-full mx-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
            <p className="text-gray-400">Please authenticate to view your drives</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-white">My Drives</h1>
          <p className="text-gray-400">Manage your storage devices</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {drivesWithInfo.map((drive, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-xl p-6 shadow-2xl transform transition-all hover:scale-105 hover:shadow-2xl cursor-pointer"
              onClick={() => handleDriveClick(drive.name)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="px-3 py-1 bg-gray-700 text-xs text-blue-300 rounded-full">Local</span>
              </div>

              <h3 className="text-xl font-semibold text-white mb-2">{drive.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{drive.size} • {drive.used}% used</p>

              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${drive.used > 80 ? 'bg-red-500' :
                      drive.used > 60 ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}
                  style={{ width: `${drive.used}%` }}
                ></div>
              </div>

              <button className="mt-6 w-full py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                Explore
              </button>
            </div>
          ))}
        </div>

        {isPcDrive && (
          <div className="mt-12 bg-gray-800 rounded-xl p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">PC Drive</h2>
                <p className="text-gray-400">Access your computer's files remotely</p>
              </div>
              <a
                href={pcUrl}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center"
              >
                Connect
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        )}

        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>{totalDrives.length} drives available • {isPcDrive ? "PC Drive connected" : "No PC Drive"}</p>
        </footer>
      </div>
    </div>
  );
}