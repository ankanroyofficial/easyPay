import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '../../../../../components/Header';
// import strings from '../../../../constants/lng/LocalizedStrings';
import Normalize from '../../../../../helpers/Dimens';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../../../../constants/colors';
import { fontfmliy } from '../../../../../components/WhichFontFamily';



function HelpCenter(props) {
	return (
		<SafeAreaView style={{ flex: 1, }}>
			<Header back name={"Help Center"} />
			<View style={{ flex: 2, flexDirection: 'column', justifyContent: 'space-between' }}>
				<View style={styles.windowSpacing}>
					<Text style={styles.greeting}>Welcome!</Text>
					<Text style={[styles.smallText]}>Please feel free to contact us about any queries you may have</Text>
					<View style={styles.inlineView}>
						<Text style={styles.smallText}>Inquiry via email</Text>
						<TouchableOpacity onPress={() => props.navigation.navigate('InquiryViaEmail')}>
							<MaterialIcons name='email' size={Normalize(22)} color={Colors.red} />
						</TouchableOpacity>
					</View>
					<View style={styles.seperator} />
					<View style={styles.inlineView}>
						<Text style={styles.smallText}>Request a call</Text>
						<TouchableOpacity onPress={() => props.navigation.navigate('RequestCallback')}>
							<MaterialIcons name='call' size={Normalize(22)} color={Colors.red} />
						</TouchableOpacity>
					</View>
					<View style={styles.seperator} />
				</View>
				<View style={[styles.windowSpacing]}>
					<Text style={styles.smallText}>Notice a bug on the app or have some feedback? Let us know and help improve the EazyPay app</Text>
				</View>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	inlineView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	smallText: {
		fontSize: Normalize(13),
		fontFamily: fontfmliy.regular,
		marginVertical: Normalize(15)
	},
	windowSpacing: {
		paddingHorizontal: Normalize(10),
		paddingVertical: Normalize(16)
	},
	greeting: {
		fontSize: Normalize(18),
		fontFamily: fontfmliy.regular,
		marginBottom: Normalize(30)
	},
	seperator: {
		borderWidth: 0.5,
		borderColor: Colors.grey,
		marginHorizontal: -Normalize(10),
	}
})

export default HelpCenter;