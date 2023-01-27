import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "styled-components";
import "./App.css";
import PageNotFound from "./components/elements/PageNotFound";
import PrivateRouter from "./components/elements/PrivateRouter";
import { ScrollToTop } from "./components/elements/ScrollTop";
import { useDarkMode } from "./components/elements/useDarkMode";
import Layout from "./layout/Layout";
import ForgetPassword from "./pages/forgetPassword/ForgetPassword";
import Login from "./pages/login/Login";
import SignUp from "./pages/signUp/SignUp";
import { routes } from "./routes/routes";
import {
    Container,
    darkMode,
    GlobalStyle,
    lightMode
} from "./style/global.style";
function App() {
    const [theme, toggleTheme] = useDarkMode(); // ToggleTheme function which change theme depended on telegram theme

    const themeMode = theme === "light" ? lightMode : darkMode;
    return (
        <div className="App">
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <ThemeProvider theme={themeMode}>
                <GlobalStyle />
                <ScrollToTop />
                <Container>
                    <Routes>
                        <Route path="*" element={<PageNotFound />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/sign-up" element={<SignUp />} />

                        <Route path="/forget-password" element={<ForgetPassword />} />

                        <Route path="/" element={<Layout />}>
                            <Route path="/" element={<PrivateRouter />}>
                                {routes.map((item) => {
                                    return <Route {...item} key={item.id} />;
                                })}
                            </Route>
                        </Route>
                    </Routes>
                </Container>
            </ThemeProvider>
        </div>
    );
}

export default App;
