import { defineEventHandler } from 'h3'
import { serverQueryContent } from '#content/server'

export default defineEventHandler(async (event) => {
  try {
    const posts = await serverQueryContent(event).sort({ timestamp: -1 }).find()
    console.log('Fetched posts:', posts) // 添加日志输出
    return posts
  } catch (error) {
    return { error: 'Failed to fetch posts' }
  }
})
