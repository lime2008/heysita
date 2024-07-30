---
author: 珞佳
timestamp: 1722145285
title: nuxt content自动渲染文章页面 以及报错小记
slug: way_to_add_routes
image: https://cdn-community.codemao.cn/47/community/d2ViXzMwMDFfNzY5ODg3OV8wXzE3MjIxNzcyMzU0MTRfZDZiMTIzZGI.jpeg
themeColor: '#52525266'
tags:
  - release
preview: 暑假在忙中偷偷用nuxt重新改动了原来的博客，一开始想用astro的，可是发现astro真就html++，在pre-script外，用不了script，操纵页内元素也很难受，我终究放弃了，转为了nuxt。nuxt content很好用，它实现了相较于我之前的博客程序的无需手动在文章设置里增加文章，并且自动处理md文件，也是保持了seo友好的一贯性，但是有一点问题就是，他这个文章界面不会单独渲染？？我好不容易不用手动写一个ts去配置有哪些文章，但如果我要渲染的话我又要再写一遍类似配置，添加进routes。好嘛，搞半天还是白忙活，然后我就去搜，但是网上对于此的教程可谓是搜都搜不到一点...ps:官方文档也是抽象的，虽然我这个需求和文档没有什么关系
color: '#ffffff'
---
## 需求背景
暑假在忙中偷偷用nuxt重新改动了原来的博客，一开始想用astro的，可是发现astro真就html++，在pre-script外，用不了script，操纵页内元素也很难受，我终究放弃了，转为了nuxt。
nuxt content很好用，它实现了相较于我之前的博客程序的无需手动在文章设置里增加文章，并且自动处理md文件，也是保持了seo友好的一贯性，但是有一点问题就是，他这个文章界面不会单独渲染？？

## 需求实现
我好不容易不用手动写一个ts去配置有哪些文章，但如果我要渲染的话我又要再写一遍类似配置，添加进routes。好嘛，搞半天还是白忙活，然后我就去搜，但是网上对于此的教程可谓是搜都搜不到一点...
ps:官方文档也是抽象的，虽然我这个需求和文档没有什么关系

我终于终于，苦苦跟ai对代码，让他成功帮我写了一段node的读文件生成目录操作，话不多说，我还是贴上代码：
```typescript
import * as fs from 'fs/promises';
import * as path from 'path';
async function generateContentRoutes() {
  const contentDir = path.resolve(__dirname, 'content')
  async function getMarkdownFiles(dir: string): Promise<string[]> {
    const subdirs = await fs.readdir(dir);
    const files = await Promise.all(subdirs.map(async (subdir) => {
      const res = path.resolve(dir, subdir);
      return (await fs.stat(res)).isDirectory() ? getMarkdownFiles(res) : res;
    }));
    return files.flat().filter(file => path.extname(file) === '.md');
  }

  try {
    const markdownFiles = await getMarkdownFiles(contentDir)
    console.log('markdown files:', markdownFiles)
    const slugs = markdownFiles.map(file => {
      const relativePath = path.relative(contentDir, file)
      const slug = relativePath.replace(/\\/g, '/').replace(/\.md$/, '')
      return `/${slug}`
    })
    console.log('generated slugs:', slugs)
    return slugs
  } catch (error) {
    console.error('error reading content directory:', error)
    return []
  }
}
```
然后，你只需要在defineConfig里添加hooks选项:
```typescript
hooks: {
  'nitro:config': async (nitroConfig) => {
    const contentRoutes = await generateContentRoutes()
    if(nitroConfig.prerender?.routes !== undefined)
      nitroConfig.prerender.routes.push(...contentRoutes)
    else{
      console.log('failed to inject slugs')
    }
  }
},
```
最后，你在```npx nuxi generate```的时候，等待prerender完毕，可以惊喜的发现目录下渲染出来的文章页面，大功告成！

## 一些nuxt content相关问题
我在使用nuxt content的时候，配置文档驱动时，是写在nuxt.config.ts里的，也就是意味着“全局”的感觉，作为使用者来说，我觉得这并无不妥，并且官网文档中尚未提及配置这个的具体做法，也没有警告我不能这么做
所以，很不出意外的，在我打包预渲染的时候，报错了404，详细信息一点就是一个json的404，我当时花了半个多小时去删改代码，找错在哪，然后发现是这里，然后我上网搜，国内的对此收录是一点都没有
无奈之下，我终于鼓起勇气想去提issue，然后我试着搜了一下，然后还有很多这种情况遇到的，其中，我看到了一个国外老哥的评论，适合我这种情况的评论：

链接详见： [https://github.com/nuxt/content/issues/2644](https://github.com/nuxt/content/issues/2644)
> I think the problem has to do with this in the `nuxt.config.ts`:
> 
> ```typescript
> content: {
>   documentDriven: true
> },
> ```
> 
> It's being set globally. So it's going to affect the entire nuxt configuration globally. It will try to inject into all vue pages it finds. The documentation wasn't really clear, unfortunately, on this. But it's probably why it's an "option" to include. To clarify, it will inject in all vue page files (and not just the slug vue file) - which is exactly what you don't want. I personally feel this is a bug, but I can see "why" it's affecting all vue pages you don't want it to affect. I feel that setting `documentDriven` globally is only for people who aren't mixing and matching content with pages.
> 
> I would eliminate `"documentDriven: true"` from the `nuxt.config.ts` file altogether and simply set it in the respective slug file(s) where you want it to apply. i.e.:
> 
> ```typescript
> definePageMeta({
>   documentDriven: true
> })
> ```
> 
> This would also eliminate the need to set it "false" or override it on a page-by-page basis.


但是，正如他指出的“The documentation wasn't really clear, unfortunately, on this.”，我当时看到真是又激动又红温。是的，所以我改用在```[...slug].vue```文件中definePageMeta，打包终于不报错了！

如此，基于nuxt的博客文章系统大抵就定下来了，不会再作修改了，本文正是在新博客下的第一篇博文！
