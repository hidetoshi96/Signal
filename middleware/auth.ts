export default defineNuxtRouteMiddleware((to) => {
  const userInfo = useUserInfo();
  if (!userInfo.value?.id && to.path !== '/login') {
    return navigateTo('/login');
  }
});
