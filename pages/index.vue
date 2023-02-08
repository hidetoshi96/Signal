<template>
  <div class="h-full">
    <MapPage v-if="selectedTab === 'Map'" />
    <StatisticsPage v-if="selectedTab === 'Statistics'" />
    <SettingPage v-if="selectedTab === 'Setting'" />
    <GroupsPage v-if="selectedTab === 'Groups'" />
    <!-- <DevSetting v-if="selectedTab === 'DevSetting'" /> -->
  </div>
</template>
<script setup lang="ts">
  definePageMeta({
    middleware: 'auth',
  });
  const selectedTab = useSelectedNav();
  const { groups, setGroups } = useGroups();
  const { location, updateLocation, uploadLocation } = useLocation();
  const { permission } = useLocationPermission();
  const { users, getUsers } = useUsers();
  const { moveCenter } = useMapCenter();
  const { setStat } = useUrgencyStat();
  const uploadLocationTime = ref(0);
  const getLocationTime = ref(0);
  const positionChange = ref(false);
  const updateTime = 30000;

  const firstSuccess = (pos: GeolocationPosition) => {
    success(pos);
    moveCenter(location.value!);
  };
  const success = (pos: GeolocationPosition) => {
    updateLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    getLocationTime.value = pos.timestamp;
    positionChange.value = true;
  };

  navigator.geolocation.watchPosition(success, null, {
    enableHighAccuracy: true,
  });

  setInterval(() => {
    if (
      getLocationTime.value - uploadLocationTime.value >= updateTime &&
      permission.value === true &&
      positionChange.value === true
    ) {
      uploadLocationTime.value = getLocationTime.value;
      positionChange.value = false;
      uploadLocation();
    }
    getUsers();
    setStat(users.value);
  }, 30000);

  setGroups(JSON.parse(localStorage.getItem('groups') as string));
  if (groups.value == null) {
    setGroups([]);
    localStorage.setItem('groups', JSON.stringify(groups.value));
  }

  Notification.requestPermission();

  onMounted(() => {
    navigator.geolocation.getCurrentPosition(firstSuccess, null, {
      enableHighAccuracy: true,
    });
  });
</script>
