<template>
  <div class="space-y-4">
    <h2 class="text-center text-xl font-medium">知り合いリスト</h2>
    <div class="carousel w-full p-4 space-x-4 rounded-box border-y-2">
      <div
        class="carousel-item place-items-center rounded-box px-4 py-6 space-y-4 shadow-lg border"
      >
        <button class="btn btn-square btn-sm" @click="addGroupClick">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-plus"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </div>
      <div
        v-for="(group, groupIndex) in groups"
        :key="groupIndex"
        class="carousel-item w-auto grid justify-items-center rounded-box px-4 py-6 space-y-4 shadow-lg border"
      >
        <div class="input-group">
          <input
            type="text"
            placeholder="Type here"
            class="input input-bordered input-primary w-full text-center text-xl font-bold"
            :value="group.groupName"
            readonly
          />
          <label
            :for="`modal${groupIndex}UpdateName`"
            class="btn btn-square border-primary"
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
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </label>
        </div>
        <input
          :id="`modal${groupIndex}UpdateName`"
          type="checkbox"
          class="modal-toggle"
          @change="
            () => {
              enteredGroupName = group.groupName;
            }
          "
        />
        <div class="modal">
          <div class="modal-box relative">
            <label
              :for="`modal${groupIndex}UpdateName`"
              class="btn btn-md btn-circle absolute right-2 top-2"
              >✕</label
            >
            <h3 class="h-3 text-center">グループ名変更</h3>
            <div class="form-control w-full max-w-xs">
              <div>
                <label class="label">
                  <span class="label-text">GroupName</span>
                </label>
                <input
                  v-model="enteredGroupName"
                  type="text"
                  placeholder="Type here"
                  class="input input-md input-bordered input-primary w-full"
                />
              </div>
              <input
                type="submit"
                value="Update"
                class="btn btn-md w-full mt-2"
                @click="updateGroupNameClick(groupIndex, enteredGroupName)"
              />
            </div>
          </div>
        </div>
        <table class="table w-full">
          <tbody>
            <tr v-for="(userID, userIndex) in group.userIDs" :key="userIndex">
              <td class="bg-neutral">
                <div class="grid grid-cols-6 gap-4">
                  <button
                    class="btn btn-xs btn-circle m-auto border"
                    @click="deleteUserIDClick(groupIndex, userIndex)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <div class="col-span-5">
                    <div class="font-bold">{{ userID }}</div>
                    <!-- <div class="text-sm opacity-50">{{ user.id }}</div> -->
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td class="p-0">
                <div class="border-2 border-dashed rounded-xl my-4">
                  <label
                    :for="`modal${groupIndex}`"
                    class="btn btn-block w-full bg-inherit"
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
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </label>
                  <input
                    :id="`modal${groupIndex}`"
                    type="checkbox"
                    class="modal-toggle"
                  />
                  <div class="modal">
                    <div class="modal-box relative">
                      <label
                        :for="`modal${groupIndex}`"
                        class="btn btn-md btn-circle absolute right-2 top-2"
                        >✕</label
                      >
                      <h3 class="h-3 text-center">ユーザー追加</h3>
                      <div class="form-control w-full max-w-xs">
                        <div>
                          <label class="label">
                            <span class="label-text">Group</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Type here"
                            class="input input-bordered w-full"
                            :value="group.groupName"
                            readonly
                          />
                        </div>
                        <div>
                          <label class="label">
                            <span class="label-text">ID</span>
                          </label>
                          <input
                            v-model="enteredID"
                            type="text"
                            placeholder="Type here"
                            class="input input-md input-bordered w-full"
                          />
                        </div>
                        <input
                          type="submit"
                          value="Add"
                          class="btn btn-md w-full mt-2"
                          @click="addUserIDClick(groupIndex, enteredID)"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <button
          class="btn btn-square btn-sm"
          @click="deleteGroupClick(groupIndex)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  const {
    groups,
    addGroup,
    deleteGroup,
    updateGroupName,
    addUserID,
    deleteUserID,
  } = useGroups();
  const enteredID = ref('');
  const enteredGroupName = ref('');

  const addGroupClick = () => {
    addGroup();
    localStorage.setItem('groups', JSON.stringify(groups.value));
  };
  const deleteGroupClick = (groupIndex: number) => {
    deleteGroup(groupIndex);
    localStorage.setItem('groups', JSON.stringify(groups.value));
  };
  const updateGroupNameClick = (groupIndex: number, newGroupName: string) => {
    updateGroupName(groupIndex, newGroupName);
    localStorage.setItem('groups', JSON.stringify(groups.value));
    (document.getElementById(
      `modal${groupIndex}UpdateName`
    ) as HTMLInputElement)!.checked = false;
  };
  const addUserIDClick = (groupIndex: number, enteredID: string) => {
    addUserID(groupIndex, enteredID);
    localStorage.setItem('groups', JSON.stringify(groups.value));
    enteredID = '';
    (document.getElementById(
      `modal${groupIndex}`
    ) as HTMLInputElement)!.checked = false;
  };
  const deleteUserIDClick = (groupIndex: number, userIndex: number) => {
    deleteUserID(groupIndex, userIndex);
    localStorage.setItem('groups', JSON.stringify(groups.value));
  };
</script>
