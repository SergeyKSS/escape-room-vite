import { useEffect, useRef, useState } from 'react';
import leaflet from 'leaflet';

type UseMapProps = {
  mapId: string;
  center: [number, number];
  zoom: number;
};

export function useMap({ center, zoom, mapId }: UseMapProps): leaflet.Map | null {
  const mapRef = useRef<leaflet.Map | null>(null);
  const [map, setMap] = useState<leaflet.Map | null>(null);

  useEffect(() => {
    if (mapRef.current !== null) {
      return;
    }

    const mapInstance = leaflet
      .map(mapId)
      .setView(center, zoom);

    leaflet
      .tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution: '&copy; OpenStreetMap contributors',
        }
      )
      .addTo(mapInstance);

    mapRef.current = mapInstance;
    setMap(mapInstance);
  }, [mapId, center, zoom]);

  return map;
}
