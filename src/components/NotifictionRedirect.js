import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class NotifictionRedirect extends Component {
    static contextTypes = {
      router: PropTypes.object,
    };

    async componentDidMount() {
      const nId = this.props.match.params.notiId;
      try {
        const { notification } = (await axios.get(`/api/notifications/${nId}`)).data;
        console.log('notification: ', notification);
        if (notification.type === 'comment') {
          const { story } = (await axios.get(`/api/story/id/${notification._parentTarget}`)).data;
          this.context.router.history.push(`/topics/${story._topic.name}/story/${story.slug}/responses?responseid=${notification._target}`);
        } else if (notification.type === 'like') {
          const { story } = (await axios.get(`/api/story/id/${notification._parentTarget}`)).data;
          this.context.router.history.push(`/topics/${story._topic.name}/story/${story.slug}`);
        } else if (notification.type === 'follow') {
          this.context.router.history.push(`/profile/${notification._from}`);
        }
      } catch (e) {}
    }

    render() {
      return (
            <div />
      );
    }
}

export default NotifictionRedirect;
