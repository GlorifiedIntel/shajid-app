'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminAppList() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    fetch('/api/admin/applications')
      .then(res => res.json())
      .then(data => setApps(data));
  }, []);

  if (!apps.length) return <p>Loading applications...</p>;

  return (
    <table className="w-full border">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Submitted</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {apps.map(app => (
          <tr key={app._id}>
            <td>{app.allData?.step1?.fullname}</td>
            <td>{app.allData?.step1?.email}</td>
            <td>{app.submitted ? '✅' : '❌'}</td>
            <td>
              <Link href={`/api/download/pdf?id=${app.userId}`} target="_blank">
                <button className="btn">📥 PDF</button>
              </Link>
              <button
                onClick={() => handleDelete(app.userId)}
                className="btn danger"
              >
                🗑️ Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  async function handleDelete(userId) {
    if (!confirm('Delete this application?')) return;
    await fetch(`/api/admin/delete?id=${userId}`, { method: 'DELETE' });
    setApps(apps.filter(app => app.userId !== userId));
  }
}