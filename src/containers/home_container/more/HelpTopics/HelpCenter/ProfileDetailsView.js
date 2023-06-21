import { View, Text, Image } from 'react-native'
import React from 'react'
import {myContext} from '../../../../../constants/ContextApi';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {ImageLink} from '../../../../../constants/LinkPage';
import Normalize from '../../../../../helpers/Dimens';
import {Colors} from '../../../../../constants/colors';
import { fontfmliy } from '../../../../../components/WhichFontFamily';


export default function ProfileDetailsView() {
	const {drawerTabNaviData, email_Address} = React.useContext(myContext);
	return (
		<View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: Normalize(13),
        }}>
			<View
				style={{
					height: Normalize(60),
					width: Normalize(60),
					borderRadius: Normalize(60) / 2,
					borderWidth: 1,
					borderColor: Colors.secondary,
					backgroundColor: Colors.white,
					justifyContent: 'center',
					alignItems: 'center',
					overflow: 'hidden',
				}}>
				{drawerTabNaviData.profile_image == null ? (
					<FontAwesome5
						name="user-alt"
						color={Colors.secondary}
						size={Normalize(20)}
					/>
				) : (
					<Image
						source={{
							uri: ImageLink.ProfilePhoto + drawerTabNaviData.profile_image,
						}}
						style={{ height: '100%', width: '100%' }}
					/>
				)}
			</View>
			<View style={{ marginLeft: Normalize(13) }}>
				<Text style={{ fontSize: Normalize(15), fontFamily: fontfmliy.bold }}>
					{drawerTabNaviData.user_name}
				</Text>
				<Text
					style={{
						fontSize: Normalize(10),
						fontFamily: fontfmliy.regular,
						color: Colors.grey,
					}}>
					{email_Address.activeTitle}
				</Text>
			</View>
		</View>
	)
}