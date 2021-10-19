import Vue from 'vue';
import VueRouter from 'vue-router';
import Target from '@/pages/Target';
import Progress from '@/pages/Progress';

Vue.use(VueRouter);

const routes = [
  {
    path: '/target',
    name: 'Target',
    component: Target,
  },
  {
    path: '/progress',
    name: 'Progress',
    component: Progress,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
