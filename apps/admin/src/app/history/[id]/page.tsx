'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ProtectedLayout from '../../../components/ProtectedLayout';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import api from '../../../utils/api';

export default function EditHistoryPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    era: '',
    year: '',
    content: '',
  });

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { data } = await api.get(`/history/${params.id}`);
        setFormData({
            title: data.title,
            era: data.era,
            year: data.year,
            content: data.content
        });
      } catch (error) {
        alert('Failed to load article');
        router.push('/history');
      } finally {
        setFetching(false);
      }
    };

    if (params.id) fetchArticle();
  }, [params.id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put(`/history/${params.id}`, formData);
      router.push('/history');
    } catch (error) {
      alert('Failed to update article');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <ProtectedLayout><p>Loading...</p></ProtectedLayout>;

  return (
    <ProtectedLayout>
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={() => router.back()} className="mr-4">
          ← Back
        </Button>
        <h1 className="text-2xl font-bold text-gray-800">Edit Historical Article</h1>
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
                value={formData.era}
                onChange={(e) => setFormData({ ...formData, era: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year/Period</label>
              <Input
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
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </Card>
    </ProtectedLayout>
  );
}
