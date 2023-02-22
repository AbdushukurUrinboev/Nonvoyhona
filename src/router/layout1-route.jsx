import { Switch, Route, useLocation } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from "react-transition-group";

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

// order - ZAKAZLAR
import Order from '../views/backend/Main/Order';
import Ordernew from '../views/backend/Main/Ordernew';
import Orderdetails from '../views/backend/Main/Orderdetails';

// Output - CHIQIMLAR
import Output from '../views/backend/Main/Output';
import Outputadd from '../views/backend/Main/Outputadd';

//Debt - NASIYA
import Debt from '../views/backend/Main/Debt';
import Debtadd from '../views/backend/Main/Debtadd';

//Plans - REJALAR
import Plans from '../views/backend/Main/Plans';
import Plansadd from '../views/backend/Main/Plansadd';

//Calculate - Kalkulyatsiya
import Calculate from '../views/backend/Main/Calculate';
import Calculateadd from '../views/backend/Main/Calculateadd';

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

// DataProvider - stateManagement
import { DataProvider, BreadListData, CustomerListData, StaffListData } from '../views/backend/Main/ContextProvider/DataProvider';

const Layout1Route = () => {

    let location = useLocation();

    return (
        <DataProvider>
            <BreadListData>
                <CustomerListData>
                    <StaffListData>
                        <Switch location={location}>
                            <Route path="/" exact component={Dashbord} />

                            {/* App */}
                            <Route path="/user-profile" component={UserProfile} />
                            <Route path="/user-add" component={UserAdd} />
                            <Route path="/user-list" component={UserList} />
                            <Route path="/user-account-setting" component={UserAccountSettingList} />
                            <Route path="/user-profile-edit" component={UserProfileEdit} />


                            {/* Extrapages */}

                            <Route path="/pricing-1" component={Pricing1} />
                            <Route path="/pages-invoice" component={Invoice} />
                            <Route path="/pages-blank-page" component={BlankPage} />
                            <Route path="/terms-of-service" component={TermsOfUse} />
                            <Route path="/privacy-policy" component={PrivacyPolicy} />

                            {/*Customer*/}
                            <Route path="/customers" component={Customer} />
                            <Route path="/customers-add" component={Customeradd} />
                            <Route path='/customer/:id' component={Customerview} />
                            <Route path="/customers-edit" component={Customeredit} />

                            {/*STAFF*/}
                            <Route path="/staff" component={Staff} />
                            <Route path="/staff-add" component={Staffadd} />
                            <Route path="/staf/:id" component={Staffview} />
                            <Route path="/staff-edit" component={StaffEdit} />


                            {/* Product */}
                            <Route path="/products" component={Product} />
                            <Route path="/product/:id" component={ProductView} />
                            <Route path="/product-add" component={ProductAdd} />

                            {/* Output */}
                            <Route path="/output" component={Output} />
                            <Route path="/output-add" component={Outputadd} />

                            {/* Debt */}
                            <Route path="/debt" component={Debt} />
                            <Route path="/debt-add" component={Debtadd} />

                            {/* Calculate */}
                            <Route path="/calculate" component={Calculate} />
                            <Route path="/calculate-add" component={Calculateadd} />

                            {/* Kunlik ish */}
                            <Route path="/kunlik-ish" component={KunlikIsh} />
                            <Route path="/kunlik-ish-add" component={KunlikIshadd} />



                            {/* Plans */}
                            <Route path="/plan" component={Plans} />
                            <Route path="/plan-add" component={Plansadd} />

                            {/* Sail */}
                            <Route path="/sale" component={Sail} />
                            <Route path="/sale-add" component={SailAdd} />

                            {/* Order */}
                            <Route path="/order" component={Order} />
                            <Route path="/order-new" component={Ordernew} />
                            <Route path="/order-details" component={Orderdetails} />

                            {/* Xamkorlar */}
                            <Route path="/xamkorlar" component={Xamkorlar} />
                            <Route path="/xamkorlar-add" component={XamkorlarAdd} />

                        </Switch>
                    </StaffListData>
                </CustomerListData>
            </BreadListData>
        </DataProvider>
    )
}

export default Layout1Route