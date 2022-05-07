import {SwipeElement} from "./SwipeElement";
import {SwipeService} from "./SwipeService";

export const VueSwipeDirective = (el, binding) => {

    if (!binding.value) return

    const isPlainObject = (value) => {
        return value !== undefined && value !== null && !Array.isArray(value) && typeof value !== 'function' && value instanceof Object
    }

    const data = isPlainObject(binding.value) ? binding.value : {}

    const modifiers = isPlainObject(binding.modifiers) ? binding.modifiers : {}

    const args = {}

    const {direction, onEnd, onStart, onMove, fixed, fixedTimeout} = data

    Object.keys(modifiers).forEach(arg => {

        if (['up', 'down', 'left', 'right'].includes(arg)) args.direction = arg

        if (arg.match(/fixed\s*:?/)) {

            args.fixed = true

            const timeout = arg.split(':')[1]?.trim()

            timeout && (args.fixedTimeout = +timeout)
        }

    })

    const swipe = new SwipeService(el, {
        direction: direction || args.direction,
        onStart,
        onEnd,
        onMove,
        fixed: fixed || args.fixed || false,
        fixedTimeout: fixedTimeout || args.fixedTimeout,
    })

    const swipeEl = new SwipeElement(el, swipe)

    swipe.validate() && swipeEl.addListeners()
}
