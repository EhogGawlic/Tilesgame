/**
 * 
 * @param {String} startString 
 * @param {String} endString 
 * @param {Boolean} ignoreWhiteSpace 
 * @returns 
 */
String.prototype.getTextBetweenStrings = function(startString, endString, ignoreWhiteSpace) {
    let copy = this.splice(0,0)
    const startIndex = copy.indexOf(startString);
    if (startIndex === -1) {
        return '';
    }

    const endIndex = copy.indexOf(endString, startIndex + startString.length);
    if (endIndex === -1) {
        return '';
    }
    return ignoreWhiteSpace?copy.substring(startIndex + startString.length, endIndex).replace(/[ ]+/g, ""):copy.substring(startIndex + startString.length, endIndex);
}