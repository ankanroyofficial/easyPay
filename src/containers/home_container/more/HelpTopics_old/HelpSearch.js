import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
import Header from '../../../../components/Header';
import styles from './Styles2';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import axios from 'axios';
import LoaderPage from '../../../../components/LoaderPage';
import { Colors } from '../../../../constants/colors';
import strings from '../../../../constants/lng/LocalizedStrings';
import { engToPersian } from '../../../../constants/EnglishToPersian';
import { addCommaAndTranslateInPersian } from '../../../../constants/NumberWithCommaAndInPersian';
import { leftOrRight } from '../../../../constants/RowOrRowreverse';

export default function HelpSearch({ navigation, route }) {
    const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
    const { value } = route.params;
    const [searchdata, setSearchdata] = useState([]);
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        getSearch(value)
    }, [value]);

    const getSearch = async (text) => {
        try {
            setLoader(true)
            if (text != "") {
                const data = {
                    "params": {
                        "keyword": text
                    }
                }
                const res = await axios({
                    method: 'post',
                    url: "https://changicourt.com/dev/api/search-help",
                    headers: {
                        "X-localization": language == "pr" ? "fa" : "en"
                    },
                    data: {
                        "params": {
                            "help_search_keyword": text
                        }
                    }
                })
                console.log(res.data)
                if (res.data.result) {
                    setSearchdata(res.data.result.helpArticles.data)
                    setLoader(false)
                }
            }
            setLoader(false)
        } catch (error) {
            console.log("----", error)
        }
    }

    return (
        <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>
            <View style={styles.container}>
                <Header navigation={navigation} back name={strings.HELP.SEARCHRESULT} />
                {loader ?
                    <LoaderPage />
                    :
                    <ScrollView
                    showsVerticalScrollIndicator={false}
                    >
                        <View style={{ flex: 1 }}>
                            <View style={{ width: '100%', padding: 15 }}>
                                {
                                    searchdata.length != 0 ?
                                        language == "en" ?
                                            <Text style={{
                                                fontSize: 15, color: Colors.greyText, fontFamily: "roboto-medium"
                                            }}>{searchdata.length} results for "{value}"</Text>
                                            :
                                            <Text style={{
                                                fontSize: 15, color: Colors.greyText, fontFamily: "roboto-medium"
                                            }}>{engToPersian(searchdata.length)} نتایج برای "{value}"</Text>
                                        :
                                        language == "en" ?
                                            <Text style={{
                                                fontSize: 13, color: Colors.greyText, fontFamily: "roboto-regular", marginTop: 10, textAlign: leftOrRight(language)
                                            }}>{strings.HELP.NORESULTFOR} "{value}"</Text>
                                            :
                                            <Text style={{
                                                fontSize: 13, color: Colors.greyText, fontFamily: "roboto-regular", marginTop: 10, textAlign: leftOrRight(language)
                                            }}>نتایجی برای "{value}" پیدا نشد.</Text>
                                }

                                {/* <Text style={{
                                    fontSize: 16, color: Colors.greyText, fontFamily: "roboto-bold", marginTop: 10,
                                }}>{strings.HELP.KNOWLEDGEBASE}</Text> */}
                                {searchdata.length > 0 ?
                                    <View>
                                        {searchdata.map((item, index) => (
                                            <TouchableOpacity key={index} onPress={() => navigation.navigate("HelpArticleDetails", { value: item.help_articles_to_language_api })}>
                                                <Text style={{
                                                    fontSize: 15, color: "#444", fontFamily: "roboto-medium", marginTop: 20, textAlign: language == "en" ? "left" : "right"
                                                }}>{addCommaAndTranslateInPersian((index + 1), language)} . <Text
                                                    onPress={() => navigation.navigate("HelpArticleDetails", { value: item.help_articles_to_language_api })}
                                                    style={{ textDecorationLine: "underline", color: Colors.primary }} >{item.help_articles_to_language_api.title}</Text></Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                    :
                                    <View>
                                        <Text onPress={() => navigation.goBack()} style={{
                                            fontSize: 14, color: Colors.primary, fontFamily: "roboto-medium", marginTop: 10, textDecorationLine: "underline", textAlign: leftOrRight(language)
                                        }}>{strings.HELP.BROWSEKNOWLEDGEBASE}</Text>
                                    </View>
                                }
                            </View>
                        </View>
                    </ScrollView>
                }
            </View>
        </SafeAreaView>
    );
}


