import { getDatabase, ref, update } from 'firebase/database';
import { Ref } from 'vue';

interface profile {
  name: string | null;
  id: string | null;
  message: string | null;
  urgency: string | null;
}
interface position {
  lat: number;
  lng: number;
}
export const useUserInfo = () =>
  useState<profile | null>('userInfo', () => null);
export const useLocation = () => {
  const location = useState<position | null>('location', () => null);
  const updateLocation = (location: Ref<position | null>) => {
    return (newLocation: position) => {
      location.value = newLocation;
    };
  };
  const uploadLocation = (location: Ref<position | null>) => {
    return () => {
      const userInfo: Ref<profile | null> = useUserInfo();
      if (userInfo.value && location.value) {
        const db = getDatabase();
        const updates: { [key: string]: position | string } = {};
        const now = new Date();
        updates[`users/${userInfo.value.id}/position`] = location.value;
        updates[`users/${userInfo.value.id}/lastUpdateTime`] =
          now.toLocaleString('ja');
        update(ref(db), updates);
      }
    };
  };

  return {
    location: readonly(location),
    updateLocation: updateLocation(location),
    uploadLocation: uploadLocation(location),
  };
};
export const useLocationPermission = () => {
  const permission = useState<boolean>('permission', () => {
    return true;
  });
  const changePermission = (permission: Ref<boolean>) => {
    return () => {
      permission.value = !permission.value;
    };
  };

  return {
    permission: readonly(permission),
    changePermission: changePermission(permission),
  };
};

export const updateProfile = (
  id: string,
  name: string,
  message: string,
  urgency: string
) => {
  const db = getDatabase();
  const updates: { [key: string]: string } = {};
  updates[`users/${id}/name`] = name;
  updates[`users/${id}/message`] = message;
  updates[`users/${id}/urgency`] = urgency;
  return update(ref(db), updates);
};

export const resetPosition = (id: string) => {
  const db = getDatabase();
  const updates: { [key: string]: position } = {};
  updates[`users/${id}/position`] = {
    lat: 34.26571704774958,
    lng: 135.1519788915844,
  };
  return update(ref(db), updates);
};
