import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React, { Fragment } from 'react'
import Header from '../../../../../components/Header'
import Button from '../../../../../components/Button'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button'
import { Colors } from '../../../../../constants/colors'
import { fontfmliy } from '../../../../../components/WhichFontFamily'


export default function SelectDay() {
	const [value, setValue] = React.useState({
		Monday: false,
		Tuesday: false,
		Wednesday: false,
		Thrusday: false,
		Friday: false,
	});
	const items = [
		{
			label: "Monday",
			value: 0
		},
		{
			label: "Tuesday",
			value: 1
		},
		{
			label: "Wednesday",
			value: 2
		},
		{
			label: "Thrusday",
			value: 3
		},
		{
			label: "Friday",
			value: 4
		},

	]
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header back name="Select Day" />
			<View style={{ flexGrow: 1, padding: Normalize(10), flexDirection: 'column', justifyContent: 'space-between' }}>
				<RadioForm>
					{
						items.map((obj, index) => (
							<Fragment key={index}>

								<RadioButton key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
									<RadioButtonLabel obj={obj} index={index} labelStyle={{ fontSize: Normalize(14), fontFamily: fontfmliy.regular }} onPress={() => setValue({...value, [`${obj.label}`]: (!value[`${obj.label}`])})} />
									<RadioButtonInput
										obj={obj}
										index={index}
										borderWidth={1}
										isSelected={value[`${obj.label}`]}
										buttonInnerColor={Colors.red}
										buttonOuterColor={Colors.red}
										onPress={() => setValue({...value, [`${obj.label}`]: (!value[`${obj.label}`])})}
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