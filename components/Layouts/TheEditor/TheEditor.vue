<template>
  <section class="the-editor">
    <TheEditorSidebar class="the-editor__sidebar">
      <QueryConsoleList
        v-model="activeConsole"
        :list.sync="consoleList"
      />
      <TableNameList />
    </TheEditorSidebar>
    <client-only>
      <TabLayout
        v-model="activeConsole"
        class="the-editor__tabs"
        :list.sync="consoleList"
      >
        <template #item>
          <MyAceEditor class="the-editor__ace" />
          <QueryResultTable
            class="the-editor__query-result-table"
            table-name="customers"
          />
        </template>
      </TabLayout>
    </client-only>
  </section>
</template>

<script>
import { TheEditorSidebar } from '@/components/Layouts/TheEditorSidebar'
import { QueryConsoleList } from '@/components/QueryConsoleList'
import { TableNameList } from '@/components/TableNameList'
import { MyAceEditor } from '@/components/MyAceEditor'
import { QueryResultTable } from '@/components/QueryResultTable'
import { TabLayout } from '@/components/TabLayout'
export default {
  components: {
    TheEditorSidebar,
    QueryConsoleList,
    TableNameList,
    MyAceEditor,
    QueryResultTable,
    TabLayout,
  },
  data () {
    return {
      consoleList: [{
        id: Date.now(),
        label: Date.now(),
      }],
      activeConsole: 0,
    }
  },
}
</script>

<style lang="scss" scoped>
@use "./TheEditor.scss";
</style>
