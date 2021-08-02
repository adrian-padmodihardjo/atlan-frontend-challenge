<template>
  <div class="q-console-mList">
    <header class="q-console-list__header">
      <strong class="q-console-list__header__title">
        Query Console
      </strong>
      <i
        class="q-console-list__btn-add"
        @click="onAddNewQueryConsole"
      >
        <IconPlusSquare />
      </i>
    </header>
    <ul class="q-console-list__ul">
      <li
        v-for="(c, i) in mList"
        :key="c.id"
        class="q-console-list__li"
      >
        <QueryConsoleListItem
          :item="c"
          :active="i === mActive"
          @click="onClickQueryConsole(c, i)"
          @delete="onDeleteQueryConsole(c, i)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import IconPlusSquare from '@/assets/icon/bxs-plus-square.svg'
import { QueryConsoleListItem } from '@/components/QueryConsoleList/QueryConsoleListItem'
export default {
  components: {
    IconPlusSquare,
    QueryConsoleListItem,
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
    createNewConsole () {

    },
    onAddNewQueryConsole () {
      const i = this.mList.length
      this.mList.push({
        id: Date.now(),
        label: Date.now(),
      })
      this.mActive = i
      this.emitChange()
      this.emitListChange()
    },
    onClickQueryConsole (console, index) {
      this.mActive = index
      this.emitChange()
    },
    onDeleteQueryConsole (console, index) {
      if (index < this.mActive) {
        this.mActive -= 1
      } else if (index > this.mActive) {
        this.mActive = Math.min(this.mActive, index - 1)
      } else {
        this.mActive = Math.max(0, this.mActive - 1)
      }
      this.mList.splice(index, 1)
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
@use "./QueryConsoleList.scss";
</style>
