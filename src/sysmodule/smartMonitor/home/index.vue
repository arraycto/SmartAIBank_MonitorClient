<template>
    <div class="test">
      <core v-if="coreShow"></core>
      <entity v-if="entityShow"></entity>
    </div>
</template>
<script>
import core from './core.vue'
import entity from './entity.vue'
import base from '@/common/base'
export default {
  name: 'homeIndex',
  data () {
    return {
      coreShow: false,
      entityShow: false
    }
  },
  components: {
    core, entity
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const self = this
      // const banklevel = self.$store.state.monitor.bankLevel
      const banklevel = base.getStore({ key: 'monitorBankLevel' })
      if (banklevel === 'core') {
        self.coreShow = true
        self.entityShow = false
      } else {
        self.coreShow = false
        self.entityShow = true
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.test{
  overflow-x: hidden;
}
</style>



