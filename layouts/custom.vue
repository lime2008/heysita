<template>
  <div>
    <commonHeader :url="url" :themeColor="themeColor">
    </commonHeader>
    <bubleCanvas/>
    <slot name="header" />
    <main>
    <slot name="main">Default Main Content</slot>
  </main>
    <footer>
      <slot name="footer">Default Footer Content</slot>
    </footer>
  </div>
  
</template>

<script setup>
import { useAsyncData , useRoute } from '#imports'
import commonHeader from '../components/commonHeader.vue'
import bubleCanvas from '../components/bubbleCanvas.vue';
const url = ref('');
const themeColor = ref('');
const route = useRoute()
const { data } = await useAsyncData('routeMeta', () => {
  return {
    url: route.meta?.backgroundImage || STYLE.defaultImg,
    themeColor: route.meta?.themeColor || STYLE.defaultThemeColor
  }
})

url.value = data.value.url
themeColor.value = data.value.themeColor


</script>

<style scoped>
main{
  padding: 35px 0 30px;
    background-color: #f6f6f6;
}
</style>
