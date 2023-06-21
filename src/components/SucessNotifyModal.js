import React from 'react'
import {
    View,
    Text,
    Modal,
    Pressable
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import globalstyles from '../constants/globalStyles/Global_Styles';
import { Colors } from '../constants/colors';

export default function SucessNotifyModal({ ispress, onpress, title, subTitle }) {
    return (
        <Modal
            visible={ispress}
            transparent
            animationType="none"
            onRequestClose={onpress}
        >
            <View style={{ flex: 1, backgroundColor: "rgba(52,52,52,0.5)", justifyContent: "center", alignItems: "center" }} >
                <View style={{ padding: Normalize(20), width: "85%", backgroundColor: Colors.white, elevation: 10, borderRadius: Normalize(15) }} >
                    <View
                        style={{
                            height: Normalize(73),
                            width: Normalize(73),
                            backgroundColor: Colors.white,
                            borderRadius: Normalize(80) / 2,
                            position: 'absolute',
                            alignSelf: 'center',
                            top: -Normalize(40),
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <View
                            style={{
                                height: "86%",
                                width: "86%",
                                backgroundColor: Colors.secondary,
                                borderRadius: Normalize(80) / 2,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Entypo
                                name="check"
                                size={Normalize(40)}
                                color={Colors.white}
                            />
                        </View>
                    </View>

                    <View style={{ paddingTop: Normalize(20) }} >

                        <Text
                            style={[
                                globalstyles.plantext_Outfit_Medium,
                                {

                                    textAlign: 'center',
                                    fontSize: Normalize(19),
                                    color: Colors.greyText,
                                },
                            ]}>
                            {title}
                        </Text>
                        <Text
                            style={[
                                globalstyles.plantext_outfit_regular,
                                {
                                    paddingTop: Normalize(5),
                                    textAlign: 'center',
                                    fontSize: Normalize(13),
                                    color: Colors.greyText,
                                    paddingHorizontal: Normalize(5),
                                    lineHeight: Normalize(16)
                                },
                            ]}>
                            {subTitle}
                        </Text>
                    </View>

                </View>
                <Pressable
                    onPress={onpress}
                    style={{ height: Normalize(50), width: Normalize(50), borderRadius: Normalize(50) / 2, backgroundColor: Colors.white, elevation: 10, justifyContent: "center", alignItems: "center", marginTop: Normalize(12) }} >
                    <Entypo name="cross" color={Colors.textinput_inner_text} size={Normalize(35)} />
                </Pressable>
            </View>
        </Modal>
    )
}