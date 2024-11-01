/**
 * 
 * @param {string} txt -the input text to be sliced 
 * @param {number} [max=50] -the max number before truncation
 * @returns -the sliced text, with an ellipsis (...) appended if truncation
 */
export function txtSlicer(txt:string, max: number = 50 ) {
    if (txt.length >= max) return `${txt.slice(0,max)}...`;
    return txt ;
}


/**
 *
 * @param {string} x - The numeric string to be formatted.
 * @returns {string} A formatted version of the input numeric string with commas as thousand separators.
 *
 */
export function numberWithCommas(x: string): string {
    return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }