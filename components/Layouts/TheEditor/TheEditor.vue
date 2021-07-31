<template>
  <section class="the-editor">
    <MyAceEditor />
  </section>
</template>

<script>
import { MyAceEditor } from '@/components/MyAceEditor'
export default {
  components: {
    MyAceEditor,
  },
}
</script>

<style lang="scss" scoped>
@use "./TheEditor.scss";
</style>
