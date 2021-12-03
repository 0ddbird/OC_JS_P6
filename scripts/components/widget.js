export async function computeLikes(galeryArray) {
    return galeryArray.reduce((acc, curr) => acc + curr.likes, 0);
}