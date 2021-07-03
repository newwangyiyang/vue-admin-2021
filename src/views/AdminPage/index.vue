<template>
  <div class="app-container">
    <el-button type="primary" @click="handleChangeRoles">更换角色</el-button>
    <demo class="absolute right-0 text-2xl text-red-400" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import demo from './components/demo';
export default {
  name: 'AdminPage',
  components: {
    demo,
  },
  methods: {
    ...mapActions({
      changeRoles: 'user/changeRoles',
    }),
    handleChangeRoles() {
      this.changeRoles(['editor']);
    },
  },
};
</script>
