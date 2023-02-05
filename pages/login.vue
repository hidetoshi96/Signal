<template>
  <div class="grid content-center my-auto py-auto h-full">
    <div class="card w-96 shadow-xl m-auto">
      <div class="card-body">
        <div class="tabs m-auto">
          <a
            class="tab"
            :class="{ 'tab-active': tabState === 'ログイン' }"
            @click="tabClick('ログイン')"
            >ログイン</a
          >
          <a
            class="tab"
            :class="{ 'tab-active': tabState === '新規登録' }"
            @click="tabClick('新規登録')"
            >新規登録</a
          >
        </div>
        <div class="form-control w-full max-w-xs">
          <div>
            <label class="label">
              <span class="label-text">メールアドレス</span>
            </label>
            <input
              v-model="email"
              type="email"
              placeholder="Type here"
              class="input input-bordered w-full max-w-xs"
            />
          </div>
          <div>
            <label class="label">
              <span class="label-text">パスワード</span>
            </label>
            <input
              v-model="password"
              type="password"
              placeholder="Type here"
              class="input input-bordered w-full max-w-xs"
            />
          </div>
          <div v-if="tabState === '新規登録'">
            <label class="label">
              <span class="label-text">名前</span>
            </label>
            <input
              v-model="name"
              type="text"
              placeholder="Type here"
              class="input input-bordered w-full max-w-xs"
            />
          </div>
        </div>
        <div class="card-actions justify-end">
          <button
            v-if="tabState === 'ログイン'"
            class="btn btn-primary"
            @click="signIn"
          >
            {{ tabState }}
          </button>
          <button
            v-else-if="tabState === '新規登録'"
            class="btn btn-primary"
            @click="signUp"
          >
            {{ tabState }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  definePageMeta({
    layout: false,
    middleware: 'auth',
  });
  const tabState = ref('ログイン');
  const email = ref('');
  const password = ref('');
  const name = ref('');
  const tabClick = (tabName: string) => {
    tabState.value = tabName;
  };
  const signIn = () => signInUser(email.value, password.value);

  const signUp = () => createUser(email.value, password.value, name.value);
</script>
