import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage, LoginPage, RegisterPage, UserDashboardPage, AdminDashboardPage, TourPage, UnknownRoutePage } from "./pages/index.jsx";
import { Header, Footer } from "./models/index.jsx";

import styles from "./App.module.css";
import "./style.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Stack from "react-bootstrap/Stack";
import { classNames } from "./shared/classNames.mjs";

const App = () => {

    return (
        <Stack className={styles.main}>

            <BrowserRouter>
                <div>
                    <Header />
                </div>


                <div className={classNames("p-2", styles.content)}>
                    <div className={styles.alert_container} id="alert-placement"></div>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/register" element={<RegisterPage/>}/>
                        <Route path="/dashboard" element={<UserDashboardPage/>}/>
                        <Route path="/admin-dashboard" element={<AdminDashboardPage/>}/>
                        <Route path="/tour/:id" element={<TourPage/>}/>
                        <Route path="*" element={<UnknownRoutePage/>}/>
                    </Routes>
                </div>

                <div>
                    <Footer />
                </div>
            </BrowserRouter>

        </Stack>

    );
};

export default App;
