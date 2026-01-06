'use client';

import { useEffect, useState } from 'react';
import ProtectedLayout from '../../components/ProtectedLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import api from '../../utils/api';
import { Trash2, Shield, ShieldOff } from 'lucide-react';

interface User {
  _id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/users');
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleToggle = async (user: User) => {
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    if (!confirm(`Are you sure you want to change role to ${newRole}?`)) return;

    try {
      await api.put(`/users/${user._id}/role`, { role: newRole });
      fetchUsers(); // Refresh list
    } catch (error) {
      alert('Failed to update user role');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (error) {
      alert('Failed to delete user');
    }
  };

  return (
    <ProtectedLayout>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">User Management</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-4">
          {users.map((user) => (
            <Card key={user._id} className="flex justify-between items-center p-4">
              <div>
                <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{user.username}</h3>
                    <Badge 
                        variant={user.role === 'admin' ? 'default' : 'neutral'}
                        label={user.role}
                    />
                </div>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <div className="flex gap-2">
                <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleRoleToggle(user)}
                    title={user.role === 'admin' ? "Demote to User" : "Promote to Admin"}
                >
                  {user.role === 'admin' ? <ShieldOff className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(user._id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </ProtectedLayout>
  );
}
