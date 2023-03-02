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
                            <Route path="/user-profile" exact component={UserProfile} />
                            <Route path="/user-add" exact component={UserAdd} />
                            <Route path="/user-list" exact component={UserList} />
                            <Route path="/user-account-setting" exact component={UserAccountSettingList} />
                            <Route path="/user-profile-edit" exact component={UserProfileEdit} />


                            {/* Extrapages */}

                            <Route path="/pricing-1" exact component={Pricing1} />
                            <Route path="/pages-invoice" exact component={Invoice} />
                            <Route path="/pages-blank-page" exact component={BlankPage} />
                            <Route path="/terms-of-service" exact component={TermsOfUse} />
                            <Route path="/privacy-policy" exact component={PrivacyPolicy} />

                            {/*Customer*/}
                            <Route path="/customers" exact component={Customer} />
                            <Route path="/customers-add" exact component={Customeradd} />
                            <Route path='/customer/:id' exact component={Customerview} />
                            <Route path="/customers-edit" exact component={Customeredit} />

                            {/*STAFF*/}
                            <Route path="/staff" exact component={Staff} />
                            <Route path="/staff-add" exact component={Staffadd} />
                            <Route path="/staff/:id" exact component={Staffview} />
                            <Route path="/staff-edit" exact component={StaffEdit} />


                            {/* Product */}
                            <Route path="/storage" exact component={Product} />
                            <Route path="/storage/:id" exact component={ProductView} />
                            <Route path="/storage-add" exact component={ProductAdd} />

                            {/* Output */}
                            <Route path="/output" exact component={Output} />
                            <Route path="/output-add" exact component={Outputadd} />

                            {/* Debt */}
                            <Route path="/debt" exact component={Debt} />
                            <Route path="/debt-add" exact component={Debtadd} />

                            {/* Calculate */}
                            <Route path="/calculate" exact component={Calculate} />
                            <Route path="/calculate-add" exact component={Calculateadd} />

                            {/* Kunlik ish */}
                            <Route path="/kunlik-ish" exact component={KunlikIsh} />
                            <Route path="/kunlik-ish-add" exact component={KunlikIshadd} />



                            {/* Plans */}
                            <Route path="/plan" exact component={Plans} />
                            <Route path="/plan-add" exact component={Plansadd} />

                            {/* Sail */}
                            <Route path="/sale" exact component={Sail} />
                            <Route path="/sale-add" exact component={SailAdd} />

                            {/* Order */}
                            <Route path="/order" exact component={Order} />
                            <Route path="/order-new" exact component={Ordernew} />
                            <Route path="/order-details" exact component={Orderdetails} />

                            {/* Xamkorlar */}
                            <Route path="/xamkorlar" exact component={Xamkorlar} />
                            <Route path="/xamkorlar-add" exact component={XamkorlarAdd} />

                        </Switch>
                    </StaffListData>
                </CustomerListData>
            </BreadListData>
        </DataProvider>
    )
}

export default Layout1Route