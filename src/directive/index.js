import directive from './directives';

const importDirective = (Vue) => {
  /**
   * 拖拽指令 v-draggable="options"
   * options = {
   *  trigger: /这里传入作为拖拽触发器的CSS选择器/,
   *  body:    /这里传入需要移动容器的CSS选择器/,
   *  recover: /拖动结束之后是否恢复到原来的位置/
   * }
   */
  Vue.directive('draggable', directive.draggable);
  Vue.directive('onlyNumber', directive.onlyNumber);
  /**
   * 权限校验指令 v-permission="['admin', 'editor']"
   */
  Vue.directive('permission', directive.permission);
  /**
   * 针对ElementUI的dialog弹窗，可拖动 v-drag-dialog
   */
  Vue.directive('dragDialog', directive.dragDialog);
};

export default importDirective;
