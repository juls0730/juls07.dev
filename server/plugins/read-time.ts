import { visit } from 'unist-util-visit'

const wpm = 225

export default defineNitroPlugin((nitroApp) => {
    nitroApp.hooks.hook('content:file:afterParse', (file) => {
        if (file._id.endsWith('.md')) {
            let wordCount = 0
            visit(file.body, (n: any) => n.type === 'text', (node) => {
                wordCount += node.value.trim().split(/\s+/).length
            })

            file.readTime = Math.ceil(wordCount / wpm)
        }
    })
})
