import { Dimensions, StyleSheet } from 'react-native';
import Normalize from '../../../../../helpers/Dimens';
import {Colors} from '../../../../../constants/colors';
import { fontfmliy } from '../../../../../components/WhichFontFamily';
const { height, width } = Dimensions.get("window")
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,

  },
  customtab: {
    // flexDirection:rowOrRowreverse(language) ,
    height: Normalize(65),
    borderWidth: Normalize(1),
    borderColor: Colors.primary,
    alignSelf: 'center',
    width: '100%',
    borderRadius: 5,
    marginVertical: Normalize(10)
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: Normalize(5),
    marginTop: Normalize(5),
  },
  h1: {
    fontSize: Normalize(12),
    color: Colors.grey,
    marginVertical: Normalize(10),
    marginHorizontal: Normalize(10),
    fontFamily: fontfmliy.regular,
  },
  h2: {
    fontSize: Normalize(12),
    color: Colors.green2,
    textAlign: 'center',
    fontFamily: fontfmliy.regular,
    marginHorizontal: Normalize(3),
  },
  h3: {
    fontSize: Normalize(13),
    color: Colors.greyText,
    marginVertical: Normalize(5),
    marginHorizontal: Normalize(10),
  },
  h4: {
    fontSize: Normalize(14),
    color: Colors.primary,
    marginVertical: Normalize(5),
    marginHorizontal: Normalize(12),
    fontFamily: fontfmliy.bold,
  },
  h5: {
    fontSize: Normalize(13),
    color: Colors.greyText,
    marginVertical: Normalize(10),
    marginHorizontal: Normalize(12),
    fontFamily: fontfmliy.bold,
  },
  textContainer: {
    height: Normalize(25),
    borderRadius: Normalize(15),
    borderWidth: Normalize(1),
    flex: 1,
    borderColor: Colors.green2,
    marginVertical: Normalize(5),
    paddingHorizontal: Normalize(7),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 0.6,
    height: Normalize(40),
    borderColor: Colors.grey,
    borderRadius: 4,
    marginBottom: Normalize(5),
    paddingHorizontal: Normalize(10),
    alignSelf: 'center',
    width: '92%',
  },
  pickerContainer: {
    height: Normalize(45),
  },
  dropDownStyle: {
    borderWidth: Normalize(1),
    borderColor: Colors.grey,
    borderRadius: 4,
    alignSelf: 'center',
    width: '92%',
  },
  multiiInput: {
    borderWidth: 0.6,
    borderColor: Colors.grey,
    borderRadius: 4,
    height: Normalize(120),
    marginVertical: Normalize(5),
    marginHorizontal: Normalize(10),
    paddingHorizontal: Normalize(10),
    fontFamily: fontfmliy.regular,
    textAlignVertical: 'top',
  },
  btnStyle: {
    marginBottom: Normalize(10),
  },
});
export default styles;
