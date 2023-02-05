<template>
	<div class="h-3/6">
		<GMapMap
			:center="mapCenter"
			:zoom="15"
			:options="{
				zoomControl: false,
				mapTypeControl: true,
				scaleControl: true,
				streetViewControl: false,
				rotateControl: true,
				fullscreenControl: false,
				gestureHandling: 'greedy'
			}"
			style="width: 100%; height: 100%;"
		>
			<GMapMarker
				v-for="(user, userID) in selectedUsers"
				:key="userID"
				:position="user.position"
				:clickable="true"
				@click="windowSwitch(userID as string)"
				:icon="`/user${color[Number(user.urgency)]}.svg`"
			>
				<GMapInfoWindow
					:opened="windowOpened[userID]"
					:closeclick="true"
					@closeclick="windowClose(userID as string)"
				>
					<div class="grid grid-cols-6 gap-4">
						<div class="m-auto">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-10 h-10"
								:class="{'fill-red-500': user.urgency === '2', 'fill-yellow-500': user.urgency === '1', 'fill-green-500': user.urgency === '0'}"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
							</svg>
						</div>
						<div class="col-span-5">
							<div class="font-bold text-black">{{ user.name }}</div>
							<div class="text-sm opacity-50 text-black">{{ userID }}</div>
							<div 
								class="whitespace-pre-line break-words border rounded-lg border-current text-xl text-center p-2 m-2 text-black"
								v-show="user.message != ''"
							>
								{{ user.message }}
							</div>
							<div class="text-xs text-black opacity-50 text-right">最終更新時刻： {{ user.lastUpdateTime }}</div>
						</div>
					</div>
				</GMapInfoWindow>
			</GMapMarker>
		</GMapMap>
	</div>
</template>
<script setup lang="ts">
	const { selectedUsers } = useUsers();
	const { windowOpened, windowSwitch, windowClose } = useMarkers();
	const { mapCenter } = useMapCenter();
	const color: string[] = ['Green', 'Yellow', 'Red'];
</script>