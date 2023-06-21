import { Dimensions, StyleSheet } from 'react-native';
import Normalize from '../../../../helpers/Dimens';
import { Colors } from '../../../../constants/colors';
import { fontfmliy } from '../../../../components/WhichFontFamily';
const { height, width } = Dimensions.get("window")
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  container2: {
    backgroundColor:Colors.white,
    flex: 1,
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: Normalize(5),
  },
  h0: {
    fontSize: Normalize(12),
    color: Colors.greyText,
    fontFamily: fontfmliy.bold,
  },
  h1: {
    fontSize: Normalize(12),
    color: Colors.green2,
    fontFamily: fontfmliy.bold,
  },
  hz: {
    fontSize: Normalize(12),
    color: Colors.grey,
    marginVertical: Normalize(10),
    marginHorizontal: Normalize(10),
    fontFamily: fontfmliy.regular,
  },
  h1A: {
    fontSize: Normalize(12),
    color: Colors.secondary,
    fontFamily: fontfmliy.bold,
  },
  h1B: {
    fontSize: Normalize(12),
    color: Colors.greyText,
    fontFamily: fontfmliy.bold,
  },
  hc: {
    fontSize: Normalize(13),
    color: Colors.greyText,
    fontFamily: fontfmliy.bold,
  },
  hd: {
    fontSize: Normalize(15),
    color: Colors.greyText,
    fontFamily: fontfmliy.bold,
  },
  h2: {
    fontSize: Normalize(11),
    color: Colors.greyText,
    fontFamily: fontfmliy.regular,
    maxWidth: "90%",
    lineHeight: Normalize(14)
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
    height: Normalize(17.5), width: Normalize(17.5), opacity: 0.8
  },
  arrowButton: {
    height: "100%", width: Normalize(27), backgroundColor: "#f5f5f5", padding: Normalize(2), borderRadius: 10, elevation: 0.8, justifyContent: "center", alignItems: "center"
  },
  imageButton: {
    width: "85%", height: "85%", resizeMode: "contain"
  },
  reviewh3: {
    fontSize: Normalize(10),
    fontFamily: fontfmliy.regular,
    color: '#636468',
    lineHeight: Normalize(13),
    marginTop: Normalize(5),
  },
});
export default styles;
