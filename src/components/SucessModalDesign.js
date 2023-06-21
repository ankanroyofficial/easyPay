import React from 'react'
import {
    View, Text, Modal, Pressable
} from 'react-native'
import { Colors } from '../constants/colors';
import globalstyles from '../constants/globalStyles/Global_Styles';
import Entypo from 'react-native-vector-icons/Entypo';

export default function SucessModalDesign({ ispress,
    onpress,
    title,
    subTitle
}) {

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={ispress}
            onRequestClose={onpress}
        >
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <View
                    style={{
                        paddingVertical: Normalize(10),
                        width: Normalize(250),
                        backgroundColor: 'white',
                        borderRadius: Normalize(8),
                        paddingVertical: Normalize(10),
                        elevation: 2
                    }}>
                    <View
                        style={{
                            height: Normalize(70),
                            width: Normalize(70),
                            backgroundColor: Colors.green_new_2,
                            borderRadius: Normalize(70) / 2,
                            position: 'absolute',
                            alignSelf: 'center',
                            top: -Normalize(35),
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Entypo
                            name="check"
                            size={Normalize(50)}
                            color={Colors.white}
                        />
                    </View>
                    <Text
                        style={[
                            globalstyles.plantext_Outfit_Medium,
                            {
                                paddingTop: Normalize(30),
                                textAlign: 'center',
                                fontSize: Normalize(19),
                                color: Colors.greyText,
                            },
                        ]}>
                        {title ? title : "please write title"}
                    </Text>
                    <Text
                        style={[
                            globalstyles.plantext_outfit_regular,
                            {
                                paddingTop: Normalize(5),
                                textAlign: 'center',
                                fontSize: Normalize(13),
                                color: Colors.greyText,
                                paddingHorizontal: Normalize(10),
                                lineHeight: Normalize(16)
                            },
                        ]}>
                        {subTitle ? subTitle : "please write subTitle"}
                    </Text>
                    <Pressable
                        onPressIn={onpress}
                        style={{
                            height: Normalize(35),
                            width: '80%',
                            backgroundColor: Colors.primary,
                            borderRadius: Normalize(8),
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            marginTop: Normalize(15),
                        }}>
                        <Text
                            style={[
                                globalstyles.plantext_Outfit_Medium,
                                { color: Colors.white },
                            ]}>
                            Continue
                        </Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}