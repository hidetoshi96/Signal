<template>
  <div class="space-y-4">
    <h2 class="text-center text-xl font-medium">マイプロフィール</h2>
    <div class="form-control grid grid-cols">
      <div>
        <label class="label">
          <span class="label-text">Name</span>
        </label>
        <input
          v-model="userInfo.name"
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full"
        />
      </div>
      <div>
        <label class="label">
          <span class="label-text">ID</span>
        </label>
        <div class="input-group">
          <input
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full"
            :value="userInfo.id"
            readonly
          />
          <button class="btn btn-square" @click="copyClick(userInfo.id)">
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
                d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6"
              />
            </svg>
          </button>
        </div>
      </div>
      <div>
        <label class="label">
          <span class="label-text">メッセージ</span>
        </label>
        <textarea
          v-model="userInfo.message"
          class="textarea textarea-bordered w-full"
          placeholder="Type here"
        ></textarea>
      </div>
      <div>
        <label class="label">
          <span class="label-text">緊急度</span>
        </label>
        <div class="flex flex-row space-x-4">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-10 h-10"
              :class="{
                'fill-red-500': userInfo.urgency === '2',
                'fill-yellow-500': userInfo.urgency === '1',
                'fill-green-500': userInfo.urgency === '0',
              }"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </div>
          <div class="grow">
            <input
              v-model="userInfo.urgency"
              type="range"
              min="0"
              max="2"
              class="range"
              step="1"
            />
            <div class="w-full flex justify-between text-xs px-2">
              <span>小</span>
              <span>中</span>
              <span>大</span>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4 justify-self-center">
        <input
          type="submit"
          value="save"
          class="btn btn-primary btn-wide"
          @click="
            updateClick(
              userInfo.id,
              userInfo.name,
              userInfo.message,
              userInfo.urgency
            )
          "
        />
      </div>
    </div>
    <div class="divider"></div>
    <div>
      <label class="label">
        <div>
          <p class="label-text">位置情報リセット</p>
          <p class="text-xs opacity-50">
            過去に記録した位置情報をリセットします
          </p>
        </div>
      </label>
      <div class="flex justify-center">
        <button
          class="btn btn-wide btn-primary"
          @click="resetPositionClick(userInfo.id)"
        >
          Reset
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
  const { getUsers } = useUsers();
  const userInfo = useUserInfo();
  const copyClick = (id) => {
    if (!navigator.clipboard) {
      alert('このブラウザは対応していません');
      return;
    }
    navigator.clipboard.writeText(id);
  };
  const updateClick = async (id, name, message, urgency) => {
    await updateProfile(id, name, message, urgency);
    getUsers();
    userInfo.value.name = name;
    userInfo.value.message = message;
    userInfo.value.urgency = urgency;
  };
  const resetPositionClick = (id) => {
    resetPosition(id);
  };
</script>
