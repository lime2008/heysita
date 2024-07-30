<template>
  <NuxtLayout name="page">
    
    <template #header>
      <pageHeader :url="LINK.style.image" :themeColor="LINK.style.themeColor">
        <template #default>
          <h1 class="title" :style="{color : LINK.style.color }">{{ LINK.style.title }}</h1>
        </template>
      </pageHeader>
    </template>
    <template #main>
     

			<div class="wrapper">
				<div class="display">
					<div v-for="link in LINK.links" class="box">
						<a :href=link.url target="_blank" class="link_detail">
							<div class="link_avatar" :style="{ backgroundImage: 'url(' + link.image + ')' }"></div>
							<div class="link_description">
								<h4>{{ link.name }}</h4>
								<p>{{ link.brief }}</p>
							</div>
						</a>
					</div>

				</div>
				<p style="margin:10px 0 20px 0;">已经隐匿于人海的朋友们:</p>
				<div class="display">
					<div v-for="link in LINK.brokens" class="box">
						<a :href=link.url target="_blank" class="link_detail">
							<div class="link_description">
								<h4>{{ link.name }}</h4>
								<p>{{ link.brief }}</p>
							</div>
						</a>
					</div>
				</div>
			</div>



			<comment pid="links" api="https://api.lihouse.xyz"/>
    </template>
    <template #footer>
      <div class="site_info"><p class="special_font">COPYRIGHT © 2022-2024 {{ SITE.author }}</p></div>
    </template>
  </NuxtLayout>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useAsyncData } from '#app'
import pageHeader from '../../components/pageHeader.vue'
const color = ref('')
const route = useRoute()
import comment from '../../components/comment.vue'
const url = ref('');
// 获取 SITE 数据
const { data: SITE } = await useAsyncData('site', () => import('../config/config').then(module => module.SITE))
const { data: LINK } = await useAsyncData('link', () => import('../config/config').then(module => module.LINK))

/*
useSeoMeta({
    title: `${SITE.value.title} - ${document.value.title}`,
    ogTitle: `${SITE.value.title} - ${document.value.title}`,
    description: document.value.body,
    ogDescription: document.value.body,
    ogImage: document.value.image || 'https://cdn-community.codemao.cn/47/community/d2ViXzMwMDFfNDk3MDQ3Ml8wXzE2NzEwODc3MTQ3MTRfNWNhMDJiYTM.png',
})
  */
  // 定义页面 meta 信息
  definePageMeta({
    layout: 'page',
  })

</script>


<style scoped>
code{
	overflow: scroll;
}
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
.link_description{
	  margin-left:10px;
	  width:calc(100% - 58px);
	}
	
	.link_avatar{
	  border-radius: 50%;
	  width:48px;
	  height:48px;
	  border-radius: 50%;
		background-position: 50%;
		background-size: cover;
		background-repeat: no-repeat;
	}
	.link_description > p {
	  font-size:14px;
	}
	.link_detail{
	  width:100%;
	  color: #666;
	  display: flex;
	  align-items: center;
	  padding:0.5px;
	}
	@media (min-width: 700px) {
	.box{width:calc(50% - 10px);}
	.box:nth-child(2n-1) {
	  margin-right:10px;
	}
	}
	
	
	@media (max-width: 700px) {
	.box{width:100%;}
	
	}
	
	.layer{
	  align-content: center;
	  padding:0 0 20px 0;
	}
	
	.box{
	  
	  padding: 10px;
	    background: #fff;
	    margin-bottom: 12.5px;
	    align-content: center;
	    display: flex;
	    flex-wrap: nowrap;
	    border-radius: 4px;
	    border: 1px solid #e4ecf3;
	    cursor: pointer;
	}
	.display{
	  display: flex;
	  flex-wrap: wrap;
	}
	.wrapper{
	  margin: 0 auto;
	  margin-top: 10px;
	}
	.box{
	  background-color: #ffffff;
	  border-radius: 5px;
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