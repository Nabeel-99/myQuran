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
            english_name: chapter.translated_name.name,
            pages: chapter.pages

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
const fetchPages = async(startingIndex: number) => {
    try {
        const response = await axios.get(`${BASE_URL}/quran/verses/uthmani?page_number=${startingIndex}`)
        const pageData = response.data.verses.map((verse:any) => ({
            aya: verse.text_uthmani,
            ayaNumber: verse.verse_key,
        }))
        return pageData
    } catch (error) {
        console.log
    }
}
export const renderPages = async(surahNumber: number) => {
    try {
        const surahList = await getSurahLists()
        const selectedSurah = surahList.find((surah: any) => surah.sura_number === surahNumber) 
        if(!selectedSurah){
            throw new Error(`surah number not found`)
        }
        const surahVersesByPage = []
        const [firstPage, lastPage] = selectedSurah.pages
        const suraNumber = selectedSurah.sura_number
        for(let pageNumber = firstPage; pageNumber <= lastPage; pageNumber++){
            const pageData = await fetchPages(pageNumber)

            const filteredPageData = pageData.filter((verse: any) => {
                const [surah, aya] = verse.ayaNumber.split(":").map(Number)
                return surah === surahNumber
            })
            if(filteredPageData.length > 0){
                surahVersesByPage.push({
                    pageData: filteredPageData, 
                    pageNumber, 
                    suraNumber,
                    isNewSurah: filteredPageData.some((verse: any) => verse.ayaNumber.split(":")[1] === "1"),
                })
                console.log(`Rendering page number: ${pageNumber}`);
                filteredPageData.forEach((verse: any) => {
                    console.log(`${verse.ayaNumber} ${verse.aya}`);
                });
            }
            
           
        }
        console.log(surahVersesByPage)
        return surahVersesByPage
    } catch (error) {
        console.log(error)
        return []
    }
}


