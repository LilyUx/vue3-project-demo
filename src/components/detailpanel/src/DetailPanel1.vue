<script setup lang="ts">
import { computed, CSSProperties, PropType, ref } from "vue";
import { Direction, DetailPanel } from "./types";
import RenderComp from "./RenderComp";

const props = defineProps({
  data: {
    type: Array as PropType<DetailPanel[]>,
    required: true,
  },
  title: {
    type: String,
    default: "详情",
  },
  column: {
    type: Number,
    default: 3,
  },
  direction: {
    type: String as PropType<Direction>,
    default: "vertical",
  },
  labelWidth: {
    type: String || Number,
    default: 100,
  },
});

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
    width: props.labelWidth,
  };
});

let showPwd = ref<boolean>(false);

const handleShowPwd = () => {
  showPwd.value = !showPwd.value;
};
</script>

<template>
  <div class="detail-panel">
    <div class="detail-panel-title">
      {{ title }}
    </div>
    <div class="detail-panel-content">
      <div
        v-for="(detail, index) in data"
        :key="index"
        :class="[
          'detail-panel-item',
          props.direction === 'horizontal' ? 'horizontal' : 'vertical',
        ]"
        :style="detailPanelItemStyle"
      >
        <div class="label" :style="labelWidthStyle">
          <slot v-if="detail.labelSlotName" :name="detail.labelSlotName" />
          <render-comp
            v-else-if="detail.renderLabel"
            :render="detail.renderLabel"
            :item="detail"
          />
          <template v-else>
            <el-icon v-if="detail.labelIcon" class="detail-panel-icon">
              <component :is="detail.labelIcon" />
            </el-icon>
            {{ detail.label }}
          </template>
        </div>
        <div
          class="content"
          :style="{ marginLeft: detail.labelIcon ? '38px' : '12px' }"
        >
          <slot v-if="detail.contentSlotName" :name="detail.contentSlotName" />
          <render-comp
            v-else-if="detail.renderContent"
            :render="detail.renderContent"
            :item="detail"
          />
          <template
            v-else-if="detail.type === 'password' || detail.type === 'pwd'"
          >
            <template v-if="showPwd">
              {{ detail.content }}
            </template>
            <template v-else> ******** </template>
            <el-icon class="detail-panel-pwd-icon" @click="handleShowPwd">
              <View v-if="showPwd" />
              <Hide v-else />
            </el-icon>
          </template>
          <template v-else-if="detail.type === 'link'">
            <a
              v-if="detail.hrefLink"
              class="content-link"
              target="_blank"
              :href="detail.hrefLink"
            >
              {{ detail.content }}
            </a>
            <a v-else class="content-link">{{ detail.content }}</a>
          </template>
          <template v-else-if="detail.type === 'status'">
            <span class="content-status">
              <i
                class="content-status-dot"
                :style="{
                  backgroundColor: detail.statusColor ? detail.statusColor : '',
                }"
              />
              {{ detail.content || "-" }}
            </span>
          </template>
          <template v-else-if="detail.type === 'tag'">
            <el-tag :type="detail.tagType || 'success'">
              {{ detail.content }}
            </el-tag>
          </template>
          <template v-else-if="detail.type === 'progress'">
            <el-progress
              :percentage="
                typeof detail.content === 'number'
                  ? detail.content
                  : parseFloat(detail.content || '0')
              "
            />
          </template>
          <template v-else>
            <el-tooltip
              :content="detail.content?.toString() || ''"
              placement="bottom"
              effect="dark"
            >
              {{ detail.content }}
            </el-tooltip>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

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
