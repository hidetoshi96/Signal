<template>
  <div class="h-screen" data-theme="mytheme">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup>
  useHead({
    htmlAttrs: {
      'data-theme': 'forest',
    },
  });
</script>
