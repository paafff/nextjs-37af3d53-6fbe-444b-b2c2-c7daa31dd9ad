import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserTable from '../components/UserTable';

interface User {
  id?: string;
  firstName: string;
  lastName: string;
  phone: string;
  position: string;
  email: string;
  password: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data);
    } catch (err) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const createUser = async (user: User) => {
    try {
      await axios.post('http://localhost:5000/users', user);
      fetchUsers(); // Fetch users again after creating a new user
    } catch (err) {
      setError('Failed to create user');
    }
  };

  const updateUser = async (user: User) => {
    try {
      await axios.patch(`http://localhost:5000/users/${user.id}`, user);
      fetchUsers(); // Fetch users again after updating a user
    } catch (err) {
      setError('Failed to update user');
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      fetchUsers(); // Fetch users again after deleting a user
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-500 mb-4">Daftar Pengguna</h1>
      <UserTable
        users={users}
        createUser={createUser}
        updateUser={updateUser}
        deleteUser={deleteUser}
      />
    </div>
  );
};

export default Users;
