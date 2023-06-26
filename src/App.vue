<template>
	<div class="container">
		<div class="wrapper">
			<div class="wrapper__block sidebar"></div>
			<div class="wrapper__block content">
				<div
					class="wrapper__block-item"
					v-for="blockItem in 25"
					:key="blockItem"
					@drop="onDrop($event, blockItem)"
					@dragover.prevent
					@dragenter.prevent
				>
					<div
						class="wrapper__block-square"
						v-for="item in items.filter((x) => x.blockId === blockItem)"
						:key="item"
						@dragstart="onDragStart($event, item)"
						draggable="true"
					>
						<h5>{{ item.title }}</h5>
					</div>
				</div>
			</div>

			<div class="wrapper__block footer">13</div>
		</div>
	</div>
</template>
<script setup>
import { onMounted, ref } from 'vue';

const button = ref(null);
const blockOne = ref(null);
const blockTwo = ref(null);
const items = ref([
	{
		id: 0,
		title: 'Audi',
		blockId: 1,
	},
	{
		id: 1,
		title: 'BMW',
		blockId: 2,
	},
	{
		id: 2,
		title: 'Dog',
		blockId: 3,
	},
	{
		id: 3,
		title: 'Cat',
		blockId: 1,
	},
]);

const categories = ref([]);

function onDragStart(e, item) {
	e.dataTransfer.dropEffect = 'move';
	e.dataTransfer.effectAllowed = 'move';
	e.dataTransfer.setData('itemId', item.id.toString());
}

function onDrop(e, blockId) {
	const itemId = parseInt(e.dataTransfer.getData('itemId'));
	items.value = items.value.map((x) => {
		if (x.id == itemId) x.blockId = blockId;
		return x;
	});
}

onMounted(() => console.log(button.value, blockOne.value, blockTwo.value));
</script>
