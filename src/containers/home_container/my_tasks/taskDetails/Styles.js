
import { StyleSheet } from 'react-native';
import Normalize from '../../../../helpers/Dimens';
import { Colors } from '../../../../constants/colors';
import { fontfmliy } from '../../../../components/WhichFontFamily';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    // "#f9fafc"
  },
  thumbIconStyle: {
    width: Normalize(55),
    height: Normalize(55),
    alignSelf: 'center',
    borderRadius: (Normalize(55) / 2)
  },
  heading: {
    fontSize: Normalize(14),
    fontFamily: fontfmliy.bold,
    width: '70%',
    color: '#38393e'
  },
  textpb: {
    fontSize: Normalize(10),
    fontFamily: fontfmliy.regular,
    color: '#38393e'
  },
  textname: {
    fontSize: Normalize(13),
    fontFamily: fontfmliy.regular,
    color: Colors.primary
  },
  texttime: {
    fontSize: Normalize(8),
    fontFamily: fontfmliy.regular,
    color: '#818181'

  },
  textcategory: {
    fontSize: Normalize(11),
    fontFamily: fontfmliy.regular,
    color: '#818181',
    lineHeight: Normalize(14),
    // textAlign:"right"

  },
  textcategory22: {
    fontSize: Normalize(11),
    fontFamily: fontfmliy.regular,
    color: '#818181',
    lineHeight: Normalize(14)

  },
  textcategory2: {
    fontSize: Normalize(14),
    marginVertical: Normalize(5),
    alignSelf: 'center',
    fontFamily: fontfmliy.regular,
    color: '#818181'
  },
  textfurniture: {
    fontSize: Normalize(14),
    fontFamily: fontfmliy.bold,
    color: '#636468'
  },
  textremote: {
    fontSize: Normalize(14),
    fontFamily: fontfmliy.bold,
    color: '#636468',
  },
  textremote2: {
    fontSize: Normalize(13),
    fontFamily: fontfmliy.bold,
    color: '#636468'
  },

  iconStyle: {
    width: Normalize(22),
    height: Normalize(22),
    marginHorizontal: Normalize(5),
    alignSelf: 'center',
    marginRight: 8

  },
  iconStyle2: {
    width: Normalize(22),
    height: Normalize(22),
    marginHorizontal: Normalize(5),
    marginRight: 8,
    opacity: 0.9

  },
  iconStyle3: {
    width: Normalize(19),
    height: Normalize(19),
    marginHorizontal: Normalize(5),

  },
  containermakeoffer: {
    width: '99%',
    height: Normalize(155),
    marginTop: Normalize(20),
    alignSelf: 'center',
    borderRadius: Normalize(8),
    elevation: Normalize(1.5),
    backgroundColor: Colors.white,
    borderColor: Colors.disable_textinput_border,
    borderWidth: Normalize(1),

  },
  elevtion_view: {
    borderRadius: Normalize(8),
    backgroundColor: Colors.white,
    elevation: Normalize(1.5),
  },
  viewallproposal: {
    width: '90%',
    padding: Normalize(10),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Normalize(15),
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    borderColor: Colors.grey,
    borderRadius: 50,
    borderWidth: .6,
    marginBottom: Normalize(30)

  },
  priceText: {
    fontSize: Normalize(22),
    color: '#38393e',
    fontFamily: fontfmliy.bold,
  },
  submit: {
    width: 220,
    textAlign: 'center',
    color: Colors.primary,
    fontFamily: fontfmliy.bold,
    fontSize: Normalize(13),
    alignSelf: 'center',
    borderRadius: 20,


  },
  submitoffer: {
    width: 220,
    textAlign: 'center',
    color: Colors.white,
    backgroundColor: Colors.secondary,
    fontFamily: fontfmliy.bold,
    fontSize: Normalize(13),
    padding: Normalize(5),
    alignSelf: 'center',
    borderRadius: 20,


  },
  headingservice: {
    fontSize: Normalize(14),
    fontFamily: fontfmliy.bold,
    width: '100%',
    color: '#38393e',
    marginBottom: 10
  },
  lineStyle22: {
    borderWidth: 0.2,
    borderColor: Colors.lightGrey,
    height: .5,
  },
  menuText: {
    fontSize: Normalize(12),
    fontFamily: fontfmliy.regular,
    color: Colors.greyText
  },
  galleryorcamera_icon: {
    height: Normalize(75), width: Normalize(75), borderRadius: Normalize(75) / 2, backgroundColor: Colors.disable_textinput_background, marginBottom: Normalize(5), justifyContent: "center", alignItems: "center"
  }

});

export default styles;
