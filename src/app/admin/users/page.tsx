"use client";
import { api } from "~/trpc/react";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { IconRenderer } from "~/app/_components/IconRenderer";
import TableSkeletonRow from "~/app/_components/skeleton";

export default function ListUsers() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { data: users, isLoading } = api.auth.getUsers.useQuery();
  const deleteUser = api.auth.deleteUser.useMutation();
  const title_header = ["no", "name", "email", "role", "verification", "action"];

  const handleDeleteUser = async (id:string) => {
    if(window.confirm('are you sure you want to delete')){
      await deleteUser.mutateAsync({ id })
      window.location.reload()
    }
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-2xl font-bold mb-4 dark:text-background uppercase">list users</h2>
        <button
          className="p-2 rounded-sm bg-secondary hover:bg-accent cursor-pointer"
          onClick={() => router.push("/admin/users/add-users")}
        >
          <span className="text-black dark:text-background uppercase">add admin</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border rounded border-black dark:border-gray-700 text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800 h-15">
            <tr>
              {title_header.map((val, idx) => (
                <th
                  key={idx}
                  className="px-4 py-2 border-b dark:border-gray-700 text-left dark:text-background uppercase"
                >
                  {val}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableSkeletonRow key={i} cols={title_header.length} />
              ))
            ) : users?.length === 0 ? (
              <tr>
                <td
                  colSpan={title_header.length}
                  className="px-4 py-4 text-center text-red-600 dark:text-background"
                >
                  No Users found.
                </td>
              </tr>
            ) : (
              users?.map((dtx, i) => (
                <tr
                  key={dtx.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <td className="px-4 py-4 border-b dark:border-gray-700 dark:text-background">{i + 1}</td>
                  <td className="px-4 py-4 border-b dark:border-gray-700 dark:text-background">{dtx?.name}</td>
                  <td className="px-4 py-4 border-b dark:border-gray-700 dark:text-background">{dtx?.email}</td>
                  <td className="px-4 py-4 border-b dark:border-gray-700 dark:text-background">
                    {dtx.role === '1' ? 'admin' : 'user'}
                  </td>
                  <td className="px-4 py-4 border-b dark:border-gray-700 dark:text-background">
                    <IconRenderer
                      lib="fa"
                      name={dtx.emailVerified ? "FaCheckCircle" : "FaTimes"}
                    />
                  </td>
                  <td className="px-4 py-2 border-b dark:border-gray-700">
                    <button onClick={() => handleDeleteUser(dtx.id || '')}>
                      {dtx?.email !== session?.user?.email && (
                        <IconRenderer
                          lib="fa"
                          name="FaTrash"
                          size={20}
                          className="text-red-500 cursor-pointer"
                          />
                        )}
                      </button>
                    </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
