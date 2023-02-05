<template>
	<div class="tabs tabs-boxed place-content-center" style="height: 6%">
		<a
			class="tab"
			:class="{'tab-active': selectedTab === '誰でも'}"
			@click="tabClick('誰でも')"
		>
			{{ '誰でも' }}
		</a>
		<a
			v-for="group in groups"
			class="tab"
			:class="{'tab-active': selectedTab === group.groupName}"
			@click="tabClick(group.groupName)"
		>
			{{ group.groupName }}
		</a>
	</div>
	<div style="height: 94%;" class="space-y-2">
		<Map></Map> 
		<TagList></TagList>
	</div>
</template>
<script setup lang="ts">
	const { groups, selectedGroup, selectGroup } = useGroups()
	const selectedTab = useSelectedTab()
	const { users, selectedUsers, getUsers, selectUsers } = useUsers();
	const { windowClose } = useMarkers();

	const tabClick = (tabName: string) => {
		selectedTab.value = tabName
		if(tabName === '誰でも'){
			selectUsers(null);
		}else{
			selectGroup(tabName);
			if(selectedGroup.value == null){
				selectUsers(null)
			}else{
				selectUsers(selectedGroup.value.userIDs as string[])
			}
		}
	}

	onMounted(async ()=>{
		console.log("onMounted")
		await getUsers()
		tabClick('誰でも')
		if(selectedUsers.value!=null){
			for(const userID of Object.keys(selectedUsers.value)){
				windowClose(userID)
			}
		}
	})
</script>
