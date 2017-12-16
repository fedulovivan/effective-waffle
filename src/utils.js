
/*eslint-disable*/
/**
 * https://github.com/jkroso/parse-duration
 */
export const parseDuration = function(str) {

    var duration = /(-?\d*\.?\d+(?:e[-+]?\d+)?)\s*([a-zμ]*)/ig

    /**
     * conversion ratios
     */

    parse.nanosecond =
    parse.ns = 1 / 1e6

    parse.μs =
    parse.microsecond = 1 / 1e3

    parse.millisecond =
    parse.ms = 1

    parse.second =
    parse.sec =
    parse.s = parse.ms * 1000

    parse.minute =
    parse.min =
    parse.m = parse.s * 60

    parse.hour =
    parse.hr =
    parse.h = parse.m * 60

    parse.day =
    parse.d = parse.h * /*24*/8 // jira rate

    parse.week =
    parse.wk =
    parse.w = parse.d * /*7*/5 // jira rate

    parse.month = parse.d * (365.25 / 12)

    parse.year =
    parse.yr =
    parse.y = parse.d * 365.25

    /**
     * convert `str` to ms
     *
     * @param {String} str
     * @return {Number}
     */

    function parse(str){
      var result = 0
      str.replace(duration, function(_, n, units){
        units = parse[units]
          || parse[units.toLowerCase().replace(/s$/, '')]
          || 1
        result += parseFloat(n, 10) * units
      })
      return result
    }

    return parse(str);

};
/*eslint-enable*/

export default {};
