import React, { useState, useEffect } from 'react';

interface User {
  id?: string;
  firstName: string;
  lastName: string;
  phone: string;
  position: string;
  email: string;
  password: string;
}

interface UserTableProps {
  users: User[];
  createUser: (user: User) => void;
  updateUser: (user: User) => void;
  deleteUser: (id: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  createUser,
  updateUser,
  deleteUser,
}) => {
  const [sortColumn, setSortColumn] = useState<keyof User>('email');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [newUser, setNewUser] = useState<User | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleSort = (column: keyof User) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prevUser) =>
      prevUser ? { ...prevUser, [name]: value } : null
    );
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditingUser((prevUser) =>
      prevUser ? { ...prevUser, [name]: value } : null
    );
  };

  const handleAddUser = () => {
    setNewUser({
      firstName: '',
      lastName: '',
      phone: '',
      position: '',
      email: '',
      password: '123456',
    });
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSaveUser = () => {
    if (newUser) {
      const { firstName, lastName, phone, position, email } = newUser;
      if (!firstName || !lastName || !phone || !position || !email) {
        alert('All fields are required');
        setNewUser(null);
        return;
      }

      if (!validateEmail(email)) {
        alert('Invalid email format');
        return;
      }

      const emailExists = users.some((u) => u.email === email);
      if (emailExists) {
        alert('Email already in use');
        return;
      }

      createUser(newUser);
      setNewUser(null);
    }
  };

  const handleSaveEditUser = () => {
    if (editingUser) {
      const { firstName, lastName, phone, position, email } = editingUser;

      if (!validateEmail(email)) {
        alert('Invalid email format');
        return;
      }

      const emailExists = users.filter(
        (u) => u.email === email && u.id !== editingUser.id
      ).length;
      if (emailExists > 1) {
        alert('Email already in use');
        return;
      }

      updateUser(editingUser);
      setEditingUser(null);
    }
  };

  const handleDeleteUser = (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(id);
    }
  };

  useEffect(() => {
    if (editingUser) {
      // Ensure the input remains open during editing
      setEditingUser(editingUser);
    }
  }, [editingUser]);

  const sortedUsers = [...users].sort((a, b) => {
    if (a[sortColumn] && b[sortColumn]) {
      if (a[sortColumn] < b[sortColumn]) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (a[sortColumn] > b[sortColumn]) {
        return sortDirection === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });

  return (
    <div className="overflow-x-auto ">
      <div className="mb-4 space-x-5">
        <button
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleAddUser}
        >
          Tambah User
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={handleSaveUser}
        >
          Simpan
        </button>
      </div>

      <table className="min-w-full bg-white text-black">
        <thead>
          <tr>
            <th
              className="py-2 px-4 border-b cursor-pointer"
              onClick={() => handleSort('firstName')}
            >
              First Name{' '}
              {sortColumn === 'firstName' &&
                (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th
              className="py-2 px-4 border-b cursor-pointer"
              onClick={() => handleSort('lastName')}
            >
              Last Name{' '}
              {sortColumn === 'lastName' &&
                (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th
              className="py-2 px-4 border-b cursor-pointer"
              onClick={() => handleSort('phone')}
            >
              Phone{' '}
              {sortColumn === 'phone' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th
              className="py-2 px-4 border-b cursor-pointer"
              onClick={() => handleSort('position')}
            >
              Position{' '}
              {sortColumn === 'position' &&
                (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th
              className="py-2 px-4 border-b cursor-pointer"
              onClick={() => handleSort('email')}
            >
              Email{' '}
              {sortColumn === 'email' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {newUser && (
            <tr>
              <td className="py-2 px-4 border-b">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={newUser.firstName}
                  onChange={handleInputChange}
                  className="px-2 py-1 border rounded"
                  required
                />
              </td>
              <td className="py-2 px-4 border-b">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={newUser.lastName}
                  onChange={handleInputChange}
                  className="px-2 py-1 border rounded"
                  required
                />
              </td>
              <td className="py-2 px-4 border-b">
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={newUser.phone}
                  onChange={handleInputChange}
                  className="px-2 py-1 border rounded"
                  required
                />
              </td>
              <td className="py-2 px-4 border-b">
                <input
                  type="text"
                  name="position"
                  placeholder="Position"
                  value={newUser.position}
                  onChange={handleInputChange}
                  className="px-2 py-1 border rounded"
                  required
                />
              </td>
              <td className="py-2 px-4 border-b">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  className="px-2 py-1 border rounded"
                  required
                />
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded"
                  onClick={handleSaveUser}
                >
                  Simpan
                </button>
              </td>
            </tr>
          )}
          {sortedUsers.map((user, index) => (
            <tr key={index}>
              {editingUser && editingUser.id === user.id ? (
                <>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      name="firstName"
                      value={editingUser.firstName}
                      onChange={handleEditInputChange}
                      className="px-2 py-1 border rounded"
                      required
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      name="lastName"
                      value={editingUser.lastName}
                      onChange={handleEditInputChange}
                      className="px-2 py-1 border rounded"
                      required
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      name="phone"
                      value={editingUser.phone}
                      onChange={handleEditInputChange}
                      className="px-2 py-1 border rounded"
                      required
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      name="position"
                      value={editingUser.position}
                      onChange={handleEditInputChange}
                      className="px-2 py-1 border rounded"
                      required
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="email"
                      name="email"
                      value={editingUser.email}
                      onChange={handleEditInputChange}
                      className="px-2 py-1 border rounded"
                      required
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="px-4 py-2 bg-green-500 text-white rounded"
                      onClick={handleSaveEditUser}
                    >
                      Simpan
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="py-2 px-4 border-b">{user.firstName}</td>
                  <td className="py-2 px-4 border-b">{user.lastName}</td>
                  <td className="py-2 px-4 border-b">{user.phone}</td>
                  <td className="py-2 px-4 border-b">{user.position}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b space-x-2">
                    <button
                      className="px-4 py-2 bg-yellow-500 text-white rounded"
                      onClick={() => setEditingUser(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded"
                      onClick={() => handleDeleteUser(user.id!)}
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;