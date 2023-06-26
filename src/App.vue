<template>
	<div class="container">
		<button @click="arrayBlock">add</button>
		<div class="wrapper">
			<div class="wrapper__block sidebar"></div>
			<div class="wrapper__block content">
				<div
					class="wrapper__block-item"
					v-for="blockIndex in 25"
					:key="blockIndex"
					@drop="onDrop($event, blockIndex)"
					@dragover.prevent
					@dragenter.prevent
				>
					<div
						class="wrapper__block-square"
						v-for="item in filterBlockById(items, blockIndex)"
						:key="item"
						@dragstart="onDragStart($event, item)"
						draggable="true"
					>
						<h5>{{ item.title }}</h5>
						<div class="wrapper__block-counter">
							{{ filterBlockById(items, blockIndex).length }}
						</div>
					</div>
				</div>
			</div>

			<div class="wrapper__block footer">13</div>
		</div>
	</div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
const block = ref(25);

const items = ref([
	{
		id: 0,
		title: 'Audi',
		blockId: 5,
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
		blockId: 5,
	},
]);

const filterBlockById = (arr, blockIndex) => {
	return arr.filter((item) => {
		return item.blockId === blockIndex;
	});
};

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
	setLocalSorage();
}

const setLocalSorage = () => {
	localStorage.setItem('items', JSON.stringify(items.value));
};

const getLocalSorage = () => {
	if (localStorage.getItem('items')) {
		items.value = JSON.parse(localStorage.getItem('items'));
	}
};

const arrayBlock = () => {
	for (let index = 1; index <= block.value; index++) {
		if (filterBlockById(items.value, index && index)) {
			items.value.push({
				id: Date.now(),
				title: 'New value',
				blockId: index,
			});
			break;
		}
	}

	setLocalSorage();
};

onMounted(() => {
	// getLocalSorage();
});
</script>
