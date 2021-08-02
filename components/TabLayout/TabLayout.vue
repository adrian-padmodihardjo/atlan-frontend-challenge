<template>
  <div class="tab-layout">
    <div class="tab-layout__track">
      <ol class="tab-layout__ol">
        <TabLayoutItem
          v-for="(tab, tabIndex) in mList"
          :key="tabIndex"
          :active="tabIndex === active"
          :label="tab.label"
          @click="onTabItemClick(tab, tabIndex)"
          @delete="onTabItemDelete(tab, tabIndex)"
        />
      </ol>
    </div>
    <div class="tab-layout__tab-content-wrapper">
      <template v-for="(item, itemIndex) in mList">
        <div
          v-show="itemIndex === active"
          :key="itemIndex"
          class="tab-layout__tab-content"
        >
          <slot
            name="item"
            v-bind="{ item, itemIndex }"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { TabLayoutItem } from '@/components/TabLayout/TabLayoutItem'
export default {
  components: {
    TabLayoutItem,
  },
  model: {
    prop: 'active',
    event: 'change',
  },
  props: {
    active: {
      type: Number,
      default: -1,
    },
    list: {
      type: Array,
      default: () => [],
    },
  },
  data () {
    return {
      mActive: -1,
      mList: [],
    }
  },
  watch: {
    active: {
      immediate: true,
      handler (v) {
        this.mActive = v
      },
    },
    list: {
      immediate: true,
      deep: true,
      handler (v) {
        this.mList = Array.isArray(v) ? JSON.parse(JSON.stringify(v)) : []
      },
    },
  },
  methods: {
    onTabItemClick (tab, tabIndex) {
      this.mActive = tabIndex
      this.emitChange()
    },
    onTabItemDelete (tab, tabIndex) {
      if (tabIndex < this.mActive) {
        this.mActive -= 1
      } else if (tabIndex > this.mActive) {
        this.mActive = Math.min(this.mActive, tabIndex - 1)
      } else {
        this.mActive = Math.max(0, this.mActive - 1)
      }
      this.mList.splice(tabIndex, 1)
      this.emitChange()
      this.emitListChange()
    },
    emitChange () {
      this.$emit('change', this.mActive)
    },
    emitListChange () {
      this.$emit('update:list', this.mList)
    },
  },
}
</script>

<style lang="scss" scoped>
@use "./TabLayout.scss";
</style>
