import { View, Text, SafeAreaView, StyleSheet, TextInput, ScrollView, Pressable, } from 'react-native'
import React, {Fragment} from 'react'
import Header from '../../../../../components/Header'
import strings from '../../../../../constants/lng/LocalizedStrings'
import ProfileDetailsView from './ProfileDetailsView'
import { Colors } from '../../../../../constants/colors';
import Button from '../../../../../components/Button'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { fontfmliy } from '../../../../../components/WhichFontFamily'

export default function RequestCallback(props) {

	const [value, setValue] = React.useState(0);

	const items = [
		{
			label: 'English',
			value: 0
		},
		{
			label: 'Hindi',
			value: 1
		},
		{
			label: 'Bengali',
			value: 2
		}
	]

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header back name={strings.LMS.REQUESTCALLBACK} />
			<ScrollView>
				<ProfileDetailsView />
				<View
					style={{
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
								placeholder="Please give details about your inquiry so we can know how best to help you"
							/>
						</View>
					</View>
					<View style={{ marginVertical: Normalize(14) }}>
						<Text style={{ marginVertical: Normalize(12) }}>Select Language</Text>
						<Text style={{ marginVertical: Normalize(8) }}>Please select which language you would like the callback to be in</Text>
						{/* <View style={styles.seperatorLine} /> */}
						<RadioForm>
							{
								items.map((obj, index) => (
									<Fragment key={index}>
										<View style={styles.seperatorLine} />
										<RadioButton key={index}>
											<RadioButtonInput
												obj={obj}
												index={index}
												borderWidth={1}
												isSelected={index == value}
												buttonInnerColor={Colors.red}
												buttonOuterColor={Colors.red}
												buttonWrapStyle={{ marginRight: Normalize(16) }}
												onPress={(value) => setValue(value)}
											/>
											<RadioButtonLabel obj={obj} index={index} labelStyle={{fontSize: Normalize(14), fontFamily: fontfmliy.regular}} />
										</RadioButton>
										{/* <View style={styles.seperatorLine} /> */}
									</Fragment>
								))
							}
						</RadioForm>
						<View style={[styles.seperatorLine, {borderWidth: Normalize(1)}]} />
					</View>
					<View>
						<Text>Schedule a call</Text>
						<Pressable onPress={() => props.navigation.navigate('SelectDay')}>
							<View style={styles.inlineView}>
								<Text style={{color: Colors.grey}}>Select Day</Text>
								<MaterialCommunityIcons name='calendar-text-outline' size={Normalize(20)} color={Colors.grey} />
							</View>
							</Pressable>
							<Pressable onPress={() => props.navigation.navigate('SelectTime')}>
							<View style={[styles.inlineView]}>
								<Text style={{color: Colors.grey}}>Select Time</Text>
								<MaterialCommunityIcons name='clock-time-four-outline' size={Normalize(20)} color={Colors.grey} />
							</View>
							</Pressable>
					</View>
					<Button name="Request Callback" />
				</View>
			</ScrollView>
		</SafeAreaView>
	)
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
	},
	seperatorLine: {
		borderWidth: Normalize(0.5) / 2,
		borderBottomColor: Colors.lightGrey,
		marginVertical: Normalize(10),
		marginHorizontal: -Normalize(13)
	},
	inlineView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderWidth: 0.5, 
		padding: Normalize(10),
		marginVertical: Normalize(10),
	}
})