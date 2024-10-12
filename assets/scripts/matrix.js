

class TextScramble {
    constructor(el) {
        this.el = el
        // █ ⟨⟩
        this.chars = 'µπ!<-_\\/()[]{}&?<—=^?#@________αβγδεηθΦκλνοπρστυφψω'
        this.update = this.update.bind(this)
    }

    splitSentence(words) {
        let sentences = [];
        for (let i = 0; i < words.length; i += 4) {
            sentences.push( words.slice(i, i + 4).join(' ') );
        }
        return sentences;
    }

    setText(newText, start_Random, end_Random,braket) {
        let words = newText.split(' ');
        if (words.length > 4) {
            let nnText = this.splitSentence(words);
            const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));    
            let promiseChain = Promise.resolve();
    
            nnText.forEach((sentence) => {
                promiseChain = promiseChain
                    .then(() => this.setSingleText(sentence, start_Random, end_Random, braket))
                    .then(() => delay(700));
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
                if (to === "|" || to === "⟨" || to === "⟩"){
                    output += `<span class="dud">${to}</span>`  
                }
                else{
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
            delay += ( Math.random() * 10 ) - 5
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
    let phrases = [
        '>_',
        'giacomo',
        'madella',
    ]

    let detti = [
        'Learn a trade for a rainy day' ,
    ]

    const phrases_mtrx = [
        "Come as you are",
        "as you were",
        "as i want you to be",
        "as a friend",
        "as a friend",
        "as an old enemy",
        "take your time",
        "hurry up",
        "choice is yours", 
        "don't be late"
    ]

    const el = document.querySelector('.text')
    const fx = new TextScramble(el)
 
    let braket=false
    let counter =  0
    let previous = counter
    let mtrx = false
    let detti_counter = 0
    let previous_detti = 0

    let next = () => {
        if (mtrx){
            fx.setText(phrases_mtrx[counter],10,30,false).then(() => {
            setTimeout(next, 900)
            })
            counter = (counter + 1) 
            if (counter > phrases_mtrx.length - 1){
                mtrx=false
                counter=0
            }
        }
        else if (Math.random() < 0.05 && $(window).width() > 250) {
            if (detti.length > 1){
                while (detti_counter == previous_detti ) {
                    detti_counter = Math.floor(Math.random() * detti.length)
                }
            }
            fx.setText(detti[detti_counter],10,30,false).then(() => {
                setTimeout(next, 3500)
                })
            previous_detti = detti_counter
        }
        else{
            if (Math.random() < 0.33){braket=true;}
            else {braket = false;}
            fx.setText(phrases[counter],50,70,braket).then(() => {
            setTimeout(next, 3500)
            })
            while (previous == counter){
            counter = Math.floor(Math.random() * phrases.length)
            }
            previous=counter
            if (Math.random() < 0.01 && $(window).width() > 250){ 
                counter=0;
                mtrx=true 
            }
        }
}
next()
