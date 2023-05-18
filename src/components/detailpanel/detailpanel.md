---
title: DetailPanel 详情组件
lang: zh-CN
---

# DetailPanel 详情组件

列表形式展示多个字段。

## 基础用法

![1683364527943](C:\Users\xuling_lc\AppData\Roaming\Typora\typora-user-images\1683364527943.png)

## 垂直列表

![1683365101223](C:\Users\xuling_lc\AppData\Roaming\Typora\typora-user-images\1683365101223.png)

## DetailPanel 属性

| 属性名     | 说明                   | 类型   | 可选值                | 默认值     |
| ---------- | ---------------------- | ------ | --------------------- | ---------- |
| data       | 显示的数据             | array  | —                     | —          |
| column     | 一行详情展示的数量     | number | —                     | 3          |
| direction  | 排列的方向             | string | vertical / horizontal | horizontal |
| title      | 标题文本，显示在左上方 | string | —                     | —          |
| labelWidth | label的长度            | number | —                     |            |

## DetailPanel 插槽

| 插槽名 | 说明                     | 子标签 |
| ------ | ------------------------ | ------ |
| title  | 自定义标题，显示在左上方 | —      |

## DetailPanel-column 属性

| 属性名            | 说明                                                         | 类型                                                   | 可选值                                                 | 默认值  |
| ----------------- | ------------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------- |
| type              | 内容展示的类型                                               | text / password / pwd / tag / status / link / progress | text / password / pwd / tag / status / link / progress | text    |
| label             | 标签文本                                                     | string                                                 | —                                                      | —       |
| label-icon        | 标签文本的图标                                               | string / number                                        | —                                                      | —       |
| label-slot-name   | label支持插槽                                                | string                                                 | —                                                      | —       |
| render-label      | label支持render                                              | () => any                                              | —                                                      | —       |
| content           | 标签对应展示的内容                                           | string / number                                        | —                                                      | —       |
| href-link         | type为 `link` 时，可传入地址跳转，地址跳转的方式为打开新标签栏 | string                                                 | —                                                      | —       |
| status-color      | type为 `status` 时，可传入色值定义原点的颜色                 | string                                                 | —                                                      | —       |
| tag-type          | type为 tag 时，可传入 `tag-type`  定义标签的类型             | success / info / warning / danger                      | success / info / warning / danger                      | success |
| content-slot-name | content支持插槽                                              | string                                                 | —                                                      | —       |
| render-content    | content支持render                                            | () => any                                              | —                                                      | —       |

## DetailPanel-column 插槽

| 插槽名            | 说明                    |
| ----------------- | ----------------------- |
| label-slot-name   | 自定义 column 的label   |
| content-slot-name | 自定义 column 的content |
