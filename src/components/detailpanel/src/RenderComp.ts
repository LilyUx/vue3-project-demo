import { PropType, h } from "vue";
import { DetailPanel } from "./types";
export default {
  name: "RenderComp",
  props: {
    render: Function,
    item: Object as PropType<DetailPanel>,
  },
  render: (props: any, context: any) => {
    return h(props.render, props.item);
  },
};
