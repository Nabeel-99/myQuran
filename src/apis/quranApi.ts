import axios from "axios";

const BASE_URL = 'http://api.alquran.cloud/v1';

export const getSurahLists = async() => {
    try {
        const response = await axios.get(`${BASE_URL}/surah`)
        console.log('response data data:', response.data.data)
        return response.data.data
    } catch (error) {
        console.log(`error fetching surah lists: ${error}`)
        throw error;
    }
}
const getSurahJuz = async(juzNum:number) => {
    try {
        const response = await axios.get(`${BASE_URL}/juz/${juzNum}`)
        const dataRes = response.data.data.ayahs[0]
        console.log(dataRes)
        return dataRes
    } catch (error) {
        console.log(`error fetching juz`, error)
    }
}
export const fetchAllJuz = async() => {
    const allJuzData = []
    for (let i = 1; i <=30; i++){
        const juzData = await getSurahJuz(i)
        if(juzData){
            allJuzData.push({
                juzNum: i,
                text: juzData
            })
        }
    }
    return allJuzData
}
const fetchAyat = async(surahNum: number) => {
    try {
        const response = await axios.get(`${BASE_URL}/surah/${surahNum}`)
        const ayat = response.data.data.ayahs.map((aya: any) => ({
            verseNumber: aya.numberInSurah,
            verseText: aya.text
        }))
        console.log(`ayat:`, ayat.map((aya: any) => {
            console.log(`${aya.verseNumber}: ${aya.verseText}`)
        }).join(''))
        return ayat
    } catch (error) {
        console.log(error)
    }
}

export const getSurahAyat = async() => {
    const allSurahAyat = []
    for(let i = 1; i <= 114; i++){
        const ayat = await fetchAyat(i)
        if(ayat){
            allSurahAyat.push({
                verses: ayat,
                surah: i
            })
        }
    }
    return allSurahAyat
   
}
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
