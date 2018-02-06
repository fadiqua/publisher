import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../../assets/scss/SocialButton.scss';

class SocialButton extends Component {
    state = {
      type: null,
      loading: false,
    };
    componentWillMount() {
      this.setState({
        type: this.props.type,
        loading: this.props.loading,
      });
    }

    componentWillReceiveProps(nextProps) {
      this.setState({ ...this.state, loading: nextProps.loading });
    }

    renderIcon() {
      let src = 'https://d24budwjblognz.cloudfront.net/static/img/logos/facebook.2fab448968d0.png';
      if (this.state.type === 'google') {
        src = 'https://www.udemy.com/staticx/udemy/js/webpack/g-logo.4c9c3df69e998b08e1d14c4bbbeb3949.svg';
      }
      return <img src={src} alt={`social ${this.state.type}`} />;
    }
    render() {
      return (
            <div>
                <button onClick={() => this.props.onClick()} disabled={this.state.loading} className={`social-btn ${this.state.type}-btn`}>
                    <i className="social-icon">
                        {this.renderIcon()}
                    </i>
                    Continue with <span className="text-capitalize">{this.state.type}</span>
                </button>
            </div>
      );
    }
}
SocialButton.propTypes = {
  type: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};
SocialButton.defaultProps = {
    loading: false,
    onClick: () => null,
};
export default SocialButton;
