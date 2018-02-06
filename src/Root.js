// npm packages
import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
//  project files
import App from './components/app';
import store, { history } from './store';
import init from './init';
import axiosConfig from './config/axios.config';

axiosConfig();

init(store);

const Root = () => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <LocaleProvider locale={enUS}>
                <App />
            </LocaleProvider>
        </ConnectedRouter>
    </Provider>
);

export default Root;
