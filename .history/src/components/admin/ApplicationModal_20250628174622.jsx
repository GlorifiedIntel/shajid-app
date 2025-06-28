'use client';
import React from 'react';

export default function ApplicationModal({ app, onClose }) {
  if (!app) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl max-h-[80vh] overflow-y-auto border border-gray-300">
        <h2 className="text-2xl font-semibold mb-4">Applicant Details</h2>
        <pre className="text-sm bg-gray-100 p-4 rounded-md whitespace-pre-wrap">
          {JSON.stringify(app.allData, null, 2)}
        </pre>
        <button
          onClick={onClose}
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}