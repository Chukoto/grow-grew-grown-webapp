<template>
  <div>
    <v-row>
      <v-col class="d-flex" cols="6">
        <v-select
          :items="genresFromParent"
          label="表示するジャンルを選択"
          dense
          outlined
          absolute
          v-model="selected"
          @change="sendSelectedVal"
        ></v-select>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'GenreSwitcher',
  props: {
    genresFromParent: {
      genres: Object,
    },
  },
  mounted() {
    this.sendSelectedVal();
  },
  data() {
    return {
      selected: 'すべて',
    };
  },
  methods: {
    sendSelectedVal() {
      this.$emit('setSelectedVal', this.selected);
    },
  },
};
</script>

<style></style>
