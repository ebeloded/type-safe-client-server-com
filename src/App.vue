<script lang="ts">
import { defineComponent, reactive, Ref, ref } from 'vue'
import { useApi } from '@/services/useApi'

export default defineComponent({
  name: 'App',
  components: {},

  setup() {
    const users: Ref<any[]> = ref([])

    return {
      users,
      async getUsers() {
        users.value = await useApi((api) => api.admin.getAllUsers())
      },
    }
  },
})
</script>

<template>
  <div>
    <button @click="getUsers">Load Users</button>
    <ul>
      <li v-for="user in users" :key="user.email">
        {{ user.email }}
      </li>
    </ul>
  </div>
</template>

<style></style>
