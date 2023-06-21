import {initializeRTL} from 'react-native-easy-localization-and-rtl';
import LocalizedStrings from 'react-native-localization';
import en from './en';
import pr from './pr';

let strings = new LocalizedStrings({
  en: en,
  pr: pr,
});

initializeRTL(strings);

export default strings;
