import { StyleSheet } from 'react-native';
import Normalize from './../../../helpers/Dimens';
import { Colors } from './../../../constants/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  container2: {
    marginHorizontal: 15
  },
  h8: {
    fontSize: Normalize(12),
    color: Colors.greyText,
    marginVertical: Normalize(5),
    marginHorizontal: Normalize(5),
    flexWrap: 'wrap',
    fontFamily: 'Outfit-Regular',
    textAlign: "center",
    lineHeight: 23
  },
  postTaskContainer: {
    marginVertical: '3%',
  },
  image: {
    width: Normalize(25),
    height: Normalize(25),
    marginVertical: Normalize(10),
    marginHorizontal: Normalize(10),
  },
});

export default styles;
