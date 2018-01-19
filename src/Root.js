// npm packages
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

//  project files
import App from "./components/app/App";
import SiderMenu from './components/shared/sider-menu';
import Navbar from './components/shared/nav-bar';
import AppContent from './components/app/AppContent';
import store from './store';
import  {history} from './store/store';
import { renderRoutes, routes } from './routes/routes'
import init from './init';
import axiosConfig, { getAccessToken, setAccessToken} from './config/axios.config';
// style file
import './assets/style/scss/Root.scss';

axiosConfig();

init(store);

const Root = () => (
    <Provider store={store}>
        <Router history={history}>
            <LocaleProvider locale={enUS}>
                <div className="body-content">
                    <SiderMenu/>
                    <div>
                        <div>
                            <Navbar />
                            <AppContent>
                                {renderRoutes(routes)}
                            </AppContent>
                        </div>
                    </div>
                </div>
            </LocaleProvider>
        </Router>
    </Provider>
);

export default Root;