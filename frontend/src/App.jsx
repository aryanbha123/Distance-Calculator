import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Nav from './components/Nav';
import Features from './components/Features';
import { costMatrix, places, timeMatrix, calculateTimeAndCost, handleCalculatePath } from './components/Matrix';
import { motion } from 'framer-motion'; // Importing Framer Motion for animations

export default function App() {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [acoPath, setAcoPath] = useState(null);
  const [astarPath, setAstarPath] = useState(null);
  const [beamPath, setBeamPath] = useState(null);
  const [acoExecutionTime, setAcoExecutionTime] = useState(null);
  const [astarExecutionTime, setAstarExecutionTime] = useState(null);
  const [beamExecutionTime, setBeamExecutionTime] = useState(null);
  const [loading, setLoading] = useState(false);

  const handelPath = () => {
    handleCalculatePath({ source, destination, setAcoExecutionTime, setAstarExecutionTime, setBeamExecutionTime, setAcoPath, setAstarPath, setBeamPath, setLoading })
  }

  const getPlaceLabel = (id) => {
    const place = places.find((place) => place.id === id);
    return place ? place.label : '';
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-r from-blue-200 to-blue-400 min-h-screen">
      <Nav />
      <div className="flex flex-col w-full max-w-7xl bg-white rounded-2xl shadow-2xl p-8 mt-8 mx-4">
        <motion.div 
          className="flex-1 p-6" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl font-semibold text-[#111] mb-6 text-center">Select Your Source & Destination</h1>

          {/* Source Dropdown */}
          <div className="mb-6">
            <label className="block text-gray-800 font-medium mb-2">Source:</label>
            <select
              value={source}
              onChange={(e) => setSource(parseInt(e.target.value))}
              className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            >
              <option value="">Select Source</option>
              {places.map((place) => (
                <option key={place.id} value={place.id}>{place.label}</option>
              ))}
            </select>
          </div>

          {/* Destination Dropdown */}
          <div className="mb-6">
            <label className="block text-gray-800 font-medium mb-2">Destination:</label>
            <select
              value={destination}
              onChange={(e) => setDestination(parseInt(e.target.value))}
              className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            >
              <option value="">Select Destination</option>
              {places.map((place) => (
                <option key={place.id} value={place.id}>{place.label}</option>
              ))}
            </select>
          </div>

          {/* Calculate Path Button */}
          <motion.button
            onClick={handelPath}
            className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors duration-300 focus:outline-none shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? <div className="text-white">Loading...</div> : "Calculate Path"}
          </motion.button>
        </motion.div>

        {/* Algorithm Comparison Section */}
        <motion.div
          className="flex-1 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {(acoPath || astarPath || beamPath) && (
            <motion.div 
              className="p-6 bg-gray-100 rounded-2xl shadow-xl"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Algorithm Comparison</h2>
              <div className="overflow-x-auto">
                <table className="w-full table-auto text-gray-700 border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-100 to-gray-200">
                      <th className="px-6 py-3 text-left">Algorithm</th>
                      <th className="px-6 py-3 text-left">Best Path</th>
                      <th className="px-6 py-3 text-left">Execution Time</th>
                      <th className="px-6 py-3 text-left">Estimated Cost</th>
                      <th className="px-6 py-3 text-left">Estimated Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold">{'ACO'}</td>
                      <td className="px-6 py-4">{Array.isArray(acoPath) ? acoPath.map(id => getPlaceLabel(id)).join(' -> ') : acoPath}</td>
                      <td className="px-6 py-4">{acoExecutionTime || 'N/A'}</td>
                      <td className="px-6 py-4">Rs. {calculateTimeAndCost(acoPath).cost}</td>
                      <td className="px-6 py-4">{calculateTimeAndCost(acoPath).time} min.</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold">{'A*'}</td>
                      <td className="px-6 py-4">{Array.isArray(astarPath) ? astarPath.map(id => getPlaceLabel(id)).join(' -> ') : astarPath}</td>
                      <td className="px-6 py-4">{astarExecutionTime || 'N/A'}</td>
                      <td className="px-6 py-4">Rs. {calculateTimeAndCost(astarPath).cost}</td>
                      <td className="px-6 py-4">{calculateTimeAndCost(astarPath).time} min.</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold">{'Beam'}</td>
                      <td className="px-6 py-4">{Array.isArray(beamPath) ? beamPath.map(id => getPlaceLabel(id)).join(' -> ') : beamPath}</td>
                      <td className="px-6 py-4">{beamExecutionTime || 'N/A'}</td>
                      <td className="px-6 py-4">Rs. {calculateTimeAndCost(beamPath).cost}</td>
                      <td className="px-6 py-4">{calculateTimeAndCost(beamPath).time} min.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      
      <Features />
    </div>
  );
}
