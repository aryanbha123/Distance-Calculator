#include <iostream>
#include <vector>
#include <queue>
#include <cmath>
#include <climits>
#include <cstring>
#include <algorithm>  // For reverse function

using namespace std;

// Define INF and the number of nodes in the graph
#define INF INT_MAX
#define N 14 // Number of vertices in the graph

// Graph representing the distances
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

// A* algorithm
struct Node {
    int vertex;
    int g_cost;
    int f_cost; 
    int parent;

    bool operator>(const Node &other) const {
        return f_cost > other.f_cost;
    }
};

int heuristic(int node, int target) {
    return abs(node - target);
}

vector<int> aStar(int start, int target) {
    priority_queue<Node, vector<Node>, greater<Node>> openList;
    vector<int> g(N, INF);
    vector<int> parent(N, -1);
    vector<bool> closedList(N, false);

    g[start] = 0;
    openList.push({start, 0, heuristic(start, target), -1});

    while (!openList.empty()) {
        Node current = openList.top();
        openList.pop();

        int currentVertex = current.vertex;

        if (currentVertex == target) {
            // Reconstruct the path
            vector<int> path;
            while (parent[currentVertex] != -1) {
                path.push_back(currentVertex);
                currentVertex = parent[currentVertex];
            }
            path.push_back(start);
            reverse(path.begin(), path.end());  // Reverse the path
            return path;
        }

        closedList[currentVertex] = true;

        // Explore neighbors
        for (int i = 0; i < N; i++) {
            if (distances[currentVertex][i] != INF && !closedList[i]) {
                int tentativeG = g[currentVertex] + distances[currentVertex][i];

                if (tentativeG < g[i]) {
                    g[i] = tentativeG;
                    parent[i] = currentVertex;
                    int f = tentativeG + heuristic(i, target);
                    openList.push({i, tentativeG, f, currentVertex});
                }
            }
        }
    }

    return {}; // No path found
}

int main(int args , char *argv[]) {
    int start = std::stoi(argv[1]);  // Starting vertex (e.g., Pacific)
    int target = std::stoi(argv[2]);  // Target vertex (e.g., Zoo)

    vector<int> path = aStar(start, target);

    if (path.empty()) {
        cout << "No path found!" << endl;
    } else {
        cout << "Best path: ";
        for (int vertex : path) {
            cout << vertex << " ";
        }
        cout << endl;
    }

    return 0;
}
