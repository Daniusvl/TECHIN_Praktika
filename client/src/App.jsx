import { useCallback, useState, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage, LoginPage, RegisterPage, UserDashboardPage, AdminDashboardPage, TourPage, UnknownRoutePage, ErrorBoundary, SuspenseFallbackPage } from "./pages/index.jsx";
import { Header, Footer } from "./models/index.jsx";
import { AuthProvider } from "./shared/hooks/useAuth";

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
        <ErrorBoundary>
            <AuthProvider>
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
                                <div id="modal-placement"></div>
                                <Routes>
                                    <Route path="/" element={
                                        <Suspense fallback={<SuspenseFallbackPage />}>
                                            <HomePage/>
                                        </Suspense>
                                    }/>
                                    <Route path="/login" element={
                                        <Suspense fallback={<SuspenseFallbackPage />}>
                                            <LoginPage/>
                                        </Suspense>
                                    }/>
                                    <Route path="/register" element={
                                        <Suspense fallback={<SuspenseFallbackPage />}>
                                            <RegisterPage/>
                                        </Suspense>
                                    }/>
                                    <Route path="/dashboard" element={
                                        <Suspense fallback={<SuspenseFallbackPage />}>
                                            <PrivateRoute showAccessDenied={showAccessDenied} role={USER_ROLE}>
                                                <UserDashboardPage/>
                                            </PrivateRoute>
                                        </Suspense>
                                    }/>
                                    <Route path="/admin-dashboard" element={
                                        <Suspense fallback={<SuspenseFallbackPage />}>
                                            <PrivateRoute showAccessDenied={showAccessDenied} role={ADMIN_ROLE}>
                                                <AdminDashboardPage/>
                                            </PrivateRoute>
                                        </Suspense>
                                    }/>
                                    <Route path="/tour/:id" element={
                                        <Suspense fallback={<SuspenseFallbackPage />}>
                                            <TourPage/>
                                        </Suspense>
                                    }/>
                                    <Route path="*" element={
                                        <Suspense fallback={<SuspenseFallbackPage />}>
                                            <UnknownRoutePage/>
                                        </Suspense>
                                    }/>
                                </Routes>
                            </main>
                        </div>

                        <div>
                            <Footer />
                        </div>
                    </BrowserRouter>

                </Stack>
            </AuthProvider>
        </ErrorBoundary>
    );
};

export default App;
