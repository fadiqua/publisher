import React from 'react';
import { notification } from 'antd';
// import { Parser } from 'html-to-react';
import { eventChannel } from 'redux-saga';

import * as actions from '../actions/actionTypes'

// const htmlToReactParser = new Parser();

export function subscribe(socket, id) {
    return eventChannel(emit => {
        socket.on('users.login', ({ username }) => {
            emit(actions.addUser({ username }));
        });
        socket.on('users.logout', ({ username }) => {
            emit(actions.removeUser({ username }));
        });

        socket.on(`notification.new_${id}`, ({notification:noti}) => {
            console.log(notification);
            notification.config({
                placement: 'bottomLeft'
            });
            notification.open({
                // description: htmlToReactParser.parse(noti.content),
                description: 'a',
            });
            emit(actions.newNotification({ notification: noti }));
        });
        socket.on(`notification.remove_${id}`, ({notification}) => {
            console.log(notification);
            emit(actions.removeNotification(notification));
        });
        socket.on('disconnect', e => {
            // TODO: handle
        });
        return () => {};
    });
}