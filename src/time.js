import {Observable} from 'rx'

function makeTimeDriver(baseDate = Date.now()) {
  const baseTime =
    typeof baseDate.getTime === `function` ? baseDate.getTime() : baseDate
  const deltaTime = baseTime - Date.now()
  const toTime = () => Date.now() + deltaTime

  return function timeDriver() {
    return {
      interval: period => Observable.timer(0, period).map(toTime),
      timeout: delay => Observable.timer(delay).map(toTime),
      atTime: time => Observable.timer(new Date(time + deltaTime)).map(toTime),

      // TODO: setImmediate and requestAnimationFrame observables?
    }
  }
}

module.exports = {
  /**
   * Time Driver factory.
   *
   * This is a function which, when called, returns a Time Driver for Cycle.js
   * apps. The driver is also a function, and it takes an Observable of requests
   * (URL strings) as input, but those are currently not used, and returns an
   * object with methods to create timer observables.
   *
   * **Requests**. Ignored now.
   *
   * **Responses**. An object with properties `interval` and `timeout` to create
   * time based observables. `interval(delay)` will return an observable that
   * fires every `delay` milliseconds with the currect date as value. Will emit
   * directly after calling (differs from `setInterval`), no initial timeout.
   * `timeout(delay)` will fire the current date once after `delay`
   * milliseconds.
   *
   * All 'date' mentioned here will be timestamps (Number), not actual Date
   * objects! You can use a Date object as argument to makeTimeDriver though.
   *
   * @param {undefined|Date|Number} Optional date to use as 'now'. Useful for
   * tests. Default to the current date, as you would expect ;)
   * @return {Function} the Time Driver function
   * @function makeTimeDriver
   */
  makeTimeDriver,
}
