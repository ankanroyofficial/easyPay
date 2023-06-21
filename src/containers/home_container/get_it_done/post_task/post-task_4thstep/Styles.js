import { StyleSheet } from 'react-native';
import Normalize from './../../../../../helpers/Dimens';
import { Colors } from './../../../../../constants/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    // height: Dimensions.get("window").height,
  },
  btnStyle: {
    marginVertical: Normalize(15),
  },
  twoButton_totalview: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    width: '100%',
    height: Normalize(38),
    marginTop: Normalize(2),
    marginBottom: Normalize(8),
    borderRadius: Normalize(10),
    overflow: "hidden",
  },
  twoButton_view: {
    height: '100%',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  O_P_Buttontext: {
    fontSize: Normalize(13),
    fontFamily: 'AvenirNextLTPro-Regular',
  }
});
export default styles;
