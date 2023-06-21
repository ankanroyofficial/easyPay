import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/colors';
import Normalize from '../helpers/Dimens';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function Header2({ name }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {/* back button */}

        <View style={styles.moreicon}>
          <TouchableOpacity
            style={{ height: '100%', width: '100%', justifyContent: 'center' }}
            // onPress={() => navigation.navigate('More')}
            onPress={() => navigation.openDrawer()}

          >
            <Ionicons name="menu" color={Colors.white} size={Normalize(24)} />
          </TouchableOpacity>
        </View>

        {/* Heading */}
        <View style={styles.view1}>
          <Text numberOfLines={1} style={styles.headingText}>
            {name}
          </Text>
        </View>
        <View style={styles.view2}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    height: Normalize(50),
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Normalize(8),
  },
  innerContainer: {
    flexDirection: 'row',
    marginHorizontal: Normalize(16),
  },
  headingText: {
    fontSize: Normalize(15),
    color: Colors.white,
    textAlign: 'center',
    fontFamily: 'roboto-medium',
  },
  view1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center",
  },
  view2: {
    width: '10%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  moreicon: {
    width: '10%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
