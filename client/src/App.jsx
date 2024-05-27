import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { UserDashboardPage } from "./pages/UserDashboardPage";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";
import { TourPage } from "./pages/TourPage";
import { UnknownRoutePage } from "./pages/UnknownRoutePage";
import { Header } from "./models/Header";
import { Footer } from "./models/Footer";

import styles from "./App.module.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


const App = () => {

    return (
        <div className={styles.main}>

            <BrowserRouter>
                <div>
                    <Header />
                </div>


                <div className={styles.content}>
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

        </div>

    )
}

export default App;
