'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Parser } from 'json2csv';
import ApplicationModal from './ApplicationModal';

export default function AdminAppList() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await fetch('/api/admin/applications');
      if (!res.ok) throw new Error('Fetch failed');
      const data = await res.json();
      setApps(data);
    } catch (err) {
      console.error('Error:', err);
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (!confirm('Are you sure you want to delete this application?')) return;

    try {
      const res = await fetch(`/api/admin/delete?id=${userId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error();
      toast.success('Deleted successfully');
      setApps((prev) => prev.filter((app) => app.userId !== userId));
    } catch {
      toast.error('Failed to delete');
    }
  };

  const resendPDF = async (app) => {
    try {
      const res = await fetch('/api/admin/resend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: app.userId,
          email: app.allData?.step1?.email,
        }),
      });
      if (!res.ok) throw new Error();
      toast.success('PDF resent successfully');
    } catch {
      toast.error('Failed to resend PDF');
    }
  };

  const exportToCSV = () => {
    try {
      const fields = [
        { label: 'User ID', value: 'userId' },
        { label: 'Full Name', value: 'allData.step1.fullname' },
        { label: 'Email', value: 'allData.step1.email' },
        { label: 'Submitted', value: (row) => (row.submitted ? 'Yes' : 'No') },
      ];
      const parser = new Parser({ fields });
      const csv = parser.parse(apps);
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'applications.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('CSV downloaded');
    } catch (err) {
      console.error(err);
      toast.error('Failed to export CSV');
    }
  };

  const filteredApps = apps.filter((app) => {
    const name = app.allData?.step1?.fullname?.toLowerCase() || '';
    const email = app.allData?.step1?.email?.toLowerCase() || '';
    return (
      name.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-2 rounded w-full max-w-sm"
        />
        <button
          onClick={exportToCSV}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ml-2"
        >
          📥 Export CSV
        </button>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading applications...</p>
      ) : (
        <div className="overflow-x-auto">
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
              {filteredApps.map((app) => (
                <tr key={app._id} className="text-center">
                  <td className="px-4 py-2 border">
                    {app.allData?.step1?.fullname || '—'}
                  </td>
                  <td className="px-4 py-2 border">
                    {app.allData?.step1?.email || '—'}
                  </td>
                  <td className="px-4 py-2 border">
                    {app.submitted ? '✅' : '❌'}
                  </td>
                  <td className="px-4 py-2 border flex justify-center gap-2">
                    <button
                      onClick={() => setSelectedApp(app)}
                      className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-800"
                    >
                      🔍 View
                    </button>
                    <Link
                      href={`/api/download/pdf?id=${app.userId}`}
                      target="_blank"
                    >
                      <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                        📥 PDF
                      </button>
                    </Link>
                    <button
                      onClick={() => resendPDF(app)}
                      className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
                    >
                      📤 Resend
                    </button>
                    <button
                      onClick={() => handleDelete(app.userId)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredApps.length === 0 && (
                <tr>
                  <td colSpan="4" className="py-4">No applications found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {selectedApp && (
        <ApplicationModal
          app={selectedApp}
          onClose={() => setSelectedApp(null)}
        />
      )}
    </div>
  );
}