"use client";
import React from 'react';
import { api } from "~/trpc/react";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { renderTableHeader } from "~/app/_components/table/table-header";
import { useClientPagination } from "~/utils/hooks/useClientPaginationClientSide";
import { renderTableBodyDefault } from "~/app/_components/table/table-body";
import { IconRenderer } from '~/app/_components/IconRenderer';

export default function ListUsers() {
  const PAGE_SIZE = 7;
  const router = useRouter();
  const { data: session, status } = useSession();
  const { data: users, isLoading } = api.auth.getUsers.useQuery();
  const deleteUser = api.auth.deleteUser.useMutation();
  const title_header = ["No", "Nama Lengkap", "Email", "Peran", "Verifikasi", "Aksi"];
  
  const { currentPage, setCurrentPage, maxPage, paginatedData } = useClientPagination(users || [], PAGE_SIZE);

  const handleDeleteUser = async (id:string) => {
    if(window.confirm('Apakah Anda yakin ingin menghapus pengguna ini?')){
      if(!id) alert('ID tidak ditemukan');
      await deleteUser.mutateAsync({ id });
      window.location.reload();
    }
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Daftar Pengguna</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Kelola akses admin dan pengguna aplikasi di sini.</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-main text-white rounded-xl shadow-sm hover:shadow-md hover:bg-main/90 transition-all cursor-pointer font-medium"
          onClick={() => router.push("/admin/users/add-users")}
        >
          <IconRenderer lib="fa" name="FaPlus" size={14} />
          <span>Tambah Admin</span>
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            {renderTableHeader(title_header)}
          <tbody>
            {renderTableBodyDefault({
              isLoading,
              data: paginatedData,
              cols: title_header.length,
              skeletonCount: PAGE_SIZE,
              renderRow: (user, i) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <td className="px-6 py-4 border-b border-gray-50 dark:border-gray-800 text-gray-500 dark:text-gray-400">
                    {(currentPage - 1) * PAGE_SIZE + i + 1}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-50 dark:border-gray-800 font-medium text-gray-900 dark:text-white capitalize">
                    {user?.name || '-'}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-50 dark:border-gray-800 text-gray-600 dark:text-gray-300">
                    {user?.email || '-'}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-50 dark:border-gray-800">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                      user.role === '1' 
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' 
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                    }`}>
                      {user.role === '1' ? 'admin' : 'pelanggan'}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-b border-gray-50 dark:border-gray-800">
                    {user.emailVerified ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                        <IconRenderer lib="fa" name="FaCheckCircle" size={12} />
                        Terverifikasi
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                        <IconRenderer lib="fa" name="FaTimesCircle" size={12} />
                        Belum
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-50 dark:border-gray-800">
                    <div className="flex gap-2">
                      {user?.email !== session?.user?.email ? (
                        <button onClick={() => handleDeleteUser(user.id || '')} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors cursor-pointer" title="Hapus Pengguna">
                          <IconRenderer lib="fa" name="FaTrash" size={16} />
                        </button>
                      ) : (
                        <span className="text-xs text-gray-400 italic py-2">Akun Anda</span>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Menampilkan halaman <span className="font-medium text-gray-900 dark:text-white">{currentPage}</span> dari <span className="font-medium text-gray-900 dark:text-white">{maxPage}</span>
          </p>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
              disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Sebelumnya</button>
            <button
             className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
             disabled={currentPage === maxPage || maxPage === 0} onClick={() => setCurrentPage(p => p + 1)}>Selanjutnya</button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
