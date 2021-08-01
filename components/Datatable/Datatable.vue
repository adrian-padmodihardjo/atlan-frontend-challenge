<template>
  <div class="dt-wrapper">
    <table class="dt">
      <slot name="table">
        <thead class="dt__thead">
          <slot name="thead">
            <tr class="dt__tr">
              <th
                v-for="(header, headerIndex) in headers"
                :key="headerIndex"
                class="dt__th"
              >
                <slot
                  name="headerCell"
                  v-bind="{ header, headerIndex }"
                >
                  {{ getHeaderContent({ header, headerIndex }) }}
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
                <td
                  v-for="(header, headerIndex) in headers"
                  :key="headerIndex"
                  class="dt__td"
                >
                  <slot
                    name="cell"
                    v-bind="{ row, rowIndex, header, headerIndex }"
                  >
                    {{ getCellContent({ row, rowIndex, header, headerIndex }) }}
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
  props: {
    sortable: {
      type: Boolean,
      default: true,
    },
    headers: {
      type: Array,
      default: () => [],
    },
    rows: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
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
  },
}
</script>

<style lang="scss" scoped>
@use "./Datatable.scss";
</style>
