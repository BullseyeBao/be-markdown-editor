<style lang='less' scoped>
</style>

<template>
	<div class="container" ref="container" :class='isLightBg ? "" : "dark"'>
		<div class="headbar">
			<div class="left-btn-list">
				<span class="btn-group">
					<!-- 各级标题 -->
					<a class="md-btn md-h1" title="标题（Ctrl+1）" @click='addTitle(1)'>H1</a>
					<a class="md-btn md-h2" title="标题（Ctrl+2）" @click='addTitle(2)'>H2</a>
					<a class="md-btn md-h3" title="标题（Ctrl+3）" @click='addTitle(3)'>H3</a>
					<a class="md-btn md-h4" title="标题（Ctrl+4）" @click='addTitle(4)'>H4</a>
					<a class="md-btn md-h5" title="标题（Ctrl+5）" @click='addTitle(5)'>H5</a>
					<a class="md-btn md-h6" title="标题（Ctrl+6）" @click='addTitle(6)'>H6</a>
				</span>
				<span class="btn-group">
					<!-- 加粗 -->
					<a class="md-btn md-bold" title="加粗（Ctrl+B）" @click='addBold'><i class="fa fa-bold" aria-hidden="true"></i></a>
					<!-- 斜体 -->
					<a class="md-btn md-italic" title="斜体（Ctrl+I）" @click='addItalic'><i class="fa fa-italic" aria-hidden="true"></i></a>
					<!-- 删除线 -->
					<a class="md-btn md-del" title="删除线（Ctrl+D）" @click='addDelete'><i class="fa fa-strikethrough" aria-hidden="true"></i></a>
				</span>
				<span class="btn-group">
					<!-- 分割线 -->
					<a class="md-btn md-line" title="分割线（Ctrl+R）" @click='addLine'>一</a>
					<!-- 引用 -->
					<a class="md-btn md-quote" title="引用（Ctrl+Q）" @click='addQuote'><i class="fa fa-quote-left" aria-hidden="true"></i></a>
					<!-- 代码 -->
					<a class="md-btn md-code" title="代码（Ctrl+K）" @click='addCode'><i class="fa fa-code" aria-hidden="true"></i></a>
				</span>
				<span class="btn-group">
					<!-- 链接 -->
					<a class="md-btn md-link" title="链接（Ctrl+L）" @click='addLink'><i class="fa fa-link" aria-hidden="true"></i></a>
					<!-- 图片 -->
					<a class="md-btn md-img" title="图片（Ctrl+P）" @click='addImg'><i class="fa fa-picture-o" aria-hidden="true"></i></a>
				</span>
				<span class="btn-group">
					<!-- 有序列表 -->
					<a class="md-btn md-ol" title="有序列表（Ctrl+O）" @click='addOl'><i class="fa fa-list-ol" aria-hidden="true"></i></a>
					<!-- 无序列表 -->
					<a class="md-btn md-ul" title="无序列表（Ctrl+U）" @click='addUl'><i class="fa fa-list-ul" aria-hidden="true"></i></a>
					<!-- 表格 -->
					<a class="md-btn md-table" title="表格（Ctrl+T）" :class='tableAdderShown ? "focus" : ""' >
						<i class="fa fa-table" aria-hidden="true" @click.stop.prevent='switchTableAdder'></i>
						<!-- 添加表格输入框 -->
						<div class="table-adder" v-if="tableAdderShown" @keyup.enter='confirmAddTable'>
							<input type="text" :class='tableLineError ? "error" : ""' v-model='tableLineNum'> × <input type="text" :class='tableRowError ? "error" : ""' v-model='tableRowNum'><a class="btn-blue" @click.stop.prevent='confirmAddTable'>确定</a>
						</div>
					</a>
				</span>
			</div>
			<div class="right-btn-list">
				<span class="btn-group">
					<!-- 开灯-关灯 -->
					<a class="md-btn md-ul" title="开灯/关灯" @click='changeLight'>
						<i v-if="isLightBg" class="fa fa-moon-o" aria-hidden="true"></i>
						<i v-if="!isLightBg" class="fa fa-sun-o" aria-hidden="true"></i>
					</a>
					<!-- 打开/关闭预览 -->
					<a class="md-btn md-ul" title="打开/关闭预览" @click='changeView'>
						<i v-if="isEditView" class="fa fa-eye" aria-hidden="true"></i>
						<i v-if="!isEditView" class="fa fa-eye-slash" aria-hidden="true"></i>
					</a>
				</span>
			</div>
		</div>
		<div class="main-area">
			<div class="editor no-border"
				:class='isLightBg ? "" : "dark"'
				ref="newEditor"
				@click='closeTableAdder'
				@keydown.ctrl.49.stop.prevent='addTitle(1)'
				@keydown.ctrl.50.stop.prevent='addTitle(2)'
				@keydown.ctrl.51.stop.prevent='addTitle(3)'
				@keydown.ctrl.52.stop.prevent='addTitle(4)'
				@keydown.ctrl.53.stop.prevent='addTitle(5)'
				@keydown.ctrl.54.stop.prevent='addTitle(6)'

				@keydown.ctrl.66.stop.prevent='addBold'
				@keydown.ctrl.73.stop.prevent='addItalic'
				@keydown.ctrl.68.stop.prevent='addDelete'

				@keydown.ctrl.82.stop.prevent='addLine'
				@keydown.ctrl.81.stop.prevent='addQuote'
				@keydown.ctrl.75.stop.prevent='addCode'

				@keydown.ctrl.76.stop.prevent='addLink' 
				@keydown.ctrl.80.stop.prevent='addImg'

				@keydown.ctrl.79.stop.prevent='addOl'
				@keydown.ctrl.85.stop.prevent='addUl'
				@keydown.ctrl.84.stop.prevent='switchTableAdder'

				@keydown.13.stop.prevent='pressEnter'
				@keydown.ctrl.83.stop.prevent='saveText'
				@keydown.122.stop.prevent='changeFullScreen(true)'
				@keydown.27='changeFullScreen(false)'>
			</div>
			<div 
				class="preview md-text" 
				:class='isEditView ? "hidden" : ""' 
				@scroll='handlePreviewScroll'
				v-html='htmlText'
				ref="preview">
			</div>
		</div>
		<div class="bottom-bar">
			<div class="wordnum">{{wordNum}} 字</div>
		</div>
	</div>
