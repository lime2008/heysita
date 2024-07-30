<template>
  <NuxtPage />
  <div class="tab" style="color: #fff;" :style="{ transform: px }">
        <div v-for="(item, index) in NAVIGATION.routes" class="tab_card special_font" :class="{ 'tab_left': index === 0 , 'tab_right' : index === NAVIGATION.routes.length - 1}" @click="navigateTo(item.name)">{{ item.page }}</div>
    </div>
  <div>
    <div class="layer">
      <transition name="fade">
        <loading v-show="isShow"/>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { monitorImageLoadProgress } from './utils/imageMonitor';
import { useAsyncData } from '#app';
import './styles/global.css';
import './styles/tab.css';
const isShow = ref(true);
let lastScrollTop;
var isScrolling;
const px = ref('')
onMounted(()=>{


  window.addEventListener('scroll', () => {
    isScrolling();
// 在用户停止滚动200ms后执行
})});
    isScrolling = () => {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
        if (currentScrollTop > lastScrollTop) {
          px.value = 'translate(-50%,-85px)'
        } else if (currentScrollTop < lastScrollTop) {
          px.value = 'translate(-50%,0)'
        } else {
          //console.log( '无移' );
        }

        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // 处理向上滚动超过顶部的情况

    }; 

const router = useRouter();

router.beforeEach((to, from, next) => {
  isShow.value = true;
  
  next();
});
router.afterEach(() => {
  img_monitor();
});

onMounted(() => {
  nextTick(() => {
    console.log('NuxtPage 已完成渲染');
    img_monitor();
  });
});

const img_monitor = () => {
  monitorImageLoadProgress().then(progress => {
      console.log('Image load progress:', progress);
      console.log('加载成功');
      setTimeout(() => {
        isShow.value = false;
      }, 500);
    }).catch(error => {
      console.error('Error:', error);
    });
}

import loading from './components/loadingAnimation.vue';

const { data: NAVIGATION } = await useAsyncData('NAVIGATION', () => import('../config/config').then(module => module.NAVIGATION));
console.log (NAVIGATION.value.routes);

const navigateTo = (to) => {
  router.push({ name: to });
}


</script>


<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
