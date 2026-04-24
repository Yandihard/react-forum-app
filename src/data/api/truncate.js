export function cleanHtml (html) {
  return html
    .replace(/(<br\s*\/?>\s*){2,}/gi, '<br>')
    .replace(/<div><br\s*\/?><\/div>/gi, '')
    .replace(/<div>\s*<\/div>/gi, '')
}

export function truncateHtml (html, maxLength = 200) {
  const cleaned = cleanHtml(html)

  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = cleaned

  let count = 0
  let finished = false

  function walk (node) {
    if (finished) return ''

    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent

      if (count + text.length <= maxLength) {
        count += text.length
        return text
      }

      const remaining = maxLength - count
      finished = true
      return text.slice(0, remaining) + '...'
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const tag = node.nodeName.toLowerCase()

      let inner = ''

      node.childNodes.forEach(child => {
        inner += walk(child)
      })

      if (!inner) return ''

      return `<${tag}>${inner}</${tag}>`
    }

    return ''
  }

  let result = ''

  tempDiv.childNodes.forEach(node => {
    result += walk(node)
  })

  return result
}
