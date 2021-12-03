/**
 * Sums up the total of likes in an array.
 * @param {array} galery and array of objects (medias)
 * @returns {number} a sum of the "likes" values of every object in the array.
 */
export async function computeLikes(galery) {
    return galery.reduce((acc, curr) => acc + curr.likes, 0);
}