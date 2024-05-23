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

export const fetchSurahTranslation = async(surahNum: number) => {
    try {
        const response = await axios.get(`${BASE_URL}/quran/translations/131?chapter_number=${surahNum}`)
        const translations = response.data.translations.map((translation: any, index: number) => ({
            verseTranslation: translation.text,
            aya: index + 1
        }))
     
        return translations
    } catch (error) {
        console.log(error)
    }
}
export const renderPages = async (surahNumber: any) => {
    try {
        const surahList = await getSurahLists();
        const selectedSurah = surahList.find((surah: any) => surah.sura_number === surahNumber);
        if (!selectedSurah) {
            throw new Error(`Surah number not found`);
        }

        const surahVersesByPage = [];
        const [firstPage, lastPage] = selectedSurah.pages;
        const translationData = await fetchSurahTranslation(surahNumber);

        for (let pageNumber = firstPage; pageNumber <= lastPage; pageNumber++) {
            const pageData = await fetchPages(pageNumber);

            const filteredPageData = pageData.filter((verse: any) => {
                const [surah] = verse.ayaNumber.split(":").map(Number);
                return surah === surahNumber;
            });

            const pageDataWithTranslations = filteredPageData.map((verse: any) => {
                const [, aya] = verse.ayaNumber.split(":").map(Number);
                const translation = translationData.find((tr: any) => tr.aya === aya);
                return {
                    ...verse,
                    translation: translation ? translation.verseTranslation : '',
                };
            });

            if (pageDataWithTranslations.length > 0) {
                surahVersesByPage.push({
                    pageData: pageDataWithTranslations,
                    pageNumber,
                    suraNumber: surahNumber,
                });
            }
        }

        return surahVersesByPage;
    } catch (error) {
        console.log(error);
        return [];
    }
};



