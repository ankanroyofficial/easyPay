import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RTLProvider } from 'react-native-easy-localization-and-rtl';
import { Colors as cl } from './src/constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import containers     
import IntroScreen from './src/containers/intro_container';
import LangSelection from './src/containers/langSelect_container';
import HomeIndex from './src/containers/home_container';
import SignInScreen from './src/containers/auth_container/Sign_in';
import SignUpScreen from './src/containers/auth_container/sign_up';
import ContextApi from './src/constants/ContextApi';
import PrivacyPolicy from './src/containers/home_container/more/HelpTopics/PrivacyPolicy';
import Termsandcondition from './src/containers/home_container/more/HelpTopics/Termsandcondition';
import EnterEmail from './src/containers/auth_container/forgotPassword/enterEmail/EnterEmail';
import ForgotPasswordVerify from './src/containers/auth_container/forgotPassword/verifyOtp/ForgotPasswordVerify';
import NewPassword from './src/containers/auth_container/forgotPassword/newPassword/NewPassword';
import QuickIntro_SkipIntro from './src/containers/intro_container/QuickIntro_SkipIntro';
import IntroCarouselPage from './src/containers/intro_container/IntroCarouselPage';
import IntroVideoScreen from './src/containers/intro_container/IntroVideoScreen';
import TakingEmail from './src/containers/auth_container/sign_up/newSignup/TakingEmail';
import TakingPassword from './src/containers/auth_container/sign_up/newSignup/TakingPassword';
import TakingDetails from './src/containers/auth_container/sign_up/newSignup/TakingDetails';
import SelectLocationPage from './src/containers/auth_container/sign_up/newSignup/SelectLocationPage';
import AfterSignUpThreePointPage from './src/containers/auth_container/sign_up/newSignup/AfterSignUpThreePointPage';
import EmailVerificationPage from './src/containers/auth_container/sign_up/newSignup/EmailVerificationPage';

