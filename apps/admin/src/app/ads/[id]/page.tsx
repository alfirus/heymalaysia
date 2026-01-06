'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Check, X, ExternalLink } from 'lucide-react';
import ProtectedLayout from '../../../components/ProtectedLayout';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import api from '../../../utils/api';
import { IAd } from '@heymalaysia/shared/src/types';

export default function AdDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [ad, setAd] = useState<IAd | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        // Similar workaround for missing GET /:id as in events
        const { data } = await api.get('/ads/admin');
        const found = data.find((a: any) => a._id === params.id);
        setAd(found);
      } catch (error) {
        console.error('Failed to fetch ad', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchAd();
    }
  }, [params.id]);

  const updateStatus = async (status: 'active' | 'rejected') => {
    if (confirm(`Mark this ad as ${status}?`)) {
      setActionLoading(true);
      try {
        await api.put(`/ads/${params.id}/status`, { status });
        alert(`Ad ${status}!`);
        router.push('/ads');
      } catch (error) {
        console.error('Failed to update status', error);
        alert('Failed to update status');
      } finally {
        setActionLoading(false);
      }
    }
  };

  if (loading) return <ProtectedLayout>Loading...</ProtectedLayout>;
  if (!ad) return <ProtectedLayout>Ad not found</ProtectedLayout>;

  return (
    <ProtectedLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <Button variant="ghost" onClick={() => router.back()} className="pl-0">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Ads
        </Button>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">{ad.title}</h1>
            <p className="text-gray-400 mt-1">Submitted on {new Date(ad.createdAt || Date.now()).toLocaleDateString()}</p>
          </div>
          <Badge
             label={ad.status.toUpperCase()}
             variant={ad.status === 'active' ? 'success' : 'warning'}
             className="text-sm px-3 py-1"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <h3 className="text-lg font-semibold text-white mb-4">Ad Visuals</h3>
              <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center border border-gray-700">
                {ad.imageUrl ? (
                   <img src={ad.imageUrl} alt={ad.title} className="w-full h-full object-cover" />
                ) : (
                   <span className="text-gray-500">No Image Provided</span>
                )}
              </div>
              <div className="mt-4 flex items-center">
                 <span className="text-gray-400 mr-2">Target URL:</span>
                 <a href={ad.targetUrl} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 flex items-center">
                    {ad.targetUrl} <ExternalLink className="w-3 h-3 ml-1" />
                 </a>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <h3 className="text-lg font-semibold text-white mb-4">Verification</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-400">Duration</label>
                  <p className="text-gray-200 mt-1">{ad.duration} Days</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-400">Payment Reference</label>
                  <div className="mt-1 p-3 bg-gray-800 rounded-lg text-mono text-blue-300 break-all select-all">
                    {ad.paymentReference || 'No Reference Provided'}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                 {ad.status === 'pending' && (
                    <>
                    <Button onClick={() => updateStatus('active')} isLoading={actionLoading} className="w-full bg-green-600 hover:bg-green-700">
                      <Check className="w-4 h-4 mr-2" />
                      Approve & Activate
                    </Button>
                    <Button onClick={() => updateStatus('rejected')} variant="danger" className="w-full bg-red-900/50 hover:bg-red-800 text-red-200 border border-red-800">
                        <X className="w-4 h-4 mr-2" />
                        Reject
                    </Button>
                    </>
                 )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
}
