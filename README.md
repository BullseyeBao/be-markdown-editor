# be-markdown-editor

支持实时预览、代码高亮、快捷键输入的Vue markdown编辑器组件
@author bullseye

## 安装

使用npm安装：

```
	npm i --save be-markdown-editor
```

引入到Vue项目中：

``` javascript
import MarkdownEditor from 'be-markdown-editor';

Vue.use(MarkdownEditor);
```

``` html
// 模板
<template>
	<markdown-editor>
</template>
```

## 使用

### 定制样式

本组件支持自定义样式，支持的样式列表如下（以下示例为less语法所写）：
``` less
// 整个编辑器外框
.container {
	position: absolute;
	top: 0;
	bottom: 1px;
	width: 100%;
	background-size: cover;
	background-image: url(https://p3.ssl.qhimg.com/t0121c4f255f95c5e79.jpg);

	// 头部工具栏
	.headbar {
		background-color: rgba(0, 0, 0, 0.1);
		.left-btn-list, .right-btn-list {
			// 按钮分组分隔线
			.btn-group:after {
				border-right: 1px solid rgba(255, 255, 255, 0.4);
			}
			// 按钮
			a.md-btn {
				color: rgba(255, 255, 255, 0.8);
				&:hover, &.focus{
					background-color: rgba(255, 255, 255, 0.3);
					color: rgba(0, 0, 0, 0.4);
				}
			}
		}
	}

	// 主体部分
	.main-area {
		background-color: none;
		// 左半边编辑器部分
		.editor {
			background-color: rgba(255, 255, 255, 0.1);
			.CodeMirror {
				color: #fff;
			}
			
			// 左侧行数显示栏
			.CodeMirror-gutters {
				// border: none;
				// background-color: rgba(255, 255, 255, 0);
				
				border-right-color: rgba(255, 255, 255, 0.15);
				background: transparent;
				
				.CodeMirror-guttermarker {
					color: black;
				}
				.CodeMirror-guttermarker-subtle {
					color: #999;
				}
			}
			
			// 左侧行数
			.CodeMirror-linenumber{
				color: rgba(255, 255, 255, 0.6);
			}
			
			// 光标
			// 编辑器中闪烁的光标是用DOM模拟的,所以可以自定样式
			.CodeMirror-cursor{
				border-left-color: #fff;
			}
			
			// 选中范围
			.CodeMirror-focused .CodeMirror-selected { 
				background: rgba(0, 0, 0, 0.3); 
			}
		}
		
		// 预览部分
		.preview {
			background-color: none;
			color: #fff;
			// 自定义markdown样式
			.md-text{
				font-size: 16px;
				line-height: 28px;
			
				h1{}

				blockquote {
					p {}
				}
			
				p {}
			
				a, a:link, a:hover, a:visited {}
				
				a:hover {}
				
				hr {}
			
				img {}
			
				.image-caption {}
				
				pre {
					code {}
					
					code.hljs {}
				}
				
				ol, ul {}
			}
		}
	}

	// 底部部分
	.bottom-bar {
		background-color: rgba(0, 0, 0, 0.1);
		.wordnum {
			color: #fff;
		}
	}
}

// 自定义关灯效果
.container.dark {
	background-image: none;
	background-color: rgb(38, 38, 38);
	.main-area {
		color: rgb(180, 180, 180);
		.editor {
			.CodeMirror {
				color: rgb(210, 210, 210);
			}
		}
	}
}
```

### 事件监听

组件允许注册autoSave、saveText、textUpdate事件，你可以选择是否监听这些事件：
``` html
<markdown-editor
	@autoSave="autoSave"
	@saveText="saveText"
	@textUpdate="textUpdate">
</markdown-editor>
```

#### textUpdate(text)

编辑文档内容变化时触发，里面会传入一个text参数，表示当前的内容；

#### autoSave()

如果你有实时保存的需求，可以监听这个事件。这个事件在用户输入间隙触发，你可以在里面加入本地保存等逻辑。

这个事件不带任何参数，只作为一个信号传递。如果需要用到文章内容，需要从上一个事件textUpdate传递。

#### saveText

这个事件会在用户按下 Ctrl + S 时触发，你可以在其中实现上传保存等逻辑。

# 后续计划

有什么需求请尽管提。。。

