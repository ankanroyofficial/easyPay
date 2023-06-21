import { View, Text, SafeAreaView, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import Header from '../../../../components/Header'
import globalstyles from '../../../../constants/globalStyles/Global_Styles'
import { Colors } from '../../../../constants/colors'
import Normalize from '../../../../helpers/Dimens';
import { fontfmliy } from '../../../../components/WhichFontFamily'
import Button from '../../../../components/Button'

export default function AddBank() {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header back name={'Add Bank'} />
			<View style={{paddingHorizontal: Normalize(16), flexDirection: 'column', justifyContent: 'space-evenly', flexGrow: 1 }} >
				<View>
					<Text style={styles.inputLabel}>
						Owner name*
					</Text>
					<TextInput
						placeholderTextColor={Colors.textinput_inner_text}
						style={styles.input}
						placeholder={"Owner name"}
					/>
				</View>
				<View>
					<Text style={styles.inputLabel}>
						IBAN*
					</Text>
					<TextInput
						placeholderTextColor={Colors.textinput_inner_text}
						style={styles.input}
						placeholder={"IBAN"}
					/>
				</View>
				<View>
					<Text style={styles.inputLabel}>
						BIC*
					</Text>
					<TextInput
						placeholderTextColor={Colors.textinput_inner_text}
						style={styles.input}
						placeholder={"BIC"}
					/>
				</View>
				<View>
					<Text style={styles.inputLabel}>
						Address Line 1*
					</Text>
					<TextInput
						placeholderTextColor={Colors.textinput_inner_text}
						style={styles.input}
						placeholder={"Address Line 1"}
					/>
				</View>
				<View>
					<Text style={styles.inputLabel}>
						Address Line 2*
					</Text>
					<TextInput
						placeholderTextColor={Colors.textinput_inner_text}
						style={styles.input}
						placeholder={"Address Line 2"}
					/>
				</View>
				<View>
					<Text style={styles.inputLabel}>
						City*
					</Text>
					<TextInput
						placeholderTextColor={Colors.textinput_inner_text}
						style={styles.input}
						placeholder={"City"}
					/>
				</View>
				<View>
					<Text style={styles.inputLabel}>
						Region*
					</Text>
					<TextInput
						placeholderTextColor={Colors.textinput_inner_text}
						style={styles.input}
						placeholder={"Region"}
					/>
				</View>
				<View>
					<Text style={styles.inputLabel}>
						Postal Code*
					</Text>
					<TextInput
						placeholderTextColor={Colors.textinput_inner_text}
						style={styles.input}
						placeholder={"Postal Code"}
					/>
				</View>
				<View>
					<Text style={styles.inputLabel}>
						Country*
					</Text>
					<TextInput
						placeholderTextColor={Colors.textinput_inner_text}
						style={styles.input}
						placeholder={"Country"}
					/>
				</View>
				<Button name={'Done'} style={{marginTop: Normalize(5)}} />
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	inputLabel: {
		fontSize: Normalize(12),
		fontFamily: fontfmliy.regular,
		color: Colors.greyText,
		marginTop: Normalize(5),
	},
	input: {
		height: Normalize(30),
		borderBottomWidth: 1,
		borderColor: Colors.grey,
		color: Colors.black,
		fontFamily: fontfmliy.bold,
	},
})