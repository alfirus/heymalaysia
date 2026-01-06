'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Eye } from 'lucide-react';
import ProtectedLayout from '../../components/ProtectedLayout';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import api from '../../utils/api';
import { IAd } from '@heymalaysia/shared/src/types';

export default function AdsPage() {
  const [ads, setAds] = useState<IAd[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAds = async () => {
    try {
      const { data } = await api.get('/ads/admin');
      setAds(data);
    } catch (error) {
      console.error('Failed to fetch ads', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'mobile': return 'warning'; // pending usually
      case 'rejected': return 'danger';
      case 'expired': return 'neutral';
      default: return 'warning'; // pending
    }
  };

  return (
    <ProtectedLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white">Advertisement Manager</h1>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400 text-sm uppercase">
                  <th className="px-6 py-4">Campaign Title</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Duration</th>
                  <th className="px-6 py-4">Payment Ref</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : ads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      No ads found.
                    </td>
                  </tr>
                ) : (
                  ads.map((ad) => (
                    <tr key={ad._id} className="hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-white">{ad.title}</td>
                      <td className="px-6 py-4">
                        <Badge
                          label={ad.status.toUpperCase()}
                          variant={getStatusVariant(ad.status) as any}
                        />
                      </td>
                      <td className="px-6 py-4 text-gray-300">{ad.duration} Days</td>
                      <td className="px-6 py-4 text-mono text-sm text-gray-400">
                        {ad.paymentReference || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link href={`/ads/${ad._id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            Review
                          </Button>
                        </Link>
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
