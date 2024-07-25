<template>
  <NuxtLayout name="post">
    
    <template #header>
      <postHeader :url="url" :themeColor="themeColor">
        <template #default>
          <h1 class="title" :style="{color : color }">{{ document.title }}</h1>
        </template>
      </postHeader>
    </template>
    <template #main>
      <ContentRendererMarkdown :value="document.body" class="content"/>
    </template>
    <template #footer>
      <div class="site_info">
        <p class="special_font">COPYRIGHT © 2022-2024 LIMEUWU</p>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useAsyncData } from '#app'
import postHeader from '../../components/postHeader.vue'
import { invertHexColor } from '../utils/invertColor'
const color = ref('')
const route = useRoute()
const slug = route.params.slug.toString()
const url = ref('');
// 获取 SITE 数据
const { data: SITE } = await useAsyncData('site', () => import('../config/config').then(module => module.SITE))

// 获取 document 数据
const { data: document } = await useAsyncData(`content-${slug}`, () => queryContent(`/post/${slug}`).findOne())

url.value = document.value.image;
if (document.value.color == undefined) color.value = invertColor(themeColor)
else color.value = document.value.color
const themeColor = ref(document.value.themeColor);
useSeoMeta({
    title: `${SITE.value.title} - ${document.value.title}`,
    ogTitle: `${SITE.value.title} - ${document.value.title}`,
    description: document.value.body,
    ogDescription: document.value.body,
    ogImage: document.value.image || 'https://cdn-community.codemao.cn/47/community/d2ViXzMwMDFfNDk3MDQ3Ml8wXzE2NzEwODc3MTQ3MTRfNWNhMDJiYTM.png',
})
  
  // 定义页面 meta 信息
  definePageMeta({
    documentDriven: true,
    layout: 'post',
  })

</script>


<style scoped>
.title {
  position: absolute;
    max-width: 800px;
    left: 50%;
    transform: translate(-50%);
    bottom: 20px;
    font-size: 38px;
    width: 90%;
    z-index:22;
    max-width: 1000px;
}
.content{
  max-width: 1000px;
    width: 90%;
    
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 40px;
}

</style>
<style>
.content > p {
   margin-bottom: 10px !important;
}
a{color:#343434;}
.content > h1, .content > h2, .content > h3, .content > h4, .content > h5, .content > h6 {
   margin-bottom: 15px !important;
}</style>