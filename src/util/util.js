import Quill from "quill";
import GreedySnake from "./snake";
const ImageBlot = Quill.import("formats/image");
const BlockEmbed = Quill.import("blots/block/embed");

class Counter {
  constructor(quill, options) {
    const container = quill.addContainer("ql-counter");
    quill.on("text-change", () => {
      const text = quill.getText(); // 获取编辑器中的纯文本内容
      const char = text.replace(/\s/g, ""); // 使用正则表达式将空白字符去掉
      container.innerHTML = `当前字数：${char.length}`;
    });
  }
}

// 扩展Quill内置的image格式
class EmojiBlot extends ImageBlot {
  static blotName = "emoji"; // 定义自定义Blot的名字（必须全局唯一）
  static tagName = "img"; // 自定义内容的标签名 // 创建自定义内容的DOM节点
  static create(value) {
    const node = super.create(value);
    node.setAttribute("src", ImageBlot.sanitize(value.url));
    if (value.width !== undefined) {
      node.setAttribute("width", value.width);
    }
    if (value.height !== undefined) {
      node.setAttribute("height", value.height);
    }
    return node;
  }
  // 返回options数据
  static value(node) {
    return {
      url: node.getAttribute("src"),
      width: node.getAttribute("width"),
      height: node.getAttribute("height"),
    };
  }
}

class SnakeBlot extends BlockEmbed {
  static blotName = "snake";
  static tagName = "canvas";
  static create(value) {
    const node = super.create(value);
    const { id, width, height } = value;
    node.setAttribute("id", id || SnakeBlot.blotName);
    if (width !== undefined) {
      node.setAttribute("width", width);
    }
    if (height !== undefined) {
      node.setAttribute("height", height);
    }
    // 绘制贪吃蛇游戏的代码参考对半同学的文章：https://juejin.cn/post/6959789039566192654
    new GreedySnake(node).start();
    return node;
  }
}

export { Counter, EmojiBlot, SnakeBlot };
