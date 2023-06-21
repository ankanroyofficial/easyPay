import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '../../../../constants/colors';
import Toast from 'react-native-simple-toast';
import { fontfmliy } from '../../../../components/WhichFontFamily';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function FinanceButton({props}) {
	return (
		<View
			style={{
				flexDirection: 'row',
				justifyContent: 'space-between',
			}}>
			<TouchableOpacity style={styles.buttonStyle} onPress={() => props.navigation.navigate("AddBank")}>
				<FontAwesome name='money' />
				<Text style={styles.buttonText}>
					Withdraw Money
				</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.buttonStyle}>
				<FontAwesome name='money' />
				<Text style={styles.buttonText}>
					Deposit Money
				</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	buttonStyle: {
		width: '45%',
		height: Normalize(32),
		borderRadius: Normalize(5),
		marginVertical: Normalize(10),
		alignSelf: 'center',
		backgroundColor: Colors.white,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	buttonText: {
		fontSize: Normalize(14),
		color: Colors.black,
		fontFamily: fontfmliy.bold,
	}
})