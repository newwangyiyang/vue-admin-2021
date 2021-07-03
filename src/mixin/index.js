import codeExpection from '@/expection/codeExpection';

export default {
  install(Vue) {
    Vue.mixin({
      methods: {
        // 1、系统级统一提示
        showGlobalErrorMsg(res) {
          codeExpection(res.code || res.response.status);
        },
        // 2、重置按钮二次弹窗确认
        handleResetClick(callback) {
          this.$Modal.confirm({
            title: this.$t('tips'),
            content: this.$t('confirmReset'),
            onOk: () => {
              callback && callback();
            },
          });
        },
        // 3、应用按钮二次弹窗确认
        handleApplicationClick(callback) {
          this.$Modal.confirm({
            title: this.$t('tips'),
            content: this.$t('confirmApplication'),
            onOk: () => {
              callback && callback();
            },
          });
        },
        // 4、限制只能输入数字
        handleOnlyInput(e, key) {
          const value = e && e.target && e.target.value;
          const resValue = value.replace(/\D/g, '');
          if (String(resValue) === '0') {
            this[key] = '';
            return;
          }
          this[key] = resValue;
        },
        // 5、失焦判断输入是否为空
        handleBlurInput(e, key, valueDefault) {
          const value = e && e.target && e.target.value;
          const resValue = value.replace(/\D/g, '');
          if (!resValue) {
            this[key] = valueDefault || '1';
          }
        },
        // 确认是否删除二次弹窗
        handleClick(callback, params) {
          this.$Modal.confirm({
            title: this.$t('tips'),
            content: this.$t('confirmDel'),
            onOk: () => {
              callback && callback(params);
            },
          });
        },
      },
    });
  },
};
