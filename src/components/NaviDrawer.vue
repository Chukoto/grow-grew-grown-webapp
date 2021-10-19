<template>
  <div>
    <v-navigation-drawer
      class="orange darken-3"
      fixed
      permanent
      floating
      dark
    >
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img :src="picture"></v-img>
          </v-list-item-avatar>
          <v-btn class="mx-5" @click="getUser()" text x-small>
            アカウント切替
            <v-icon class="ml-1">mdi-account-convert</v-icon>
          </v-btn>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{ firstName }} {{ lastName }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list class="item-list" nav dense>
        <v-list-item
          link
          v-for="(item, index) in items"
          :key="index"
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: 'ゲスト',
      lastName: '様',
      email: 'guest@gmail.com',
      picture: 'https://randomuser.me/api/portraits/men/3.jpg',
      items: [
        {
          title: '目標',
          icon: 'mdi-target',
          link: { name: 'Target' },
        },
        {
          title: '進捗度',
          icon: 'mdi-chart-bar',
          link: { name: 'Progress' },
        },
        {
          title: 'お気に入り',
          icon: 'mdi-star',
        },
      ],
    };
  },
  methods: {
    async getUser() {
      const response = await fetch('https://randomuser.me/api');
      const { results } = await response.json();

      this.firstName = results[0].name.first;
      this.lastName = results[0].name.last;
      this.email = results[0].email;
      this.picture = results[0].picture.large;
    },
  },
  mounted() {},
};
</script>

<style scoped>
.item-list {
  height: 77vh;
}
</style>
