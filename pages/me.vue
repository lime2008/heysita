<template>
  <NuxtLayout name="page">
    
    <template #header>
      <pageHeader url="https://cdn-community.codemao.cn/47/community/d2ViXzMwMDFfNzY5ODg3OV8wXzE3MjIzMzQ0OTc3NjFfZDI0YWFkNzE.jpeg" themeColor="#262d2f">
        <template #default>
          <h1 class="title" :style="{color : '#ffffff' }">关于我</h1>
        </template>
      </pageHeader>
    </template>
    <template #main>
     <p>你好啊，很高兴你发现了这一个页面，并且在读这一行字！</p>
	 <p>做一个简单的自我介绍的话，我叫珞佳，是阿卡林省份滴，家住长江边上</p>
	<p>出生于2008年，今年16岁啦，是男生，目前就读于高二（九月开学），是一个妥妥的牛马学生</p>
	<p>本站以后可能着重于发生活的牢骚，以及自己的瞎鼓捣记录</p>
	<p>本站的历程有个几年了，最早的网站搭建可以始于2020年，当时疫情期间对我来说是美妙的假期，天天只需要把电视开着放网课就好了，而我在旁边玩电脑则要担心家长<del>破门而入</del></p>
	<p>也是在这段时间，我建立了以wordpress支持的第一个网站，使用了来自skillcat的scliper主题，深深培养了我喜欢自己瞎弄，玩网页的爱好。虽说只是四年前，但是这四年间，从什么都不需要关心的小孩，到竞争激烈的高中生活，我感觉已经过去太久太久，每次看到从前自己的所做所为也都会<del>尴尬死</del>（既指翻看以前的说说，和以前的个人言行方面）</p>
	<p>或许你在WebArchieve上，还可以找到我的文章（），希望各位看完给我<del>留一点面子</del>（）</p>
	<p>如果把眼光拉回现在，拉回这个小站，那么由框架主导的小窝历史也比较久远。我曾经用纯html写了个万能模板，还是和php结合的。到了后来，用vue+elementplus设计了一套，前后端分离，后端还是php。再到后来，用纯vue设计了一套，信息都存储在md文件和ts文件内。再到现在，用nuxt+go实现了一套。至于换域名的原因，既是想换一个崭新的行头，同时也可以<del>优化本站SEO</del>。</p>
	<p>在这一路上，我遇到了很多人，有的甚至现在都还在保持联系。缘分还是非常微妙，令我印象深刻的有很多，在这里就不一一列举了！觉得能结识大家还是很幸运的！</p>
	<comment pid="about" api="https://api.lihouse.xyz"/>
    </template>
    <template #footer>
      <div class="site_info"><p class="special_font">COPYRIGHT © 2022-2024 {{ SITE.author }}</p></div>
    </template>
  </NuxtLayout>
</template>

<script setup>

import { useAsyncData } from '#app'
import comment from '../../components/comment.vue'
import pageHeader from '../../components/pageHeader.vue'

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
p{margin-bottom: 10px;}
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