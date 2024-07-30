<template>
  
  <NuxtLayout name="custom">
    <template #header>
      <div v-if="SITE && SOCIALS" class="header">
      <div class="avatar" :style="{ backgroundImage: 'url(' + SITE.avatar + ')' }"></div>
      <div class="info">
        <h2 class="special_font">{{ SITE.title }}</h2>
        <p class="special_font">{{ SITE.desc }}</p>
        <div class="social_media" style="margin-top: 10px;">
          <a v-for="item in SOCIALS.filter(social => social.active)" :key="item.name" :href="item.href" target="_blank">
            <div class="icon_mask" v-html="socialIcons[item.name]"></div>
            <!--<div class="icon" :style="{ backgroundImage: 'url(' + socialIcons[item.name] + ')' }"></div>-->
          </a>
        </div>
      </div>
    </div>
    </template>
    <template #main>
      <div class="post_container">
      <NuxtLink :to="'/post/' + item.slug" class="post" v-for="(item , index) in posts" :style="{ 'flex-direction': index % 2 === 0 ? 'row-reverse' : 'row'}" :key="item._path">
          <div class="thumb">
              <div class="thumb_img" :style="{ backgroundImage: 'url(' + (item.thumb ? item.thumb : item.image) + ')' }"></div>
          </div>
          <div class="post_info">
            <h2 class="post_title">{{ item.title }}</h2>
            <p class="post_preview">{{ item.preview }}</p>
          </div>
      </NuxtLink>
  
      </div>
    </template>
    <template #footer>
      <div class="site_info"><p class="special_font">COPYRIGHT © 2022-2024 {{ SITE.author }}</p></div>
    </template>
    
    
  </NuxtLayout>
  
  
</template>
<style>
.post_container > :first-child {
    margin-top: 0;
}
.post:hover {
  transform: translateY(1px);
  box-shadow: 0 1px 10px rgba(0,0,0,0.1);
}
.post {
  transition: all 0.2s ease;
}
.insight {
    margin-top: 10px;
}
.insight > p {
    margin-bottom: 5px;
    display: -webkit-box;
    overflow: hidden;
    color: #666;
    text-overflow: ellipsis;
    font-weight: 400;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}
.thumb {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
}

@media (max-width: 700px) {
    .thumb_img {
        height: 30vh;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        min-height:200px;
        background-position: 50%;
        background-size: cover;
        background-repeat: no-repeat;
    }
    .post_info{
  padding:15px 15px 15px 15px;
}
    .post {
      display:block;
        margin: auto;
        width: 90%;
        margin-top: 25px;
        max-width: 800px;
        border-radius: 5px;
        background-color: #fafafa;
        box-shadow: 0 0 10px #8989891a;
    }

    .quick_read {
        margin-top: 10px;
        padding: 0 15px 15px 15px;
    }

    .social_media {
        margin-top: 15px;
        justify-content: center;
    }
    .post_info > p , h3 {
        display: -webkit-box;
        
        overflow: hidden;
        color: #666;
        text-overflow: ellipsis;
        font-weight: 400;
        font-family: PingFangSC-Regular;
        -webkit-box-orient: vertical;
    }
    .post_title{
      -webkit-line-clamp: 2;
      font-size: 20px;
      margin-bottom: 5px;
    }
    .post_preview{
      font-size: 14px;
      -webkit-line-clamp: 7;
    }
}

@media (min-width: 700px) {
  .post_info{
  padding:15px 20px 15px 20px;
}
    .post_info > p , h3 {
        display: -webkit-box;
        
        overflow: hidden;
        color: #666;
        text-overflow: ellipsis;
        font-weight: 400;
        font-family: PingFangSC-Regular;
        -webkit-box-orient: vertical;
    }
    .post_title{
      -webkit-line-clamp: 2;
      font-size: 20px;
      margin-bottom: 5px;
    }
    .post_preview{
      font-size: 14px;
      -webkit-line-clamp: 10;
    }

    .post_info {
        flex: 50%;
    }
  
    .thumb {
        flex: 45%;
      
    }

    .thumb_img {
        height: 100%;
        background-position: 50%;
        background-size: cover;
        background-repeat: no-repeat;
    }

    .post {
        margin: auto;
        margin-top: 35px;
        width: 90%;
        max-width: 800px;
        border-radius: 5px;
        background-color: #fafafa;
        box-shadow: 0 0 10px #8989891a;
        display: flex;
        min-height: 250px;
        flex:50%;
        position:relative;
        overflow: hidden;
    }


}

</style>
<script setup>
import { useAsyncData } from 'nuxt/app'
import socialIcons from "../assets/socialIcons"
import '../styles/indexPage.css'

const { data: posts } = await useAsyncData('posts', async () => {
  const { data } = await useFetch('/api/getPost')
  return data.value || []
})

const { data: SITE } = await useAsyncData('site', () => import('../config/config').then(module => module.SITE))
const { data: SOCIALS } = await useAsyncData('socials', () => import('../config/config').then(module => module.SOCIALS))

useSeoMeta({
  title: SITE.value.title ,
  ogTitle: SITE.value.title,
  description: SITE.value.desc,
  ogDescription: SITE.value.desc,
  ogImage: SITE.value.avatar,
})
definePageMeta({
  layout: 'custom',
  backgroundImage: 'https://creation.codemao.cn/716/appcraft/IMAGE_hCwKPlsy1_1721876077573.jpg',
  themeColor: '#0006'
})
</script>
