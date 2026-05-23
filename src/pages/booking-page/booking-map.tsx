import { useEffect } from 'react';
import leaflet, { Icon } from 'leaflet';
import { useMap } from '../../hooks/use-map';
import { BOOKING_MAP_ID } from '../../const';

type Place = {
  id: string;
  location: {
    address: string;
    coords: [number, number];
  };
};

type BookingMapProps = {
  places: Place[];
  selectedPlaceId: string;
  onPlaceSelect: (placeId: string) => void;
  address: string;
};

const defaultIcon = new Icon({
  iconUrl: '/img/svg/pin-default.svg',
  iconSize: [23, 42],
  iconAnchor: [11, 42],
});

const activeIcon = new Icon({
  iconUrl: '/img/svg/pin-active.svg',
  iconSize: [23, 42],
  iconAnchor: [11, 42],
});

const DEFAULT_CENTER: [number, number] = [59.968322, 30.317359];

function BookingMap({
  places,
  selectedPlaceId,
  onPlaceSelect,
  address,
}: BookingMapProps): JSX.Element {
  const firstPlace = places[0];
  const actualSelectedPlaceId = selectedPlaceId || firstPlace?.id || '';
  const selectedPlace = places.find(
    (place) => place.id === actualSelectedPlaceId,
  );

  const center =
    selectedPlace?.location.coords ??
    firstPlace?.location.coords ??
    DEFAULT_CENTER;

  const map = useMap({
    mapId: BOOKING_MAP_ID,
    center: center,
    zoom: 11,
  });

  useEffect(() => {
    if (!map) {
      return;
    }

    map.setView(center, 11);
  }, [map, center]);

  useEffect(() => {
    if (!map || places.length === 0) {
      return;
    }

    const markerLayer = leaflet.layerGroup().addTo(map);

    const bounds = leaflet.latLngBounds(
      places.map((place) => place.location.coords),
    );

    places.forEach((place) => {
      leaflet
        .marker(place.location.coords, {
          icon: place.id === selectedPlaceId ? activeIcon : defaultIcon,
        })
        .addTo(markerLayer)
        .on('click', () => {
          onPlaceSelect(place.id);
        });
    });

    if (places.length === 1) {
      map.setView(places[0].location.coords, 13);
    } else {
      map.fitBounds(bounds, {
        padding: [50, 50],
      });
    }

    return () => {
      markerLayer.remove();
    };
  }, [map, places, selectedPlaceId, onPlaceSelect]);

  return (
    <div className="page-content__item">
      <div className="booking-map">
        <div className="map">
          <div id={BOOKING_MAP_ID} className="map__container" />
        </div>
        <p className="booking-map__address">Вы&nbsp;выбрали: {address}</p>
      </div>
    </div>
  );
}

export default BookingMap;
