import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// screens
import MoreScreen from './More';
import DashboardScreen from './dashboard';
import EditProfile from './editProfile';
import Notifications from './notifications';
import MyProfileScreen from './myProfile';
import PasswordScreen from './Change_Password';
import MyReview from './MyReview';
import PaymentHistory from './PaymentHistory';
import Settings from './Settings';
import HelpTopics from './HelpTopics';
import AboutUs from './HelpTopics/AboutUs';
import ContactUs from './HelpTopics/ContactUs';
import FAQ from './HelpTopics/FAQ';
import PrivacyPolicy from './HelpTopics/PrivacyPolicy';
import Howitworks from './HelpTopics/Howitworks';
import Termsandcondition from './HelpTopics/Termsandcondition';
import Help from './HelpTopics/Help';
import HelpSections from './HelpTopics/HelpSections';
import HelpArticles from './HelpTopics/HelpArticles';
import HelpArticleDetails from './HelpTopics/HelpArticleDetails';
import Blog from './HelpTopics/Blog';
import BlogDetails from './HelpTopics/BlogDetails';
import EarnMoney from './HelpTopics/EarnMoney';
import CommunityGuidelines from './HelpTopics/CommunityGuidelines';
import CommunityGuidelinesPoster from './HelpTopics/CommunityGuidelinesPoster';
import CommunityGuidelinesTasker from './HelpTopics/CommunityGuidelinesTasker';
import PublicProfile from './PublicProfile/PublicProfile';
import SkillsScreen from './editProfile/skills';
import PortfolioScreen from './editProfile/portfolio';
import BasicInfoScreen from './editProfile/basicInfo';
import TaskDetails from '../my_tasks/taskDetails';
import SingleBrowseMap from '../browse/single_BrowseMap/SingleBrowseMap';
import SimilarTaskplace from '../my_tasks/edit_task/Similar_task_2ndstep/SimilarTaskplace';
import EditAddMustHave from '../my_tasks/edit_task/EditAddMustHave';
import EditTaskBudget from '../my_tasks/edit_task/edit-task_4thstep/EditTaskBudget';
import EditTaskImage from '../my_tasks/edit_task/edit_task_3rdStep/EditTaskImage';
import EditTaskplace from '../my_tasks/edit_task/edit_task_2ndstep/EditTaskplace';
import EditTaskDetails from '../my_tasks/edit_task/EditTaskDetails';
import HowDoScores from './dashboard/HowDoScores';
import BrowseScreen from './../browse';
import Finance from './Finance/Finance';
import WithdrawMoney from './Finance/WithdrawMoney';
import Disputes from './Disputes/Disputes';
import DisputesDetails from './Disputes/DisputesDetails';
import DisputesAdd from './Disputes/DisputesAdd';
import LMS2 from './LMS1/LMS2/LMS2';
import LMS3 from './LMS1/LMS3/LMS3';
import LMS4 from './LMS1/LMS4/LMS4';
import LMS5 from './LMS1/LMS5/LMS5';
import LMS6 from './LMS1/LMS6/LMS6';
import LMS7 from './LMS1/LMS7/LMS7';
import LMS1 from './LMS1';
import PhoneVerifyPage from './editProfile/phoneVerify/PhoneVerifyPage';
import EmailVerifyPage from './editProfile/emailverify/EmailVerifyPage';
import My_Listing_page from './LMS1/LMS_My_Listing/My_Listing_page';
import ViewListing from './LMS1/LMS_view_listing/ViewListing';
import ContinueToBook from './LMS1/LMS_Continue_To_Book/ContinueToBook';
import BrowseMap from '../browse/BrowseMap';
import MyTaskScreen from '../my_tasks';
import AfterListing from './LMS1/LMS_after_listing/AfterListing';
import PaymentMethod from './myProfile/PaymentMethod/PaymentMethod';
import PaymentMethodView from './myProfile/PaymentMethod/PaymentMethodView';
import PaymentMethodUpdate from './myProfile/PaymentMethod/PaymentMethodUpdate';
import AddMustHave from '../get_it_done/post_task/AddMustHave';
import postTaskBudget from '../get_it_done/post_task/post-task_4thstep/postTaskBudget';
import postTaskImage from '../get_it_done/post_task/post_task_3rdStep/postTaskImage';
import postTaskplace from '../get_it_done/post_task/post_task_2ndstep/postTaskplace';
import postTaskDetails from '../get_it_done/post_task/postTaskDetails';
import GetItDone from '../get_it_done/GetItDone';
import Initial_listing_Page from './LMS1/LMS_Initial_listing/Initial_listing_Page';
import TellAFriend from './TellAFriend/TellAFriend';
import Discover from './Discover/Discover';
import ListAllServices from './List_all_services/ListAllServices';
import HelpSearch from './HelpTopics/HelpSearch';
import ChatPage from '../messages/ChatPage';
import Messages2 from '../messages/Messages2';
import SubCategoriesListingPage from '../get_it_done/SubCategoriesListingPage';
import Range_Page from './PaymentHistory/Range_Page';
import DocumentUpload from './editProfile/documentUpload/DocumentUpload';
import Wallet from './Wallet/Wallet';
import Extra from './editProfile/portfolio/Extra';
import BothEmailPhoneVerify from './editProfile/bothEmailPhoneVerify/BothEmailPhoneVerify';
import BasicInfo_2 from './editProfile/basicInfo/BasicInfo_2';
import BecomeTasker_Agree from './editProfile/becomeATasker/BecomeTasker_Agree';
import NotificationPreferences from './Notification Preferences/NotificationPreferences';
import PostTask_Location_selectPage from '../get_it_done/post_task/PostTask_Location_selectPage';

