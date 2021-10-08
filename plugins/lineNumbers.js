import Prism from 'prismjs'
import 'prismjs/plugins/line-numbers/prism-line-numbers.js'
import 'prismjs/components/prism-bash.js'

export default {
  // ...
  mounted () {
    Prism.highlightAll()
  }
  // ...
}
