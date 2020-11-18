<template>
    <div>
      <transactionGather ref="transactionGather"></transactionGather>
    </div>
</template>
<script>

import transactionGather from '@/syscomponents/smartMonitor/monitor/dealHandle/transactionGather'
export default {
  name: 'coreDealHandle',
  data () {
    return {
    }
  },
  components: { transactionGather },
  mounted () {},
  methods: {}
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>



