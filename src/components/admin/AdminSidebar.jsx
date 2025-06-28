'use client';

import Link from 'next/link';
import { FaUsers, FaHome } from 'react-icons/fa';

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <h2 className="text-lg font-bold mb-6">Admin Panel</h2>
      <ul>
        <li><Link href="/"><FaHome /> Home</Link></li>
        <li><Link href="/admin/dashboard"><FaUsers /> Applications</Link></li>
      </ul>
    </aside>
  );
}