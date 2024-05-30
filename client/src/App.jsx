import { useCallback, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage, LoginPage, RegisterPage, UserDashboardPage, AdminDashboardPage, TourPage, UnknownRoutePage } from "./pages/index.jsx";
import { Header, Footer } from "./models/index.jsx";

import styles from "./App.module.css";
import "./style.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Stack from "react-bootstrap/Stack";
import { classNames } from "./shared/classNames.mjs";
import { PrivateRoute } from "./shared/components/PrivateRoute.jsx";
import { ADMIN_ROLE, USER_ROLE } from "./shared/userRoles.mjs";
import { AlertBase } from "./ui/index.jsx";

const App = () => {

    const [displayAccessDenied, setDisplayAccessDenied] = useState(false);

    const showAccessDenied = useCallback(() => setDisplayAccessDenied(true), []);

    const hideAccessDenied = useCallback(() => setDisplayAccessDenied(false), []);

    return (
        <Stack className={styles.main}>

            <BrowserRouter>
                <div>
                    <Header />
                </div>


                <div className={classNames("p-2", styles.content)}>
                    <main>
                        <div className={styles.alert_container} id="alert-placement">
                            {
                                displayAccessDenied && 
                                <AlertBase variant="danger" heading="Access denied" onClose={hideAccessDenied} show={displayAccessDenied} >
                                    <p>You dont have privileges to access this page</p>
                                </AlertBase>
                            }
                        </div>
                        <Routes>
                            <Route path="/" element={<HomePage/>}/>
                            <Route path="/login" element={<LoginPage/>}/>
                            <Route path="/register" element={<RegisterPage/>}/>
                            <Route path="/dashboard" element={
                                <PrivateRoute showAccessDenied={showAccessDenied} role={USER_ROLE}>
                                    <UserDashboardPage/>
                                </PrivateRoute>
                            }/>
                            <Route path="/admin-dashboard" element={
                                <PrivateRoute showAccessDenied={showAccessDenied} role={ADMIN_ROLE}>
                                    <AdminDashboardPage/>
                                </PrivateRoute>
                            }/>
                            <Route path="/tour/:id" element={<TourPage/>}/>
                            <Route path="*" element={<UnknownRoutePage/>}/>
                        </Routes>
                    </main>
                </div>

                <div>
                    <Footer />
                </div>
            </BrowserRouter>

        </Stack>

    );
};

export default App;
