<template>
  <div>
    <p>Textasdasdasd</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  mounted () {
    browser.runtime.sendMessage({})
  }
}
</script>

<style scoped>
p {
  font-size: 20px;
}
</style>
