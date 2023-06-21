import { View, Text, SafeAreaView, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import Header from '../../../../components/Header'
import Button from '../../../../components/Button';
import Normalize from '../../../../helpers/Dimens';
import { Colors } from '../../../../constants/colors';
import { fontfmliy } from '../../../../components/WhichFontFamily';

export default function MyVouchers() {
	return (
		<SafeAreaView style={{flex: 1}}>
			<Header back name={`My Vouchers`} />
			<View style={{paddingHorizontal: Normalize(8)}}>
				<Text style={styles.heading}>Add a new voucher</Text>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
					<TextInput
						style={styles.input}
						onChangeText={() => { }}
						placeholder="Enter new voucher code"
						placeholderTextColor={Colors.grey}
					/>
					<Button name="Add" style={{ flexGrow: 0.2, backgroundColor: Colors.primary }} />
				</View>
				<View style={{justifyContent: 'center', alignItems: 'center', height: "80%"}}>
					<Text style={{fontFamily: fontfmliy.bold, fontSize: Normalize(14)}}>No available vouchers</Text>
				</View>
			</View>
		</SafeAreaView>
	)
}


const styles = StyleSheet.create({
	input: {
		height: Normalize(40),
		borderWidth: 1,
		marginRight: Normalize(10),
		padding: 10,
		flexGrow: 0.8,
		borderColor: Colors.grey,
		borderRadius: Normalize(20) / 2,
		color: Colors.black,
		fontFamily: fontfmliy.bold,
	},
	heading: {
		fontSize: Normalize(15),
		fontFamily: fontfmliy.bold,
		paddingVertical: Normalize(9),
	}
});