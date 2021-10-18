<template>
  <div>
    <AddTarget
      :genresFromParent="this.genres"
      style="margin-bottom: 30px"
    />
    <IndexTarget :genresFromParent="this.genres" />
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
  data() {
    return {
      genres: ['学習', '読書', 'トレーニング', 'Todo'],
    };
  },
};
</script>

<style></style>
