#include <iostream>
#include <vector>
#include <queue>
#include <climits>
#include <unordered_set>
#include <algorithm>

#define INF INT_MAX
#define N 14 // Number of nodes
#define BEAM_WIDTH 3 // Beam width

using namespace std;

struct Path {
    int node; // Current node
    int cost; // Cumulative cost to reach this node
    vector<int> path; // Path taken to reach this node

    bool operator>(const Path& other) const {
        return cost > other.cost; // Compare by cost (min-heap for Beam Search)
    }
};

void beamSearch(int distances[N][N], int start, int end) {
    priority_queue<Path, vector<Path>, greater<Path>> beam; // Min-heap for storing paths based on cost

    // Initialize the beam with the starting node
    Path initial = {start, 0, {start}};
    beam.push(initial);

    // Set to track visited nodes (avoid revisiting)
    unordered_set<int> visited;
    visited.insert(start);

    while (!beam.empty()) {
        int size = beam.size();

        // Temporary container to store expanded paths
        vector<Path> expandedPaths;

        // Expand all paths in the beam
        for (int i = 0; i < size; i++) {
            Path currentPath = beam.top();
            beam.pop();

            // If we've reached the destination, print the result
            if (currentPath.node == end) {
                cout << "Best Path: ";
                for (int node : currentPath.path) {
                    cout << node << " ";
                }
                cout << endl;
                return; // Exit after finding the first path (for simplicity)
            }

            // Expand neighbors
            for (int neighbor = 0; neighbor < N; neighbor++) {
                if (distances[currentPath.node][neighbor] != INF && visited.find(neighbor) == visited.end()) {
                    Path newPath = currentPath;
                    newPath.node = neighbor;
                    newPath.cost += distances[currentPath.node][neighbor];
                    newPath.path.push_back(neighbor);

                    // Mark the neighbor as visited
                    visited.insert(neighbor);

                    expandedPaths.push_back(newPath);
                }
            }
        }

        // Sort expanded paths based on cost and keep only the top `BEAM_WIDTH` paths
        sort(expandedPaths.begin(), expandedPaths.end(), [](const Path& a, const Path& b) {
            return a.cost < b.cost;
        });

        // Clear the beam and push the best `BEAM_WIDTH` paths
        beam = priority_queue<Path, vector<Path>, greater<Path>>();
        for (int i = 0; i < min(BEAM_WIDTH, (int)expandedPaths.size()); i++) {
            beam.push(expandedPaths[i]);
        }
    }

    cout << "No path found ";
}

int main(int args , char*argv[]) {
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

    // int start = std::stoi(argv[1]); // Starting node (e.g., node 0)
    // int end = std::stoi(argv[2]); // Destination node (e.g., node 13)

int start = std::stoi(argv[1]);
int end = std::stoi(argv[2]);
// int end = 13;
    // Run Beam Search to find the shortest path
    beamSearch(distances, start, end);

    return 0;
}
