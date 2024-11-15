#include <iostream>
#include <vector>
#include <queue>
#include <climits>
#include <algorithm>  // <-- Add this header for std::sort

#define INF INT_MAX
#define N 14  // Number of nodes in the graph (14 nodes as per the matrix)

// Graph representation using an adjacency matrix
int distances[N][N] = {
    {0, 7800, INF, INF, INF, 6700, INF, 5700, 11000, 11000, INF, INF, INF, 3300},        
    {7800, 0, 6700, INF, 2100, 2900, 9100, 8200, 15000, 12000, 1600, 1000, INF, INF},    
    {INF, 6700, 0, 1500, INF, INF, INF, INF, INF, 9000, INF, INF, INF, INF},             
    {INF, INF, 1500, 0, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF},               
    {INF, 2100, INF, INF, 0, INF, INF, INF, INF, INF, INF, INF, INF, INF},               
    {6700, 2900, INF, INF, INF, 0, INF, 5200, 11000, 11000, INF, INF, INF, 8200},        
    {INF, 9100, INF, INF, INF, INF, 0, INF, INF, INF, INF, INF, 11000, INF},             
    {5700, 8200, INF, INF, INF, 5200, INF, 0, 15000, 10000, 8400, 8000, INF, 4200},      
    {11000, 15000, INF, INF, INF, 11000, INF, 15000, 0, INF, 13000, 13000, INF, 11000},  
    {11000, 12000, 9000, INF, INF, 11000, INF, 10000, 8100, 0, 13000, 13000, INF, 9000}, 
    {INF, 1600, INF, INF, INF, INF, INF, INF, INF, INF, 0, 350, INF, INF},               
    {INF, 1000, INF, INF, INF, INF, INF, INF, INF, INF, 350, 0, INF, INF},               
    {INF, INF, INF, INF, INF, INF, 11000, INF, INF, INF, INF, INF, 0, INF},              
    {3300, INF, INF, INF, INF, 8200, INF, 4200, 11000, 9000, INF, INF, INF, 0}           
};

// Structure to store a path (current node, path distance, and the current path)
struct Path {
    int currentNode;
    int totalDistance;
    std::vector<int> path;  // To store the actual path

    Path(int node, int dist) : currentNode(node), totalDistance(dist) {
        path.push_back(node);
    }
};

// Beam Search function
std::vector<int> beamSearch(int source, int destination, int beamWidth) {
    std::vector<Path> currentPaths;
    currentPaths.push_back(Path(source, 0));  // Initialize with the source node

    while (!currentPaths.empty()) {
        std::vector<Path> nextPaths;

        // Expand each path in the current beam
        for (const auto& p : currentPaths) {
            int node = p.currentNode;
            int currentDist = p.totalDistance;

            // Expand all neighbors of the current node
            for (int neighbor = 0; neighbor < N; ++neighbor) {
                if (distances[node][neighbor] != INF) {
                    int newDist = currentDist + distances[node][neighbor];
                    Path newPath(neighbor, newDist);
                    newPath.path = p.path;  // Copy the current path
                    newPath.path.push_back(neighbor);

                    // If we reached the destination, return the path
                    if (neighbor == destination) {
                        return newPath.path;
                    }

                    // Otherwise, add the new path to next paths
                    nextPaths.push_back(newPath);
                }
            }
        }

        // Sort paths based on total distance and select the best beamWidth paths
        std::sort(nextPaths.begin(), nextPaths.end(), [](const Path& a, const Path& b) {
            return a.totalDistance < b.totalDistance;
        });

        // Keep the top beamWidth paths
        currentPaths.clear();
        for (int i = 0; i < std::min(beamWidth, (int)nextPaths.size()); ++i) {
            currentPaths.push_back(nextPaths[i]);
        }

        // If there are no valid paths to expand, terminate
        if (currentPaths.empty()) {
            break;
        }
    }

    return {};  // Return an empty path if destination is not reachable
}

int main(int args , char * argv[]) {
    int source = std::stoi(argv[1]);  // Starting node (0 index)
    int destination = std::stoi(argv[2]);  // Target node (13 index)
    int beamWidth = 3;  // Beam width

    std::vector<int> shortestPath = beamSearch(source, destination, beamWidth);

    if (shortestPath.empty()) {
        std::cout << "No path found from " << source << " to " << destination << std::endl;
    } else {
        std::cout << "Best Path: ";
        for (int node : shortestPath) {
            std::cout << node << " ";
        }
        std::cout << std::endl;
    }

    return 0;
}
