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
const getSurahJuz = async(juzNum:any) => {
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


