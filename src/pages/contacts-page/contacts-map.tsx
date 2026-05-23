import { useEffect } from 'react';
import leaflet, { Icon } from 'leaflet';
import { useMap } from '../../hooks/use-map';
import { ContactsMap } from '../../const';
import { CONTACTS_MAP_ID } from '../../const';

const defaultIcon = new Icon({
  iconUrl: '/img/svg/pin-active.svg',
  iconSize: [23, 42],
  iconAnchor: [11, 42],
});

function ContactsMapComponent(): JSX.Element {
  const map = useMap({
    mapId: CONTACTS_MAP_ID,
    center: ContactsMap.coords,
    zoom: ContactsMap.zoom,
  });

  useEffect(() => {
    if (!map) {
      return;
    }

    const marker = leaflet
      .marker(ContactsMap.coords, {
        icon: defaultIcon,
      })
      .addTo(map);

    return () => {
      marker.remove();
    };
  }, [map]);

  return (
    <div className="map">
      <div id={CONTACTS_MAP_ID} className="map__container" />
    </div>
  );
}

export default ContactsMapComponent;
