import Vue from 'vue';
import VueRouter from 'vue-router';
import Target from '@/pages/target';

Vue.use(VueRouter);

const routes = [
  {
    path: '/target',
    name: 'Target',
    component: Target,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
