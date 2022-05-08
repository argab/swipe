export class SwipeService {

    #el
    #params = {}

    #diff = {x: 0, y: 0}
    #left
    #top
    #dir = {up: false, down: false, left: false, right: false}

    constructor (el, params = {
        direction: '',
        onStart: null,
        onEnd: null,
        onMove: null,
        fixed: false,
        fixedTimeout: 0,
    }) {
        this.#el = el
        this.#params = params
    }

    get el () {
        return this.#el
    }

    get top () {
        return this.#top
    }

    get left () {
        return this.#left
    }

    get params () {
        return {...this.#params}
    }

    get diff () {
        return {...this.#diff}
    }

    get dir () {
        return {...this.#dir}
    }

    get start () {
        const {width, height} = this.#el.getBoundingClientRect()
        return {
            x: this.#left + width,
            y: this.#top + height,
            width, height
        }
    }

    validate () {
        if (this.#params.direction && !['up', 'down', 'left', 'right'].includes(this.#params.direction)) {
            console.error('Invalid direction value.')
            return false
        }

        return !!Object.values(this.#params).some(v => v)
    }

    assignParams (params, x, y) {
        return {
            ...params,
            dir: {...this.#dir},
            diff: {...this.#diff},
            threshold: this.getThreshold({x, y})
        }
    }

    getThreshold ({x, y}) {

        const start = this.start
        const pos = this.getPos({x, y})

        let threshold = 0

        switch (this.#params.direction) {
            case 'left':
            case 'right':
                threshold = pos.x < start.x ? (pos.x / start.x * 100) : (start.x / pos.x * 100)
                break
            case 'up':
            case 'down':
                threshold = pos.y < start.y ? (pos.y / start.y * 100) : (start.y / pos.y * 100)
                break
        }

        return isNaN(threshold) || threshold < 0 ? 0 : threshold
    }

    onSwipeStart (params) {

        const {x, y} = params

        if (this.#left === undefined || this.#top === undefined) {
            const {left, top} = this.#el.getBoundingClientRect()
            this.#left = left
            this.#top = top
        }

        this.#diff.x = x > this.#left ? x - this.#left : this.#left - x
        this.#diff.y = y > this.#top ? y - this.#top : this.#top - y

        this.#params.onStart && this.#params.onStart(this.assignParams(params, x, y))
    }

    onSwipeEnd (params) {

        const {x, y} = params

        this.#params.onEnd && this.#params.onEnd(this.assignParams(params, x, y))

        this.#params.fixed && setTimeout(() => {
            if (['left', 'right'].includes(this.#params.direction)) this.setPos.left()
            if (['up', 'down'].includes(this.#params.direction)) this.setPos.top()
        }, +this.#params.fixedTimeout || 0)
    }

    onSwipeMove (params) {

        const {x, y, dir} = params

        this.#dir = dir

        if (this.#params.onMove && this.#params.onMove(this.assignParams(params, x, y)) === false) return false

        if (['left', 'right'].includes(this.#params.direction)) this.setPos.x(x)

        if (['up', 'down'].includes(this.#params.direction)) this.setPos.y(y)
    }

    checkPosX (posX) {
        const start = this.start
        if (this.#params.direction === 'left' && posX > start.x) return false
        return !(this.#params.direction === 'right' && (posX - start.width < start.x - start.width))
    }

    checkPosY (posY) {
        const start = this.start
        if (this.#params.direction === 'up' && posY > start.y) return false
        return !(this.#params.direction === 'down' && (posY - start.height < start.y - start.height))
    }

    getPos ({x, y}) {
        const {width, height} = this.#el.getBoundingClientRect()
        return {
            x: x + width - this.#diff.x,
            y: y + height - this.#diff.y,
            width, height
        }
    }

    get setPos () {
        return {
            x: (x) => {
                const pos = this.getPos({x})
                this.#el.style.left = (this.checkPosX(pos.x) ? x - this.#diff.x : this.#left) + 'px'
            },
            y: (y) => {
                const pos = this.getPos({y})
                this.#el.style.top = (this.checkPosY(pos.y) ? y - this.#diff.y : this.#top) + 'px'
            },
            left: () => {
                this.#el.style.left = this.#left + 'px'
            },
            top: () => {
                this.#el.style.top = this.#top + 'px'
            }
        }
    }

}
