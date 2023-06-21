import { View, Text, SafeAreaView, Image, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import Header from '../../../../../components/Header';
import strings from '../../../../../constants/lng/LocalizedStrings';
import Normalize from '../../../../../helpers/Dimens';
import { Colors } from '../../../../../constants/colors';
import ProfileDetailsView from './ProfileDetailsView';
import Button from '../../../../../components/Button';
import { fontfmliy } from '../../../../../components/WhichFontFamily';

function InquiryViaEmail() {

	return (
		<SafeAreaView style={{ flex: 1, }}>
			<Header back name={strings.LMS.INQUIRYVIAEMAIL} />
				<ProfileDetailsView />

				<View
					style={{
						flexGrow: 1,
						padding: Normalize(13),
						flexDirection: 'column',
						justifyContent: 'space-between',
						marginTop: Normalize(15),
					}}>
					<View>
						<View>
							<Text style={styles.labelText}>Subject</Text>
							<TextInput
								style={styles.input}
								placeholderTextColor={Colors.grey}
								placeholder="Please write a subject for your inquiry"
							/>
						</View>
						<View style={{ marginTop: Normalize(30) }}>
							<Text style={styles.labelText}>How we can help you?</Text>
							<TextInput
								multiline
								numberOfLines={3}
								style={styles.input}
								placeholderTextColor={Colors.grey}
								placeholder="Please give details about your inquiry"
							/>
						</View>
					</View>
					<Button name="Send Inquiry" />
				</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	labelText: {
		fontFamily: fontfmliy.regular,
		color: Colors.grey,
	},
	input: {
		borderBottomWidth: Normalize(0.5),
		borderBottomColor: Colors.grey,
		color: 'black',
		fontFamily: fontfmliy.regular,
	}
})

export default InquiryViaEmail;
