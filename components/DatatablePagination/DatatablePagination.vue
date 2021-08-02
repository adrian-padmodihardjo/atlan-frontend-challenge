<template>
  <nav
    :class="{
      'dt-pagination': true,
      'dt-pagination--disabled': isDisabled,
    }"
  >
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
        <IconSkipPrevious
          class="dt-pagination__btn-skip-prev"
          @click="onGoToFirstPage"
        />
        <IconChevronLeft
          class="dt-pagination__btn-prev"
          @click="onGoToPreviousPage"
        />
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
        <IconChevronRight
          class="dt-pagination__btn-next"
          @click="onGoToNextPage"
        />
        <IconSkipNext
          class="dt-pagination__btn-skip-next"
          @click="onGoToLastPage"
        />
      </div>
    </div>
  </nav>
</template>

<script>
import IconSkipPrevious from '@/assets/icon/bx-skip-previous.svg?svg-to-vue'
import IconChevronLeft from '@/assets/icon/bx-chevron-left.svg?svg-to-vue'
import IconChevronRight from '@/assets/icon/bx-chevron-right.svg?svg-to-vue'
import IconSkipNext from '@/assets/icon/bx-skip-next.svg?svg-to-vue'

export default {
  components: {
    IconSkipPrevious,
    IconChevronLeft,
    IconChevronRight,
    IconSkipNext,
  },
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
    isDisabled () {
      return this.itemsCount === 0
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
    onGoToFirstPage () {
      this.mPage = 1
      this.emitPageChanged()
    },
    onGoToPreviousPage () {
      this.mPage -= 1
      this.emitPageChanged()
    },
    onGoToNextPage () {
      this.mPage += 1
      this.emitPageChanged()
    },
    onGoToLastPage () {
      this.mPage = this.totalPages
      this.emitPageChanged()
    },
    onPageChanged (e) {
      const val = +e.target.value
      this.mPage = val
      this.emitPageChanged()
    },
    onPerPageChanged (e) {
      const val = +e.target.value
      this.mPerPage = val
      this.emitPerPageChanged()
    },
    emitPageChanged () {
      this.$emit('change:page', this.mPage)
    },
    emitPerPageChanged () {
      this.$emit('change:per-page', this.mPerPage)
    },
  },
}
</script>

<style lang="scss" scoped>
@use "./DatatablePagination.scss";
</style>
