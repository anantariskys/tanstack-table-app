'use client';

import { useSession } from 'next-auth/react';

export default function Home() {
  const session = useSession();

  console.log(session);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to Dashboard</h1>
        <p className="text-gray-600">You are logged in to the application</p>
      </div>
    </div>
  );
}
