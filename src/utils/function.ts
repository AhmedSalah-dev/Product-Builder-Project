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