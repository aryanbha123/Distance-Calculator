import axios from "axios";
import toast from "react-hot-toast";

export const timeMatrix = [
    [0, 25, 30, 35, 20, 15, 40, 20, 40, 35, 15, 20, 60, 10], // Pacific
    [25, 0, 20, 25, 10, 15, 30, 30, 50, 40, 5, 5, 55, 25],    // Clock Tower
    [30, 20, 0, 10, 20, 30, 35, 35, 60, 30, 20, 15, 65, 30],  // FRI
    [35, 25, 10, 0, 25, 35, 40, 40, 65, 35, 25, 20, 70, 35],  // IMA
    [20, 10, 20, 25, 0, 20, 30, 30, 55, 45, 10, 10, 60, 30],  // Paltan
    [15, 15, 30, 35, 20, 0, 35, 20, 40, 35, 15, 15, 65, 20],  // Centrio
    [40, 30, 35, 40, 30, 35, 0, 45, 60, 55, 30, 30, 45, 45],  // Mall of Dehradun
    [20, 30, 35, 40, 30, 20, 45, 0, 45, 35, 30, 30, 80, 15],  // Robbers Cave
    [40, 50, 60, 65, 55, 40, 60, 45, 0, 30, 45, 45, 85, 40],  // Sahastradhara
    [35, 40, 30, 35, 45, 35, 55, 35, 30, 0, 45, 45, 85, 30],  // Tapkeshwar
    [15, 5, 20, 25, 10, 15, 30, 30, 45, 45, 0, 5, 55, 25],    // Tibet Market
    [20, 5, 15, 20, 10, 15, 30, 30, 45, 45, 5, 0, 55, 25],    // Parade Ground
    [60, 55, 65, 70, 60, 65, 45, 80, 85, 85, 55, 55, 0, 60],  // Lacchiwala
    [10, 25, 30, 35, 30, 20, 45, 15, 40, 30, 25, 25, 60, 0]   // Zoo
];

export const costMatrix = [
    [0, 200, 300, 350, 200, 150, 400, 200, 400, 350, 150, 200, 700, 100], // Pacific
    [200, 0, 150, 200, 100, 150, 250, 250, 500, 400, 50, 50, 600, 200],   // Clock Tower
    [300, 150, 0, 100, 150, 200, 350, 300, 600, 300, 150, 150, 650, 300], // FRI
    [350, 200, 100, 0, 200, 250, 400, 350, 650, 350, 200, 200, 700, 350], // IMA
    [200, 100, 150, 200, 0, 200, 250, 250, 550, 450, 100, 100, 600, 250], // Paltan
    [150, 150, 200, 250, 200, 0, 300, 200, 400, 350, 150, 150, 650, 150], // Centrio
    [400, 250, 350, 400, 250, 300, 0, 450, 600, 550, 250, 250, 450, 400], // Mall of Dehradun
    [200, 250, 300, 350, 250, 200, 450, 0, 450, 350, 250, 250, 800, 150], // Robbers Cave
    [400, 500, 600, 650, 550, 400, 600, 450, 0, 300, 400, 400, 850, 400], // Sahastradhara
    [350, 400, 300, 350, 450, 350, 550, 350, 300, 0, 400, 400, 850, 300], // Tapkeshwar
    [150, 50, 150, 200, 100, 150, 250, 250, 400, 400, 0, 50, 600, 200],  // Tibet Market
    [200, 50, 150, 200, 100, 150, 250, 250, 400, 400, 50, 0, 600, 200],  // Parade Ground
    [700, 600, 650, 700, 600, 650, 450, 800, 850, 850, 600, 600, 0, 600], // Lacchiwala
    [100, 200, 300, 350, 250, 150, 400, 150, 400, 300, 200, 200, 600, 0]  // Zoo
];


export const places = [
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


export function calculateTimeAndCost(path) {
    let time = 0;
    let cost = 0;
    console.log(path)
    for (let i = 0; i < path.length - 1; i++) {
        if (isNaN(path[i]) && isNaN(path[i + 1]))
            return { time: null, cost: null }
        time += timeMatrix[path[i]][path[i + 1]];
        cost += costMatrix[path[i]][path[i + 1]];
    }
    return { time, cost }
}


export const handleCalculatePath = async ({source,destination,setAcoExecutionTime,setAstarExecutionTime,setBeamExecutionTime,setAcoPath,setAstarPath,setBeamPath,setLoading}) => {
    setLoading(true);
    toast.loading("Loading Algorithms");
    try {
      const [acoResponse, astarResponse, beamResponse] = await Promise.all([
        axios.get(`http://localhost:3002/aco?source=${source}&destination=${destination}`),
        axios.get(`http://localhost:3002/astar?source=${source}&destination=${destination}`),
        axios.get(`http://localhost:3002/beam?source=${source}&destination=${destination}`)
      ]);

      // Handle ACO response
      const acoGraph = acoResponse.data;
      const acoPathString = acoGraph.msg.match(/Best Path: ([\d\s]+)/);
      if (acoPathString && acoPathString[1]) {
        const acoParsedPath = acoPathString[1].trim().split(/\s+/).map(Number);
        setAcoPath(acoParsedPath);
        setAcoExecutionTime(acoGraph.executionTime);
      } else {
        setAcoPath("Path calculation failed");
        setAcoExecutionTime(null);
      }

      // Handle A* response
      const astarGraph = astarResponse.data;
      const astarPathString = astarGraph.msg.match(/Best path: ([\d\s]+)/);
      if (astarPathString && astarPathString[1]) {
        const astarParsedPath = astarPathString[1].trim().split(/\s+/).map(Number);
        setAstarPath(astarParsedPath);
        setAstarExecutionTime(astarGraph.executionTime);
      } else {
        setAstarPath("Path calculation failed");
        setAstarExecutionTime(null);
      }

      // Handle Beam response
      const beamGraph = beamResponse.data;
      if (beamGraph.msg.includes("No path found")) {
        setBeamPath("Path calculation failed");
        setBeamExecutionTime(null);
      } else {
        const beamPathString = beamGraph.msg.match(/Best Path: ([\d\s]+)/);
        if (beamPathString && beamPathString[1]) {
          const beamParsedPath = beamPathString[1].trim().split(/\s+/).map(Number);
          setBeamPath(beamParsedPath);
          setBeamExecutionTime(beamGraph.executionTime);
        } else {
          setBeamPath("Path calculation failed");
          setBeamExecutionTime(null);
        }
      }
    } catch (error) {
      console.error("Error fetching path data:", error);
      toast.error("Failed to calculate paths. Please try again later.");
      setAcoPath("Path calculation failed");
      setAstarPath("Path calculation failed");
      setBeamPath("Path calculation failed");
    } finally {
      setLoading(false);
      toast.dismiss();
    }
  };