</template>

<script>
// 引入通用样式
import '@/assets/style.css';
// 引入图标字体
import '@/assets/font-awesome.css';

// 解决方案：codeMirror + MarkEd + prism + highlightjs
// 代码段用prism来渲染
// 如果代码段没有制定编程语言，则先用highlight的自动检测功能确定语言
import markEd from 'marked';
import highlight from 'highlight.js';
import '@/assets/prism.css';
import Prism from '@/lib/prism';
import '@/assets/highlight.css';
import '@/assets/md.css';
import '@/assets/userSettings.css';

import 'codemirror/lib/codemirror.css';
import '@/assets/CodeMirror.css';
import CodeMirror from 'codemirror/lib/codemirror';
import 'codemirror/addon/edit/continuelist';
import 'codemirror/mode/css/css';
import 'codemirror/mode/markdown/markdown';

export default{

	name: 'markdown',

	mounted () {
		// 初始化markEd
		// 自定渲染规则
		let myRenderer = new markEd.Renderer();

		// 代码部分，需要在code标签添加class字段
		myRenderer.code = function (code, language) {
			const validLang = !!(language && highlight.getLanguage(language));
			// 用prism来渲染
			// 如果没有规定编程语言，则先用highlightjs自动确定语言
			if (!validLang) {
				language = highlight.highlightAuto(code).language;
				// 如果prism不支持，就默认markup
				language = Prism.languages[language] ? language : 'markup';
			}
			const highlighted = Prism.highlight(code, Prism.languages[language]);
			return `<pre><code class='hljs ${language}'>${highlighted}</code></pre>`;
		};

		// 图片下方加一行说明
		myRenderer.image = function (href, title, text) {
			var out = '<img src="' + href + '" alt="' + text + '"';
			if (title) {
				out += ' title="' + title + '"';
			}
			out += this.options.xhtml ? '/>' : '>';
			// 下方加说明
			out += '<span class="image-caption">' + text + '</span>';
			return out;
		};

		// 链接在新标签页中打开
		myRenderer.link = function (href, title, text) {
			if (this.options.sanitize) {
				try {
					let prot = decodeURIComponent(unescape(href))
						.replace(/[^\w:]/g, '')
						.toLowerCase();
					if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
						return '';
					}
				} catch (e) {
					return '';
				}
			}
			let out = '<a target="_blank" href="' + href + '"';
			if (title) {
				out += ' title="' + title + '"';
			}
			out += '>' + text + '</a>';
			return out;
		};

		markEd.setOptions({
			renderer: myRenderer,
			gfm: true,
			tables: true,
			breaks: true, // 回车换成br
			pedantic: false,
			sanitize: true,
			smartLists: true,
			smartypants: false
		});

		// 初始化codemirror
		const editorEl = this.$refs.newEditor;
		const self = this;
		this.codeMirror = CodeMirror(editorEl, {
			lineNumbers: true, // 是否显示行号
			mode: 'markdown', // 默认脚本编码
			lineWrapping: true, // 是否强制换行
			indentWithTabs: true, // 每一行开头是否继承上一行的tab数
			theme: 'overwatch',
			value: self.text,
			indentUnit: 4,
			tabSize: 4
		});
		// 懒更新
		this.codeMirror.on('change', this.handleChange);
		// 监听scroll
		this.codeMirror.on('scroll', this.handleEditorScroll);
	},

	methods: {
		/*
		 * 在当前光标位置插入内容
		 * 并将光标移动到'?'标记所在的位置
		 * 默认在下一行插入
		 * 如果需要，可以在该行插入
		 * @params:
		 *		val：string，必须，需要插入的文本；
		 *		isInline：boolean，可选，是否在当前行插入，若为否，则在下一行插入；默认为false
		 *		needInsert：boolean，可选，若为true，则在插入后将鼠标放在第一个?处；默认为true
		 */
		addAtCursor (val, isInline = false, needInsert = true) {
			// 加工文本
			const textNotEmpty = this.text !== '';
			const isNewLine = this.codeMirror.getCursor().ch === 0;
			if (textNotEmpty && !isInline && !isNewLine) {
				val = '\n' + val;
			}
			const questionMarkPos = val.indexOf('?');
			const hasQuestionMark = questionMarkPos !== -1;
			const hasSelection = !!this.codeMirror.getSelection();
			// 在当前位置插入文本
			// 如果有选中的部分，就替换掉
			if (needInsert && hasQuestionMark) {
				// 需要替换问号的情况
				// 将字符串从第一个问号处分为两段
				const firstStr = val.substring(0, questionMarkPos);
				const lastStr = val.substring(questionMarkPos + 1);
				// 插入第一段，然后获取焦点，再插入第二段
				if (hasSelection) {
					this.codeMirror.replaceSelection(firstStr);
				} else {
					this.codeMirror.replaceRange(firstStr, this.codeMirror.getCursor());
				}
				const replaceCursor = this.codeMirror.getCursor();
				this.codeMirror.replaceRange(lastStr, replaceCursor);
				this.codeMirror.setCursor(replaceCursor);
			} else {
				// 不需要替换的情况
				if (hasSelection) {
					this.codeMirror.replaceSelection(val);
				} else {
					this.codeMirror.replaceRange(val, this.codeMirror.getCursor());
				}
				this.codeMirror.setCursor(this.codeMirror.getCursor());
			}
			this.codeMirror.focus();
		},

		pressEnter () {},

		/*
		 * 添加标题
		 * @param:
		 *		index：number，H1-H6标题级别
		 */
		addTitle (index) {
			let titleMark = [...new Array(index).fill().map(() => '#'), ' ', '?'].join('');
			this.addAtCursor(titleMark);
		},

		/*
		 * 加粗
		 */
		addBold () {
			this.addAtCursor('**?**', true);
		},

		/*
		 * 加斜体
		 */
		addItalic () {
			this.addAtCursor('*?*', true);
		},

		/*
		 * 加删除线
		 */
		addDelete () {
			this.addAtCursor('~~?~~', true);
		},

		/*
		 * 加分割线
		 */
		addLine () {
			this.addAtCursor('---\n');
		},

		/*
		 * 加引用
		 */
		addQuote () {
			this.addAtCursor('> ');
		},

		/*
		 * 加代码
		 */
		addCode () {
			this.addAtCursor('```\n?\n```');
		},

		/*
		 * 加链接
		 */
		addLink () {
			this.addAtCursor('[](?)', false);
		},

		/*
		 * 根据url和文本加链接
		 */
		addReadyLink (title, link) {
			this.addAtCursor(`[${title}](${link})`, false);
		},

		/*
		 * 加图片
		 */
		addImg () {
			this.addAtCursor('![](?)');
		},

		/*
		 * 加已经有图片地址的图片
		 */
		addImgLink (str) {
			const imgStr = `![?](${str})`;
			this.addAtCursor(imgStr);
		},

		/*
		 * 根据url和文本加图片
		 */
		addReadyImg (title, link) {
			this.addAtCursor(`![${title}](${link})`, false);
		},

		/*
		 * 加列表
		 */
		addOl () {
			this.addAtCursor('1. ?\n2. ');
		},

		addUl () {
			this.addAtCursor('- ?\n- ');
		},

		/*
		 * 加表格
		 */
		addTable (lineNum, rowNum) {
			let tableStr = '?';
			let firstLineStr = '';
			let tableHeadStr = '';
			for (let j = 0; j < rowNum - 1; j++) {
				firstLineStr += ' |';
				tableHeadStr += '---|';
			}
			firstLineStr += ' ';
			tableHeadStr += '---';
			tableStr += firstLineStr + '\n' + tableHeadStr + '\n';

			for (let i = 1; i < lineNum; i++) {
				let lineStr = '';
				for (let j = 0; j < rowNum - 1; j++) {
					lineStr += ' |';
				}
				lineStr += ' ';
				tableStr += lineStr + '\n';
			}
			this.addAtCursor(tableStr);
		},

		addTemplate (tempStr) {
			this.addAtCursor(tempStr);
		},

		/*
		 * 切换背景
		 */
		changeLight () {
			this.isLightBg = !this.isLightBg;
		},

		/*
		 * 切换编辑视图/预览视图
		 */
		changeView () {
			this.isEditView = !this.isEditView;
		},

		/*
		 * Ctrl + S保存
		 */
		saveText () {
			this.$emit('saveText');
		},

		/*
		 * 在编辑过程中，自动保存在localstorage中，防止数据意外丢失
		 */
		autoSave () {
			this.$emit('autoSave');
		},

		/*
		 * 显示/隐藏表格选择框
		 */
		switchTableAdder () {
			this.tableAdderShown = !this.tableAdderShown;
		},

		closeTableAdder () {
			this.tableAdderShown = false;
		},

		/*
			 * 添加表格确认按键
			 */
		confirmAddTable () {
			// 检查参数是否正确
			this.tableLineError = !this.tableLineNum ||
									isNaN(this.tableLineNum) ||
									parseInt(this.tableLineNum) <= 1 ||
									parseInt(this.tableRowNum) > 30;
			this.tableRowError = !this.tableRowNum ||
									isNaN(this.tableLineNum) ||
									parseInt(this.tableRowNum) <= 0 ||
									parseInt(this.tableRowNum) > 30;
			if (this.tableLineError || this.tableRowError) {
				return false;
			}
			// 绘制表格
			this.addTable(parseInt(this.tableLineNum), parseInt(this.tableRowNum));
			// 关闭框
			this.closeTableAdder();
		},

		/*
		 * 编辑器内容改变触发的事件
		 * 懒更新
		 * 只有在一次性更新内容之后，才自动保存到localstorage中
		 */
		handleChange (codeMirror) {
			// 更新右面显示内容
			window.clearTimeout(this.renderTimeout);
			this.renderTimeout = window.setTimeout(() => {
				this.text = codeMirror.getValue();
			}, 300);

			// 2秒钟没操作，自动本地存储一次
			window.clearTimeout(this.autoSaveTimeout);
			this.autoSaveTimeout = window.setTimeout(this.autoSave, 2000);
		},

		/*
		 * 两块区域同步滚动处理
		 * 编辑器滚动
		 */
		handleEditorScroll (cm) {
			const lastScrolling = this.scrolling;
			this.scrolling = 0;
			if (lastScrolling === 2) {
				return false;
			}
			const info = cm.getScrollInfo();
			const percent = info.height - info.clientHeight === 0 ? 0 : info.top / (info.height - info.clientHeight);
			const preview = this.$refs.preview;
			this.scrolling = 1;
			preview.scrollTop = (preview.scrollHeight - preview.clientHeight) * percent;
		},

		/*
		 * 预览区滚动
		 */
		handlePreviewScroll (e) {
			const lastScrolling = this.scrolling;
			this.scrolling = 0;
			if (lastScrolling === 1) {
				return false;
			}
			const DOM = e.target;
			const percent = DOM.scrollHeight - DOM.clientHeight === 0 ? 0 : DOM.scrollTop / (DOM.scrollHeight - DOM.clientHeight);
			const info = this.codeMirror.getScrollInfo();
			const scrollTop = (info.height - info.clientHeight) * percent;
			this.scrolling = 2;
			this.codeMirror.scrollTo(0, scrollTop);
		}

	},

	watch: {
		tableAdderShown (val) {
			if (!val) {
				// 清空数据
				this.tableLineNum = 0;
				this.tableRowNum = 0;
				this.tableLineError = false;
				this.tableRowError = false;
			}
		},

		/*
		 * 更新text时，向上层通知
		 */
		text (val) {
			this.$emit('textupdate', val);
		},

		// 从localstorage里面提取以前数据
		defaultTextChange (val) {
			this.codeMirror.doc.setValue(this.defaultText);
		}
	},

	props: {
		defaultText: String,
		defaultTextChange: Number
	},

	computed: {

		fullWindow () {
			return this.rightContentFullWindow && this.mdEditorFullContent;
		},

		fullScreen () {
			return this.fullWindow && this.pageFullScreen;
		},

		wordNum () {
			return this.tokenText.length;
		},

		tokenText () {
			return this.tokens.map((item) => {
				return item.text;
			}).join(' ');
		},

		tokens () {
			return markEd.lexer(this.text);
		},

		htmlText () {
			return markEd.parser(this.tokens);
		}

	},

	data: function () {
		return {
			text: '',
			codeMirror: null,
			lastOption: null,
			lastModTime: null,
			renderTimeout: null,
			autoSaveTimeout: null,

			isLightBg: true,
			isEditView: false,

			tableAdderShown: false,

			tableLineNum: 0,
			tableRowNum: 0,

			tableLineError: false,
			tableRowError: false,

			scrolling: 0
		};
	}
};
</script>