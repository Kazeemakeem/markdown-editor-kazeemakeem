 
 
 export const convertContent = (markdownStringArr: string[]) => {
    const nodeArr = markdownStringArr.map((item: string, i: number, arr: string[]) => {
        if(item === '') return `<br/>`
        else if(item.slice(0,1) === '>') {
            const limiter: RegExp = /\[[\w\s]+\]/
            const anchor: string | null = item.match(limiter)![0].slice(1,-1)
            const link: string | null = item.match(/https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/)![0]
            const blockquoteArr = item.split(limiter)
            return `<blockquote>${blockquoteArr[0].slice(2)}<a href=${link}>${anchor}</a></blockquote>`}
        else if(item.slice(0,3) === '```') return `<pre><code>${item.slice(3,-3)
            .replace(/</g, '&lt')
            .replace(/>\s/g, '&gt\n ')
            .replace(/>&lt/g, '&gt\n&lt')
        }</code></pre>`
        else if(item.slice(0,1) === '-') {
        const ulArr = item.slice(1).split('-').map(listItem => `<li>${listItem.slice(1)}</li>`).join('')
            return(`<ul>${ulArr}</ul>`)
        }
        else if(item.slice(1,3) === '. ') {
            const olArr = item.slice(3).split('_').map(listItem => `<li>${listItem}</li>`).join('')
            return(`<ol>${olArr}</ol>`)
        }
        else if(item.slice(0,6) === '######') return `<h6>${item.slice(7)}</h6>`
        else if(item.slice(0,5) === '#####') return `<h5>${item.slice(6)}</h5>`
        else if(item.slice(0,4) === '####') return `<h4>${item.slice(5)}</h4>`
        else if(item.slice(0,3) === '###') return `<h3>${item.slice(4)}</h3>`
        else if(item.slice(0,2) === '##') return `<h2>${item.slice(3)}</h2>`
        else if(item.slice(0,1) === '#') return `<h1>${item.slice(2)}</h1>`
        else return `<p>${item}</p>`
    })

    return nodeArr
}
