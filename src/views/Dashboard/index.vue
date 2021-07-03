<template>
  <div class="app-container">
    <div class="h-72">
      <v-chart class="chart" :option="option" />
    </div>
    <div class="mt-5 flex justify-center">
      <pan-thumb width="100px" height="100px" image="https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191">
        <span>wyy</span>
      </pan-thumb>
    </div>
    <div class="flex justify-center mt-5">
      <el-button type="primary" @click="dialogVisible = true"> Open dialog </el-button>
    </div>
    <back-to-top />
    <el-dialog v-drag-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>这是一段信息</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import getLineOption from '@/echarts/line';
import PanThumb from '@/components/PanThumb';
import BackToTop from '@/components/BackToTop';

import { requestDemo } from '@/api/website';

export default {
  name: 'Dashboard',
  components: {
    PanThumb,
    BackToTop,
  },
  data() {
    return {
      option: null,
      dialogVisible: false,
    };
  },
  mounted() {
    this.option = Object.freeze(getLineOption(undefined, true));
    this.initData();
  },
  methods: {
    initData() {
      requestDemo().then((res) => {
        this.$message({
          type: 'success',
          message: '请求成功',
        });
      });
    },
  },
};
</script>
