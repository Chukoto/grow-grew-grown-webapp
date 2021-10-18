<template>
  <div>
    <AddTarget style="margin-bottom: 30px" />
    <IndexTarget />
  </div>
</template>

<script>
import AddTarget from '@/components/AddTarget';
import IndexTarget from '@/components/IndexTarget';
export default {
  name: 'Target',
  components: {
    AddTarget,
    IndexTarget,
  },
};
</script>

<style></style>
