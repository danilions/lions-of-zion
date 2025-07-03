"use client";

import dynamic from 'next/dynamic';

const WorldNetworkMap = dynamic(() => import('@/components/WorldNetworkMap'), {
  ssr: false,
  loading: () => <div>Loading map...</div>
});

export default function MapPage() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <WorldNetworkMap key="world-map" />
    </div>
  );
}
