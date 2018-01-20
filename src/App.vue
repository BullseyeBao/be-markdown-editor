<style>
#app {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	min-width: 1366px;
	overflow-x: auto;
	background-size: cover;
	transition: background-image 0.3s linear;
}
</style>

<template>
	<div id="app">
		<markdown-editor></markdown-editor>
	</div>
</template>

<script>
import markdownEditor from './MarkdownEditor.vue';

export default {
	components: {
		markdownEditor
	}
};
</script>
