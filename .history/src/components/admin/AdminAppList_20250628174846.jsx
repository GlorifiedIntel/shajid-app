'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Parser } from 'json2csv';
import ApplicationModal from './ApplicationModal';

export default function AdminAppList() {
  const [apps, setApps] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const appsPerPage = 10;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await fetch('/api/admin/applications');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setApps(data);
      setFilteredApps(data);
    } catch (err) {
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
      setFilteredApps((prev) => prev.filter((app) => app.userId !== userId));
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
      const csv = parser.parse(filteredApps);
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'applications.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
      toast.success('CSV downloaded');
    } catch (err) {
      toast.error('CSV export failed');
    }
  };

  const applySearch = (term) => {
    const lower = term.toLowerCase();
    const filtered = apps.filter((app) => {
      const name = app.allData?.step1?.fullname?.toLowerCase() || '';
      const email = app.allData?.step1?.email?.toLowerCase() || '';
      return name.includes(lower) || email.includes(lower);
    });
    setSearchTerm(term);
    setFilteredApps(filtered);
    setCurrentPage(1);
  };

  const filterBySubmission = (status) => {
    const filtered = apps.filter((app) => app.submitted === status);
    setFilteredApps(filtered);
    setCurrentPage(1);
  };

  const sortedApps = [...filteredApps].sort((a, b) =>
    (a.allData?.step1?.fullname || '').localeCompare(b.allData?.step1?.fullname)
  );

  const totalPages = Math.ceil(filteredApps.length / appsPerPage);
  const paginatedApps = sortedApps.slice(
    (currentPage - 1) * appsPerPage,
    currentPage * appsPerPage
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Applications</h1>

      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by name/email"
          value={searchTerm}
          onChange={(e) => applySearch(e.target.value)}
          className="border px-4 py-2 rounded-md focus:ring w-full sm:w-64"
        />
        <button
          onClick={() => exportToCSV()}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          📥 Export CSV
        </button>
        <button
          onClick={() => setFilteredApps(apps)}
          className="bg-gray-300 text-black px-4 py-2 rounded"
        >
          All
        </button>
        <button
          onClick={() => filterBySubmission(true)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          ✅ Submitted
        </button>
        <button
          onClick={() => filterBySubmission(false)}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          ❌ Not Submitted
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-300 text-sm">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-4 py-2 border">Full Name</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Submitted</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedApps.map((app) => (
                  <tr key={app._id} className="hover:bg-gray-50 text-center">
                    <td className="px-4 py-2 border">{app.allData?.step1?.fullname || '—'}</td>
                    <td className="px-4 py-2 border">{app.allData?.step1?.email || '—'}</td>
                    <td className="px-4 py-2 border">{app.submitted ? '✅' : '❌'}</td>
                    <td className="px-4 py-2 border">
                      <div className="flex flex-wrap justify-center gap-2">
                        <button
                          onClick={() => setSelectedApp(app)}
                          className="bg-gray-700 text-white px-3 py-1 rounded text-sm"
                        >
                          🔍 View
                        </button>
                        <Link href={`/api/download/pdf?id=${app.userId}`} target="_blank">
                          <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
                            📥 PDF
                          </button>
                        </Link>
                        <button
                          onClick={() => resendPDF(app)}
                          className="bg-indigo-600 text-white px-3 py-1 rounded text-sm"
                        >
                          📤 Resend
                        </button>
                        <button
                          onClick={() => handleDelete(app.userId)}
                          className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {paginatedApps.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-gray-500 py-4">
                      No applications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-3 py-1 border rounded ${
                  currentPage === pageNum
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700'
                }`}
              >
                {pageNum}
              </button>
            ))}
          </div>
        </>
      )}

      {selectedApp && (
        <ApplicationModal app={selectedApp} onClose={() => setSelectedApp(null)} />
      )}
    </div>
  );
}
