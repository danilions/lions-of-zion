import React, { useState } from 'react';
import InteractiveWorldMap from './components/InteractiveWorldMap';

export default function App() {
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>(undefined);

  const handleCountryClick = (country: any) => {
    console.log('Country clicked:', country);
    setSelectedCountry(prev => 
      prev === country.properties.ISO_A3 ? undefined : country.properties.ISO_A3
    );
  };

  return (
    <main className="min-h-screen bg-black">
      <div className="h-screen w-full">
        <InteractiveWorldMap 
          selectedCountryId={selectedCountry}
          onCountryClick={handleCountryClick}
        />
      </div>
    </main>
  );
}