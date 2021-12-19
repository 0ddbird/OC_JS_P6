import { fixMediaTitles } from "../components/query.js";

export async function fixJsonAlts(jsonFile) {
    const jsonMediaArray = jsonFile.media;

    const fixedMedias = fixMediaTitles(jsonMediaArray)

    fixedMedias.forEach(media => {
        media.alt = media.title;
        media.altFullscreen = `${media.title} close-up view`;
    })

    console.log(fixedMedias);

}
