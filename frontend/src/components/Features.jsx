import React from 'react';

export default function Features() {
  return (
    <div className="p-6 w-full max-w-7xl mt-5 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-xl  text-indigo-600 mb-4">
        Features of Our Pathfinding System
      </h1>
      <i className="text-gray-700 text-sm leading-relaxed mb-4">
        The data displayed above is derived using three advanced algorithms:
        <strong> ACO (Ant Colony Optimization)</strong>, 
        <strong> A* (A-Star)</strong>, and 
        <strong> Beam Search</strong>. These algorithms work in synergy to ensure accurate and optimized results.
      </i>
      <ul className="list-disc pl-6 text-gray-700 text-sm mb-4">
        <li>
          <strong>ACo (Ant Colony Optimization):</strong> Adapts dynamically to changing conditions, ensuring cost-effective routes.
        </li>
        <li>
          <strong>A* (A-Star):</strong> Guarantees the shortest and most efficient path by leveraging heuristic-based search.
        </li>
        <li>
          <strong>Beam Search:</strong> Focuses on exploring the most promising paths, offering faster results in complex scenarios.
        </li>
      </ul>
      <p className="text-gray-700 text-sm">
        This system displays the best possible path based on real-time data, 
        helping you plan your journey efficiently and effectively.
      </p>
    </div>
  );
}
