import { StyleSheet } from 'react-native';
import { Colors } from '../../../../constants/colors';
import Normalize from '../../../../helpers/Dimens';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  lineStyle22: {
    marginLeft: 15,
    marginRight: 15,
    borderWidth: 0.2,
    borderColor: Colors.lightGrey,
    height: .5,
  },
  textcategory22: {
    fontSize: Normalize(11),
    fontFamily: 'Outfit-Regular',
    color: '#818181',
    lineHeight: 23
  },
  reviewh3: {
    fontSize: 12,
    fontFamily: 'Outfit-Regular',
    color: '#636468',
    lineHeight: 22,
    marginTop: Normalize(0),
  },
});

export default styles;
