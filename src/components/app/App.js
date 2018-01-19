// npm packages
import React from 'react';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
// project files
import SiderMenu from '../shared/sider-menu';
import Navbar from '../shared/nav-bar';
import AppContent from './AppContent';
import { renderRoutes, routes } from '../../routes'

const App = () => (
    <LocaleProvider locale={enUS}>
        <div className="body-content">
            <SiderMenu/>
            <div>
                <Navbar />
                <AppContent>
                    {renderRoutes(routes)}
                </AppContent>
            </div>
        </div>
    </LocaleProvider>
);

export default App;
