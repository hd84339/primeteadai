import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-4">
        <h1 className="text-3xl font-bold text-center text-indigo-600">
          PrimeTread AI
        </h1>
        <p className="text-gray-600 text-center">
          Full-Stack Environment Ready
        </p>
        <div className="flex justify-between items-center pt-4">
          <div className="flex flex-col items-center">
            <span className="text-sm font-medium text-gray-400 uppercase">Frontend</span>
            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Vite + React</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm font-medium text-gray-400 uppercase">Styling</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">TailwindCSS</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm font-medium text-gray-400 uppercase">Backend</span>
            <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">Express.js</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
