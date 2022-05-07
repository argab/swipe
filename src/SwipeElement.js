import {SwipeService} from "./SwipeService";

export class SwipeElement {

    el
    #swipeService

    start
    end
    x
    y
    period = 0
    isEnd = false

    constructor (el, swipeService) {
        this.el = el
        this.#swipeService = swipeService instanceof SwipeService ? swipeService : null
    }

    setPeriod () {
        if (this.isEnd) return this.period = 0
        this.period += 10
        setTimeout(this.setPeriod, 1)
    }

    assignParams (x, y, dir, event) {
        return {
            x, y, period: this.period, dir, event,
            startX: this.start.clientX,
            startY: this.start.clientY
        }
    }

    addListeners () {
        this.el.addEventListener('touchstart', (event) => {
            this.start = this.end = event.touches[0]
            this.setPeriod()
            this.#swipeService?.onSwipeStart(this.assignParams(this.start?.clientX, this.start?.clientY, this.getDirection(event), event))
        }, false)

        this.el.addEventListener('touchend', (event) => {
            this.isEnd = false
            this.end ||= event.touches[0]
            this.#swipeService?.onSwipeEnd(this.assignParams(this.end?.clientX, this.end?.clientY, this.getDirection(event), event))
        }, false)

        this.el.addEventListener('touchmove', (event) => {
            this.x = event.touches[0]?.clientX
            this.y = event.touches[0]?.clientY
            this.end ||= event.touches[0]
            return this.#swipeService?.onSwipeMove(this.assignParams(this.x, this.y, this.getDirection(event), event))
        }, false)
    }

    getDirection (event) {
        this.x = event.touches[0]?.clientX
        this.y = event.touches[0]?.clientY
        const dir = {
            right: this.x > this.end?.clientX,
            left: this.x < this.end?.clientX,
            up: this.y < this.end?.clientY,
            down: this.y > this.end?.clientY,
        }
        this.end = event.touches[0]
        return dir
    }
}
