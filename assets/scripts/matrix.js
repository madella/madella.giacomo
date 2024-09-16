

class TextScramble {
constructor(el) {
    this.el = el
    // █
    this.chars = 'µπ!<-_\\/()[]{}&?<—=^?#@________'
    this.update = this.update.bind(this)
}
setText(newText) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise((resolve) => this.resolve = resolve)
    this.queue = []
    for (let i = 0; i < length; i++) {
    const from = oldText[i] || ''
    const to = newText[i] || ''
    const start = Math.floor(Math.random() * 50)
    const end = start + Math.floor(Math.random() * 70)
    this.queue.push({ from, to, start, end })
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
}
update() {
    let output = ''
    let complete = 0
    let delay = 25
    for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i]
        if (this.frame >= end) {
            complete++
            output += to
        } else if (this.frame >= start) {
            if (!char || Math.random() < 0.28) {
                char = this.randomChar()
                this.queue[i].char = char
                }
            output += `<span class="dud">${char}</span>`
        } else {
            output += from
        }
    }
    this.el.innerHTML = output
    if (complete === this.queue.length) {
        this.resolve()
    } else {
        // this.frameRequest = requestAnimationFrame(this.update)
        // this.frame++
        delay += ( Math.random() * 10 ) - 5
        this.frameRequest = setTimeout(() => {
            this.frame++
            this.update()
        }, delay) // Aggiungi un ritardo di 50ms tra ogni frame
    }
}
randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
}
}
let phrases = [
'>_',
'giacomo',
'madella',
]
const phrases_mtrx = [
'\"sooner or later',
'you\'re going to realize',
'that there\'s a difference',
'between knowing the path',
'and walking the path\"',
'Matrix'
]

const el = document.querySelector('.text')
const fx = new TextScramble(el)

let counter =  0
let previous = counter
let mtr = false
if (Math.random() < 0.001){ mtr=true }

let next = () => {
if (mtr){
    fx.setText(phrases_mtrx[counter]).then(() => {
    setTimeout(next, 800)
    })
    counter = (counter + 1) 
    if (counter > phrases_mtrx.length - 1){
    mtr=false
    counter=0
    }
}
else {
    fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 1200)
    })
    while (previous == counter){
    counter = Math.floor(Math.random() * phrases.length)
    }
    previous=counter
}
}
next()
