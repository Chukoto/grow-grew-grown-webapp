<template>
  <div style="margin-right: 256px;">
    <h1>
      進捗度
    </h1>
    <h1>
      {{ this.targets }}
    </h1>
  </div>
</template>

<script>
const STORAGE_KEY = 'targets';

export default {
  data() {
    return {
      targets: [],
      genres: ['学習', '読書', 'トレーニング', 'Todo'],
      boolean: [],
      progressList: [
        {
          name: '学習',
          statusArr: [],
        },
        {
          name: '読書',
          statusArr: [],
        },
        {
          name: 'トレーニング',
          statusArr: [],
        },
        {
          name: 'Todo',
          statusArr: [],
        },
      ],
    };
  },
  mounted() {
    if (localStorage.getItem(STORAGE_KEY)) {
      try {
        this.targets = JSON.parse(localStorage.getItem(STORAGE_KEY));
        for (let i = 0; i < this.targets.length; i++) {
          this.checkBoolNum(i, '学習', 0);
          this.checkBoolNum(i, '読書', 1);
          this.checkBoolNum(i, 'トレーニング', 2);
          this.checkBoolNum(i, 'Todo', 3);
        }
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  },
  methods: {
    checkBoolNum(i, string, progressStatusIndex) {
      if (this.targets[i].genre === string) {
        for (let j = 0; j < this.targets[i].statusArr.length; j++) {
          this.progressList[progressStatusIndex].statusArr.push(
            this.targets[i].statusArr[0]
          );
        }
      }
    },
  },
};
</script>

<style></style>
