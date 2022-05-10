const delegate = require('delegate');

/**
 * @param {String}   selector
 * @param {Function} handler
 * @param {Number}   delay en ms
 * @param {Number}   interval en ms
 */
export function whileClickingDown(selector, handler, delay, interval) {

    let intervalRef = null;
    let timeoutRef = null;

    delegate(document.body, selector, 'mousedown', event => {

        event.preventDefault();

        var element = this;
        
        handler.bind(element)(event);
        
        timeoutRef && clearTimeout(timeoutRef);
        timeoutRef = setTimeout(() => {
            intervalRef = setInterval(handler.bind(element), interval);
        }, delay);
    });


    delegate(document.body, selector, 'contextmenu', () => {
        timeoutRef  && clearTimeout(timeoutRef);
        intervalRef && clearInterval(intervalRef);
    });

    delegate(document.body, selector, 'mouseup mouseleave', () => {
        timeoutRef  && clearTimeout(timeoutRef);
        intervalRef && clearInterval(intervalRef);
    });
}
