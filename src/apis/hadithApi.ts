import axios from "axios"
import { API_ROUTE } from "./quranApi"
import { HadithChapter, Hadiths } from "../types/types"


export const getHadithLists = async() => {
    try {
        const response = await axios.get<{chapters: HadithChapter[]}>(`${API_ROUTE}/api/hadith`)
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


export const getHadithChapters = async (chapterNum: number) => {
    try {
        const response = await axios.get<{ hadiths: { data: Hadiths[] } }>(`${API_ROUTE}/api/hadith/${chapterNum}`);
        const dataResponse = response.data.hadiths.data.map((hadith: any) => ({
            id: hadith.id,
            hadithNumber: hadith.hadithNumber,
            hadithArabic: hadith.hadithArabic,
            hadithEnglish: hadith.hadithEnglish,
            headingArabic: hadith.headingArabic,
            headingEnglish: hadith.headingEnglish,
            chapterNumber: hadith.chapter.chapterNumber,
            chapterArabic: hadith.chapter.chapterArabic,
            chapterEnglish: hadith.chapter.chapterEnglish,
            book: hadith.book.bookName,
            englishNarrator: hadith.englishNarrator
        }));
        console.log(dataResponse);
        return dataResponse;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
