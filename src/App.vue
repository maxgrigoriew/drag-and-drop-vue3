<template>
	<div class="container">
		<div class="wrapper">
			<div class="wrapper__block sidebar">
				<button draggable="true" ref="button">button</button>
			</div>

			<div
				class="wrapper__block"
				@dragover.prevent
				@dragenter.prevent
				@drop="onDrop($event, refs(button))"
			></div>
			<div class="wrapper__block content">
				<div class="wrapper__block-item" v-for="item in 25" :key="item">
					<div
						v-for="category in categories"
						:key="category.id"
						@drop="onDrop($event, category.id)"
						@dragover.prevent
						@dragenter.prevent
					>
						<h4>{{ category.title }}</h4>
						<div
							v-for="item in items.filter((x) => x.categoryId === category.id)"
							:key="item"
							@dragstart="onDragStart($event, item)"
							draggable="true"
						>
							<h5>{{ item.title }}</h5>
						</div>
					</div>
				</div>
			</div>

			<div class="wrapper__block footer">13</div>
		</div>
	</div>
</template>
<script setup>
import { ref } from 'vue';

const items = ref([
	{
		id: 0,
		title: 'Audi',
		categoryId: 0,
	},
	{
		id: 1,
		title: 'BMW',
		categoryId: 0,
	},
	{
		id: 2,
		title: 'Cat',
		categoryId: 1,
	},
]);

const categories = ref([
	{
		id: 0,
		title: 'Cars',
	},
	{
		id: 1,
		title: 'Animals',
	},
]);

function onDragStart(e, item) {
	e.dataTransfer.dropEffect = 'move';
	e.dataTransfer.effectAllowed = 'move';
	e.dataTransfer.setData('itemId', item.id.toString());
}

function onDrop(e, categoryId) {
	const itemId = parseInt(e.dataTransfer.getData('itemId'));
	items.value = items.value.map((x) => {
		if (x.id == itemId) x.categoryId = categoryId;
		return x;
	});
}
</script>
