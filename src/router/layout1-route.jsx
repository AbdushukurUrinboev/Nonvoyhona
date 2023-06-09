import React, { useState, useContext } from 'react';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { userContext } from '../views/backend/Main/ContextProvider/DataProvider';

//main - ASOSIY
import Dashbord from '../views/backend/Main/Dashbord'

// Calendar - KALENDAR
import Calendar from '../views/backend/Main/Calendar';

// Customer - MIJOZLAR
import Customer from '../views/backend/Main/Customer';
import Customeradd from '../views/backend/Main/Customeradd';
import Customerview from '../views/backend/Main/Cutomerview';
import Customeredit from '../views/backend/Main/Customeredit';

// Staff - XODIMLAR
import Staff from '../views/backend/Main/Staff';
import Staffadd from '../views/backend/Main/Staffadd';
import Staffview from '../views/backend/Main/Staffview';
import StaffEdit from '../views/backend/Main/Staffedit';

// Product - MAXSULOTLAR
import Product from '../views/backend/Main/Product';
import ProductView from '../views/backend/Main/ProductView';
import ProductAdd from '../views/backend/Main/ProductAdd';
import ProductEdit from '../views/backend/Main/ProductEdit';

// order - ZAKAZLAR
import Order from '../views/backend/Main/Order';
import Ordernew from '../views/backend/Main/Ordernew';
import Orderdetails from '../views/backend/Main/Orderdetails';
import OrderView from '../views/backend/Main/OrderView';

// Output - CHIQIMLAR
import Output from '../views/backend/Main/Output';
import Outputadd from '../views/backend/Main/Outputadd';
import OutputEdit from '../views/backend/Main/OutputEdit';

//Debt - NASIYA
import Debt from '../views/backend/Main/Debt';
import Debtadd from '../views/backend/Main/Debtadd';
import DebtEdit from '../views/backend/Main/DebtEdit';

//Plans - REJALAR
import Plans from '../views/backend/Main/Plans';
import Plansadd from '../views/backend/Main/Plansadd';
import PlansEdit from '../views/backend/Main/PlansEdit';

//Calculate - Kalkulyatsiya
import Calculate from '../views/backend/Main/Calculate';
import Calculateadd from '../views/backend/Main/Calculateadd';
import CalculateView from '../views/backend/Main/CalculateView';
import CalculateEdit from '../views/backend/Main/CalculateEdit';

// Kunlik ish
import KunlikIsh from '../views/backend/Main/KunlikIsh';
import KunlikIshadd from '../views/backend/Main/KunlikIshadd';


//App
import UserProfile from '../views/backend/App/UserManagement/UserProfile'
import UserAdd from '../views/backend/App/UserManagement/UserAdd'
import UserList from '../views/backend/App/UserManagement/UserList'
import UserAccountSettingList from '../views/backend/App/UserManagement/UserAccountSetting'
import UserProfileEdit from '../views/backend/App/UserManagement/UserProfileEdit'



//Extrapages - QO'SHIMCHA OYNALAR

import Pricing1 from '../views/backend/pages/Pricing/Pricing1'
import Invoice from '../views/backend/pages/Invoice'
import BlankPage from '../views/backend/pages/BlankPage'
import TermsOfUse from '../views/backend/pages/Extrapages/TermsOfUse'
import PrivacyPolicy from '../views/backend/pages/Extrapages/PrivacyPolicy'

//Sail pages - Sotuv iynalari
import Sail from '../views/backend/Main/Sail';
import SailAdd from '../views/backend/Main/SailAdd';

//Xamkor pages - Hamkor oynalasi
import Xamkorlar from '../views/backend/Main/Xamkorlar';
import XamkorlarAdd from '../views/backend/Main/XamkorAdd';
import XamkorEdit from '../views/backend/Main/XamkorEdit';
import XamkorView from '../views/backend/Main/XamkorView';

// DataProvider - stateManagement
import { DataProvider, AllStaffListData, DataProvider2, BreadListData, CustomerListData, StaffListData, XamkorListData, ZakazBreadListData, SotuvBreadListData, StaffTaskListData } from '../views/backend/Main/ContextProvider/DataProvider';
import PrivateRoute from '../views/backend/Main/PrivateRoute';



