import { StyleSheet } from 'react-native';
import Normalize from '../../../../helpers/Dimens';
import { Colors } from './../../../../constants/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  container2: {
    // height: Normalize(340),
    backgroundColor: "#f9fafc",
    paddingTop: Normalize(10),
  },
  h1: {
    fontSize: Normalize(13),
    color: Colors.black,
    marginVertical: Normalize(5),
    marginHorizontal: Normalize(11),
    fontFamily: 'Outfit-SemiBold',
    lineHeight: 25,
    textAlign: "justify"
  },
  h1A: {
    fontSize: Normalize(13),
    color: Colors.grey,
    marginBottom: Normalize(5),
    marginHorizontal: Normalize(11),
    fontFamily: 'Outfit-Medium',
    lineHeight: 25,
    textAlign: "justify"
  },
  h1B: {
    fontSize: Normalize(12),
    color: Colors.primary,
    fontFamily: 'Outfit-Medium',
    // lineHeight: 25,
    textAlign: "justify"
  },

  h2: {
    lineHeight: 25,
    fontSize: Normalize(11),
    color: Colors.greyText,
    marginVertical: Normalize(5),
    marginHorizontal: Normalize(11),
    fontFamily: 'Outfit-Regular',
    textAlign: "justify"
  },
  h3: {
    fontSize: Normalize(13),
    color: Colors.greyText,
    marginVertical: Normalize(5),
    // marginHorizontal: Normalize(25),
    marginLeft: Normalize(25),
    fontFamily: 'Outfit-Medium',
  },
  h33: {
    fontSize: Normalize(13),
    color: Colors.greyText,
    marginVertical: Normalize(5),
    // marginHorizontal: Normalize(25),
    fontFamily: 'Outfit-Medium',
    // marginLeft: Normalize(-2),
  }, h3A: {
    fontSize: Normalize(13),
    color: Colors.greyText,
    marginVertical: Normalize(5),
    // marginHorizontal: Normalize(25),
    fontFamily: 'Outfit-Medium',
    // marginLeft: Normalize(-2),
  },
  h5: {
    fontSize: Normalize(11),
    color: Colors.greyText,
    marginHorizontal: Normalize(5),
    marginVertical: Normalize(2.5),
    textAlign: 'center',
    fontFamily: 'Outfit-Regular',
    alignSelf: 'center'
  },
  h6: {
    fontSize: Normalize(14),
    color: Colors.black,
    marginVertical: Normalize(15),
    marginHorizontal: Normalize(2),
    fontFamily: 'Outfit-SemiBold',
  },
  h7: {
    fontSize: Normalize(12),
    color: Colors.greyText,
    // marginVertical: Normalize(5),
    marginHorizontal: Normalize(10),
    flexWrap: 'wrap',
    fontFamily: 'Outfit-Regular',
  },
  h8: {
    fontSize: Normalize(11),
    color: Colors.greyText,
    marginVertical: Normalize(5),
    marginHorizontal: Normalize(10),
    flexWrap: 'wrap',
    fontFamily: 'Outfit-Medium',
    textAlign: "center"
  },
  h9: {
    fontSize: Normalize(13),
    color: Colors.greyText,
    marginVertical: Normalize(10),
    marginHorizontal: Normalize(8),
    fontFamily: 'Outfit-SemiBold',
  },
  h10: {
    fontSize: Normalize(12),
    color: Colors.black,
    marginTop: Normalize(10),
    marginVertical: Normalize(5),
    marginHorizontal: Normalize(10),
    fontFamily: 'Outfit-SemiBold',
  },
  h11: {
    fontSize: Normalize(11),
    color: Colors.greyText,
    marginHorizontal: Normalize(10),
    fontFamily: 'Outfit-Regular',
  },
  textContainer: {
    flexDirection: 'row',
    marginHorizontal: Normalize(10),
    marginBottom: Normalize(5),
    justifyContent: 'flex-start',
  },
  postTaskContainer: {
    marginTop: '5%',
  },

  icon: {
    marginVertical: Normalize(5),
  },
  card: {
    width: Normalize(200),
    height: Normalize(195),
    borderRadius: Normalize(6),
    backgroundColor: Colors.white,
    marginHorizontal: Normalize(6),
    marginBottom: Normalize(20),
    marginTop: Normalize(20),
    elevation:Normalize(3),
  },
  card2: {
    width: Normalize(175),
    height: Normalize(150),
    borderRadius: Normalize(6),
    backgroundColor: Colors.white,
    marginHorizontal: Normalize(6),
    marginVertical: Normalize(10),
    elevation:Normalize(2),
  },
  cardView: {
    marginVertical: Normalize(5),
    borderTopLeftRadius: Normalize(6),
    borderTopRightRadius: Normalize(6),
    marginHorizontal: Normalize(5),
    backgroundColor: "#f5f5f5",
    width: Normalize(190),
    height: Normalize(120),
    overflow: 'hidden',
  },
  cardImage: {
    height: '100%',
    width: '100%',
  },
  cardContainer: {
    width: Normalize(115),
    height: Normalize(30),
    backgroundColor: Colors.shade,
    borderTopRightRadius: Normalize(15),
    borderBottomRightRadius: Normalize(15),
    marginVertical: Normalize(5),
    marginHorizontal: Normalize(5),
    flexDirection: 'row',
  },
  reversecardContainer: {
    width: Normalize(115),
    height: Normalize(30),
    backgroundColor: Colors.shade,
    borderTopLeftRadius: Normalize(15),
    borderBottomLeftRadius: Normalize(15),
    marginVertical: Normalize(5),
    marginHorizontal: Normalize(5),
    paddingRight: Normalize(25),
    flexDirection: 'row',
    justifyContent: "flex-end"
  },
  taskImage: {
    width: Normalize(40),
    height: Normalize(40),
    borderRadius: Normalize(100),
    zIndex: 1,
    position: 'absolute',
    left: '-5%',
    overflow: 'hidden',
  },
  cleanImage: {
    width: Normalize(80),
    height: Normalize(80),
    borderRadius: Normalize(100),
  },
  image: {
    width: Normalize(30),
    height: Normalize(30),
    marginVertical: Normalize(10),
    marginHorizontal: Normalize(10),
  },
  cardContainerView: {
    marginLeft: Normalize(10),
    marginTop: Normalize(5),
  },
  optionContainer: {
    marginVertical: Normalize(5),
    alignItems: 'center',
    width: `${100 / 3}%`,
  },
  taskRow: {
    marginVertical: Normalize(5),
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-evenly',
  },
  taskRow1: {
    marginVertical: Normalize(5),
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  iconImage: {
    width: Normalize(50),
    height: Normalize(50),
    borderRadius: Normalize(100),
  },
  bottomContainer: {
    marginHorizontal: Normalize(10),
    marginVertical: Normalize(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  reversebottomContainer: {
    marginVertical: Normalize(5),
    marginRight: Normalize(15),
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomcard: {

    width: Normalize(220),
    height: Normalize(180),
    borderRadius: Normalize(6),
    backgroundColor: Colors.white,
    marginHorizontal: Normalize(6),
    marginBottom: Normalize(10),
    marginTop: Normalize(10),
    elevation:Normalize(3),

  },
  bottomcardView: {
    width: Normalize(220),
    height: Normalize(120),
    borderTopLeftRadius: Normalize(6),
    borderTopRightRadius: Normalize(6),
    overflow: 'hidden',
  },
  bottomcardImage: {
    width: '100%',
    height: '100%',
  },
  optionContainer2: {
    marginTop: Normalize(20),
    alignItems: 'center',
    width: `${100 / 3}%`,
  },
  /////////////////////////////
  arrowButton: {
    height: "100%", width: Normalize(25), backgroundColor: "#f5f5f5", padding: Normalize(2), borderRadius: 10, elevation: 0.8, justifyContent: "center", alignItems: "center"
  },
  imageButton: {
    width: "85%", height: "85%", resizeMode: "contain"
  },
  h0: {
    fontSize: Normalize(12),
    color: Colors.greyText,
    fontFamily: 'Outfit-SemiBold',
  },
  customtab: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: '92%',
    width: '100%',
    height: Normalize(40),
    flexDirection: "row",
    justifyContent:"space-between"
  },
  tobedone: {
    height: "100%", width: "30%", justifyContent: "center", alignItems: "center"
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginVertical: Normalize(5)
  },
});

export default styles;
