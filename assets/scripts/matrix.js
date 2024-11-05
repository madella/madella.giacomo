const MAXWORDS = 3

class TextScramble {
    constructor(el) {
        this.el = el
        // █ ⟨⟩
        this.chars = 'µπ!<-_\\/()[]{}&?<—=^?#@________αβγδεηθΦκλνοπρστυφψω'
        this.update = this.update.bind(this)
    }

    splitSentence(words) {
        let sentences = [];
        if (words.length % MAXWORDS === 1) { // if there's only one word more
            sentences.push(words.slice(0, MAXWORDS).join(' '));
            sentences.push(words.slice(MAXWORDS).join(' '));
        } else {
            for (let i = 0; i < words.length; i += MAXWORDS) {
                sentences.push(words.slice(i, i + MAXWORDS).join(' '));
            }
        }

        return sentences;
    }

    setText(newText, start_Random, end_Random, braket) {
        let words = newText.split(' ');
        if (words.length > MAXWORDS && words[words.length - 1] != "♫") {
            let nnText = this.splitSentence(words);
            const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
            let promiseChain = Promise.resolve();

            nnText.forEach((sentence) => {
                promiseChain = promiseChain
                    .then(() => this.setSingleText(sentence, start_Random, end_Random, braket))
                    .then(() => delay(1000));
            });
            return promiseChain;
        } else {
            return this.setSingleText(newText, start_Random, end_Random, braket);
        }
    }

    setSingleText(text, start_Random, end_Random, braket) {
        const oldText = this.el.innerText;
        if (braket) {
            if (text === 'giacomo') {
                text = `⟨giacomo|`;
            } else if (text === 'madella') {
                text = `|madella⟩`;
            }
        }
        const length = Math.max(oldText.length, text.length);
        const promise = new Promise((resolve) => (this.resolve = resolve));
        this.queue = [];


        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = text[i] || '';
            const start = Math.floor(Math.random() * start_Random);
            const end = start + Math.floor(Math.random() * end_Random);
            this.queue.push({ from, to, start, end });
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = ''
        let complete = 0
        let delay = 25
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i]
            if (this.frame >= end) {
                complete++
                if (to === "|" || to === "⟨" || to === "⟩" || to === "♫") {
                    output += `<span class="dud">${to}</span>`
                }
                else {
                    output += to
                }
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
            delay += (Math.random() * 10) - 5
            this.frameRequest = setTimeout(() => {
                this.frame++
                this.update()
            }, delay)
        }
    }
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)]
    }
}
const phrases = [
    '>_',
    'giacomo',
    'madella'
]

const detti = [
    'Learn a trade for a rainy day',
    'How you do anything is how you do everything'
]

const phrases_mtrx = [
    "♫ Come as you are ♫",
    "♫ as you were ♫",
    "♫ as i want you to be ♫",
    "♫ as a friend ♫",
    "♫ as a friend ♫",
    "♫ as an old enemy ♫",
    "♫ take your time ♫",
    "♫ hurry up ♫",
    "♫ choice is yours ♫",
    "♫ don't be late ♫"
]
var entropy=0;
var effEntropy=0;
const el = document.querySelector('.text')
const fx = new TextScramble(el)
// var overFinished = true
let screen = $(window).width() > 250
// el.addEventListener('mouseover', () => {
//     if (overFinished && screen) {
//         entropy+=1;
//         overFinished = false;
//         effEntropy=((1.65*entropy)*effEntropy.toString().length).toFixed(2);
//         fx.setText(`S ≈ ${effEntropy}`, 50, 70, false).then(() => {
//             setTimeout(() => {overFinished = true;next();}, 3500);
//         })
//     }
// });

let anim="default"
let braket = false
let counter = 0
let previous = counter
let detti_counter = 0
let previous_detti = 0

//5.88 bits per character but 28% of char change
//1.65 bits per character ≈ 39.6 bits 

let next = () => {
    // if (!overFinished){return;}
    let rand = Math.random()
    screen = $(window).width() > 250
    switch (anim) {
        case "song": {
            fx.setText(phrases_mtrx[counter], 10, 30, false).then(() => {
                setTimeout(next, 1700)
            })
            counter = (counter + 1)
            if (counter > phrases_mtrx.length - 1) {
                anim="default"
                counter = 0
                previous = 0
                // overFinished = true;
            }
            break;
        }
        case "idiom": {
            do{
                detti_counter = Math.floor(Math.random() * detti.length)
            }
            while (detti_counter == previous_detti && detti.length > 1)
            fx.setText(detti[detti_counter], 10, 30, false).then(() => {
                setTimeout(next, 3500)
            })
            previous_detti = detti_counter
            // overFinished = true;
            break;
        }
        default: {
            fx.setText(phrases[counter], 50, 70, braket).then(() => {
                setTimeout(next, 3500)
            })
            while (previous == counter) {
                counter = Math.floor(Math.random() * phrases.length)
            }

            braket = rand < 0.33 && counter !== 0;

            previous = counter
            if (rand < 0.025 && screen) {
                anim = "idiom"
                // overFinished = false;
            } else if (rand < 0.025 && screen) {
                counter = 0;
                anim = "song"
                // overFinished = false;
            }
            break;
        }
    }
}
next()
