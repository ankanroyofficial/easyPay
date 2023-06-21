import { StyleSheet } from 'react-native';
import Normalize from './../../../../../helpers/Dimens';
import { Colors } from './../../../../../constants/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  btnStyle: {
    marginBottom: Normalize(20),
    marginTop:Normalize(10)
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
