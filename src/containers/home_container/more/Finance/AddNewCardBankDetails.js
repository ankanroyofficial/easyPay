import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import Header from '../../../../components/Header'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button'
import { Colors } from '../../../../constants/colors'
import Normalize from '../../../../helpers/Dimens';
import { fontfmliy } from '../../../../components/WhichFontFamily'
import Button from '../../../../components/Button'

export default function AddNewCardBankDetails() {
	const [values, setValues] = React.useState(0)
	const items = [
		{
			label: 'Add Maestro Card',
			value: 0,
		},
		{
			label: 'Add Visa/Master Card',
			value: 1,
		},
		{
			label: 'Add Bank Account (For Withdrawl Only)',
			value: 2
		}
	]
	return (
		<SafeAreaView style={{flex: 1}}>
			<Header back name={'Add New Card/Bank Details'} />
			<View style={{padding: Normalize(10), borderWidth: 1, flexGrow: 1, justifyContent: 'space-between',}}>
				<RadioForm>
					{
						items.map((obj, index) => {
							return (
								<>
									<RadioButton key={index} style={{marginVertical: Normalize(10)}}>
										<RadioButtonInput 
											obj={obj}
											borderWidth={1}
											isSelected={index == values}
											buttonInnerColor={Colors.red}
											buttonOuterColor={Colors.red}
											buttonWrapStyle={{ marginRight: Normalize(16) }}
											onPress={(value) => setValues(value)}
									  />
										<RadioButtonLabel 
											obj={obj}
											index={index}
											labelStyle={{fontSize: Normalize(14), fontFamily: fontfmliy.regular}} 
											onPress={(value) => setValues(value)}
										/>
									</RadioButton>
								</>
							)
						})
					}
				</RadioForm>
				<View>
					<Button name="Next" />
				</View>
			</View>
		</SafeAreaView>
	)
}