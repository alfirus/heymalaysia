'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ProtectedLayout from '../../../components/ProtectedLayout';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import api from '../../../utils/api';

export default function EditPlacePage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Nature',
    state: '',
    lat: '',
    lng: '',
    address: '',
    content: '',
    imageUrl: '',
  });

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const { data } = await api.get(`/places/${params.id}`);
        setFormData({
          name: data.name,
          description: data.description,
          category: data.category,
          state: data.state,
          lat: data.location.lat,
          lng: data.location.lng,
          address: data.location.address || '',
          content: data.content,
          imageUrl: data.images[0] || '',
        });
      } catch (error) {
        console.error('Failed to fetch place', error);
        alert('Failed to load place details');
      } finally {
        setFetching(false);
      }
    };

    if (params.id) {
      fetchPlace();
    }
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        location: {
          lat: parseFloat(String(formData.lat)),
          lng: parseFloat(String(formData.lng)),
          address: formData.address,
        },
        images: formData.imageUrl ? [formData.imageUrl] : [],
      };

      await api.put(`/places/${params.id}`, payload);
      router.push('/places');
    } catch (error) {
      console.error('Failed to update place', error);
      alert('Failed to update place');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <ProtectedLayout>Loading...</ProtectedLayout>;

  return (
    <ProtectedLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-white">Edit Place</h1>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Name</label>
                <input
                  name="name"
                  required
                  value={formData.name}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                >
                  <option value="Nature">Nature</option>
                  <option value="Urban">Urban</option>
                  <option value="Heritage">Heritage</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">State</label>
                <input
                  name="state"
                  required
                  value={formData.state}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Image URL</label>
                <input
                  name="imageUrl"
                  value={formData.imageUrl}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Description</label>
              <textarea
                name="description"
                required
                rows={3}
                value={formData.description}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Detailed Content (Markdown)</label>
              <textarea
                name="content"
                required
                rows={6}
                value={formData.content}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Address</label>
                <input
                  name="address"
                  value={formData.address}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Latitude</label>
                <input
                  name="lat"
                  type="number"
                  step="any"
                  required
                  value={formData.lat}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Longitude</label>
                <input
                  name="lng"
                  type="number"
                  step="any"
                  required
                  value={formData.lng}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button type="button" variant="ghost" onClick={() => router.back()} className="mr-4">
                Cancel
              </Button>
              <Button type="submit" isLoading={loading}>
                Update Place
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </ProtectedLayout>
  );
}
