<template>
  <div id="app">
    <div id="toolbar-container"></div>
    <div id="editor-container"></div>
  </div>
</template>

<script>
import {
  createEditor,
  createToolbar,
  IEditorConfig,
  IDomEditor,
} from "@wangeditor/editor";

export default {
  name: "App",
  mounted() {
    const editorConfig = {};
    editorConfig.placeholder = "请输入内容";
    editorConfig.onChange = (editor) => {
      // 当编辑器选区、内容变化时，即触发
      console.log("content", editor.children);
      console.log("html", editor.getHtml());
    };

    // 创建编辑器
    const editor = createEditor({
      selector: "#editor-container",
      config: editorConfig,
      mode: "default", // 或 'simple' 参考下文
    });
    // 创建工具栏
    const toolbar = createToolbar({
      editor,
      selector: "#toolbar-container",
      mode: "default", // 或 'simple' 参考下文
    });
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,
body {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 80%;
}
</style>
