import { View, Text, SafeAreaView, Image, ScrollView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import Header from '../../../../components/Header';
import strings from '../../../../constants/lng/LocalizedStrings';
import { useNavigation } from '@react-navigation/native'
import styles from './Styles';
import Normalize from './../../../../helpers/Dimens';
import { addCommaAndTranslateInPersian } from '../../../../constants/NumberWithCommaAndInPersian';
import { Colors } from '../../../../constants/colors';
import LoaderPage from '../../../../components/LoaderPage';
import images from '../../../../constants/images';
import { myContext } from '../../../../constants/ContextApi';
import axiosInstance from '../../../../constants/AxiosCallPage';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
import CurveDesing_Component from '../../../../constants/CurveDesing_Component';
import { ImageLink } from '../../../../constants/LinkPage';
import { Platform } from 'react-native';

function HowDoScores() {
    const { language } = useRtlContext();
    const { token, tierDetails, setTierDetails } = useContext(myContext)
    const navigation = useNavigation()

    const getData = async () => {
        try {
            const res = await axiosInstance.post("tier-details-page")
            // console.log(res.data.result.tier)
            if (res.data.result) {
                setTierDetails(res.data.result)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const howDoScores_load = () => {
        if (tierDetails == "") {
            getData()
        }
        // else {
        //     console.log("not load")
        // }
    }
    useEffect(() => {
        howDoScores_load()
        return howDoScores_load()
    }, [])
    const completion_rate = [
        {
            title: "Bronze",
            rate_en: "",
            rate_pr: ""
        },
        {
            title: "Silver",
            rate_en: "Okay",
            rate_pr: "مقبول"
        },
        {
            title: "Gold",
            rate_en: "Good",
            rate_pr: "خوب"
        },
        {
            title: "Platinum",
            rate_en: "Excellent",
            rate_pr: "عالی"
        },
    ]
    const TierBox = (item, index) => {
        return (
            <View key={index} style={{ height: Normalize(192), width: "100%", alignItems: "center", borderColor: Colors.lightGrey, borderWidth: Normalize(1), borderRadius: 5, overflow: "hidden" }} >
                <View style={{ height: Normalize(90), width: Normalize(Normalize(80)) }} >
                    <Image
                        source={{ uri: ImageLink.tier + item.tier_logo }}
                        style={{ height: "100%", width: "100%", resizeMode: "contain" }}
                    />
                </View>
                <Text style={[styles.cardDescText, { fontSize: Normalize(14), marginTop: Normalize(2), }]} >{item.level}</Text>
                <Text style={{
                    fontSize: Normalize(12),
                    color: Colors.grey,
                    marginTop: Normalize(5),
                    marginBottom: Normalize(5)
                }}>{`${addCommaAndTranslateInPersian(Math.round(item.commission), language)} % ${strings.DASHBOARD.CARDTEXT1A}`}</Text>
                <Text style={{
                    fontSize: Normalize(11.5),
                    color: Colors.greyText,
                    textAlign: "center",
                    lineHeight: Normalize(14),
                    paddingHorizontal: "3%"
                }}>
                    {
                        index == 0 ?
                            language == "en" ?
                                "This tier is assigned to all users by default." : "این طبقه بصورت پیش فرض به تمام کاربران اختصاص داده می شود."
                            :
                            language == "en" ?
                                `${completion_rate[index].rate_en} Completion rating in last ${addCommaAndTranslateInPersian(Math.round(item.task_completion_target), language)} tasks and Earn more than $ ${addCommaAndTranslateInPersian(Math.round(item.earn_target), language)} in the last ${addCommaAndTranslateInPersian(Math.round(item.task_completion_duration), language)} days` :

                                `رضایت مشتری در ${addCommaAndTranslateInPersian(Math.round(item.task_completion_target), language)} پروژه آخر : ${completion_rate[index].rate_pr} ${"\n"}درآمد کسب شده در ${addCommaAndTranslateInPersian(Math.round(item.task_completion_duration), language)} روز آخر : ${addCommaAndTranslateInPersian(Math.round(item.earn_target), language)} `

                    }
                </Text>
            </View>
        )
    }
    const questionAnswer = [
        {
            question_in_english: "How do Tasker Tiers work?",
            question_in_persian: "طبقات و‌رتبه ها چگونه کار می کنند",
            answer_in_english: <Text>Tasker Tiers is a way to acknowledge Taskers, who consistently add value to the community and uphold our <Text onPress={() => navigation.navigate("CommunityGuidelines")} style={{ color: Colors.primary, textDecorationLine: "underline" }} >Tasker principles</Text>, with lower service fees.{"\n"}There are four tiers. Starting at Bronze, advancing to Silver, Gold, and ultimately Platinum. Each tier has a minimum Completion Rating and Earnings score requirement. The higher the tier you’re in, the lower the service fee.</Text>,
            answer_in_persian: <Text>فلسفه وجودی ایجاد طبقات و رتبه بندی در ایران تسکر، تشخیص مجریان / پیمانکارانی است که به صورت مداوم ارزش های مثبت به جامعه عزیزمان ایران و همچنین جامعه ایران تسکر با پیروی از <Text onPress={() => navigation.navigate("CommunityGuidelines")} style={{ color: Colors.primary, textDecorationLine: "underline" }} >قوانین طلایی مجریان/پیمانکاران</Text> اضافه می کنند.{'\n'}در ایران تسکر ۴ طبقه وجود دارد. طبقه اول: <Text style={{ color: Colors.primary }} >برنز</Text> ، طبقه دوم: <Text style={{ color: Colors.primary }} >نقره</Text> ، طبقه سوم: <Text style={{ color: Colors.primary }} >طلا</Text> ، طبقه چهارم: <Text style={{ color: Colors.primary }} >پلاتین</Text> . هر چقدر طبقه و یا رتبه شما در سایت بالاتر باشد شما هزینه خدمات کمتری را پرداخت خواهید نمود. همچنین قابل ذکر است که طبقه اول (<Text style={{ color: Colors.primary }} >برنز</Text>) به صورت پیش فرض به تمام کاربران اختصاص داده می شود. </Text>
        },
        {
            question_in_english: "How is my tier calculated?",
            question_in_persian: "رتبه من چگونه محاسبه می شود؟",
            answer_in_english: <Text>Your tier is determined by two scores:{Platform.OS == "ios" ? "\n\t" : "\n\t\t\t"}1.Your Completion Rating (different to Completion Rate), i.e. how well you’ve upheld commitments to your <Text style={styles.hn} >n</Text> most recently assigned tasks.{Platform.OS == "ios" ? "\n\t" : "\n\t\t\t"}2.Your past <Text style={styles.hn} >n</Text> day Earnings, i.e. how much you’ve earned over the last <Text style={styles.hn} >n</Text> days.{"\n"}Each tier has a minimum Completion Rating and Earnings score requirement. You’ll need to meet these requirements to move into the corresponding tier.</Text>,
            answer_in_persian: <Text>برای رسیدن به طبقات بالاتر شما باید به یک حد نصابی از امتیازات برسید که شامل دو شاخصه اصلی می باشد:

                {"\n"}  ۱.شاخص اول: چگونگی انجام <Text style={styles.hn_pr} >n</Text> کار/پروژه آخر توسط مجری که در ارتباط با سطح رضایت مشتری (کارفرما) محاسبه می گردد: <Text style={{ color: Colors.primary, textDecorationLine: "underline" }} >بیشتر بدانید</Text>
                {"\n"}  ۲.شاخص دوم: مقدار درآمد کسب شده شما در  <Text style={styles.hn_pr} >n</Text> روز گذشته. <Text style={{ color: Colors.primary, textDecorationLine: "underline" }} >بیشتر بدانید{"\n"}</Text>
                برای ارتقاء به طبقات بالاتر باید حداقل امتیازات و نیازمندی های مختص همان طبقه که توسط این دو شاخصه اصلی محاسبه می گردد را کسب کرده باشید.</Text>
        },
        {
            question_in_english: "What is my “Completion Rating”?",
            question_in_persian: "شاخص رضایت مشتری:",
            answer_in_english: <Text>most recently assigned tasks.{"\n"}It’s determined by comparing all the completed tasks with all the cancelled tasks in those last <Text style={styles.hn} >n</Text> assigned tasks in such a way so that there’s a reasonable buffer included for unavoidable cancellations (because life happens!).{"\n\t\t\t"}A Completion Rating can currently fall into one of the four levels: Fair, Good, Great, and Excellent . The more tasks you complete out of your <Text style={styles.hn} >n</Text> most recently assigned tasks, the better your Completion Rating becomes.</Text>,
            answer_in_persian: <Text>شاخص میزان رضایت مشتری بازتابی از میزان تعهدات شما در انجام کار/ پروژه است و در واقع میزان رضایت مشتری (کارفرما) را در <Text style={styles.hn_pr} >n</Text> پروژه آخری که انجام داده اید نشان می دهد.{"\n\n"}شاخص میزان رضایت مشتری( کارفرما ) بر اساس ستاره ها و دیدگاه هایی که در <Text style={styles.hn_pr} >n</Text> پروژه آخر از کارفرمایان برای هر کار/پروژه دریافت کرده اید محاسبه میشود.{"\n\n"} شاخص میزان رضایت مشتری برای هر طبقه متفاوت می باشد. برای رسیدن به طبقات بالاتر و پرداخت هزینه خدمات کمتر می بایست امتیاز شاخص رضایت مشتری همان طبقه را کسب کرده باشید.</Text>
        },
        {
            question_in_english: "What is my “Earnings”?",
            question_in_persian: `شاخص درآمد کسب شده:`,
            answer_in_english: <Text>Your Earnings score captures your total earnings over the last <Text style={styles.hn} >n</Text> days.{"\n"}Every time a Poster releases payment to you, the amount is added to your total and will last for the next <Text style={styles.hn} >n</Text> days.</Text>,
            answer_in_persian: <Text>شاخص درآمد کسب شده، کل درآمد کسب شده شما را در <Text style={styles.hn_pr} >n</Text>  روز گذشته  نشان می دهد. برای رسیدن به طبقات بالاتر و پرداخت هزینه خدمات کمتر می بایست امتیاز شاخص درآمد کسب شده همان طبقه را بدست  آورده باشید.{"\n"}هر بار که کارفرمایی مبلغی را برای شما پرداخت می کند، این مبلغ به کل درآمد کسب شده شما اضافه می شود. سیستم همیشه درآمد کسب شده <Text style={styles.hn_pr} >n</Text> روز اخیر را محاسبه میکند و به محض اینکه شما به حد نصاب امتیازات لازم برسید طبقه و رتبه شما ارتقاء پیدا خواهد کرد.</Text>
        },
        {
            question_in_english: "Where can I find more information?",
            question_in_persian: "کجا می توانم اطلاعات بیشتری پیدا کنم؟",
            answer_in_english: <Text>You can find the full details on <Text onPress={() => navigation.navigate("FAQ")} style={{ color: Colors.primary, textDecorationLine: "underline" }} >FAQs</Text> and <Text onPress={() => navigation.navigate("Help")} style={{ color: Colors.primary, textDecorationLine: "underline" }}> help page </Text></Text>,
            answer_in_persian: <Text>می توانید برای جزئیات کامل تر به صفحه <Text onPress={() => navigation.navigate("FAQ")} style={{ color: Colors.primary, textDecorationLine: "underline" }} >سوالات متداول</Text> و یا <Text onPress={() => navigation.navigate("Help")} style={{ color: Colors.primary, textDecorationLine: "underline" }} >صفحه راهنما</Text> بروید</Text>
        }
    ]
    return (
        <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>
            <View style={styles.container}>
                <Header
                    back
                    name={strings.DASHBOARD.TIERDETAILS}
                    navigation={navigation}
                />
                <CurveDesing_Component  >

                    {
                        tierDetails == "" ?
                            <LoaderPage />
                            :
                            <View style={globalstyles.container_only_padding} >
                                <ScrollView
                                    showsVerticalScrollIndicator={false}
                                >
                                    <View style={{ flex: 1, paddingHorizontal: Normalize(8), paddingBottom: Normalize(15) }} >
                                        {[questionAnswer[0], questionAnswer[1]].map((item, index) => (
                                            <View key={index} style={{ marginVertical: Normalize(5) }}>
                                                <Text style={[globalstyles.plantext_Outfit_Medium, {
                                                    fontSize: Normalize(12), color: "#38393e",
                                                    marginVertical: Normalize(1)
                                                }]}>{item.question_in_english}</Text>
                                                <Text style={[globalstyles.plantext_roboto_regular, {
                                                    fontSize: Normalize(11), color: '#636468',
                                                    lineHeight: Normalize(14),
                                                }]}>{item.answer_in_english}</Text>
                                            </View>
                                        ))}
                                        <View style={{ marginVertical: Normalize(5) }} >
                                            <Text style={[styles.cardDescText, { marginBottom: Normalize(8), textAlign: "left" }]}>
                                                The following are the fee rates for each tier, excluding GST:
                                            </Text>
                                            {
                                                tierDetails.tier.map((item, index) => (
                                                    <View key={index}>

                                                        {TierBox(item, index)}

                                                        {
                                                            index + 1 != tierDetails.tier.length &&
                                                            <View
                                                                style={{
                                                                    height: Normalize(25),
                                                                    width: Normalize(10),
                                                                    alignSelf: "center",
                                                                    marginVertical: Normalize(5)
                                                                }} >
                                                                <Image
                                                                    source={images.down_arrow}
                                                                    style={{ height: "100%", width: "100%", resizeMode: "contain" }}
                                                                />
                                                            </View>
                                                        }

                                                    </View>
                                                ))
                                            }
                                        </View>
                                        {[questionAnswer[2], questionAnswer[3], questionAnswer[4]].map((item, index) => (
                                            <View key={index} style={{ marginVertical: Normalize(5) }}>
                                                <Text style={[globalstyles.plantext_Outfit_Medium, {
                                                    fontSize: Normalize(12), color: "#38393e",
                                                    marginVertical: Normalize(1)
                                                }]}>{item.question_in_english}</Text>
                                                <Text style={[globalstyles.plantext_roboto_regular, {
                                                    fontSize: Normalize(11), color: '#636468',
                                                    lineHeight: Normalize(14),
                                                }]}>{item.answer_in_english}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </ScrollView>
                            </View>
                    }
                </CurveDesing_Component>
            </View>
        </SafeAreaView>
    );
}
export default withRtl(HowDoScores);