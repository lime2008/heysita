// utils/renderLayer.ts
import { reactive, h, createApp, Transition, ref, VNode } from 'vue';

interface LayerState {
  visible: boolean;
  imageUrl: string | null;
  width: number;
  height: number;
}

const state = reactive<LayerState>({
  visible: true, // 默认服务端渲染时可见
  imageUrl: null,
  width: 50,
  height: 50,
});

let instance: any = null;

// 定义 ref 变量
const textRef = ref<string>('Initial Text');

function show(imageUrl: string, { height, width }: { height: number; width: number }) {
  state.visible = true;
  state.imageUrl = imageUrl;
  state.height = height;
  state.width = width;
  initLayer();
}

function close() {
  state.visible = false;
  state.imageUrl = null;
}

function initLayer() {
  if (instance) {
    // 如果实例已经存在，直接覆盖文字
    textRef.value = 'Updated Text';
    state.visible = true;
    return;
  }

  const app = createApp({
    render(): VNode | null {
      return h(
        Transition,
        {
          name: 'fade',
          appear: true,
        },
        {
          default: () =>
            !state.visible
              ? null
              : h('div', { class: 'loading_layer' }, [
                  state.imageUrl
                    ? h('div', {
                        class: 'layer_logo',
                        style: {
                          width: state.width + 'px',
                          height: state.height + 'px',
                          backgroundImage: 'url(' + state.imageUrl + ')',
                        },
                      })
                    : null,
                  h('p', textRef.value),
                ]),
        }
      );
    },
  });

  instance = app.mount(document.createElement('div'));
  document.body.appendChild(instance.$el);
}



export const layer = {
  show,
  close,
  textRef,
  initLayer, // 暴露 initLayer 方法以便在客户端调用
};
