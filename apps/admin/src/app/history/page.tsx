'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedLayout from '../../components/ProtectedLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import api from '../../utils/api';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface HistoryItem {
  _id: string;
  title: string;
  era: string;
  year: string;
}

export default function HistoryPage() {
  const router = useRouter();
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const { data } = await api.get('/history');
      setHistoryItems(data);
    } catch (error) {
      console.error('Failed to fetch history', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    try {
      await api.delete(`/history/${id}`);
      fetchHistory();
    } catch (error) {
      alert('Failed to delete article');
    }
  };

  return (
    <ProtectedLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">History Management</h1>
        <Button onClick={() => router.push('/history/new')}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Article
        </Button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-4">
          {historyItems.map((item) => (
            <Card key={item._id} className="flex justify-between items-center p-4">
              <div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.era} • {item.year}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => router.push(`/history/${item._id}`)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(item._id)}>
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
