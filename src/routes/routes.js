import decode from 'jwt-decode';
import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import Home from '../components/home';
import Story from '../components/story';
import StoryResponses from '../components/story/StoryResponses';
import WriteStory from '../components/write-story';
import Popular from '../components/popular';
import Topic from '../components/topic';
import Profile from '../components/profile';
import UserStories from '../components/profile/UserStories';
import UserResponses from '../components/profile/UserResponses';
import Search from '../components/search';
import Notifications from '../components/notifications';
import Tag from '../components/tag';
import NotFound from '../components/NotFound';
import NotifictionRedirect from '../components/NotifictionRedirect';
import store from '../store';

/**
 * Routes configuration Array
 */
export const routes = [
    { path: '/',
        exact: true,
        component: Home
    },
    {
        path: '/write-Story',
        component: WriteStory,
        requireAuth: true
    },
    { path: '/popular',
        component: Popular
    },

    {
        exact: true,
        path: '/topics/:topic/',
        component: Topic,
    },
    {
        // exact: true,
        path: '/topics/:topic/story/:story',
        component: Story,
        routes: [
            {
                path: '/topics/:topic/story/:story/responses',
                component: StoryResponses
            }
        ]
    },
    {
        path: '/profile/:id',
        component: Profile,
        routes: [
            {
                exact: true,
                path: '/profile/:username',
                component: UserStories
            },
            {
                exact: true,
                path: '/profile/:username/responses',
                component: UserResponses
            }
        ]
    },
    {
        path: '/tag/:tag',
        component: Tag,
    },
    {
        path: '/search',
        component: Search,
    },
    {
        exact: true,
        path: '/notifications',
        component: Notifications,
        requireAuth: true
    },
    {
        exact: true,
        path: '/notifications/:notiId',
        component: NotifictionRedirect,
        requireAuth: true
    },
    {
        component: NotFound
    }
];

/**
 * CustomRoute component to create protected routes,
 * redirect the user to login if is not authenticated.
 * test if the route is requiredAuth and the user is Authenticated, then decide
 * how the user will navigate.
 */
const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    // const refreshToken = localStorage.getItem('refreshToken');
    try {
        decode(token);
        // decode(refreshToken);
    } catch (err) {
        return false;
    }
    return true;
};

export const CustomRoute = ({ component: Component, key, requireAuth, routes, ...rest }) => {
    const isAuth = isAuthenticated();
    return (
        <Route {...rest} key={key} render={props => (
            requireAuth && !isAuth ? (
                <Redirect to={{pathname: '/', state: { from: props.location }}}/>
            ) : (
                <Component  {...props} routes={routes} onEnter={console.log('enter')}/>
            )
        )}/>
    )
};
/**
 *
 * @param routes: routes config array
 * @returns: rendered routes with CustomRoute component
 */
export const renderRoutes = (routes) => {
    return routes && routes.map((route, i)=> CustomRoute({...route, key: i }))
};
