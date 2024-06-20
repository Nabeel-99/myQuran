import axios from "axios"
// import dotenv from "dotenv"
// dotenv.config()
const BASE_URL = 'https://hadithapi.com/api/sahih-bukhari/chapters?apiKey=$2y$10$VKs70oeESlxNl6SqW2q0nOlf543Qum224lrCXdi2VvAxEOUJagEO'
const HADITH_URL = 'https://hadithapi.com/api/hadiths/?apiKey=$2y$10$VKs70oeESlxNl6SqW2q0nOlf543Qum224lrCXdi2VvAxEOUJagEO'

export interface HadithChapter{
    id: number,
    chapterNumber: number,
    chapterEnglish: string,
    chapterArabic: string
}
export interface Hadiths{
    id: number,
    hadithNumber: number,
    hadithArabic: string,
    hadithEnglish: string,
    headingArabic: string,
    headingEnglish: string,
    chapterNumber: number,
    chapterArabic: string,
    chapterEnglish: string
}
export const getHadithLists = async() => {
    try {
        const response = await axios.get<{chapters: HadithChapter[]}>(`${BASE_URL}`)
        const dataResponse = response.data.chapters.map((hadith: any) => ({
            id: hadith.id,
            chapterNumber: hadith.chapterNumber,
            chapterEnglish: hadith.chapterEnglish,
            chapterArabic: hadith.chapterArabic
        }))
        return dataResponse
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getHadithChapters = async(chapterNum: number) => {
    try {
       const response = await axios.get<{hadiths: {data: Hadiths[]}}>(`${HADITH_URL}&book=sahih-bukhari&chapter=${chapterNum}`)
       const dataResponse = response.data.hadiths.data.map((hadith: any) => ({
            id: hadith.id,
            hadithNumber: hadith.hadithNumber,
            hadithArabic: hadith.hadithArabic,
            hadithEnglish: hadith.hadithEnglish,
            headingArabic: hadith.headingArabic,
            headingEnglish: hadith.headingEnglish,
            chapterNumber: hadith.chapter.chapterNumber,
            chapterArabic: hadith.chapter.chapterArabic,
            chapterEnglish: hadith.chapter.chapterEnglish
       }))
       return dataResponse
    } catch (error) {
        console.log(error)
        throw error
    }
}