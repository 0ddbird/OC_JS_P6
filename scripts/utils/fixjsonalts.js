import { getJsonData, fixMediaTitles } from "../components/query.js";

/**
 * Adds titles to video medias, adds alt and altFullscreen key/values for all medias.
 * @param {object} jsonFile 
 * @returns {promise} an object with all photographers and all medias (fixed).
 */
export async function fixJsonAlts(jsonFile) {
    let fullJson = jsonFile;
    const jsonMediaArray = jsonFile.media;

    let fixedMedias = fixMediaTitles(jsonMediaArray)

    fixedMedias.forEach(media => {
        media.alt = media.title;
        media.altFullscreen = `${media.title} close-up view`;
    })
    fullJson.media = fixedMedias;

    return JSON.stringify(fullJson);
}

/**
 * Creates a txt file and downloads it from the browser.
 * @param {object} content 
 * @param {string} fileName 
 * @param {string} contentType 
 */
export function download(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

const jsonData = await getJsonData();
const fixedJson = await fixJsonAlts(jsonData);
download(fixedJson, 'photographers-fixed.json', 'text/plain');