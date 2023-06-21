import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MyTaskScreen from './MyTasks';
import TaskDetails from './taskDetails';
import EditTaskDetails from './edit_task/EditTaskDetails';
import EditTaskplace from './edit_task/edit_task_2ndstep/EditTaskplace';
import EditTaskImage from './edit_task/edit_task_3rdStep/EditTaskImage';
import EditTaskBudget from './edit_task/edit-task_4thstep/EditTaskBudget';
import EditAddMustHave from './edit_task/EditAddMustHave';
import SimilarTaskplace from './edit_task/Similar_task_2ndstep/SimilarTaskplace';
import SingleBrowseMap from '../browse/single_BrowseMap/SingleBrowseMap';
import BasicInfoScreen from '../more/editProfile/basicInfo';
import PortfolioScreen from '../more/editProfile/portfolio';
import SkillsScreen from '../more/editProfile/skills';
import PhoneVerifyPage from '../more/editProfile/phoneVerify/PhoneVerifyPage';
import EmailVerifyPage from '../more/editProfile/emailverify/EmailVerifyPage';
import strings from '../../../constants/lng/LocalizedStrings';
import MoreScreen from '../more';
import MyProfileScreen from '../more/myProfile';
import PaymentWebPage from './make_an_offer/PaymentWebPage';
import PublicProfile from '../more/PublicProfile/PublicProfile';
import Howitworks from '../more/HelpTopics/Howitworks';
import Termsandcondition from '../more/HelpTopics/Termsandcondition';
import Messages2 from '../messages/Messages2/Messages2';
import ChatPage from '../messages/ChatPage';
import Disputes from '../more/Disputes/Disputes';
import DisputesDetails from '../more/Disputes/DisputesDetails';
import DisputesAdd from '../more/Disputes/DisputesAdd';
import HowDoScores from '../more/dashboard/HowDoScores';
import AfterListing from '../more/LMS1/LMS_after_listing/AfterListing';
import LMS7 from '../more/LMS1/LMS7/LMS7';
import LMS6 from '../more/LMS1/LMS6/LMS6';
import LMS5 from '../more/LMS1/LMS5/LMS5';
import LMS4 from '../more/LMS1/LMS4/LMS4';
import LMS3 from '../more/LMS1/LMS3/LMS3';
import LMS2 from '../more/LMS1/LMS2/LMS2';
import LMS1 from '../more/LMS1';
import Initial_listing_Page from '../more/LMS1/LMS_Initial_listing/Initial_listing_Page';
import AddMustHave from '../get_it_done/post_task/AddMustHave';
import postTaskBudget from '../get_it_done/post_task/post-task_4thstep/postTaskBudget';
import postTaskImage from '../get_it_done/post_task/post_task_3rdStep/postTaskImage';
import postTaskplace from '../get_it_done/post_task/post_task_2ndstep/postTaskplace';
import postTaskDetails from '../get_it_done/post_task/postTaskDetails';
import GetItDone from '../get_it_done/GetItDone';
import BrowseMap from '../browse/BrowseMap';
import BrowseScreen from '../browse';
import My_Listing_page from '../more/LMS1/LMS_My_Listing/My_Listing_page';
import ViewListing from '../more/LMS1/LMS_view_listing/ViewListing';
import ContinueToBook from '../more/LMS1/LMS_Continue_To_Book/ContinueToBook';
import DocumentUpload from '../more/editProfile/documentUpload/DocumentUpload';
import EditProfile from '../more/editProfile';
import Extra from '../more/editProfile/portfolio/Extra';
import BothEmailPhoneVerify from '../more/editProfile/bothEmailPhoneVerify/BothEmailPhoneVerify';
import DashboardScreen from '../more/dashboard';
import EditTask_Location_selectPage from './edit_task/EditTask_Location_selectPage';
import PostTask_Location_selectPage from '../get_it_done/post_task/PostTask_Location_selectPage';
import BasicInfo_2 from '../more/editProfile/basicInfo/BasicInfo_2';
import BecomeTasker_Agree from '../more/editProfile/becomeATasker/BecomeTasker_Agree';
const Stack = createStackNavigator();

function MyTaskIndex() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyTasks"
        component={MyTaskScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SingleBrowseMap"
        component={SingleBrowseMap}
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
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Portfolio"
        component={PortfolioScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Skills"
        component={SkillsScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="PostTask_Location_selectPage"
        component={PostTask_Location_selectPage}
      />
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
        name={strings.TABNAVIGATION.MORE}
        component={MoreScreen}
      />
      {/* <Stack.Screen
        name="MyProfile"
        component={MyProfileScreen}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="PaymentWebPage"
        component={PaymentWebPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PublicProfile"
        component={PublicProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Howitworks"
        component={Howitworks}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Termsandcondition"
        component={Termsandcondition}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Messages2"
        component={Messages2}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatPage"
        component={ChatPage}
        options={{ headerShown: false }}
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
      <Stack.Screen
        name="HowDoScores"
        component={HowDoScores}
        options={{ headerShown: false }}
      />
      {/************************** LISTING********************* */}
      <Stack.Screen
        options={{ headerShown: false }}
        name="Initial_listing_Page"
        component={Initial_listing_Page}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="LMS1"
        component={LMS1}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="LMS2"
        component={LMS2}
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
      {/* <Stack.Screen
        options={{ headerShown: false }}
        name="PhoneVerifyPage"
        component={PhoneVerifyPage}
      /> */}
      {/* <Stack.Screen
        options={{ headerShown: false }}
        name="EmailVerifyPage"
        component={EmailVerifyPage}
      /> */}
      <Stack.Screen
        options={{ headerShown: false }}
        name="AfterListing"
        component={AfterListing}
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

      {/* post task */}

      <Stack.Screen
        options={{ headerShown: false }}
        name="GetItDone"
        component={GetItDone}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="PostTaskDetails"
        component={postTaskDetails}
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

      {/* Browser Task */}

      <Stack.Screen
        name="Browse"
        component={BrowseScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BrowseMap"
        component={BrowseMap}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="DocumentUpload"
        component={DocumentUpload}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Extra"
        component={Extra}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="BothEmailPhoneVerify"
        component={BothEmailPhoneVerify}
      />
      {/* <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
}

export default MyTaskIndex;
