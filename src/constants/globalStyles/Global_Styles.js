import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Colors } from '../colors';
import Normalize from '../../helpers/Dimens';
import { fontfmliy } from '../../components/WhichFontFamily';

const globalstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: Normalize(16)
  },
  container_only_padding: {
    flex: 1,
    paddingHorizontal: Normalize(16)
  },
  textinput_onlyBox_Style: {
    width: '100%',
    alignSelf: 'center',
    borderWidth: Normalize(0.5),
    borderColor: Colors.disable_textinput_border,
    borderRadius: Normalize(4),
    marginVertical: Normalize(5),
    height: Normalize(42),
    flexDirection: "row",
    backgroundColor: "#FAFAFA",
    overflow: "hidden"
  },
  textinput_onlyText_Style: {
    fontSize: Normalize(11.5),
    fontFamily: fontfmliy.regular,
    color: Colors.textinput_inner_text,
    height: "100%",
    width: "100%",
    paddingHorizontal: Normalize(12),
    textAlignVertical: "center",
    paddingVertical: Platform.OS == "ios" ? "3%" : 0
  },
  textinput_onlyText_Style_No_textAlignVertical: {
    fontSize: Normalize(11.5),
    fontFamily: fontfmliy.regular,
    color: Colors.textinput_inner_text,
    paddingHorizontal: Normalize(12),
  },
  textinput_view_onlyText: {
    fontSize: Normalize(11.5),
    fontFamily: fontfmliy.regular,
    color: Colors.textinput_inner_text,
    paddingHorizontal: Normalize(12),
  },
  textinputStyle: {
    width: '100%',
    alignSelf: 'center',
    borderWidth: Normalize(0.5),
    borderColor: Colors.disable_textinput_border,
    borderRadius: Normalize(4),
    paddingHorizontal: Normalize(12),
    marginVertical: Normalize(5),
    height: Normalize(42),
    fontSize: Normalize(12),
    fontFamily: fontfmliy.regular,
    color: Colors.textinput_inner_text,
    backgroundColor: "#FAFAFA"
  },
  multiline_textinputStyle: {
    width: '100%',
    alignSelf: 'center',
    borderWidth: Normalize(0.5),
    borderColor: Colors.disable_textinput_border,
    borderRadius: Normalize(4),
    paddingHorizontal: Normalize(12),
    marginVertical: Normalize(5),
    height: Normalize(100),
    fontSize: Normalize(11),
    fontFamily: fontfmliy.regular,
    color: Colors.textinput_inner_text,
    backgroundColor: "#FAFAFA",
    textAlignVertical: "top"
  },
  multiline_only_text: {
    flex: 1,
    fontSize: Normalize(11.5),
    fontFamily: fontfmliy.regular,
    color: Colors.textinput_inner_text,
    textAlignVertical: "top"
  },
  textinput_Header_Style: {
    marginVertical: Normalize(5),
    fontSize: Normalize(12),
    fontFamily: fontfmliy.regular,
    color: Colors.greyText,
  },
  textInput_SubHeader: { color: Colors.grey, fontFamily: fontfmliy.regular, fontSize: Normalize(11), marginBottom: Normalize(3) },
  forgotpassBtnText: {
    fontSize: Normalize(11.5),
    color: "#6F7074",
    fontFamily: fontfmliy.regular,
    marginVertical: Normalize(5),
  },
  page_Header_Text: {
    fontSize: Normalize(20),
    fontFamily: fontfmliy.bold,
    color: Colors.greyText,
    marginVertical: Normalize(5)
  },
  page_SubHeader_Text: {
    fontSize: Normalize(12.5),
    fontFamily: fontfmliy.regular,
    color: Colors.grey,
    marginVertical: Normalize(5),
    lineHeight: Normalize(15)
  },
  socialIcon: {
    height: Normalize(28), width: Normalize(28), borderRadius: Normalize(28) / 2, justifyContent: "center", alignItems: "center"
  },
  imageFit: {
    height: "100%", width: "100%", resizeMode: "contain"
  },
  blue_Text: {
    fontSize: Normalize(13),
    fontFamily: fontfmliy.bold,
    color: Colors.primary,
  },
  grey_Text: {
    fontSize: Normalize(13),
    fontFamily: fontfmliy.bold,
    color: "#252A30",
    marginVertical: Normalize(5)
  },
  grey_Text_Outfit_Regular: {
    fontSize: Normalize(13),
    fontFamily: fontfmliy.regular,
    color: "#4D4E50",
    marginVertical: Normalize(5)
  },
  plantext_Outfit_Medium: {
    fontSize: Normalize(13),
    fontFamily: fontfmliy.bold,
    color: "#4D4E50",
  },
  dropdownText: {
    fontSize: Normalize(13),
    fontFamily: fontfmliy.bold,
    color: "#4D4E50",
  },
  dropdownHeader: {
    fontSize: Normalize(15),
    fontFamily: fontfmliy.bold,
    color: Colors.primary,
  },
  taskdetails_category_subcate: {
    fontSize: Normalize(13),
    fontFamily: fontfmliy.regular,
    color: "#62666B",
    marginBottom: Normalize(2)
  },
  plantext_roboto_regular: {
    fontSize: Normalize(11.5),
    fontFamily: fontfmliy.regular,
    color: "#62666B",
  },
  plantext_roboto_medium: {
    fontSize: Normalize(11.5),
    fontFamily: fontfmliy.bold,
    color: "#62666B",
  },
  plantext_roboto_bold: {
    fontSize: Normalize(11),
    fontFamily: fontfmliy.bold,
    color: "#62666B",
  },


  plantext_bold: {
    fontSize: Normalize(11),
    fontFamily: fontfmliy.bold,
    color: Colors.greyText,
  },


  plantext_regular: {
    fontSize: Normalize(11),
    fontFamily: fontfmliy.regular,
    color: Colors.greyText,
  },


  plantext_outfit_regular: {
    fontSize: Normalize(11.5),
    fontFamily: fontfmliy.regular,
    color: "#62666B",
  },
  plantext_outfit_semibold: {
    fontSize: Normalize(11.5),
    fontFamily: fontfmliy.bold,
    color: "#62666B",
  },


  // *****************taskcard***********
  taskContainer: {
    width: '99%',
    height: Normalize(110),
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: Normalize(5),
    overflow: "hidden",
    alignSelf: "center",
    marginBottom: Normalize(10),
    elevation: Normalize(2),
    paddingHorizontal: Normalize(5),
    paddingVertical: Normalize(12)
  },
  browser_taskContainer: {
    width: '90%',
    height: Normalize(110),
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: Normalize(8),
    overflow: "hidden",
    alignSelf: "center",
    marginTop: Normalize(10),
    elevation: Normalize(2),
    paddingHorizontal: Normalize(5),
    paddingVertical: Normalize(12)
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskicon: {
    width: Normalize(14),
    height: Normalize(14),
    marginRight: Normalize(3)
  },
  thumbContainer: {
    width: '30%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardBody: {
    width: '70%',
    justifyContent: 'space-between',
  },
  thumbIconStyle: {
    width: Normalize(53),
    height: Normalize(53),
    borderRadius: Normalize(30),
  },
  currency_font_bold: { fontFamily: fontfmliy.bold, fontSize: Normalize(15), color: "#4c5166", opacity: 0.8 },
  pleaseNote_font: {
    fontFamily: fontfmliy.bold,
    color: Colors.primary,
    fontSize: Normalize(11),
    marginLeft: Normalize(3)
  },
  pleaseNote_font_subheader: {
    fontFamily: fontfmliy.regular,
    color: Colors.grey,
    fontSize: Normalize(10),
    marginTop: Normalize(1)
  },
  imagesUploadBox: {
    borderWidth: 0.8,
    borderColor: Colors.primary,
    backgroundColor: Colors.disable_textinput_background,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
    width: '100%',
    marginTop: Normalize(5),
    marginBottom: Normalize(15),
    height: Normalize(100)
  },
  imagesUploadBox_icon: {
    height: Normalize(25),
    width: Normalize(25),
  }
});
export default globalstyles;
