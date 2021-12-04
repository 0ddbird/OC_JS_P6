export async function storeCurrentData(galery) {
    sessionStorage.setItem('galery', JSON.stringify(galery));
}