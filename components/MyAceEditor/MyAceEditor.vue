<template>
  <div class="my-ace-editor">
    test
  </div>
</template>

<script>
export default {
  data () {
    return {
      ace: null,
    }
  },
  mounted () {
    this.initAce()
  },
  beforeDestroy () {
    this.destroyAce()
  },
  methods: {
    initAce () {
      if (!window.ace) {
        return
      }
      if (!this.ace) {
        const instance = window.ace.edit(this.$el)
        instance.setTheme('ace/theme/dracula')
        instance.session.setMode('ace/mode/sql')
        instance.setFontSize('inherit')
        instance.setShowPrintMargin(false)

        this.ace = instance
      }
    },
    destroyAce () {
      this.ace?.editor?.destroy?.()
      this.ace = null
    },
  },
}
</script>