const Stack = createStackNavigator();

function MoreIndex() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="More"
        component={MoreScreen}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{headerShown: false}}
      /> */}
      {/* <Stack.Screen
        name="MyProfile"
        component={MyProfileScreen}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="password"
        component={PasswordScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyReview"
        component={MyReview}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TellAFriend"
        component={TellAFriend}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PaymentHistory"
        component={PaymentHistory}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Range_Page"
        component={Range_Page}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HelpTopics"
        component={HelpTopics}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Discover"
        component={Discover}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AboutUs"
        component={AboutUs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ContactUs"
        component={ContactUs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Termsandcondition"
        component={Termsandcondition}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Help"
        component={Help}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HelpSections"
        component={HelpSections}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HelpArticles"
        component={HelpArticles}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HelpArticleDetails"
        component={HelpArticleDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HelpSearch"
        component={HelpSearch}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Howitworks"
        component={Howitworks}
        options={{headerShown: false}}
      />
      <Stack.Screen name="FAQ" component={FAQ} options={{headerShown: false}} />
      <Stack.Screen
        name="Blog"
        component={Blog}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BlogDetails"
        component={BlogDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EarnMoney"
        component={EarnMoney}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CommunityGuidelines"
        component={CommunityGuidelines}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CommunityGuidelinesTasker"
        component={CommunityGuidelinesTasker}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CommunityGuidelinesPoster"
        component={CommunityGuidelinesPoster}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="HowDoScores"
        component={HowDoScores}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="PublicProfile"
        component={PublicProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Skills"
        component={SkillsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Portfolio"
        component={PortfolioScreen}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="BasicInfo"
        component={BasicInfoScreen}
        options={{headerShown: false}}
      /> */}
      {/* <Stack.Screen
        name="BasicInfo_2"
        component={BasicInfo_2}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="BecomeTasker_Agree"
        component={BecomeTasker_Agree}
        options={{headerShown: false}}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name="Finance"
        component={Finance}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="WithdrawMoney"
        component={WithdrawMoney}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Disputes"
        component={Disputes}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="DisputesDetails"
        component={DisputesDetails}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name="DisputesAdd"
        component={DisputesAdd}
      />


      
      <Stack.Screen
        options={{headerShown: false}}
        name="Initial_listing_Page"
        component={Initial_listing_Page}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ListAllServices"
        component={ListAllServices}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="LMS1"
        component={LMS1}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="LMS2"
        component={LMS2}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="LMS3"
        component={LMS3}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="LMS4"
        component={LMS4}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="LMS5"
        component={LMS5}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="LMS6"
        component={LMS6}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="LMS7"
        component={LMS7}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name="PhoneVerifyPage"
        component={PhoneVerifyPage}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="EmailVerifyPage"
        component={EmailVerifyPage}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="BothEmailPhoneVerify"
        component={BothEmailPhoneVerify}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="My_Listing_page"
        component={My_Listing_page}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ViewListing"
        component={ViewListing}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ContinueToBook"
        component={ContinueToBook}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="AfterListing"
        component={AfterListing}
      />
      <Stack.Screen
        name="PaymentMethod"
        component={PaymentMethod}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PaymentMethodView"
        component={PaymentMethodView}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PaymentMethodUpdate"
        component={PaymentMethodUpdate}
        options={{headerShown: false}}
      />

      {/* post task */}

      <Stack.Screen
        options={{headerShown: false}}
        name="GetItDone"
        component={GetItDone}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="PostTaskDetails"
        component={postTaskDetails}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="PostTaskplace"
        component={postTaskplace}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="PostTaskImage"
        component={postTaskImage}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="postTaskBudget"
        component={postTaskBudget}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="AddMustHave"
        component={AddMustHave}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name="PostTask_Location_selectPage"
        component={PostTask_Location_selectPage}
      />

      {/* warning */}

      <Stack.Screen
        name="Browse"
        component={BrowseScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BrowseMap"
        component={BrowseMap}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="TaskDetails"
        component={TaskDetails}
        options={{headerShown: false}}
      /> */}
      {/* <Stack.Screen
        name="MyTaskScreen"
        component={MyTaskScreen}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="MyTasks"
        component={MyTaskScreen}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="GetInTouchScreen"
        component={GetInTouchScreen}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        options={{headerShown: false}}
        name="EditTaskDetails"
        component={EditTaskDetails}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="EditTaskplace"
        component={EditTaskplace}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="EditTaskImage"
        component={EditTaskImage}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="EditTaskBudget"
        component={EditTaskBudget}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="EditAddMustHave"
        component={EditAddMustHave}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="SimilarTaskplace"
        component={SimilarTaskplace}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="SingleBrowseMap"
        component={SingleBrowseMap}
      />

      {/* chat page  */}

      {/* <Stack.Screen
        name="Messages"
        component={MessagesScreen}
        options={{ headerShown: false }}
      /> */}

      <Stack.Screen
        name="Messages2"
        component={Messages2}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChatPage"
        component={ChatPage}
        options={{headerShown: false}}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name="SubCategoriesListingPage"
        component={SubCategoriesListingPage}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="DocumentUpload"
        component={DocumentUpload}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Wallet"
        component={Wallet}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name="Extra"
        component={Extra}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="NotificationPreferences"
        component={NotificationPreferences}
      />
    </Stack.Navigator>
  );
}

export default MoreIndex;
