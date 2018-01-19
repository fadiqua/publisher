import hello from 'hellojs';

import * as actions from './actions/actionTypes';
import { socialId, API_URL } from './utils/constants';

export default (store) => {
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
