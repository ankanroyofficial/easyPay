import { StyleSheet } from 'react-native';
import { fontfmliy } from '../../../../components/WhichFontFamily';
import { Colors } from './../../../../constants/colors';
import images from './../../../../constants/images';
import Normalize from './../../../../helpers/Dimens';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  cardView: {
    paddingVertical: Normalize(8),
    backgroundColor: Colors.white,
    width: "90%",
    alignSelf: "center",
    flexDirection: 'row',
    marginTop: Normalize(8),
    elevation:Normalize(2),
    borderRadius: Normalize(8)
  },
  imageView: {
    width: '22%',
    alignItems: 'center',
    justifyContent: "center",
  },
  avatarStyle: {
    width: Normalize(54),
    height: Normalize(54),
    borderRadius: Normalize(27),
    marginTop: Normalize(10),
  },
  cardBodyView: {
   flex:1
  },
  nameSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameText: {
    fontSize: Normalize(13),
    fontFamily: fontfmliy.bold,
    color: Colors.primary,
  },
  dateText: {
    fontSize: Normalize(10),
    color: Colors.grey,
    fontFamily: fontfmliy.bold,
  },
  offeText: {
    fontSize: Normalize(12),
    color: Colors.grey,
    marginTop: Normalize(0),
    fontFamily: fontfmliy.regular,
  },
  taskTitle: {
    fontSize: Normalize(12),
    color: Colors.primary,
    fontFamily: fontfmliy.bold,
  },
  arrowButton: {
    height: "100%", width: Normalize(27), backgroundColor: "#f5f5f5", padding: Normalize(2), borderRadius: 10, elevation: 0.8, justifyContent: "center", alignItems: "center"
  },
  imageButton: {
    width: "85%", height: "85%", resizeMode: "contain"
  },
  h0: {
    fontSize: Normalize(12),
    color: Colors.greyText,
    fontFamily: fontfmliy.bold,
  },
});

export default styles;
