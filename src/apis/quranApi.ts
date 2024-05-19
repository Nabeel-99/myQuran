import axios from "axios";

const BASE_URL = 'https://api.quran.com/api/v4';

export const getSurahLists = async() => {
    try {
        const response = await axios.get(`${BASE_URL}/chapters`)
        const dataRes = response.data.chapters.map((chapter:any) => ({
            revelationPlace: chapter.revelation_place,
            name_simple: chapter.name_simple,
            sura_number: chapter.id,
            verses_count: chapter.verses_count,
            english_name: chapter.translated_name.name

        }))
        return dataRes
    } catch (error) {
        console.log(`error fetching surah lists: ${error}`)
        throw error;
    }
}
const getSurahJuz = async(juzNum:number) => {
    try {
        const response = await axios.get(`${BASE_URL}/quran/verses/uthmani_simple?juz_number=${juzNum}`)
        const dataRes = response.data.verses[0]

        return dataRes
    } catch (error) {
        console.log(`error fetching juz`, error)
    }
}
export const fetchAllJuz = async() => {
    const allJuzData = []
    const surahName = await getSurahLists()
    for (let i = 1; i <=30; i++){
        const juzData = await getSurahJuz(i)
        if(juzData){
            allJuzData.push({
                juzNum: i,
                text: juzData,
                sura: surahName.english_name
            })
        }
    }

    return allJuzData
}
export const fetchAyat = async(surahNum: number) => {
    try {
        const response = await axios.get(`${BASE_URL}/quran/verses/uthmani?chapter_number=${surahNum}}`)
        const ayat = response.data.verses.map((aya: any) => ({
            verseId: aya.id,
            verseText: aya.text_uthmani_simple,
            verseNumber: aya.verse_key,
            verseImlaei: aya.text_imlaei,
            text: aya.text_uthmani
            
        }))
        return ayat
    } catch (error) {
        console.log(error)
    }
}


// export const getSurahAyat = async() => {
//     const allSurahAyat = []
//     for(let i = 1; i <= 114; i++){
//         const ayat = await fetchAyat(i)
//         if(ayat){
//             allSurahAyat.push({
//                 verses: ayat,
//                 surah: i
//             })
//         }
//     }
//     return allSurahAyat
   
// }
// get page
export const fetchPages = async() => {
    try {
        const response = await axios.get(`${BASE_URL}/page/1`)
        const pageData = response.data.data.ayahs.map((aya:any) => ({
            verseNumber: aya.numberInSurah,
            verseText: aya.text
        }))
        console.log(`fatiha: ${pageData.map((page: any) => {
            console.log(`${page.verseNumber}: ${page.verseText}`)
        }).join('')}`)
        return pageData
    } catch (error) {
        console.log
    }
}
