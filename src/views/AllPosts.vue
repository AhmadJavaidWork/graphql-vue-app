<template>
  <div>
    <div class="posts">
      <div class="d-flex justify-end">
        <v-btn
          class="btn"
          text
          dark
          depressed
          @click="$router.push({ name: 'EditPost', params: { id: null } })"
          >Create Post
          <v-icon right>mdi-plus</v-icon>
        </v-btn>
      </div>
      <h1 class="heading">All Posts</h1>
      <v-card
        class="mx-auto"
        width="400px"
        style="margin-top: 2vh;"
        v-for="post in posts"
        :key="post.id"
        @click="$router.push({ name: 'Post', params: { id: post.id } })"
      >
        <p class="titles">{{ post.title }}</p>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AllPosts',
  computed: {
    ...mapGetters(['posts']),
  },
  async created() {
    await this.$store.dispatch('getPosts', this.$apollo);
  },
};
</script>

<style scoped>
.btn {
  margin-right: 20px;
  background: #22539f;
  min-height: 30px;
  width: 150px;
}
.heading {
  text-align: center;
}
.titles {
  padding-top: 20px;
  padding-bottom: 20px;
  margin-left: 20px;
  margin-right: 20px;
  font-size: 20px;
  text-align: center;
  color: #616161;
}
.posts {
  margin-top: 50px;
}
</style>
