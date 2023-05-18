<script lang="tsx">
import {
  computed,
  CSSProperties,
  defineComponent,
  PropType,
  unref,
  h,
  resolveComponent,
  useSlots,
  ref,
  compile,
} from "vue";
import { Direction, DetailPanel } from "./types";

export default defineComponent({
  props: {
    data: {
      type: Array as PropType<DetailPanel[]>,
      required: true,
    },
    title: {
      type: String,
    },
    column: {
      type: Number,
      default: 3,
    },
    direction: {
      type: String as PropType<Direction>,
      default: "horizontal",
    },
    labelWidth: {
      type: Number,
      default: 100,
    },
  },
  setup(props, { slots }) {
    let showPwd = ref<boolean>(false);

    const detailPanelItemStyle = computed((): CSSProperties => {
      return {
        width: 100 / props.column + "%",
      };
    });

    const labelWidthStyle = computed((): CSSProperties => {
      if (typeof props.labelWidth === "number")
        return {
          width: `${props.labelWidth}px`,
        };
      return {
        width: `${parseInt(props.labelWidth)}px`,
      };
    });

    const handleShowPwd = () => {
      showPwd.value = !showPwd.value;
    };

    function renderLabel(detail: any) {
      const { labelSlotName, renderLabel, labelIcon, label } = detail;
      if (labelSlotName) {
        const shouldRenderLabelSlot = !!useSlots()[labelSlotName];
        return shouldRenderLabelSlot ? (
          <div class="detail-label">{slots[labelSlotName]({ ...detail })}</div>
        ) : null;
      } else if (renderLabel) {
        return h(renderLabel, detail);
      } else if (detail.labelIcon) {
        console.log(labelIcon);
        return (
          <>
            <el-icon class="detail-panel-icon">
              {h(resolveComponent(labelIcon))}
            </el-icon>
            {label ? (
              <el-tooltip content={label} placement="bottom" effect="dark">
                {label}
              </el-tooltip>
            ) : (
              "-"
            )}
          </>
        );
      } else {
        return (
          <>
            {label ? (
              <el-tooltip content={label} placement="bottom" effect="dark">
                {label}
              </el-tooltip>
            ) : (
              "-"
            )}
          </>
        );
      }
    }

    function renderContent(detail: any) {
      const {
        contentSlotName,
        renderContent,
        type,
        content,
        statusColor,
        hrefLink,
      } = detail;
      if (contentSlotName) {
        const shouldRenderContentSlot = !!useSlots()[contentSlotName];
        return shouldRenderContentSlot ? (
          <div class="detail-content">
            {slots[contentSlotName]({ ...detail })}
          </div>
        ) : null;
      } else if (renderContent) {
        return h(renderContent, detail);
      }

      if (content) {
        if (type === "password" || type === "pwd") {
          const length = (content && content.length) || 6;
          return (
            <div class="detail-panel-pwd">
              {showPwd.value ? content : "*".repeat(length)}
              <el-icon class="detail-panel-pwd-icon" onClick={handleShowPwd}>
                {showPwd.value ? <View /> : <Hide />}
              </el-icon>
            </div>
          );
        } else if (type === "link") {
          return hrefLink ? (
            <a class="content-link" target="_blank" href={hrefLink}>
              {content}
            </a>
          ) : (
            <a class="content-link">{content}</a>
          );
        } else if (type === "status") {
          return (
            <span class="content-status">
              <i
                class="content-status-dot"
                style={{ backgroundColor: statusColor ? statusColor : "" }}
              ></i>
              {content || "-"}
            </span>
          );
        } else if (type === "tag") {
          return <el-tag type={detail.tagType || "success"}>{content}</el-tag>;
        } else if (type === "progress") {
          return (
            <el-progress
              percentage={
                typeof content === "number" ? content : parseFloat(content)
              }
            />
          );
        } else {
          return (
            <el-tooltip content={content} placement="bottom" effect="dark">
              {content}
            </el-tooltip>
          );
        }
      } else {
        return "-";
      }
    }

    const slotTitle = !!useSlots().title;
    return () => (
      <div class="detail-panel">
        {props.title ? (
          <div class="detail-panel-title">{props.title}</div>
        ) : slotTitle ? (
          slots["title"]()
        ) : null}
        <div class="detail-panel-content">
          {props.data.map((detail: any, index: any) => {
            return (
              <div
                class={
                  props.direction === "horizontal"
                    ? "detail-panel-item horizontal"
                    : "detail-panel-item vertical"
                }
                key={index}
                style={unref(detailPanelItemStyle)}
              >
                <div class="label" style={unref(labelWidthStyle)}>
                  {renderLabel(detail)}
                </div>
                <div
                  class="content"
                  style={unref({ marginLeft: detail.labelIcon ? "23px" : "" })}
                >
                  {renderContent(detail)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
});
</script>

<style lang="less" scoped>
.detail-panel {
  width: auto;
  color: #141933;

  .detail-panel-title {
    font-size: 16px;
    height: 56px;
    line-height: 56px;
    font-weight: 600;
  }

  .detail-panel-content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .detail-panel-item {
      line-height: 24px;
      display: flex;
      padding: 6px 0;
      font-size: 14px;
      &.vertical {
        flex-direction: column;
        .content {
          flex: 1;
          padding: 10px 0 0 0;

          .detail-panel-pwd {
            justify-content: space-between;
            .detail-panel-pwd-icon {
              margin-right: 12px;
            }
          }
        }
      }

      .label {
        // padding: 0 12px;
        display: block;
        .detail-panel-icon {
          font-size: 16px;
          margin-right: 6px;
          vertical-align: middle;
        }
      }
      .content {
        flex: 1;
        // padding: 0 12px;
        .el-progress {
          margin-top: 6px;
        }
        .content-link {
          color: #0070e0;
          text-decoration: none;
        }

        .content-status {
          .content-status-dot {
            background-color: #0070e0;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            display: inline-block;
            margin-right: 4px;
          }
        }

        .detail-panel-pwd {
          display: flex;
          // justify-content: space-between;s
          align-items: center;
          .detail-panel-pwd-icon {
            margin-left: 8px;
          }
        }
      }
    }
  }
}
</style>
