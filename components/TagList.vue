<template>
  <div class="h-3/6 p-4 overflow-y-scroll">
    <table class="table w-full">
      <tbody>
        <tr
          v-for="(user, userID) in selectedUsers"
          :key="userID"
          class="overflow-x-scroll"
        >
          <td class="bg-neutral">
            <div
              class="grid grid-rows-2 grid-cols-6 grid-flow-col gap-x-2 place-items-center"
            >
              <div class="row-span-1 m-auto col-span-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-full h-full"
                  :class="{
                    'fill-red-500': user.urgency === '2',
                    'fill-yellow-500': user.urgency === '1',
                    'fill-green-500': user.urgency === '0',
                  }"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </div>
              <div class="row-span-1 col-span-1">
                <button
                  class="btn btn-circle btn-ghost"
                  @click="moveCenter(user.position!)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                </button>
              </div>
              <div class="row-span-2 col-span-5 place-self-stretch">
                <div class="font-bold">{{ user.name }}</div>
                <div class="text-sm opacity-50">{{ userID }}</div>
                <details v-show="user.message != ''">
                  <summary>メッセージ</summary>
                  <div
                    class="whitespace-pre-line break-words border rounded-lg border-current text-xl text-center p-2 m-2"
                  >
                    {{ user.message }}
                  </div>
                </details>
                <div class="flex flex-row justify-between">
                  <div>
                    現在の志願者数：{{ Object.keys(user.supporters).length }}人
                  </div>
                  <button
                    class="btn btn-xs btn-primary"
                    @click="
                      supportClick(
                        userInfo!.id!,
                        userInfo!.name!,
                        userID as string
                      )
                    "
                  >
                    助けに行く
                  </button>
                </div>
                <details v-show="Object.keys(user.supporters).length > 0">
                  <summary>志願者リスト</summary>
                  <div class="divide-y px-2 rounded-md border">
                    <div
                      v-for="(supporter, supporterIndex) in user.supporters"
                      :key="supporterIndex"
                      class="flex flex-row justify-between"
                    >
                      <div>
                        <p>{{ supporter }}</p>
                        <p>
                          救援者との距離：{{
                            distance(
                              user.position!.lat,
                              user.position!.lng,
                              users[supporterIndex].position!.lat,
                              users[supporterIndex].position!.lng
                            )
                          }}m
                        </p>
                      </div>
                      <button
                        class="btn btn-circle btn-ghost"
                        @click="moveCenter(users[supporterIndex].position!)"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </details>
                <div class="text-xs opacity-50 text-right">
                  最終更新時刻： {{ user.lastUpdateTime }}
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
  const { users, selectedUsers } = useUsers();
  const { moveCenter } = useMapCenter();
  const userInfo = useUserInfo();
  const R = Math.PI / 180;
  const distance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    lat1 *= R;
    lng1 *= R;
    lat2 *= R;
    lng2 *= R;
    return Math.round(
      1000 *
        6371 *
        Math.acos(
          Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) +
            Math.sin(lat1) * Math.sin(lat2)
        )
    );
  };
  const supportClick = (
    supporterID: string,
    supporterName: string,
    sponseeID: string
  ) => {
    updateSupporters(supporterID, supporterName, sponseeID);
  };
</script>
<!-- 削除したユーザーデータでエラーが出る可能性あり現時点で対策なし -->
