import React from 'react';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-500 mb-4">
        Home Page, Click Link Below
      </h1>
      <Link href="/users">
        <span className="text-xl text-blue-600 underline">
          Lihat Daftar Pengguna
        </span>
      </Link>
    </div>
  );
};

export default Home;
