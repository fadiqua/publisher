import axios from 'axios';
import hello from 'hellojs';

import * as actions from './actions/actionTypes';
import { socialId, API_URL } from './utils/constants';

export default (store) => {
    const getMe = async () => {
        try {
            const result = await axios.get('/api/user/me');
            store.dispatch(actions.autoLogin({ ...result.data.me, fromToken: true}))
            // store.dispatch(actions.fetchUserSuccess(result.data.me))
        } catch (e) {

        }
    };

    getMe();

    hello.init({
        facebook: socialId.facebook,
        google: socialId.google
    }, {display: 'page', redirect_uri: API_URL});

    hello.on('auth.login', async function(auth) {
        const socialToken = auth.authResponse.access_token;
        const data = await hello(auth.network).api('me');
        store.dispatch(actions.fetchUser({network: auth.network, socialToken, data}));
        hello.logout(auth.network)
    });
}
