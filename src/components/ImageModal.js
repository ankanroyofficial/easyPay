import React from 'react'
import { ActivityIndicator, Modal } from 'react-native';
import { SafeAreaView } from 'react-native';
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useRtlContext } from 'react-native-easy-localization-and-rtl';
import images from '../constants/images';
import { ImageLink } from '../constants/LinkPage';
import Normalize from '../helpers/Dimens'

export default function ImageModal({ Onpress, filename, questionImage }) {
    const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
    // console.log("++++++++++",filename)
    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={questionImage}
            onRequestClose={() => {
                Onpress()
            }}
        >
            <SafeAreaView style={{ flex: 1 }} >
                <View style={{ backgroundColor: "rgba(52,52,52,0.4)", flex: 1, paddingTop: "5%" }}  >
                    <View style={{ height: 30, width: "100%", alignItems: language == "en" ? "flex-end" : "flex-start", paddingHorizontal: "5%" }} >
                        <TouchableOpacity
                            onPress={Onpress}
                            style={{ height:Normalize(14) , width: Normalize(14) }} >
                            <Image
                                source={images.cross}
                                style={{ height: "100%", width: "100%", resizeMode: "contain" }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, padding: "2%", justifyContent: "center", alignItems: "center" }} >
                        {
                            filename == "" ?
                                <ActivityIndicator
                                    size="large"
                                    color="#0e148b"
                                    style={{ position: "absolute" }}
                                />
                                :
                                <Image
                                    source={{ uri: ImageLink.Question + `${filename}` }}
                                    style={{ height: "100%", width: "100%", resizeMode: "contain" }}
                                />
                        }
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    )
}
