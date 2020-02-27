<template>
  <button @click="$emit('click')" :buttonname="buttonname">{{ buttonname }}</button>
</template>

<script>
export default {
  props: ['buttonname',]
};
</script>

<style scoped>

</style>
