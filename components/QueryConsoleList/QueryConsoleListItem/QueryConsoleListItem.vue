<template>
  <div
    :class="{
      'q-console-list-item': true,
      'q-console-list-item--active': active
    }"
    v-on="$listeners"
  >
    <span class="q-console-list-item__label">
      {{ item.label }}
    </span>
    <i
      class="q-console-list-item__btn-del"
      @click.stop="$emit('delete')"
    >
      <IconDelete />
    </i>
  </div>
</template>

<script>
import IconDelete from '@/assets/icon/bx-plus.svg'
export default {
  components: {
    IconDelete,
  },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    active: {
      type: Boolean,
    },
  },
}
</script>

<style lang="scss" scoped>
@use "./QueryConsoleListItem.scss";
</style>
