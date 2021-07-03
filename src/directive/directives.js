import { on } from '@/utils';
import store from '@/store';

function checkPermission(el, binding) {
  const { value } = binding;
  const roles = store.getters && store.getters.roles;

  if (value && value instanceof Array) {
    if (value.length > 0) {
      const permissionRoles = value;

      const hasPermission = roles.some((role) => {
        return permissionRoles.includes(role);
      });

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  } else {
    throw new Error(`need roles! Like v-permission="['admin','editor']"`);
  }
}
let listenAction = null;
const directives = {
  draggable: {
    inserted: (el, binding, vnode) => {
      let triggerDom = document.querySelector(binding.value.trigger);
      triggerDom.style.cursor = 'move';
      let bodyDom = document.querySelector(binding.value.body);
      let pageX = 0;
      let pageY = 0;
      let transformX = 0;
      let transformY = 0;
      let canMove = false;
      const handleMousedown = (e) => {
        let transform = /\(.*\)/.exec(bodyDom.style.transform);
        if (transform) {
          transform = transform[0].slice(1, transform[0].length - 1);
          let splitxy = transform.split('px, ');
          transformX = parseFloat(splitxy[0]);
          transformY = parseFloat(splitxy[1].split('px')[0]);
        }
        pageX = e.pageX;
        pageY = e.pageY;
        canMove = true;
      };
      const handleMousemove = (e) => {
        let xOffset = e.pageX - pageX + transformX;
        let yOffset = e.pageY - pageY + transformY;
        if (canMove) bodyDom.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
      };
      const handleMouseup = (e) => {
        canMove = false;
      };
      on(triggerDom, 'mousedown', handleMousedown);
      on(document, 'mousemove', handleMousemove);
      on(document, 'mouseup', handleMouseup);
    },
    update: (el, binding, vnode) => {
      if (!binding.value.recover) return;
      let bodyDom = document.querySelector(binding.value.body);
      bodyDom.style.transform = '';
    },
  },
  onlyNumber: {
    inserted(el, vDir, vNode) {
      // vDir.value 有指令的参数
      let content;
      // 按键按下=>只允许输入 数字/小数点
      el.addEventListener('keypress', (event) => {
        let e = event || window.event;
        let inputKey = String.fromCharCode(typeof e.charCode === 'number' ? e.charCode : e.keyCode);
        let re = /\d|\./;
        content = e.target.value;
        // 定义方法,阻止输入
        function preventInput() {
          if (e.preventDefault) {
            e.preventDefault();
          } else {
            e.returnValue = false;
          }
        }
        if (!re.test(inputKey) && !e.ctrlKey) {
          preventInput();
        } else if (content.indexOf('.') > 0 && inputKey === '.') {
          // 已有小数点,再次输入小数点
          preventInput();
        }
      });
      // 按键弹起=>并限制最大最小
      el.addEventListener('keyup', (event) => {
        let e = event || window.event;
        content = parseFloat(e.target.value);
        if (!content) {
          content = 0.0;
        }
        let arg_max = '';
        let arg_min = '';
        if (vDir.value) {
          arg_max = parseFloat(vDir.value.max);
          arg_min = parseFloat(vDir.value.min);
        }
        if (arg_max && content > arg_max) {
          e.target.value = arg_max;
          content = arg_max;
        }
        if (arg_min && content < arg_min) {
          e.target.value = arg_min;
          content = arg_min;
        }
      });
      // 失去焦点=>保留指定位小数
      el.addEventListener('focusout', (event) => {
        // 此处会在 el-input 的 @change 后执行
        let e = event || window.event;
        content = parseFloat(e.target.value);
        if (!content) {
          content = 0.0;
        }
        let arg_precision = 0; // 默认保留至整数
        if (vDir.value.precision) {
          arg_precision = parseFloat(vDir.value.precision);
        }
        e.target.value = content.toFixed(arg_precision);
      });
    },
  },
  permission: {
    inserted(el, binding) {
      checkPermission(el, binding);
    },
    update(el, binding) {
      checkPermission(el, binding);
    },
  },
  sticky: {
    inserted(el, binding) {
      const params = binding.value || {};
      const stickyTop = params.stickyTop || 0;
      const zIndex = params.zIndex || 1000;
      const elStyle = el.style;

      elStyle.position = '-webkit-sticky';
      elStyle.position = 'sticky';
      // if the browser support css sticky（Currently Safari, Firefox and Chrome Canary）
      // if (~elStyle.position.indexOf('sticky')) {
      //     elStyle.top = `${stickyTop}px`;
      //     elStyle.zIndex = zIndex;
      //     return
      // }
      const elHeight = el.getBoundingClientRect().height;
      const elWidth = el.getBoundingClientRect().width;
      elStyle.cssText = `top: ${stickyTop}px; z-index: ${zIndex}`;

      const parentElm = el.parentNode || document.documentElement;
      const placeholder = document.createElement('div');
      placeholder.style.display = 'none';
      placeholder.style.width = `${elWidth}px`;
      placeholder.style.height = `${elHeight}px`;
      parentElm.insertBefore(placeholder, el);

      let active = false;

      const getScroll = (target, top) => {
        const prop = top ? 'pageYOffset' : 'pageXOffset';
        const method = top ? 'scrollTop' : 'scrollLeft';
        let ret = target[prop];
        if (typeof ret !== 'number') {
          ret = window.document.documentElement[method];
        }
        return ret;
      };

      const sticky = () => {
        if (active) {
          return;
        }
        if (!elStyle.height) {
          elStyle.height = `${el.offsetHeight}px`;
        }

        elStyle.position = 'fixed';
        elStyle.width = `${elWidth}px`;
        placeholder.style.display = 'inline-block';
        active = true;
      };

      const reset = () => {
        if (!active) {
          return;
        }

        elStyle.position = '';
        placeholder.style.display = 'none';
        active = false;
      };

      const check = () => {
        const scrollTop = getScroll(window, true);
        const offsetTop = el.getBoundingClientRect().top;
        if (offsetTop < stickyTop) {
          sticky();
        } else {
          if (scrollTop < elHeight + stickyTop) {
            reset();
          }
        }
      };
      listenAction = () => {
        check();
      };

      window.addEventListener('scroll', listenAction);
    },

    unbind() {
      window.removeEventListener('scroll', listenAction);
    },
  },
  dragDialog: {
    bind(el, binding, vnode) {
      const dialogHeaderEl = el.querySelector('.el-dialog__header');
      const dragDom = el.querySelector('.el-dialog');
      dialogHeaderEl.style.cssText += ';cursor:move;';
      dragDom.style.cssText += ';top:0px;';

      // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
      const getStyle = (function () {
        if (window.document.currentStyle) {
          return (dom, attr) => dom.currentStyle[attr];
        } else {
          return (dom, attr) => getComputedStyle(dom, false)[attr];
        }
      })();

      dialogHeaderEl.onmousedown = (e) => {
        // 鼠标按下，计算当前元素距离可视区的距离
        const disX = e.clientX - dialogHeaderEl.offsetLeft;
        const disY = e.clientY - dialogHeaderEl.offsetTop;

        const dragDomWidth = dragDom.offsetWidth;
        const dragDomHeight = dragDom.offsetHeight;

        const screenWidth = document.body.clientWidth;
        const screenHeight = document.body.clientHeight;

        const minDragDomLeft = dragDom.offsetLeft;
        const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth;

        const minDragDomTop = dragDom.offsetTop;
        const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomHeight;

        // 获取到的值带px 正则匹配替换
        let styL = getStyle(dragDom, 'left');
        let styT = getStyle(dragDom, 'top');

        if (styL.includes('%')) {
          styL = Number(document.body.clientWidth) * (Number(styL.replace(/\%/g, '')) / 100);
          styT = Number(document.body.clientHeight) * (Number(styT.replace(/\%/g, '')) / 100);
        } else {
          styL = Number(styL.replace(/\px/g, ''));
          styT = Number(styT.replace(/\px/g, ''));
        }

        document.onmousemove = function (e) {
          // 通过事件委托，计算移动的距离
          let left = e.clientX - disX;
          let top = e.clientY - disY;

          // 边界处理
          if (-left > minDragDomLeft) {
            left = -minDragDomLeft;
          } else if (left > maxDragDomLeft) {
            left = maxDragDomLeft;
          }

          if (-top > minDragDomTop) {
            top = -minDragDomTop;
          } else if (top > maxDragDomTop) {
            top = maxDragDomTop;
          }

          // 移动当前元素
          dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`;

          // emit onDrag event
          vnode.child.$emit('dragDialog');
        };

        document.onmouseup = function (e) {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
    },
  },
};

export default directives;
