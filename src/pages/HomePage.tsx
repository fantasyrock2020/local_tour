import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/useApp';
import { Location } from '../types/location';
import { LocationCard } from '../components/Home/LocationCard';
import { CommuneModal } from '../components/Home/CommuneModal';
import { Header } from '../components/Common/Header';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { locations } = useApp();
  const [selectedLocationForCommunes, setSelectedLocationForCommunes] = useState<Location | null>(null);

  // Home grid locations list starts with null (Current Location) followed by sampleLocations
  const allLocationItems: (Location | null)[] = [null, ...locations];

  const handleLocationClick = (location?: Location | null) => {
    if (location && location.communes && location.communes.length > 0) {
      setSelectedLocationForCommunes(location);
      return;
    }
    navigateToListPlace(location);
  };

  const navigateToListPlace = (location?: Location | null) => {
    const params = new URLSearchParams();
    if (location?.id) params.set('locationId', location.id);
    if (location?.type) params.set('locationType', location.type);
    if (location?.name) params.set('name', location.name);

    navigate(`/place?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* AppBar */}
      <Header title="Chọn địa điểm" showBack={false} />

      {/* Main Grid Content */}
      <main className="flex-1 p-4 max-w-lg mx-auto w-full">
        <div className="grid grid-cols-2 gap-3">
          {allLocationItems.map((loc, idx) => (
            <LocationCard
              key={loc?.id || `current-loc-${idx}`}
              location={loc}
              onClick={handleLocationClick}
            />
          ))}
        </div>
      </main>

      {/* Commune Selection Modal */}
      {selectedLocationForCommunes && (
        <CommuneModal
          isOpen={!!selectedLocationForCommunes}
          communes={selectedLocationForCommunes.communes || []}
          onClose={() => setSelectedLocationForCommunes(null)}
          onSelectCommune={(commune) => navigateToListPlace(commune)}
        />
      )}
    </div>
  );
};