import TakingEmailForLogin from './src/containers/auth_container/Sign_in/newSignIn/TakingEmailForLogin';
import TakingPasswordForLogin from './src/containers/auth_container/Sign_in/newSignIn/TakingPasswordForLogin';
import DrawerPage from './src/navigation/DrawerNavi';
import CountrySelect from './src/containers/home_container/more/editProfile/basicInfo/CountrySelect';
import EditProfile_Address from './src/containers/home_container/more/editProfile/basicInfo/EditProfile_Address';
import New_beAFixer_Step2 from './src/containers/home_container/more/editProfile/basicInfo/New_beAFixer_Step2';
import LanguageSelect from './src/containers/home_container/more/editProfile/basicInfo/LanguageSelect';
import SkillSelect from './src/containers/home_container/more/editProfile/basicInfo/SkillSelect';
import TransPortSelect from './src/containers/home_container/more/editProfile/basicInfo/TransPortSelect';
import CertificatedSelection from './src/containers/home_container/more/editProfile/basicInfo/CertificatedSelection';
import CategorySelect from './src/containers/home_container/get_it_done/post_task/CategorySelect';
import PostTaskDetails from './src/containers/home_container/get_it_done/post_task';
import postTaskplace from './src/containers/home_container/get_it_done/post_task/post_task_2ndstep/postTaskplace';
import postTaskImage from './src/containers/home_container/get_it_done/post_task/post_task_3rdStep/postTaskImage';
import postTaskBudget from './src/containers/home_container/get_it_done/post_task/post-task_4thstep/postTaskBudget';
import AddMustHave from './src/containers/home_container/get_it_done/post_task/AddMustHave';
import PostTask_Location_selectPage from './src/containers/home_container/get_it_done/post_task/PostTask_Location_selectPage';
import EditTaskDetails from './src/containers/home_container/my_tasks/edit_task';
import EditTaskplace from './src/containers/home_container/my_tasks/edit_task/edit_task_2ndstep/EditTaskplace';
import EditTaskImage from './src/containers/home_container/my_tasks/edit_task/edit_task_3rdStep/EditTaskImage';
import EditTaskBudget from './src/containers/home_container/my_tasks/edit_task/edit-task_4thstep/EditTaskBudget';
import EditAddMustHave from './src/containers/home_container/my_tasks/edit_task/EditAddMustHave';
import EditTask_Location_selectPage from './src/containers/home_container/my_tasks/edit_task/EditTask_Location_selectPage';
import SimilarTaskplace from './src/containers/home_container/my_tasks/edit_task/Similar_task_2ndstep/SimilarTaskplace';
import PhoneCodeSelectPage from './src/containers/auth_container/sign_up/newSignup/PhoneCodeSelectPage';
import BasicInfoScreen from './src/containers/home_container/more/editProfile/basicInfo';
import PortfolioScreen from './src/containers/home_container/more/editProfile/portfolio';
import SkillsScreen from './src/containers/home_container/more/editProfile/skills';
import PhoneVerifyPage from './src/containers/home_container/more/editProfile/phoneVerify/PhoneVerifyPage';
import EmailVerifyPage from './src/containers/home_container/more/editProfile/emailverify/EmailVerifyPage';
import Extra from './src/containers/home_container/more/editProfile/portfolio/Extra';
import BasicInfo_2 from './src/containers/home_container/more/editProfile/basicInfo/BasicInfo_2';
import BecomeTasker_Agree from './src/containers/home_container/more/editProfile/becomeATasker/BecomeTasker_Agree';
import NewDocumentUploadPageWithSelfi from './src/containers/home_container/more/editProfile/documentUpload/NewDocumentUploadPageWithSelfi';
import DocumentUpload from './src/containers/home_container/more/editProfile/documentUpload/DocumentUpload';
import BasicInfo_intro from './src/containers/home_container/more/editProfile/basicInfo/BasicInfo_intro';
import FilterPage from './src/containers/home_container/browse/filter/FilterPage';
import Filter_Location_selectPage from './src/containers/home_container/browse/filter/Filter_Location_selectPage';
import FilterCategorySelect from './src/containers/home_container/browse/filter/FilterCategorySelect';
import MyProfile from './src/containers/home_container/more/myProfile/MyProfile';
import TaskDetails from './src/containers/home_container/my_tasks/taskDetails';
import SimpleEditProfile from './src/containers/home_container/more/myProfile/SimpleEditProfile';
import DashboardScreen from './src/containers/home_container/more/dashboard';
import HowDoScores from './src/containers/home_container/more/dashboard/HowDoScores';
import PasswordScreen from './src/containers/home_container/more/Change_Password';
import PaymentHistory from './src/containers/home_container/more/PaymentHistory';
import Wallet from './src/containers/home_container/more/Wallet/Wallet';
import Discover from './src/containers/home_container/more/Discover/Discover';
import Howitworks from './src/containers/home_container/more/HelpTopics/Howitworks';
import EarnMoney from './src/containers/home_container/more/HelpTopics/EarnMoney';
import Help from './src/containers/home_container/more/HelpTopics/Help';
import HelpSearch from './src/containers/home_container/more/HelpTopics/HelpSearch';
import HelpArticleDetails from './src/containers/home_container/more/HelpTopics/HelpArticleDetails';
import HelpArticles from './src/containers/home_container/more/HelpTopics/HelpArticles';
import HelpSections from './src/containers/home_container/more/HelpTopics/HelpSections';
import TellAFriend from './src/containers/home_container/more/TellAFriend/TellAFriend';
import Disputes from './src/containers/home_container/more/Disputes/Disputes';
import DisputesDetails from './src/containers/home_container/more/Disputes/DisputesDetails';
import DisputesAdd from './src/containers/home_container/more/Disputes/DisputesAdd';
import Initial_listing_Page from './src/containers/home_container/more/LMS1/LMS_Initial_listing/Initial_listing_Page';
import ListAllServices from './src/containers/home_container/more/List_all_services/ListAllServices';
import LMS1 from './src/containers/home_container/more/LMS1';
import LMS2 from './src/containers/home_container/more/LMS1/LMS2/LMS2';
import LMS3 from './src/containers/home_container/more/LMS1/LMS3/LMS3';
import LMS4 from './src/containers/home_container/more/LMS1/LMS4/LMS4';
import LMS5 from './src/containers/home_container/more/LMS1/LMS5/LMS5';
import LMS6 from './src/containers/home_container/more/LMS1/LMS6/LMS6';
import LMS7 from './src/containers/home_container/more/LMS1/LMS7/LMS7';
import AfterListing from './src/containers/home_container/more/LMS1/LMS_after_listing/AfterListing';
import ContinueToBook from './src/containers/home_container/more/LMS1/LMS_Continue_To_Book/ContinueToBook';
import ViewListing from './src/containers/home_container/more/LMS1/LMS_view_listing/ViewListing';
import My_Listing_page from './src/containers/home_container/more/LMS1/LMS_My_Listing/My_Listing_page';
import NotificationPreferences from './src/containers/home_container/more/Notification Preferences/NotificationPreferences';
import NotificationsScreen from './src/containers/home_container/more/notifications';
import MyReview from './src/containers/home_container/more/MyReview';
import Settings from './src/containers/home_container/more/Settings';
import PaymentMethod from './src/containers/home_container/more/myProfile/PaymentMethod/PaymentMethod';
import PaymentMethodView from './src/containers/home_container/more/myProfile/PaymentMethod/PaymentMethodView';
import PaymentMethodUpdate from './src/containers/home_container/more/myProfile/PaymentMethod/PaymentMethodUpdate';
import SubCategoriesListingPage from './src/containers/home_container/get_it_done/SubCategoriesListingPage';
import Finance from './src/containers/home_container/more/Finance/Finance';
import WithdrawMoney from './src/containers/home_container/more/Finance/WithdrawMoney';
import HelpTopics from './src/containers/home_container/more/HelpTopics';
import Blog from './src/containers/home_container/more/HelpTopics/Blog';
import BlogDetails from './src/containers/home_container/more/HelpTopics/BlogDetails';
import CommunityGuidelines from './src/containers/home_container/more/HelpTopics/CommunityGuidelines';
import CommunityGuidelinesPoster from './src/containers/home_container/more/HelpTopics/CommunityGuidelinesPoster';
import CommunityGuidelinesTasker from './src/containers/home_container/more/HelpTopics/CommunityGuidelinesTasker';
import AboutUs from './src/containers/home_container/more/HelpTopics/AboutUs';
import ContactUs from './src/containers/home_container/more/HelpTopics/ContactUs';
import MakingMoneyModal from './src/containers/home_container/my_tasks/make_an_offer/MakingMoneyModal';
import Search_Tag_modalPage from './src/containers/home_container/more/LMS1/LMS2/Search_Tag_modalPage';
import LmsCategorySelection from './src/containers/home_container/more/LMS1/LmsCategorySelection';
import LocationSelectionPage from './src/containers/home_container/more/LMS1/LMS4/LocationSelectionPage';
import FAQ from './src/containers/home_container/more/HelpTopics/FAQ';
import NewOfferPage from './src/containers/home_container/my_tasks/make_an_offer/NewOfferPage';
import Noti_Location_selectPage from './src/containers/home_container/more/Notification Preferences/Noti_Location_selectPage';
import NewOfferPage_chatWithTasker from './src/containers/home_container/my_tasks/make_an_offer/NewOfferPage_chatWithTasker';
import Category_Choose_Page from './src/components/Category_Choose_Page';
import PublicProfile from './src/containers/home_container/more/PublicProfile/PublicProfile';
import PublicReview from './src/containers/home_container/more/PublicReview/PublicReview';
import ListingFilterPage from './src/containers/home_container/more/List_all_services/ListingFilterPage';
import Listing_Filter_Location_selectPage from './src/containers/home_container/more/List_all_services/Listing_Filter_Location_selectPage';
import PaymentReservation from './src/containers/home_container/my_tasks/make_an_offer/PaymentReservation';
import ListingFilterCategorySelect from './src/containers/home_container/more/List_all_services/ListingFilterCategorySelect';
import ChatPage from './src/containers/home_container/messages/ChatPage';
import VoucherList from './src/containers/home_container/my_tasks/make_an_offer/VoucherList';
import HelpCenter from './src/containers/home_container/more/HelpTopics/HelpCenter';
import InquiryViaEmail from './src/containers/home_container/more/HelpTopics/HelpCenter/InquiryViaEmail';
import RequestCallback from './src/containers/home_container/more/HelpTopics/HelpCenter/RequestCallback';
import SelectDay from './src/containers/home_container/more/HelpTopics/HelpCenter/SelectDay';
import SelectTime from './src/containers/home_container/more/HelpTopics/HelpCenter/SelectTime';
import NewFinance from './src/containers/home_container/more/Finance/NewFinance';
import MyVouchers from './src/containers/home_container/more/Finance/MyVouchers';
import AddNewCardBankDetails from './src/containers/home_container/more/Finance/AddNewCardBankDetails';
import AddBank from './src/containers/home_container/more/Finance/AddBank';

