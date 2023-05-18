export type Direction = "vertical" | "horizontal";

type DetailPanelType =
  | "text"
  | "password"
  | "pwd"
  | "tag"
  | "status"
  | "link"
  | "progress";
type TagType = "success" | "info" | "warning" | "danger";

export type DetailPanel = {
  type?: DetailPanelType;
  label?: string;
  labelIcon?: any;
  labelSlotName?: string;
  renderLabel?: (item: DetailPanel) => any;
  content?: string | number;
  contentSlotName?: string;
  renderContent?: (item: DetailPanel) => any;
  // type === link
  hrefLink?: string;
  // type === status default === "#0070E0"
  statusColor?: string;
  // type === 'tag' default === "success"
  tagType?: TagType;
  // type === 'progress' content为数字或者带数字的字符串
};
