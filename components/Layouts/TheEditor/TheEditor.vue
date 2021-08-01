<template>
  <section class="the-editor">
    <client-only>
      <MyAceEditor class="the-editor__ace" />
      <QueryResultTable
        class="the-editor__query-result-table"
        :table-name="tableName"
      />
    </client-only>
  </section>
</template>

<script>
import { MyAceEditor } from '@/components/MyAceEditor'
import { QueryResultTable } from '@/components/QueryResultTable'
export default {
  components: {
    MyAceEditor,
    QueryResultTable,
  },
  data () {
    return {
      tableName: 'customers',
    }
  },
}
</script>

<style lang="scss" scoped>
@use "./TheEditor.scss";
</style>
