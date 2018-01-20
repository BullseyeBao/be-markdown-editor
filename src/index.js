import EditorComponent from './MarkdownEditor.vue';

const MarkdownEditor = {
	install: function (Vue) {
		if (typeof window !== 'undefined' && window.Vue) {
			Vue = window.Vue;
		}
		Vue.component('MarkdownEditor', EditorComponent);
	}
};

export default MarkdownEditor;