const App = () => {
  const linking = {
    prefixes: ['https://'],
    config: {
      initialRouteName: 'Home',
      screens: {
        TaskDetails: {
          path: 'eazypay.com/taskdetails/:browserslug'
        },
        PublicProfile: {
          path: 'eazypay.com/profile/:PublicSlug'
        },
        Home: {
          path: 'eazypay.com/home'
        }
      }
    }
  };
  const Stack = createStackNavigator();
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <RTLProvider>
      {/* <SafeAreaView style={backgroundStyle}> */}
      <StatusBar
        backgroundColor={cl.blue}
        // barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        barStyle={'light-content'}
      />
      <ContextApi >
        <NavigationContainer
          linking={linking}
        >
          <Stack.Navigator>
            <Stack.Screen
              name="Intro"
              component={IntroScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="QuickIntro_SkipIntro"
              component={QuickIntro_SkipIntro}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="IntroCarouselPage"
              component={IntroCarouselPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="IntroVideoScreen"
              component={IntroVideoScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Lang"
              component={LangSelection}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TakingEmail"
              component={TakingEmail}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TakingPassword"
              component={TakingPassword}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TakingDetails"
              component={TakingDetails}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SelectLocationPage"
              component={SelectLocationPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PhoneCodeSelectPage"
              component={PhoneCodeSelectPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AfterSignUpThreePointPage"
              component={AfterSignUpThreePointPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EmailVerificationPage"
              component={EmailVerificationPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TakingEmailForLogin"
              component={TakingEmailForLogin}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TakingPasswordForLogin"
              component={TakingPasswordForLogin}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              // component={HomeIndex}
              component={DrawerPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PrivacyPolicy"
              component={PrivacyPolicy}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Termsandcondition"
              component={Termsandcondition}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EnterEmail"
              component={EnterEmail}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ForgotPasswordVerify"
              component={ForgotPasswordVerify}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NewPassword"
              component={NewPassword}
              options={{ headerShown: false }}
            />
            {/* *********************Testing*************** */}
            <Stack.Screen
              name="CountrySelect"
              component={CountrySelect}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EditProfile_Address"
              component={EditProfile_Address}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="New_beAFixer_Step2"
              component={New_beAFixer_Step2}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LanguageSelect"
              component={LanguageSelect}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SkillSelect"
              component={SkillSelect}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TransPortSelect"
              component={TransPortSelect}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CertificatedSelection"
              component={CertificatedSelection}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="CategorySelect"
              component={CategorySelect}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NewDocumentUploadPageWithSelfi"
              component={NewDocumentUploadPageWithSelfi}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DocumentUpload"
              component={DocumentUpload}
              options={{ headerShown: false }}
            />






            <Stack.Screen
              options={{
                headerShown: false,
                //  tabBarVisible: false

                // tabBarStyle: { display: "none" }
              }}
              name="PostTaskDetails"
              component={PostTaskDetails}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="PostTaskplace"
              component={postTaskplace}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="PostTaskImage"
              component={postTaskImage}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="postTaskBudget"
              component={postTaskBudget}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="AddMustHave"
              component={AddMustHave}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="PostTask_Location_selectPage"
              component={PostTask_Location_selectPage}
            />



            <Stack.Screen
              options={{ headerShown: false }}
              name="EditTaskDetails"
              component={EditTaskDetails}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="EditTaskplace"
              component={EditTaskplace}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="EditTaskImage"
              component={EditTaskImage}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="EditTaskBudget"
              component={EditTaskBudget}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="EditAddMustHave"
              component={EditAddMustHave}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="EditTask_Location_selectPage"
              component={EditTask_Location_selectPage}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="SimilarTaskplace"
              component={SimilarTaskplace}
            />





            <Stack.Screen
              options={{ headerShown: false }}
              name="BasicInfo_intro"
              component={BasicInfo_intro}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="BasicInfo"
              component={BasicInfoScreen}
            />

            <Stack.Screen
              name="BasicInfo_2"
              component={BasicInfo_2}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="BecomeTasker_Agree"
              component={BecomeTasker_Agree}
              options={{ headerShown: false }}
            />
            {/* <Stack.Screen
      name="EditProfile"
      component={EditProfile}
      options={{ headerShown: false }}
    /> */}
            {/* <Stack.Screen
      options={{ headerShown: false }}
      name="Portfolio"
      component={PortfolioScreen}
    /> */}
            {/* <Stack.Screen
      options={{ headerShown: false }}
      name="Skills"
      component={SkillsScreen}
    /> */}
            <Stack.Screen
              options={{ headerShown: false }}
              name="PhoneVerifyPage"
              component={PhoneVerifyPage}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="EmailVerifyPage"
              component={EmailVerifyPage}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Extra"
              component={Extra}
            />

            <Stack.Screen
              options={{ headerShown: false }}
              name="FilterPage"
              component={FilterPage}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Filter_Location_selectPage"
              component={Filter_Location_selectPage}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="FilterCategorySelect"
              component={FilterCategorySelect}
            />


            <Stack.Screen
              name="MyProfile"
              component={MyProfile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PublicProfile"
              component={PublicProfile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SimpleEditProfile"
              component={SimpleEditProfile}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="TaskDetails"
              component={TaskDetails}
              options={{ headerShown: false }}
            />



            {/* for drawer Navigation */}

            <Stack.Screen
              name="Dashboard"
              component={DashboardScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="HowDoScores"
              component={HowDoScores}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PaymentHistory"
              component={PaymentHistory}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Wallet"
              component={Wallet}
            />
            <Stack.Screen
              name="Discover"
              component={Discover}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Howitworks"
              component={Howitworks}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EarnMoney"
              component={EarnMoney}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Help"
              component={Help}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="HelpSections"
              component={HelpSections}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="HelpArticles"
              component={HelpArticles}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="HelpArticleDetails"
              component={HelpArticleDetails}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="HelpSearch"
              component={HelpSearch}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TellAFriend"
              component={TellAFriend}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              options={{ headerShown: false }}
              name="Disputes"
              component={Disputes}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="DisputesDetails"
              component={DisputesDetails}
            />

            <Stack.Screen
              options={{ headerShown: false }}
              name="DisputesAdd"
              component={DisputesAdd}
            />

            {/* listing */}
            <Stack.Screen
              options={{ headerShown: false }}
              name="Initial_listing_Page"
              component={Initial_listing_Page}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="ListAllServices"
              component={ListAllServices}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="ListingFilterPage"
              component={ListingFilterPage}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Listing_Filter_Location_selectPage"
              component={Listing_Filter_Location_selectPage}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="ListingFilterCategorySelect"
              component={ListingFilterCategorySelect}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="My_Listing_page"
              component={My_Listing_page}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="ViewListing"
              component={ViewListing}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="ContinueToBook"
              component={ContinueToBook}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="AfterListing"
              component={AfterListing}
            />

            <Stack.Screen
              options={{ headerShown: false }}
              name="LMS1"
              component={LMS1}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="LmsCategorySelection"
              component={LmsCategorySelection}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="LMS2"
              component={LMS2}
            />

            <Stack.Screen
              options={{ headerShown: false }}
              name="Search_Tag_modalPage"
              component={Search_Tag_modalPage}
            />

            <Stack.Screen
              options={{ headerShown: false }}
              name="LMS3"
              component={LMS3}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="LMS4"
              component={LMS4}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="LocationSelectionPage"
              component={LocationSelectionPage}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="LMS5"
              component={LMS5}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="LMS6"
              component={LMS6}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="LMS7"
              component={LMS7}
            />

            <Stack.Screen
              name="Notifications"
              component={NotificationsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="NotificationPreferences"
              component={NotificationPreferences}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Category_Choose_Page"
              component={Category_Choose_Page}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Noti_Location_selectPage"
              component={Noti_Location_selectPage}
            />
            <Stack.Screen
              name="MyReview"
              component={MyReview}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PublicReview"
              component={PublicReview}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PaymentMethod"
              component={PaymentMethod}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PaymentMethodView"
              component={PaymentMethodView}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PaymentMethodUpdate"
              component={PaymentMethodUpdate}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Skills"
              component={SkillsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Portfolio"
              component={PortfolioScreen}
              options={{ headerShown: false }}
            />


            <Stack.Screen
              name="password"
              component={PasswordScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              options={{ headerShown: false }}
              name="SubCategoriesListingPage"
              component={SubCategoriesListingPage}
            />

            {/* <Stack.Screen
              options={{ headerShown: false }}
              name="Finance"
              component={Finance}
            /> */}
            <Stack.Screen
              options={{ headerShown: false }}
              name="Finance"
              component={NewFinance}
            />

            <Stack.Screen
              options={{ headerShown: false }}
              name="MyVoucher"
              component={MyVouchers}
            />

            <Stack.Screen
              options={{ headerShown: false }}
              name="AddNewCardBankDetails"
              component={AddNewCardBankDetails}
            />

            <Stack.Screen
              options={{ headerShown: false }}
              name="AddBank"
              component={AddBank}
            />

            <Stack.Screen
              options={{ headerShown: false }}
              name="WithdrawMoney"
              component={WithdrawMoney}
            />

            <Stack.Screen
              name="HelpTopics"
              component={HelpTopics}
              options={{ headerShown: false }}
            />

            {/* Added routes by Vishesh Sharma */}
            <Stack.Screen
              name="HelpCenter"
              component={HelpCenter}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="InquiryViaEmail"
              component={InquiryViaEmail}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="RequestCallback"
              component={RequestCallback}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="SelectDay"
              component={SelectDay}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SelectTime"
              component={SelectTime}
              options={{ headerShown: false }}
            />


            <Stack.Screen
              name="FAQ"
              component={FAQ}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Blog"
              component={Blog}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="BlogDetails"
              component={BlogDetails}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CommunityGuidelines"
              component={CommunityGuidelines}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CommunityGuidelinesTasker"
              component={CommunityGuidelinesTasker}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CommunityGuidelinesPoster"
              component={CommunityGuidelinesPoster}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AboutUs"
              component={AboutUs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ContactUs"
              component={ContactUs}
              options={{ headerShown: false }}
            />




            {/* make an offer update offer ETC */}



            <Stack.Screen
              name="MakingMoneyModal"
              component={MakingMoneyModal}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NewOfferPage"
              component={NewOfferPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NewOfferPage_chatWithTasker"
              component={NewOfferPage_chatWithTasker}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PaymentReservation"
              component={PaymentReservation}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="VoucherList"
              component={VoucherList}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="ChatPage"
              component={ChatPage}
              options={{ headerShown: false }}
            />



          </Stack.Navigator >
        </NavigationContainer >
      </ContextApi>
      {/* </SafeAreaView> */}
    </RTLProvider>
  );
};

export default App;



