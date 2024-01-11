import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import ProfessionalDetailView from './component/ProfessionalDetailView';

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import LogIn from "./pages/LogIn";
import LogInPatient from "./pages/LogInPatient";
import LogInSpecialist from "./pages/LogInSpecialist";
import PrivatePatient from "./pages/PrivatePatient";

import SignUp from "./pages/SignUp.js";
import NewPatient from "./pages/NewPatient.js";
import NewSpecialist from "./pages/NewSpecialist.js";
import EditPatient from "./pages/EditPatient.js";
import PrivateSpecialist from "./pages/PrivateSpecialist.js";
import EditSpecialist from "./pages/EditSpecialist.js";

import ProfilePatient from "./pages/ProfilePatient.js";
import ProfileSpecialist from "./pages/ProfileSpecialist.js";
import FormSpecialist from "./pages/FormSpecialist.js";
import ProfessionalView from "./pages/ProfessionalView";
import PaySuccess from "./pages/PaySuccess.jsx";
import PayError from "./pages/PayError.jsx";
import PayPending from "./pages/PayPending.jsx";
import PaymentPage from "./pages/PaymentPage.js";



//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<LogIn />} path="/login" />
                        <Route element={<LogInPatient />} path="/login/loginPatient" />
                        <Route element={<LogInSpecialist />} path="/login/loginSpecialist" />
                        <Route element={<PrivatePatient />} path="/privatePatient" />
                        <Route element={<PrivateSpecialist />} path="/privateSpecialist" />
                        <Route element={<SignUp />} path="/signup" />
                        <Route element={<NewPatient />} path="/signup/newPatient" />
                        <Route element={<NewSpecialist />} path="/signup/newSpecialist" />

                        <Route element={<PaySuccess />} path="/success" />
                        <Route element={<PayError />} path="/failure" />
                        <Route element={<PayPending />} path="/pending" />
                        <Route element={<EditPatient />} path="/edit/patient" />
                        <Route element={<EditSpecialist />} path="/edit/specialist" />
                        <Route element={<ProfilePatient />} exact path="profile/patient/:theid" />
                        <Route element={<ProfileSpecialist />} exact path="profile/specialist/:theid" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<FormSpecialist />} path="edit/formSpecialist" />
                        <Route element={<ProfessionalView />} path="/professionalView" />
                        {/* <Route element={<ProfessionalView />} path=" /professional-view?page=4&limit=5" /> */}


                        <Route element={<PaymentPage />} path="profile/paymentPage/:theid" />

                        <Route element={<ProfessionalDetailView />} path="/professional-view/:id" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </div >
    );
};

export default injectContext(Layout);
