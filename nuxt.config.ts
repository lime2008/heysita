import fs from 'fs/promises'
import path from 'path'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/content'],
  hooks: {
    'nitro:config': async (nitroConfig) => {
      const contentRoutes = await generateContentRoutes()
      console.log('Generated content routes:', contentRoutes) // 添加日志输出
      if(nitroConfig.prerender?.routes !== undefined)
      nitroConfig.prerender.routes.push(...contentRoutes)
    else{
      console.log('插入失败！')
    }
    }
  },
  routeRules: {
    '/': { prerender: true }
  },
  compatibilityDate: '2024-07-20',
  app: {
    head: {
      script: [
        {
          innerHTML: `var _hmt = _hmt || [];(function() {var hm = document.createElement("script");hm.src = "https://hm.baidu.com/hm.js?94be709d0f8fcc3588729d88f8442fdc";var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(hm, s);})();`,
          type: 'text/javascript',
        }
      ],
      __dangerouslyDisableSanitizersByTagID: {
        'hmt-script': ['innerHTML']
      }
    }
  }
})

async function generateContentRoutes() {
  const contentDir = path.resolve(__dirname, 'content')

  async function getMarkdownFiles(dir) {
    const subdirs = await fs.readdir(dir)
    const files = await Promise.all(subdirs.map(async (subdir) => {
      const res = path.resolve(dir, subdir)
      return (await fs.stat(res)).isDirectory() ? getMarkdownFiles(res) : res
    }))
    return files.flat().filter(file => path.extname(file) === '.md')
  }

  try {
    const markdownFiles = await getMarkdownFiles(contentDir)
    console.log('Markdown files:', markdownFiles) // 添加日志输出

    const slugs = markdownFiles.map(file => {
      const relativePath = path.relative(contentDir, file)
      const slug = relativePath.replace(/\\/g, '/').replace(/\.md$/, '')
      return `/${slug}`
    })

    console.log('Generated slugs:', slugs) // 添加日志输出
    return slugs
  } catch (error) {
    console.error('Error reading content directory:', error)
    return []
  }
}
