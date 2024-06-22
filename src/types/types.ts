export interface Chapter{
    revelation_place: string;
    name_simple: string
    sura_number: number
    verses_count: number
    english_name: {name: string}
    pages: any[]
}

export interface Verse {
    verseId: any;
    verseNumber: any;
    verseImlaei: any;
    text: any;
}

export interface Translation{
    text: string
}

export interface UserData{
    email: string,
    firstName: string,
    lastName: string,
    password: string
  }

export interface Note {
    _id: string;
    note: string;
    suraNumber: number;
    createdAt: string;
    verseId: string
    verseText: string
    verseTranslation: string
   
}

export interface Question {
    _id: string;
    question: string;
    options: {
      A: string;
      B: string;
      C: string;
      D: string;
    };
    correct_answer: string;
  }

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
    chapterEnglish: string,
    book: string,
    englishNarrator: string
}

export interface Reciters{
    id: number,
    reciter_name: string
    style: string
}