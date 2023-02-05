import { Ref } from 'vue';

interface windowOpened {
  [userID: string]: boolean;
}
export const useMarkers = () => {
  const windowOpened = useState<windowOpened>('windowOpened', () => {
    return {};
  });
  const windowSwitch = (windowOpened: Ref<windowOpened>) => {
    return (userID: string) => {
      windowOpened.value[userID] = !windowOpened.value[userID];
    };
  };
  const windowClose = (windowOpened: Ref<windowOpened>) => {
    return (userID: string) => {
      windowOpened.value[userID] = false;
    };
  };

  return {
    windowOpened: readonly(windowOpened),
    windowSwitch: windowSwitch(windowOpened),
    windowClose: windowClose(windowOpened),
  };
};

interface position {
  lat: number;
  lng: number;
}
export const useMapCenter = () => {
  const mapCenter = useState<position>('mapCenter', () => {
    return { lat: 0, lng: 0 };
  });
  const moveCenter = (mapCenter: Ref<position>) => {
    return (newCenter: position) => {
      mapCenter.value = newCenter;
    };
  };

  return {
    mapCenter: readonly(mapCenter),
    moveCenter: moveCenter(mapCenter),
  };
};
