<template>
  <div class="dt-wrapper">
    <table class="dt">
      <slot name="table">
        <thead class="dt__thead">
          <slot name="thead">
            <tr class="dt__tr">
              <th class="dt__th dt__th--index">
                #
              </th>
              <th
                v-for="(header, headerIndex) in headers"
                :key="headerIndex"
                :class="['dt__th', getHeaderClassModifier({ header, headerIndex })]"
                @click="onSort({ header, headerIndex })"
              >
                <slot
                  name="headerCell"
                  v-bind="{ header, headerIndex }"
                >
                  <div class="dt__th__content">
                    <span>{{ getHeaderContent({ header, headerIndex }) }}</span>
                    <IconArrowUp
                      v-if="sortable"
                      class="dt__btn-sort"
                    />
                  </div>
                </slot>
              </th>
            </tr>
          </slot>
        </thead>
        <tbody class="dt__tbody">
          <slot name="tbody">
            <tr
              v-for="(row, rowIndex) in rows"
              :key="rowIndex"
              class="dt__tr"
            >
              <slot
                name="row"
                v-bind="{ row, rowIndex }"
              >
                <td class="dt__td dt__td--index">
                  {{ startIndex + rowIndex }}
                </td>
                <td
                  v-for="(header, headerIndex) in headers"
                  :key="headerIndex"
                  class="dt__td"
                >
                  <slot
                    name="cell"
                    v-bind="{ row, rowIndex, header, headerIndex }"
                  >
                    <slot :name="`cell-${getHeaderKey({ header, headerIndex })}`">
                      {{ getCellContent({ row, rowIndex, header, headerIndex }) }}
                    </slot>
                  </slot>
                </td>
              </slot>
            </tr>
          </slot>
        </tbody>
        <tfoot
          v-if="$slots.tfoot"
          class="dt__tfoot"
        >
          <slot name="tfoot" />
        </tfoot>
      </slot>
    </table>
  </div>
</template>

<script>
export default {
  components: {
    IconArrowUp: () => import('@/assets/icon/bx-up-arrow-alt.svg'),
  },
  props: {
    sortable: {
      type: [Boolean, Array],
      default: true,
    },
    orderBy: {
      type: Object,
      default: () => ({}),
    },
    headers: {
      type: Array,
      default: () => [],
    },
    rows: {
      type: Array,
      default: () => [],
    },
    startIndex: {
      type: Number,
      default: 1,
    },
  },
  data () {
    return {
      mOrderBy: {},
    }
  },
  watch: {
    orderBy: {
      immediate: true,
      deep: true,
      handler (v) {
        this.mOrderBy = v && typeof v === 'object'
          ? { ...v }
          : {}
      },
    },
  },
  methods: {
    isColumnSortable ({ header, headerIndex }) {
      if (Array.isArray(this.sortable)) {
        return this.sortable.includes(this.getHeaderKey({ header, headerIndex }))
      }
      return !!this.sortable
    },
    getHeaderSortingDirection ({ header, headerIndex }) {
      const headerKey = this.getHeaderKey({ header, headerIndex })
      return this.mOrderBy[headerKey]
    },
    getHeaderClassModifier ({ header, headerIndex }) {
      const sortDir = this.getHeaderSortingDirection({ header, headerIndex })

      return {
        'dt__th--sortable': this.isColumnSortable({ header, headerIndex }),
        'dt__th--asc': sortDir === 'asc',
        'dt__th--desc': sortDir === 'desc',
      }
    },
    getHeaderKey ({ header, headerIndex }) {
      if (header && typeof header === 'object') {
        return header?.prop
      }
      return header
    },
    getHeaderContent ({ header, headerIndex }) {
      if (header && typeof header === 'object') {
        return header?.text
      }
      return header
    },
    getCellContent ({ row, rowIndex, header, headerIndex }) {
      if (row && typeof row === 'object') {
        const key = this.getHeaderKey({ header, headerIndex })
        return row?.[key]
      }
      return row
    },
    onSort ({ header, headerIndex }) {
      if (!this.isColumnSortable({ header, headerIndex })) {
        return
      }
      const headerKey = this.getHeaderKey({ header, headerIndex })
      const currentDirection = this.getHeaderSortingDirection({ header, headerIndex })
      if (!currentDirection) {
        this.$set(this.mOrderBy, headerKey, 'asc')
      } else if (currentDirection === 'asc') {
        this.$set(this.mOrderBy, headerKey, 'desc')
      } else if (currentDirection === 'desc') {
        this.$delete(this.mOrderBy, headerKey)
      }
      this.$emit('change:sort', this.mOrderBy)
    },
  },
}
</script>

<style lang="scss" scoped>
@use "./Datatable.scss";
</style>
