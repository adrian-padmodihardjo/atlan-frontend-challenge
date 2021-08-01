<template>
  <div class="query-result-table">
    <DatatablePagination
      :page="mPage"
      :per-page="mLimit"
      :total-pages="totalPages"
      :items-count="currentPageItemsCount"
      @change:page="onPaginationPageChanged"
      @change:per-page="onPaginationPerPageChanged"
    />
    <Datatable
      :headers="tableHeaders"
      :rows="tableData"
      :start-index="currentPageStartIndex"
      v-on="$listeners"
    />
  </div>
</template>

<script>
import { mockApiClient } from '@/api-client/main.mock'
import { Datatable } from '@/components/Datatable'
import { DatatablePagination } from '@/components/DatatablePagination'
import { getTableData, getTableHeaders } from '@/api/table'

export default {
  components: {
    Datatable,
    DatatablePagination,
  },
  inheritAttrs: false,
  props: {
    /**
     * refer to available CSV files at '@/mocks/*.csv'
     */
    tableName: {
      type: String,
      default: null,
    },
    page: {
      type: Number,
      default: 1,
    },
    limit: {
      type: Number,
      default: 10,
    },
    order: {
      type: Array,
      default: () => [],
    },
  },
  data () {
    return {
      tableHeaders: null,
      tableData: null,
      tableMetadata: null,
      mPage: 1,
      mLimit: 10,
      mOrder: [],
    }
  },
  computed: {
    currentPageStartIndex () {
      return ((this.mPage - 1) * this.mLimit) + 1
    },
    currentPageItemsCount () {
      return this.tableData?.length
    },
    totalPages () {
      const totalItems = this.tableMetadata?.totalItems || 0
      return Math.ceil(totalItems / this.mLimit)
    },
  },
  watch: {
    tableName: {
      immediate: true,
      handler: 'fetchTableHeaders',
    },
  },
  created () {
    this.watchQueryProps()
  },
  methods: {
    watchQueryProps () {
      this.$watch(
        function () {
          return [this.page, this.limit, this.order]
        },
        function (
          [newPage, newLimit, newOrder] = [],
          [oldPage, oldLimit, oldOrder] = [],
        ) {
          const doRefresh = newOrder !== oldOrder
            || newLimit !== oldLimit
          this.mPage = doRefresh ? 1 : newPage
          this.mLimit = newLimit
          this.mOrder = newOrder
          this.fetchTableData(this.tableName)
        },
        { immediate: true, deep: false },
      )
    },
    async fetchTableHeaders (tableName) {
      if (!tableName) {
        return
      }
      const { data } = await getTableHeaders.call(mockApiClient, tableName)
      this.tableHeaders = data
    },
    async fetchTableData (tableName) {
      if (!tableName) {
        return
      }
      const { data: { data, meta } } = await getTableData.call(mockApiClient, tableName, {
        page: this.mPage,
        limit: this.mLimit,
        order: this.mOrder,
      })
      this.tableData = data
      this.tableMetadata = meta
    },
    onPaginationPageChanged (page) {
      this.mPage = page
      this.fetchTableData(this.tableName)
      this.$emit('change:page', page)
    },
    onPaginationPerPageChanged (perPage) {
      this.mPage = 1
      this.mLimit = perPage
      this.fetchTableData(this.tableName)
      this.$emit('change:page', 1)
      this.$emit('change:per-page', perPage)
    },
  },
}
</script>

<style lang="scss" scoped>
@use "./QueryResultTable.scss";
</style>
