
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import { engToPersian } from './EnglishToPersian';
import { numberWithCommas, numberWithCommasinParsian } from './NumberWithComma';



export const addCommaAndTranslateInPersian = (val,lang) => {
    // const { language } = useRtlContext();
    // console.log(val,lang)
    if (lang == "en") {
        return numberWithCommas(val)
    } else {
        return engToPersian(numberWithCommasinParsian(val))
    }
}