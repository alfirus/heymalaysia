'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedLayout from '../../../components/ProtectedLayout';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import api from '../../../utils/api';

export default function NewHistoryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    era: '',
    year: '',
    content: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/history', formData);
      router.push('/history');
    } catch (error) {
      alert('Failed to create history article');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedLayout>
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={() => router.back()} className="mr-4">
          ← Back
        </Button>
        <h1 className="text-2xl font-bold text-gray-800">New Historical Article</h1>
      </div>

      <Card className="p-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Era</label>
              <Input
                placeholder="e.g. Colonial Era"
                value={formData.era}
                onChange={(e) => setFormData({ ...formData, era: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year/Period</label>
              <Input
                placeholder="e.g. 1957"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content (Markdown)</label>
            <textarea
              className="w-full min-h-[200px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Article'}
            </Button>
          </div>
        </form>
      </Card>
    </ProtectedLayout>
  );
}
