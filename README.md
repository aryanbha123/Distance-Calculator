# Dehradun Route Finder: ACO vs A* vs Beam Search

A web app that finds a route between 14 Dehradun landmarks with three search algorithms written in C++, and compares their paths, run times, and estimated travel time and fare.

![C++](https://img.shields.io/badge/C++-00599C?style=for-the-badge&logo=cplusplus&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

## About

The city is modelled as a weighted graph of 14 places, including Clock Tower, FRI, IMA, Paltan Bazaar, Robbers Cave, Sahastradhara, Tapkeshwar, Mall of Dehradun and the Zoo. Each algorithm is a small C++ program that takes a source and destination node and prints the path it finds. An Express server runs the compiled programs and times them, and a React front end shows the three results side by side so you can compare how the algorithms behave on the same graph.

## Features

- **Ant Colony Optimization** (`aco.cpp`): pheromone-based probabilistic path search
- **A\*** (`astar.cpp`): priority-queue search with a heuristic
- **Beam Search** (`beam.cpp`): keeps the best 3 partial paths at each step
- Source and destination dropdowns, then a comparison table with each algorithm's path, execution time, estimated cost (Rs.) and estimated time (minutes) from the front end's cost and time matrices
- A login screen at `/` and the route finder at `/home`
- Section explaining each algorithm, with Framer Motion animations and toast notifications

## Tech Stack

- **Algorithms:** C++ (STL)
- **Backend:** Node.js, Express 4, `child_process.exec`
- **Frontend:** React 18 (Create React App), React Router 6, Tailwind CSS 3, MUI, Framer Motion, Axios, react-hot-toast, React Icons

## Project Structure

```
.
├── aco.cpp, astar.cpp, beam.cpp   # Algorithm sources
├── output/                        # Compiled binaries
├── backend/
│   ├── index.js                   # Express server on port 3002
│   └── aco.exe, astar.exe, beam.exe
└── frontend/
    └── src/
        ├── Main.jsx               # Routes: / (Login), /home (App)
        ├── App.jsx                # Route finder and comparison table
        ├── Login.jsx
        └── components/            # Matrix.js (places, cost/time matrices, API calls), Nav, Features
```

## Getting Started

Prerequisites: a C++ compiler (g++), Node.js and npm. The committed binaries are Windows `.exe` files and the server calls them by those names.

1. Compile the algorithms into `backend/`:
   ```bash
   g++ aco.cpp -o backend/aco.exe
   g++ astar.cpp -o backend/astar.exe
   g++ beam.cpp -o backend/beam.exe
   ```
2. Start the backend (port 3002):
   ```bash
   cd backend
   npm install
   npm run dev
   ```
3. Start the frontend:
   ```bash
   cd frontend
   npm install
   npm start
   ```

Each program can also be run on its own: `./aco.exe <source> <destination>` with node ids 0 to 13.

## API Endpoints

| Method | Path | Description |
| ------ | ---- | ----------- |
| `GET` | `/aco?source=&destination=` | Run Ant Colony Optimization |
| `GET` | `/astar?source=&destination=` | Run A* |
| `GET` | `/beam?source=&destination=` | Run Beam Search |

Each returns `{ msg, executionTime }`, where `msg` is the program's output.

## Author

**Aryan Bhandari**: [GitHub](https://github.com/aryanbha123)
