import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native'
import React from 'react'
import Header from '../../../../components/Header'
import { Colors } from '../../../../constants/colors'
import Normalize from '../../../../helpers/Dimens';
import { fontfmliy } from '../../../../components/WhichFontFamily';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FinanceButton from './FinanceButton';
import axiosInstance from '../../../../constants/AxiosCallPage';
import images from '../../../../constants/images';
import moment from 'moment';
import strings from '../../../../constants/lng/LocalizedStrings';
import { addCommaAndTranslateInPersian } from '../../../../constants/NumberWithCommaAndInPersian';
import { FlatList } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native';


export default function NewFinance(props) {
	const [transactions, setTransactions] = React.useState([])
	const [loader, setLoader] = React.useState(false);
	const [currentPage, setCurrentPage] = React.useState(1);

	const getAllTransactions = async () => {
		try {
			setLoader(true);
			const res = {
				params: {
					page: `${currentPage}`,
				},
			};
			const data = await axiosInstance.post('finance', res);
			if (data.data) {
				// setTransactions(data.data.transaction);
				setTransactions([...transactions, ...data.data.transaction])
				setLoader(false);
			}
		} catch (error) {
			setLoader(false);
			console.log(error)
		}
	}

	React.useEffect(() => {
		getAllTransactions();
		console.log(transactions)
	}, [currentPage])

	const renderItems = ({ item }) => {
		return (
			<View
				style={{
					width: '99%',
					alignSelf: 'center',
					flexDirection: 'row',
					backgroundColor: Colors.white,
					marginBottom: Normalize(6),
					paddingVertical: Normalize(8),
					elevation: Normalize(2),
					borderRadius: 8,
				}}
			>
				<View
					style={{
						flexDirection: 'row',
						flex: 1,
						alignSelf: 'center',
					}}>
					<View
						style={{
							flexDirection: 'row',
							width: '100%',
						}}>
						<View
							style={{
								flexDirection: 'column',
								marginLeft: 15,
								flex: 1,
							}}>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-between',
								}}>
								<Text
									style={{
										color: Colors.primary,
										marginLeft: 0,
										fontFamily: fontfmliy.regular,
										fontSize: Normalize(12),
										width: '50%',
										textAlign: 'left',
										marginRight: 0,
									}}>
									{item.notes}
								</Text>
								<View
									style={{
										flexDirection: 'row',
										alignSelf: 'center',
									}}>
									<Image
										style={{
											width: 17,
											height: 17,
											opacity: 0.6,
											alignSelf: 'center',
										}}
										source={images.calander}
										resizeMode="contain"
									/>
									<Text
										style={{
											color: '#818181',
											marginLeft: 10,
											fontFamily: fontfmliy.regular,
											fontSize: Normalize(11),
											alignSelf: 'center',
											marginRight: 10,
										}}>
										{moment(
											item.created_at,
											'YYYY-MM-DD',
										).format('Do MMMM, YYYY')
										}
									</Text>
								</View>
							</View>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-between',
								}}>
								<Text
									numberOfLines={1}
									style={{
										color: '#818181',
										marginLeft: 0,
										fontFamily: fontfmliy.regular,
										lineHeight: Normalize(14),
										fontSize: Normalize(11.5),
										marginTop: 10,
										marginRight: 0,
										textAlign: 'left',
									}}>
									{'Type'} :{' '}
									{item.type}
								</Text>
								<Text
									style={{
										color: '#1a3a4a',
										marginLeft: 10,
										fontFamily: fontfmliy.regular,
										fontSize: Normalize(12),
										alignSelf: 'center',
										marginRight: 10,
										marginTop: 10,
									}}>
									{strings.BROWSEFILTER.TOMAN}{' '}
									{addCommaAndTranslateInPersian(
										parseInt(item.amount),
										'en',
									)}
								</Text>
							</View>
						</View>
					</View>
				</View>
			</View>
		)
	}

	const renderLoader = () => {
		return (
			loader ?
				<View style={{ marginVertical: Normalize(16), alignItems: 'center' }}>
					<ActivityIndicator size={'large'} color="#aaa" />
				</View> : null
		)
	}

	const loadMoreItems = () => {
		setCurrentPage(currentPage + 1)
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header back name={'My Wallet'} />
			<View style={{ backgroundColor: Colors.primary, padding: Normalize(10) }}>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
					<View>
						<Text style={[styles.pageText, { fontSize: Normalize(18), marginTop: Normalize(15) }]}>100 $</Text>
						<Text style={[styles.pageText, { marginTop: Normalize(10) }]}>Wallet Balance</Text>
					</View>
					<View style={{ flexDirection: 'column', justifyContent: 'space-evenly' }}>
						<TouchableOpacity onPress={() => props.navigation.navigate('AddNewCardBankDetails')}>
							<View style={{ alignItems: 'flex-end' }}>
								<MaterialCommunityIcons name='credit-card-plus-outline' size={Normalize(26)} color={Colors.white} />
								<Text style={styles.pageText}>Add/Edit Cards</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => props.navigation.navigate('MyVoucher')}>
							<View style={{ alignItems: 'flex-end', marginTop: Normalize(8) }}>
								<MaterialCommunityIcons name='credit-card-plus-outline' size={Normalize(26)} color={Colors.white} />
								<Text style={styles.pageText}>Save Voucher</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>
				<FinanceButton props={props} />
			</View>
			<View style={{ flex: 1, padding: Normalize(11) }}>
				<Text style={{ fontSize: Normalize(14), fontFamily: fontfmliy.bold, marginVertical: Normalize(10) }}>Recent Transactions</Text>
				<FlatList
					data={transactions}
					keyExtractor={(item, index) => index}
					renderItem={renderItems}
					ListFooterComponent={renderLoader}
					onEndReached={loadMoreItems}
					onEndReachedThreshold={0}
				/>
			</View>
		</SafeAreaView >
	)
}

const styles = StyleSheet.create({
	pageText: {
		color: Colors.white,
		fontFamily: fontfmliy.bold,
		fontSize: Normalize(14),
		marginVertical: Normalize(4)
	}
})