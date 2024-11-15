import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function App() {
  const places = [
    { id: 0, label: 'Pacific' },
    { id: 1, label: 'Clock Tower' },
    { id: 2, label: 'FRI' },
    { id: 3, label: 'IMA' },
    { id: 4, label: 'Paltan' },
    { id: 5, label: 'Centrio' },
    { id: 6, label: 'Mall of Dehradun' },
    { id: 7, label: 'Robbers Cave' },
    { id: 8, label: 'Sahastradhara' },
    { id: 9, label: 'Tapkeshwar' },
    { id: 10, label: 'Tibet Market' },
    { id: 11, label: 'Parade Ground' },
    { id: 12, label: 'Lacchiwala' },
    { id: 13, label: 'Zoo' }
  ];

  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [acoPath, setAcoPath] = useState(null);
  const [astarPath, setAstarPath] = useState(null);
  const [beamPath, setBeamPath] = useState(null);
  const [acoExecutionTime, setAcoExecutionTime] = useState(null);
  const [astarExecutionTime, setAstarExecutionTime] = useState(null);
  const [beamExecutionTime, setBeamExecutionTime] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCalculatePath = async () => {
    if (!source || !destination) {
      toast.error("Please select both source and destination.");
      return;
    }

    setLoading(true);

    try {
      const [acoResponse, astarResponse, beamResponse] = await Promise.all([
        axios.get(`http://localhost:3002/aco?source=${source}&destination=${destination}`),
        axios.get(`http://localhost:3002/astar?source=${source}&destination=${destination}`),
        axios.get(`http://localhost:3002/beam?source=${source}&destination=${destination}`) // New beam API call
      ]);

      // ACO Path Response
      const acoGraph = acoResponse.data;
      const acoPathString = acoGraph.msg.match(/Best Path: ([\d\s]+)/);
      if (acoPathString && acoPathString[1]) {
        const acoParsedPath = acoPathString[1].trim().split(/\s+/).map(Number);
        setAcoPath(acoParsedPath);
        setAcoExecutionTime(acoGraph.executionTime); // Set ACO execution time
      } else {
        toast.error("Failed to parse the ACO path from the response.");
      }

      // A* Path Response
      const astarGraph = astarResponse.data;
      const astarPathString = astarGraph.msg.match(/Best path: ([\d\s]+)/);
      if (astarPathString && astarPathString[1]) {
        const astarParsedPath = astarPathString[1].trim().split(/\s+/).map(Number);
        setAstarPath(astarParsedPath);
        setAstarExecutionTime(astarGraph.executionTime); // Set A* execution time
      } else {
        toast.error("Failed to parse the A* path from the response.");
      }

      // Beam Path Response
      const beamGraph = beamResponse.data;
      const beamPathString = beamGraph.msg.match(/Best path: ([\d\s]+)/);
      if (beamPathString && beamPathString[1]) {
        const beamParsedPath = beamPathString[1].trim().split(/\s+/).map(Number);
        setBeamPath(beamParsedPath);
        setBeamExecutionTime(beamGraph.executionTime); // Set Beam execution time
      } else {
        toast.error("Failed to parse the Beam path from the response.");
      }
    } catch (error) {
      console.error("Error fetching path data:", error);
      toast.error("Failed to calculate paths. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getPlaceLabel = (id) => {
    const place = places.find((place) => place.id === id);
    return place ? place.label : '';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="flex w-full max-w-7xl bg-white shadow-lg rounded-lg">
        {/* Input Section */}
        <div className="w-1/2 p-6">
          <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">Path Finder</h1>
          
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">
              Source:
            </label>
            <select
              value={source}
              onChange={(e) => setSource(parseInt(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select source</option>
              {places.map((place) => (
                <option key={place.id} value={place.id}>
                  {place.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-600 font-medium mb-2">
              Destination:
            </label>
            <select
              value={destination}
              onChange={(e) => setDestination(parseInt(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select destination</option>
              {places.map((place) => (
                <option key={place.id} value={place.id}>
                  {place.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleCalculatePath}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 focus:outline-none"
          >
            {loading ? (
              <div className="text-white">Loading...</div> // Show loader
            ) : (
              "Calculate Path"
            )}
          </button>
        </div>

        {/* Output Section */}
        <div className="w-1/2 p-6 bg-gray-50">
          {/* Comparison Table for ACO, A*, and Beam */}
          {acoPath && astarPath && beamPath && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Algorithm Comparison</h2>
              <table className="w-full table-auto text-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border text-left">Algorithm</th>
                    <th className="px-4 py-2 border text-left">Best Path</th>
                    <th className="px-4 py-2 border text-left">Execution Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border">ACO</td>
                    <td className="px-4 py-2 border">{acoPath.map(id => getPlaceLabel(id)).join(' -> ')}</td>
                    <td className="px-4 py-2 border">{acoExecutionTime}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border">A*</td>
                    <td className="px-4 py-2 border">{astarPath.map(id => getPlaceLabel(id)).join(' -> ')}</td>
                    <td className="px-4 py-2 border">{astarExecutionTime}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border">Beam</td>
                    <td className="px-4 py-2 border">{beamPath.map(id => getPlaceLabel(id)).join(' -> ')}</td>
                    <td className="px-4 py-2 border">{beamExecutionTime}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
}
