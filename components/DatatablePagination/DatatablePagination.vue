<template>
  <nav class="dt-pagination">
    <div class="dt-pagination__per-page-selector">
      <div class="dt-pagination__select">
        <span class="dt-pagination__select__label">
          Rows per page
        </span>
        <select
          :value="mPerPage"
          @change="onPerPageChanged"
        >
          <option
            disabled
            selected
          >
            Items per page
          </option>
          <option
            v-for="i in perPageOptions"
            :key="i"
          >
            {{ i }}
          </option>
        </select>
      </div>
    </div>
    <div class="dt-pagination__page-selector">
      <p
        v-if="totalPages > 0"
        class="dt-pagination__page-selector__info"
      >
        Showing {{ startIndex }} - {{ endIndex }} of {{ totalPages }} rows
      </p>
      <div class="dt-pagination__select">
        <span class="dt-pagination__select__label">
          Page
        </span>
        <select
          :value="page"
          @change="onPageChanged"
        >
          <option
            v-for="i in totalPages"
            :key="i"
          >
            {{ i }}
          </option>
        </select>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  model: {
    prop: 'page',
    event: 'change',
  },
  props: {
    page: {
      type: Number,
      default: 0,
    },
    perPage: {
      type: Number,
      default: 10,
    },
    itemsCount: {
      type: Number,
      default: 0,
    },
    totalPages: {
      type: Number,
      default: 0,
    },
  },
  data () {
    return {
      mPage: 0,
      mPerPage: 0,
      perPageOptions: [
        5,
        10,
        20,
        50,
      ],
    }
  },
  computed: {
    startIndex () {
      if (this.totalPages <= 0) {
        return 0
      }
      return ((this.mPage - 1) * this.mPerPage) + 1
    },
    endIndex () {
      return this.itemsCount + this.startIndex - 1
    },
  },
  created () {
    this.watchProps()
  },
  methods: {
    watchProps () {
      this.$watch(
        function () {
          return [this.page, this.perPage]
        },
        function ([page, perPage] = []) {
          this.mPage = page || 0
          this.mPerPage = perPage || 0
        },
        { immediate: true, deep: true },
      )
    },
    onPageChanged (e) {
      const val = +e.target.value
      this.mPage = val
      this.$emit('change:page', val)
    },
    onPerPageChanged (e) {
      const val = +e.target.value
      this.mPerPage = val
      this.$emit('change:per-page', val)
    },
  },
}
</script>

<style lang="scss" scoped>
@use "./DatatablePagination.scss";
</style>
