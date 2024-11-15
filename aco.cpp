#include <iostream>
#include <vector>
#include <cmath>
#include <cstdlib>
#include <ctime>

#define INF 999
using namespace std;

const int N = 14; // Number of nodes

// Parameters for ACO
const int numAnts = 10;
const int numIterations = 1000;
const double alpha = 1.0;
const double betaValue = 1.5; // Reduced to allow exploration
const double rho = 0.5;
const double pheromoneInitial = 1.0; // Increased initial pheromone

// Distance matrix (graph)
int distances[14][14] = {
    {0, 7800, INF, INF, INF, 6700, INF, 5700, 11000, 11000, INF, INF, INF, 3300},        // Pacific
    {7800, 0, 6700, INF, 2100, 2900, 9100, 8200, 15000, 12000, 1600, 1000, INF, INF},    // Clock Tower
    {INF, 6700, 0, 1500, INF, INF, INF, INF, INF, 9000, INF, INF, INF, INF},             // FRI
    {INF, INF, 1500, 0, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF},               // IMA
    {INF, 2100, INF, INF, 0, INF, INF, INF, INF, INF, INF, INF, INF, INF},               // Paltan
    {6700, 2900, INF, INF, INF, 0, INF, 5200, 11000, 11000, INF, INF, INF, 8200},        // Centrio
    {INF, 9100, INF, INF, INF, INF, 0, INF, INF, INF, INF, INF, 11000, INF},             // Mall of Dehradun
    {5700, 8200, INF, INF, INF, 5200, INF, 0, 15000, 10000, 8400, 8000, INF, 4200},      // Robbers Cave
    {11000, 15000, INF, INF, INF, 11000, INF, 15000, 0, INF, 13000, 13000, INF, 11000},  // Sahastradhara
    {11000, 12000, 9000, INF, INF, 11000, INF, 10000, 8100, 0, 13000, 13000, INF, 9000}, // Tapkeshwar
    {INF, 1600, INF, INF, INF, INF, INF, INF, INF, INF, 0, 350, INF, INF},               // Tibet Market
    {INF, 1000, INF, INF, INF, INF, INF, INF, INF, INF, 350, 0, INF, INF},               // Parade Ground
    {INF, INF, INF, INF, INF, INF, 11000, INF, INF, INF, INF, INF, 0, INF},              // Lacchiwala
    {3300, INF, INF, INF, INF, 8200, INF, 4200, 11000, 9000, INF, INF, INF, 0}           // Zoo
};

// Pheromone matrix
double pheromone[N][N];

// Initialize pheromone levels
void initializePheromone() {
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            pheromone[i][j] = (distances[i][j] != INF) ? pheromoneInitial : 0.0;
        }
    }
}

// Calculate probability for the next node
double calculateProbability(int current, int next, const vector<bool> &visited) {
    if (visited[next] || distances[current][next] == INF) return 0.0;
    double pheromoneLevel = pow(pheromone[current][next], alpha);
    double distance = pow(1.0 / distances[current][next], betaValue);
    return pheromoneLevel * distance;
}

// Select next node based on probability
int selectNextNode(int current, const vector<bool> &visited) {
    vector<double> probabilities(N, 0.0);
    double sumProbabilities = 0.0;

    for (int i = 0; i < N; i++) {
        probabilities[i] = calculateProbability(current, i, visited);
        sumProbabilities += probabilities[i];
    }

    if (sumProbabilities == 0) return -1;

    double randVal = (double)rand() / RAND_MAX;
    double cumulative = 0.0;
    for (int i = 0; i < N; i++) {
        cumulative += probabilities[i] / sumProbabilities;
        if (randVal <= cumulative) {
            return i;
        }
    }
    return -1;
}

// Update pheromone levels on the path
void updatePheromone(const vector<int> &path, double deltaPheromone) {
    for (size_t i = 0; i < path.size() - 1; i++) {
        int from = path[i];
        int to = path[i + 1];
        pheromone[from][to] += deltaPheromone;
        pheromone[to][from] += deltaPheromone;
    }
}

// ACO main function
vector<int> aco(int start, int end) {
    vector<int> bestPath;
    double bestLength = INF;

    for (int iter = 0; iter < numIterations; iter++) {
        vector<int> path;
        vector<bool> visited(N, false);
        int current = start;
        visited[start] = true;
        path.push_back(start);

        while (current != end) {
            int next = selectNextNode(current, visited);
            if (next == -1) {
                // cout << "No next node found from node " << current << " in iteration " << iter + 1 << endl;
                break;
            }
            visited[next] = true;
            path.push_back(next);
            current = next;
        }

        if (current == end) {
            double pathLength = 0;
            for (size_t i = 0; i < path.size() - 1; i++) {
                pathLength += distances[path[i]][path[i + 1]];
            }

            // cout << "Iteration " << iter + 1 << ": Path length = " << pathLength << ", Path = ";
            // for (int node : path) cout << node << " ";
            // cout << endl;

            if (pathLength < bestLength || bestPath.empty()) {
                bestLength = pathLength;
                bestPath = path; 
            }

            double deltaPheromone = 1.0 / pathLength;
            updatePheromone(path, deltaPheromone);
        }

        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                pheromone[i][j] *= (1 - rho);
            }
        }
    }

    return bestPath;
}

int main(int args, char *argv[]) {
    srand(time(0));
    initializePheromone();

    int start = std::stoi(argv[1]); // Clock Tower
    int end = std::stoi(argv[2]);;  // Lacchiwala

    // int start = 2;
    // int end = 3;

    vector<int> bestPath = aco(start, end);

    cout << "Best Path: ";
    if (bestPath.empty()) {
        cout << "No path found." << endl;
    } else {
        for (int node : bestPath) {
            cout << node << " ";
        }
        cout << endl;
    }

    return 0;
}
