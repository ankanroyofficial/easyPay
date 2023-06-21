import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React, { Fragment } from 'react'
import Header from '../../../../../components/Header'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button'
import Button from '../../../../../components/Button'
import { Colors } from '../../../../../constants/colors'
import { fontfmliy } from '../../../../../components/WhichFontFamily'

export default function SelectTime() {
	// const [value, setValue] = React.useState(0)
	const [value, setValue] = React.useState({
		'10:00 - 11:00': false,
		'11:00 - 12:00': false,
		'12:00 - 13:00': false,
		'13:00 - 14:00': false,
		'14:00 - 15:00': false,
		'15:00 - 16:00': false,
	})

	const items = [
		{
			label: '10:00 - 11:00',
			value: 0
		},
		{
			label: '11:00 - 12:00',
			value: 1
		},
		{
			label: '12:00 - 13:00',
			value: 2
		},
		{
			label: '13:00 - 14:00',
			value: 3
		},
		{
			label: '14:00 - 15:00',
			value: 4
		},
		{
			label: '15:00 - 16:00',
			value: 5
		},
	]
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header back name="Select Time" />
			<View style={{ flexGrow: 1, padding: Normalize(10), flexDirection: 'column', justifyContent: 'space-between' }}>
				<RadioForm>
					{
						items.map((obj, index) => (
							<Fragment key={index}>

								<RadioButton key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
									<RadioButtonLabel obj={obj} index={index} labelStyle={{ fontSize: Normalize(14), fontFamily: fontfmliy.regular }} onPress={(value) => setValue({...value, [`${obj.label}`]: (!value[`${obj.label}`])})} />
									<RadioButtonInput
										obj={obj}
										index={index}
										borderWidth={1}
										isSelected={value[`${obj.label}`]}
										buttonInnerColor={Colors.red}
										buttonOuterColor={Colors.red}
										onPress={(value) => setValue({...value, [`${obj.label}`]: (!value[`${obj.label}`])})}
									/>

								</RadioButton>
								<View style={styles.seperatorLine} />
							</Fragment>
						))
					}
				</RadioForm>
				<View>
					<Button name="Save" style={{ backgroundColor: Colors.primary }} />
				</View>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	seperatorLine: {
		borderWidth: 0.4,
		borderBottomColor: Colors.grey,
		marginVertical: Normalize(10),
		marginHorizontal: -Normalize(13)
	},
})