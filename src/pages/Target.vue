<template>
  <div>
    <AddTarget
      :genresFromParent="this.genres"
      style="margin-bottom: 30px"
    />
    <GenreSwitcher
      :genresFromParent="this.genres"
      @setSelectedVal="showSelectedVal"
    />
    <IndexTarget
      :genresFromParent="this.genres"
      :selectedValFromParent="this.selected"
    />
  </div>
</template>

<script>
import AddTarget from '@/components/AddTarget';
import IndexTarget from '@/components/IndexTarget';
import GenreSwitcher from '@/components/GenreSwitcher';

export default {
  name: 'Target',
  components: {
    AddTarget,
    IndexTarget,
    GenreSwitcher,
  },
  data() {
    return {
      genres: ['すべて', '学習', '読書', 'トレーニング', 'Todo'],
      selected: '',
    };
  },
  methods: {
    showSelectedVal(val) {
      this.selected = val;
    },
  },
};
</script>

<style></style>
