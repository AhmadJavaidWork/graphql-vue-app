<template>
  <div class="card">
    <v-card class="mx-auto pt-10" width="600px">
      <div class="d-flex justify-center">
        <div class="content">
          <v-form v-model="isValid">
            <v-text-field
              class="tilte"
              label="Title"
              v-model="editedPost.title"
              :rules="titleRules"
            >
              {{ editedPost.title }}
            </v-text-field>
            <v-textarea label="Body" v-model="editedPost.body" class="body">{{
              editedPost.body
            }}</v-textarea>
          </v-form>
        </div>
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="btn" text dark depressed @click="$router.go(-1)"
          >Cancel</v-btn
        >
        <v-btn
          :disabled="!isValid"
          v-if="$route.params.id"
          class="btn"
          text
          dark
          depressed
          @click="updatePost"
          >Done</v-btn
        >
        <v-btn
          :disabled="!isValid"
          v-if="!$route.params.id"
          class="btn"
          text
          dark
          depressed
          @click="createPost"
          >Save</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'EditPost',
  computed: {
    ...mapGetters(['editedPost']),
  },
  async created() {
    if (this.$route.params.id) {
      const payload = {
        id: this.$route.params.id,
        apollo: this.$apollo,
      };
      await this.$store.dispatch('getEditingPost', payload);
    } else {
      await this.$store.dispatch('setEditingPost');
    }
  },
  data() {
    return {
      isValid: true,
      titleRules: [v => !!v || 'Title is required'],
    };
  },
  methods: {
    async updatePost() {
      const payload = {
        id: this.$route.params.id,
        input: this.editedPost,
        apollo: this.$apollo,
      };
      await this.$store.dispatch('updatePost', payload);
      this.$router.push({ name: 'Post', params: { id: payload.id } });
    },
    async createPost() {
      const payload = {
        input: this.editedPost,
        apollo: this.$apollo,
      };
      const res = await this.$store.dispatch('createPost', payload);
      this.$router.push({ name: 'Post', params: { id: res.id } });
    },
  },
};
</script>

<style scoped>
.card {
  margin-top: 10vh;
}
.btn {
  margin-top: 20px;
  margin-right: 20px;
  background: #22539f;
  min-height: 30px;
  width: 80px;
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
