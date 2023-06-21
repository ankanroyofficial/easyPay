import { StyleSheet } from 'react-native';
import Normalize from './../../../../../helpers/Dimens';
import { Colors } from './../../../../../constants/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  datePickerStyle: {
    height: "100%",
    width: "100%",
    justifyContent: "center"

  },
  dateSmallBox: {
    height: "100%",
    width: "31%",
    borderColor: Colors.borderColor,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  twoButton_totalview: {
    alignSelf: "center",
    flexDirection: 'row',
    width: "100%",
    height: Normalize(38),
    marginVertical: Normalize(5),
    justifyContent: "space-between"
  },
  twoButton_view: { height: "100%", width: "48%", justifyContent: "center", alignItems: "center", backgroundColor: "red", borderRadius: 8, borderColor: Colors.borderColor, borderWidth: 0.8, flexDirection: "row" },
  O_P_Buttontext: {
    fontSize: Normalize(13),
    fontFamily: 'Outfit-Regular',
  },
  timePickerText: {
    fontFamily: 'Outfit-Regular',
    color: Colors.greyText,
    fontSize: Normalize(18),
    marginVertical: Normalize(3),
    textAlign: "center"
  },
  timepickerTextView: {
    height: Normalize(130), width: "30%", backgroundColor: Colors.grayf5, elevation: Normalize(2), borderRadius: 10, paddingVertical: Normalize(3)
  },
  btnStyle: {
    marginBottom: Normalize(20),
    marginTop: Normalize(10)
  },
  iconStyle: {
    height: Normalize(22),
    width: Normalize(22),
  },
  galleryorcamera_icon: {
    height: Normalize(75), width: Normalize(75), borderRadius: Normalize(75) / 2, backgroundColor: Colors.grayf5, marginBottom: Normalize(5), justifyContent: "center", alignItems: "center"
  }
});
export default styles;
