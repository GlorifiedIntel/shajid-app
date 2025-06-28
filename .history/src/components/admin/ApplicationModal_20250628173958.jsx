'use client';
import React from 'react';

export default function ApplicationModal({ app, onClose }) {
  if (!app) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-3xl max-h-[80vh] overflow-auto">
        <h2 className="text-xl font-bold mb-4">Applicant Details</h2>
        <pre className="text-sm">{JSON.stringify(app.allData, null, 2)}</pre>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}