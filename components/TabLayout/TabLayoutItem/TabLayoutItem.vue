<template>
  <li
    :class="{
      'tab-layout-item': true,
      'tab-layout-item--active': active
    }"
    v-on="$listeners"
  >
    <span class="tab-layout-item__label">
      {{ label }}
    </span>
    <i
      class="tab-layout-item__btn-del"
      @click.stop="$emit('delete')"
    >
      <IconDelete />
    </i>
  </li>
</template>

<script>
import IconDelete from '@/assets/icon/bx-plus.svg'
export default {
  components: {
    IconDelete,
  },
  props: {
    active: {
      type: Boolean,
    },
    label: {
      type: [String, Number],
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
@use "./TabLayoutItem.scss";
</style>
