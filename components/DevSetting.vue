<template>
  <div class="toast toast-center toast-middle space-y-8">
    <button class="btn btn-lg" @click="notificationTestClick">
      Notification Test
    </button>
  </div>
</template>
<script setup lang="ts">
  import { getFunctions, httpsCallable } from 'firebase/functions';
  const functions = getFunctions();
  const notificationTestClick = () => {
    const notificationTest = httpsCallable(functions, 'notificationTest');
    notificationTest()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });
  };
</script>
