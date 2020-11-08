import Vue from 'vue';
import VueRouter from 'vue-router';
import AllPosts from '../views/AllPosts';
import Post from '../views/Post';
import EditPost from '../views/EditPost';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'AllPosts',
    component: AllPosts,
  },
  {
    path: '/post/:id',
    name: 'Post',
    component: Post,
  },
  {
    path: '/edit/:id',
    name: 'EditPost',
    component: EditPost,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
