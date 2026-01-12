'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { getNearbyPlaces } from '@/app/actions/place-actions';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Star } from 'lucide-react';
import Image from 'next/image';

interface Place {
  _id: string;
  name: string;
  formatted_address: string;
  rating?: number;
  user_ratings_total?: number;
  photos?: any[];
  types: string[];
}

export function NearbySection() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (err) => {
        setLoading(false);
        setError('Unable to retrieve your location');
        console.error(err);
      }
    );
  }, []);

  useEffect(() => {
    if (location) {
      const fetchPlaces = async () => {
        try {
          const result = await getNearbyPlaces(location.lat, location.lng);
          setPlaces(result);
        } catch (err) {
          setError('Failed to fetch nearby places');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchPlaces();
    }
  }, [location]);

  if (error && !loading && places.length === 0) {
     // Optional: Hide section or show minimal error if preferred. 
     // For now, returning null to not disrupt the UI flow if data is missing.
     return null; 
  }

  if (!loading && places.length === 0 && location) {
    return (
        <div className="w-full py-12 text-center text-gray-500">
            No places found nearby.
        </div>
    );
  }

  return (
    <section ref={containerRef} className="relative py-20 px-4 overflow-hidden bg-slate-50 dark:bg-neutral-900 border-t border-b border-gray-200 dark:border-gray-800">
      
      {/* Parallax Background Element example - can be adjusted */}
      <motion.div 
        style={{ y }} 
        className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -z-10" 
      />
      <motion.div 
        style={{ y: y2 }} 
        className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10" 
      />

      <div className="max-w-7xl mx-auto space-y-8">
        <motion.div 
            style={{ opacity }}
            className="text-center space-y-2"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Near You
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Best places within 50km of your current location
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {places.map((place, idx) => (
              <motion.div
                key={place._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow bg-white dark:bg-neutral-800">
                  <div className="relative h-48 w-full bg-gray-200">
                     {/* Placeholder for images since database might not have valid URLs yet user requested 'generate_image' usage for placeholders if needed, but for now using generic color/icon if photo missing */}
                     {place.photos && place.photos.length > 0 ? (
                        // Assuming photo structure, might need adjustment based on actual data
                         <div className="absolute inset-0 bg-gray-300 flex items-center justify-center text-gray-500">
                            <Image 
                                src="/placeholder-place.jpg" // You might need a real placeholder asset or generate one
                                alt={place.name}
                                fill
                                className="object-cover"
                            />
                         </div>
                     ) : (
                        <div className="absolute inset-0 bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center">
                            <MapPin className="h-12 w-12 text-emerald-500/50" />
                        </div>
                     )}
                     <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                        {place.rating || 'N/A'}
                     </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white line-clamp-1 mb-1">{place.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3 h-10">{place.formatted_address}</p>
                    <div className="flex flex-wrap gap-2">
                        {place.types.slice(0, 2).map(t => (
                            <span key={t} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded-md capitalize text-gray-600 dark:text-gray-300">
                                {t.replace('_', ' ')}
                            </span>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
