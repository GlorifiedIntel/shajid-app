'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function AdminAppList() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await fetch('/api/admin/applications');
      const data = await res.json();
      setApps(data);
    } catch (err) {
      console.error('Error fetching applications:', err);
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    const confirmDelete = confirm('Are you sure you want to delete this application?');

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/admin/delete?id=${userId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete');

      toast.success('Application deleted successfully');
      setApps(apps.filter((app) => app.userId !== userId));
    } catch (err) {
      console.error(err);
      toast.error('Error deleting application');
    }
  };

  if (loading) return <p className="text-gray-600">Loading applications...</p>;

  return (
    <div className="overflow-x-auto mt-6">
      <table className="w-full table-auto border border-gray-300 rounded-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">Full Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Submitted</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {apps.map((app) => (
            <tr key={app._id} className="text-center">
              <td className="px-4 py-2 border">
                {app.allData?.step1?.fullname || 'N/A'}
              </td>
              <td className="px-4 py-2 border">
                {app.allData?.step1?.email || 'N/A'}
              </td>
              <td className="px-4 py-2 border">
                {app.submitted ? '✅' : '❌'}
              </td>
              <td className="px-4 py-2 border">
                <Link href={`/api/download/pdf?id=${app.userId}`} target="_blank">
                  <button className="bg-blue-600 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700">
                    📥 PDF
                  </button>
                </Link>

                <button
                  onClick={() => handleDelete(app.userId)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}