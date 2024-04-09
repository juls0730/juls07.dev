import { serverQueryContent } from '#content/server'
import { streamToPromise } from 'sitemap'
import RSS from 'rss'

export default defineEventHandler(async (event) => {
  // Fetch all documents
  const docs = await serverQueryContent(event).where({ _draft: false }).find()
  const feed = new RSS({
    title: 'Juls07',
    description: 'Juls07\'s blogs',
    link: 'https://juls07.dev/blogs'
  })

  for (const doc of docs) {
    feed.item({
      title: doc.title,
      description: doc.description,
      url: `https://juls07.dev${doc._path}`,
      image_url: doc.image.src,
      date: doc.date
    })
  }

  return feed.xml({ indent: true })
})
