import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import Normalize from './../../helpers/Dimens';
import {Colors} from './../../constants/colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  imageContainer: {
    height: '40%',
    width: '100%',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  langCard: {
    borderRadius: 8,
    width: Normalize(140),
    height: Normalize(140),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: Normalize(1),
    borderColor: Colors.grey,
    marginVertical: windowHeight / 20,
    marginHorizontal: windowWidth / 50,
    elevation:Normalize(2),
    backgroundColor: Colors.white,
  },
  imageText: {
    width: Normalize(180),
    alignSelf: 'center',
    position: 'absolute',
    top: '10%',
  },
  languageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2%',
  },
  headingText: {
    fontSize: Normalize(15),
    textAlign: 'center',
    fontFamily: 'roboto-bold',
    marginTop: '10%',
  },
  textStyle: {
    fontSize: Normalize(14),
    textAlign: 'center',
    marginTop: '5%',
    fontFamily: 'roboto-regular',
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  continue: {
    width: '90%',
    alignSelf: 'center',
  },

  lanCardIcon: {
    height: Normalize(70),
    width: Normalize(70),
  },
  activeIcon: {},
  correctIconView: {
    backgroundColor: '#027CFC',
    opacity: 0.5,
    position: 'absolute',
    top: Normalize(19.5),
    borderRadius: Normalize(35),
  },
});

export default styles;
