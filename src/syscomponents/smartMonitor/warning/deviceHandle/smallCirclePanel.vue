<template>
<div class="smallCirclePanel-content">
    <span class="smallCirclePanel-circle"></span>
</div>
</template>
<script>
export default {
  name: 'warnDeviceHandlecirclePanel'
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.smallCirclePanel-content {
  margin-top:0.3rem;
  display: flex;
  display: -webkit-flex;
  width: 0.8rem;
  height: 0.8rem;
  border: 0.05rem solid;
  border-radius: 0.4rem;
  .smallCirclePanel-circle {
    width: 0.3rem;
    height: 0.3rem;
    margin: 0.2rem;
    border: 0.05rem solid;
    border-radius: 0.2rem;
    box-shadow: inset 0 0 0.4rem 0;
  }
}

</style>