const Layout1Route = () => {

  let location = useLocation();

  return (

    <DataProvider>
      <DataProvider2>
        <BreadListData>
          <CustomerListData>
            <StaffListData>
              <XamkorListData>
                <ZakazBreadListData>
                  <SotuvBreadListData>
                    <StaffTaskListData>
                      <AllStaffListData>
                        <Switch location={location}>
                          <PrivateRoute path="/" exact component={Dashbord} />

                          {/* App */}
                          <PrivateRoute path="/user-profile" exact component={UserProfile} />
                          <PrivateRoute path="/user-add" exact component={UserAdd} />
                          <PrivateRoute path="/user-list" exact component={UserList} />
                          <PrivateRoute path="/user-account-setting" exact component={UserAccountSettingList} />
                          <PrivateRoute path="/user-profile-edit" exact component={UserProfileEdit} />


                          {/* Extrapages */}

                          <PrivateRoute path="/pricing-1" exact component={Pricing1} />
                          <PrivateRoute path="/pages-invoice" exact component={Invoice} />
                          <PrivateRoute path="/pages-blank-page" exact component={BlankPage} />
                          <PrivateRoute path="/terms-of-service" exact component={TermsOfUse} />
                          <PrivateRoute path="/privacy-policy" exact component={PrivacyPolicy} />

                          {/*Customer*/}
                          <PrivateRoute path="/customers" exact component={Customer} />
                          <PrivateRoute path="/customers-add" exact component={Customeradd} />
                          <PrivateRoute path='/customer/:id' exact component={Customerview} />
                          <PrivateRoute path="/customers-edit/:id" exact component={Customeredit} />

                          {/*STAFF*/}
                          <PrivateRoute path="/staff" exact component={Staff} />
                          <PrivateRoute path="/staff/:id" exact component={Staffview} />
                          <PrivateRoute path="/staff-add" exact component={Staffadd} />
                          <PrivateRoute path="/staff-edit/:id" exact component={StaffEdit} />


                          {/* Storage */}
                          <PrivateRoute path="/storage" exact component={Product} />
                          <PrivateRoute path="/storage/:id" exact component={ProductView} />
                          <PrivateRoute path="/storage-add" exact component={ProductAdd} />
                          <PrivateRoute path="/storage-edit/:id" exact component={ProductEdit} />

                          {/* Output */}
                          <PrivateRoute path="/output" exact component={Output} />
                          <PrivateRoute path="/output-add" exact component={Outputadd} />
                          <PrivateRoute path="/output-edit/:id" exact component={OutputEdit} />

                          {/* Debt */}
                          <PrivateRoute path="/nasiya" exact component={Debt} />
                          <PrivateRoute path="/nasiya-add" exact component={Debtadd} />
                          <PrivateRoute path="/nasiya-edit/:id" exact component={DebtEdit} />

                          {/* Calculate */}
                          <PrivateRoute path="/calculate" exact component={Calculate} />
                          <PrivateRoute path="/calculate-add" exact component={Calculateadd} />
                          <PrivateRoute path='/calculate/:id' exact component={CalculateView} />
                          <PrivateRoute path="/calculate-edit/:id" exact component={CalculateEdit} />

                          {/* Kunlik ish */}
                          <PrivateRoute path="/kunlik-ish" exact component={KunlikIsh} />
                          <PrivateRoute path="/kunlik-ish-add" exact component={KunlikIshadd} />

                          {/* Plans */}
                          <PrivateRoute path="/plan" exact component={Plans} />
                          <PrivateRoute path="/plan-add" exact component={Plansadd} />
                          <PrivateRoute path="/plan-edit/:id" exact component={PlansEdit} />

                          {/* Sail */}
                          <PrivateRoute path="/sale" exact component={Sail} />
                          <PrivateRoute path="/sale-add" exact component={SailAdd} />

                          {/* Order */}
                          <PrivateRoute path="/order" exact component={Order} />
                          <PrivateRoute path="/order-new" exact component={Ordernew} />
                          <PrivateRoute path="/order-details/:id" exact component={Orderdetails} />
                          <PrivateRoute path="/order/:id" exact component={OrderView} />

                          {/* Xamkorlar */}
                          <PrivateRoute path="/xamkorlar" exact component={Xamkorlar} />
                          <PrivateRoute path="/xamkor/:id" exact component={XamkorView} />
                          <PrivateRoute path="/xamkorlar-add" exact component={XamkorlarAdd} />
                          <PrivateRoute path="/xamkor-edit/:id" exact component={XamkorEdit} />
                          {/* Redirect to login page when doesnt match any routes */}
                          <Route render={() => <Redirect to="/auth/sign-in" />} />

                        </Switch>
                      </AllStaffListData>
                    </StaffTaskListData>
                  </SotuvBreadListData>
                </ZakazBreadListData>
              </XamkorListData>
            </StaffListData>
          </CustomerListData>
        </BreadListData>
      </DataProvider2>
    </DataProvider>

  )
}


export default Layout1Route