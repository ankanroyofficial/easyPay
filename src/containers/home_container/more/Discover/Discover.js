import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import styles from './Styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header from '../../../../components/Header';
import Normalize from '../../../../helpers/Dimens';
import { Colors } from '../../../../constants/colors';
import strings from '../../../../constants/lng/LocalizedStrings';

function Discover({ navigation }) {
    const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
    const moreItems = [
        {
            name: strings.HELPTOPICS.HIW,
            route: 'Howitworks',
        },
        {
            name: strings.HELPTOPICS.EARNMONEY,
            route: 'EarnMoney',
        },
        {
            name: strings.HELPTOPICS.HELP,
            route: 'Help',
        }
    ];
    return (
        <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>

            <View style={styles.container}>
                <Header navigation={navigation} back name={strings.MORESCREEN.DISCOVER} />
                <ScrollView
                showsVerticalScrollIndicator={false}
                >
                    {moreItems.map((items, index) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate(items.route)}
                            key={index}
                            style={styles.cardContainer}>
                            <View style={language == 'en' && styles.rowView}>
                                <Text
                                    style={[
                                        styles.cardText,{fontFamily: 'Outfit-Medium'}]}>
                                    {items.name}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

// export default More;
export default withRtl(Discover);
