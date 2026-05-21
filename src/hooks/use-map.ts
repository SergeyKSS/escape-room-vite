import { useEffect, useRef, useState } from 'react';
import leaflet from 'leaflet';

type UseMapProps = {
  center: [number, number];
  zoom: number;
};

export function useMap({ center, zoom }: UseMapProps): leaflet.Map | null {
  const mapRef = useRef<leaflet.Map | null>(null);
  const [map, setMap] = useState<leaflet.Map | null>(null);

  useEffect(() => {
    if (mapRef.current !== null) {
      return;
    }

    const mapInstance = leaflet
      .map('map')
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
  }, [center, zoom]);

  return map;
}
