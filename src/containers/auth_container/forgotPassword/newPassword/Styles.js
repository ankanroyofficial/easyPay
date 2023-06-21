import {Col} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Colors} from '../../../../constants/colors';
import Normalize from '../../../../helpers/Dimens';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafc",
  },
  inputStyle: {
    width: '90%',
    alignSelf: 'center',
    height:Normalize(40),
    borderWidth: Normalize(1),
    borderColor: Colors.primary,
    borderRadius: 4,
    paddingLeft: Normalize(15),
    paddingRight: Normalize(10),
    marginVertical: Normalize(2),
    fontSize: Normalize(13),
    fontFamily: 'roboto-regular',
    color: '#000000'
  },
  submit: {
    width: '90%',
    backgroundColor:Colors.secondary,
    textAlign:'center',
    color:'#ffffff',
    fontSize:15,
    padding:Normalize(10),
    alignSelf: 'center',
    fontFamily:'roboto-medium',
    borderRadius:25,
    
    
  },
  textheading: {
    fontSize:16,
    fontFamily:'roboto-medium',
    width:'95%',
    alignSelf:'center',
    color:Colors.primary,
    marginBottom:Normalize(5)
  },
});

export default styles;
