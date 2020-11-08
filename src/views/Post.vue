<template>
  <div class="card">
    <v-card class="mx-auto" width="600px">
      <div class="d-flex justify-end">
        <v-btn
          class="edit-btn"
          text
          dark
          depressed
          @click="
            $router.push({ name: 'EditPost', params: { id: $route.params.id } })
          "
          >Edit
          <v-icon right>mdi-pencil</v-icon>
        </v-btn>
        <v-btn class="edit-btn" text dark depressed @click="deletePost"
          >Delete
          <v-icon right>mdi-delete</v-icon>
        </v-btn>
      </div>
      <div class="d-flex justify-center">
        <div class="content">
          <p class="tilte">
            {{ activePost.title }}
          </p>
          <p class="body">{{ activePost.body }}</p>
          <h3 class="comments-section-title">Comments</h3>
          <div v-if="activePost.comments">
            <div v-for="comment in activePost.comments.data" :key="comment.id">
              <v-layout>
                <v-flex xs12 md2>
                  <p class="user-name">{{ comment.name }}</p>
                </v-flex>
                <v-flex xs12 md10>
                  <p class="user-comment">{{ comment.body }}</p>
                </v-flex>
              </v-layout>
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Post',
  computed: {
    ...mapGetters(['activePost']),
  },
  async created() {
    if (this.$route.params.id) {
      const payload = {
        id: this.$route.params.id,
        apollo: this.$apollo,
      };
      await this.$store.dispatch('getPost', payload);
    }
  },
  methods: {
    async deletePost() {
      const payload = {
        id: this.$route.params.id,
        apollo: this.$apollo,
      };
      await this.$store.dispatch('deletePost', payload);
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.card {
  margin-top: 10vh;
}
.edit-btn {
  margin-top: 20px;
  margin-right: 20px;
  background: #22539f;
  min-height: 30px;
  width: 90px;
}
.content {
  width: 500px;
}
.tilte {
  padding-top: 20px;
  padding-bottom: 20px;
  margin-left: 20px;
  margin-right: 20px;
  font-size: 25px;
  text-align: center;
  color: #616161;
}
.comments-section-title {
  margin-bottom: 20px;
}
.body {
  font-size: 16px;
}
.user-name {
  color: #0288d1;
}
.user-comment {
  margin-left: 20px;
}
</style>
