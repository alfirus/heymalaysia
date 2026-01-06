'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import ProtectedLayout from '../../components/ProtectedLayout';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import api from '../../utils/api';
import { IPlace } from '@heymalaysia/shared/src/types';

export default function PlacesPage() {
  const [places, setPlaces] = useState<IPlace[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPlaces = async () => {
    try {
      const { data } = await api.get('/places');
      setPlaces(data);
    } catch (error) {
      console.error('Failed to fetch places', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this place?')) {
      try {
        await api.delete(`/places/${id}`);
        setPlaces(places.filter((p) => p._id !== id));
      } catch (error) {
        console.error('Failed to delete place', error);
        alert('Failed to delete place');
      }
    }
  };

  return (
    <ProtectedLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Places Management</h1>
          <Link href="/places/new">
            <Button>
              <Plus className="w-5 h-5 mr-2" />
              Add New Place
            </Button>
          </Link>
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400 text-sm uppercase">
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">State</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : places.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                      No places found.
                    </td>
                  </tr>
                ) : (
                  places.map((place) => (
                    <tr key={place._id} className="hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-white">{place.name}</td>
                      <td className="px-6 py-4 text-gray-300">{place.state}</td>
                      <td className="px-6 py-4">
                        <Badge label={place.category} variant="neutral" />
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <Link href={`/places/${place._id}`}>
                          <Button variant="ghost" size="sm">
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                          onClick={() => handleDelete(place._id!)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </ProtectedLayout>
  );
}
