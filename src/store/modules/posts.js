const query = require('../../graphql/posts/posts.gql');

const state = {
  posts: {},
  activePost: {},
  editedPost: {},
};

const getters = {
  posts: state => state.posts,
  activePost: state => state.activePost,
  editedPost: state => state.editedPost,
};

const actions = {
  async getPosts(context, apollo) {
    const res = await apollo.query({
      query: query.getPosts,
    });
    if (res.data) context.commit('getPosts', res.data.posts.data);
  },

  async getPost(context, payload) {
    const res = await payload.apollo.query({
      query: query.getPost,
      variables: {
        id: payload.id,
      },
    });
    if (res.data) context.commit('setActivePost', res.data.post);
  },

  async getEditingPost(context, payload) {
    const res = await payload.apollo.query({
      query: query.getEditingPost,
      variables: {
        id: payload.id,
      },
    });
    if (res.data) context.commit('setEditingPost', res.data.post);
  },

  setEditingPost(context) {
    context.commit('setEditingPost', {
      title: '',
      body: '',
    });
  },

  async updatePost(context, payload) {
    const res = await payload.apollo.mutate({
      mutation: query.updatePost,
      variables: {
        id: payload.id,
        input: payload.input,
      },
    });
    if (res.data) context.commit('updatePost', res.data.post);
  },

  async createPost(context, payload) {
    const res = await payload.apollo.mutate({
      mutation: query.createPost,
      variables: {
        input: payload.input,
      },
    });
    if (res.data) context.commit('createPost', res.data.createPost);
    return res.data.createPost;
  },

  async deletePost(context, payload) {
    await payload.apollo.mutate({
      mutation: query.deletePost,
      variables: {
        id: payload.id,
      },
    });
  },
};

const mutations = {
  getPosts(state, posts) {
    state.posts = posts;
  },
  setActivePost(state, post) {
    state.activePost = post;
  },
  setEditingPost(state, post) {
    state.editedPost = {
      title: post.title,
      body: post.body,
    };
  },
  updatePost(state, post) {
    state.activePost = post;
  },
  createPost(state, post) {
    state.activePost = post;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
