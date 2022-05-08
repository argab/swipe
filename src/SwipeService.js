export class SwipeService {

    #el
    #params = {}

    #diff = {x: 0, y: 0}
    #left
    #top
    #dir = {up: false, down: false, left: false, right: false}

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

    getPos (x, y) {
        const {width, height} = this.#el.getBoundingClientRect()
        const posX = x ?? this.#left
        const posY = y ?? this.#top
        return {
            x: x !== undefined ? posX + width - this.#diff.x : posX + width,
            y: y !== undefined ? posY + height - this.#diff.y : posY + height,
            width, height
        }
    }

    getThreshold ({x, y}) {

        const start = this.getPos()
        const pos = this.getPos(x, y)

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
            if (['left', 'right'].includes(this.#params.direction)) this.#el.style.left = this.#left + 'px'
            if (['up', 'down'].includes(this.#params.direction)) this.#el.style.top = this.#top + 'px'
        }, +this.#params.fixedTimeout || 0)
    }

    onSwipeMove (params) {

        const {x, y, dir} = params
        const start = this.getPos()
        const pos = this.getPos(x, y)

        this.#dir = dir

        if (this.#params.onMove && this.#params.onMove(this.assignParams(params, x, y)) === false) {
            return false
        }

        if (this.#params.direction === 'left' && dir.right && pos.x >= start.x-1) {
            return false
        }

        if (this.#params.direction === 'right' && dir.left && pos.x - pos.width <= start.x - pos.width+1) {
            return false
        }

        if (this.#params.direction === 'up' && dir.down && pos.y >= start.y-1) {
            return false
        }

        if (this.#params.direction === 'down' && dir.up && pos.y - pos.height <= start.y - pos.height+1) {
            return false
        }

        if (['left', 'right'].includes(this.#params.direction)) this.#el.style.left = x - this.#diff.x + 'px'

        if (['up', 'down'].includes(this.#params.direction)) this.#el.style.top = y - this.#diff.y + 'px'
    }

}
