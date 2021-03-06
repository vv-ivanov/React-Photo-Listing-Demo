import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Card,
  Button,
  Icon,
  Tag,
  Popover,
} from 'antd';
import ImageZoom from 'react-medium-image-zoom';
import { saveAs } from 'file-saver';
import { SpinnerPhoto, InfoPhotoModal, Error } from '../../components';
import { photoRequestAction, photoImageLoadAction } from '../../actions';
import getPhotoSize from './getPhotoSize';
import handleDowloadPhoto from './handleDowloadPhoto';
import './index.scss';

class Photo extends Component {
  state = {
    photoWidth: null,
    photoHeight: null,
  }

  componentDidMount = () => {
    const { match, photoRequestAction: requestAction } = this.props;
    requestAction(match);
    this.setPhotoSize();
    window.addEventListener('resize', this.setPhotoSize);
  };

  componentDidUpdate = (prevProps) => {
    const { widthPhoto } = this.props;
    if (prevProps.widthPhoto !== widthPhoto) this.setPhotoSize();
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.setPhotoSize);
  }

  downLoadPhoto = () => {
    const { info: { photoDesc }, altDescriprion, photoSrc } = this.props;
    const photoName = handleDowloadPhoto(altDescriprion, photoDesc);
    saveAs(photoSrc, photoName);
  }

  setPhotoSize = () => {
    const photoSize = getPhotoSize(this.props);
    this.setState({
      photoWidth: photoSize.photoWidth,
      photoHeight: photoSize.photoHeight,
    });
  }

  render() {
    const { photoWidth, photoHeight } = this.state;
    const {
      info,
      userFirstName,
      userLastName,
      userName,
      twitterName,
      photoProfile,
      tags,
      altDescriprion,
      photoSrc,
      isPhotoLoading,
      requestError,
      isSuccessPhotoRequest,
      photoImageLoadAction: photoLoadAction,
    } = this.props;
    const photoSize = { width: photoWidth, height: photoHeight };
    return (
      <div
        className="photo-container photo"
        id="photo-container"
      >
        { !isSuccessPhotoRequest && !requestError && (
          <Card
            title={(
              <Link to={`/users/${userName}`}>
                <div className="photo__twitter photo-twitter">
                  <img
                    src={photoProfile}
                    alt="Avatar"
                    className="photo-twitter__ava"

                  />
                  <div className="photo-twitter__content">
                    <p
                      className="photo-twitter__user-name"
                    >
                      {`${userFirstName} ${userLastName}`}
                    </p>
                    <p className="photo-twitter__twitter-name">
                      @
                      {twitterName}
                    </p>
                  </div>
                </div>
              </Link>
            )}
            extra={(
              <div className="photo-header">
                <Button
                  style={{ marginLeft: '10px' }}
                  href="#"
                  onClick={this.downLoadPhoto}
                >
                  <Icon type="download" />
                  Download
                </Button>
              </div>
            )}
            style={{
              width: '100%',
              height: '100%',
              padding: 0,
            }}
            bodyStyle={{ padding: 0 }}
            headStyle={{ padding: '0 10px' }}
          >
            <div className="photo__content photo-content">
              { isPhotoLoading && <SpinnerPhoto /> }
              <ImageZoom
                defaultStyles={{
                  overlay: {
                    background: 'rgba(0, 0, 0, .8)',
                  },
                }}
                image={{
                  src: photoSrc,
                  alt: altDescriprion,
                  className: 'photo-content__photo',
                  style: photoSize,
                  onLoad: photoLoadAction,
                }}
                zoomImage={{
                  src: photoSrc,
                  alt: altDescriprion,
                }}
              />
              <div
                className="photo-content__footer photo-footer"
              >
                <div className="photo-footer__tags">
                  { tags.length > 2 && (
                    <Popover
                      placement="topLeft"
                      title="All tags"
                      content={(
                        <div>
                          {tags.map((item, i) => {
                            if (i > 2) {
                              return (
                                <Link
                                  to={`/${item.title}`}
                                  key={item.title}
                                >
                                  <Tag key={item.title}>
                                    {item.title}
                                  </Tag>
                                </Link>
                              );
                            }
                            return null;
                          })}
                        </div>
                      )}
                      trigger="click"
                    >
                      <Button
                        style={{ marginLeft: '10px' }}
                        href="#"
                      >
                        <Icon type="tag" />
                        Show all tags
                      </Button>
                    </Popover>
                  )}
                </div>
                <div className="photo-footer__btns">
                  <Button
                    style={{ marginLeft: '10px' }}
                    href="#"
                  >
                    <Icon type="share-alt" />
                    Share
                  </Button>
                  <InfoPhotoModal {...info} />
                </div>
              </div>
            </div>
          </Card>
        )}
        { !isPhotoLoading && !isSuccessPhotoRequest && requestError && (
        <Error text="Sorry, no photo found" />
        )}
      </div>
    );
  }
}

Photo.propTypes = {
  info: PropTypes.shape({}),
  userFirstName: PropTypes.string,
  userLastName: PropTypes.string,
  userName: PropTypes.string,
  twitterName: PropTypes.string,
  photoProfile: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
  })),
  altDescriprion: PropTypes.string,
  photoSrc: PropTypes.string,
  widthPhoto: PropTypes.number,
  heightPhoto: PropTypes.number,
  photoRequestAction: PropTypes.func,
  photoImageLoadAction: PropTypes.func,
  isPhotoLoading: PropTypes.bool,
  isSuccessPhotoRequest: PropTypes.bool,
  requestError: PropTypes.bool,
  match: PropTypes.shape({
    prop: PropTypes.string,
  }),
  history: PropTypes.shape({
    prop: PropTypes.string,
  }),
};
Photo.defaultProps = {
  info: {},
  userFirstName: '',
  userLastName: '',
  userName: '',
  twitterName: '',
  photoProfile: '',
  tags: [],
  altDescriprion: '',
  photoSrc: '',
  widthPhoto: 300,
  heightPhoto: 300,
  photoImageLoadAction: () => {},
  photoRequestAction: () => {},
  isPhotoLoading: true,
  isSuccessPhotoRequest: true,
  requestError: false,
  match: {},
  history: {},
};

const mapStateToProps = (state) => {
  const { photo } = state;
  return photo;
};

const mapDispatchToProps = ({
  photoRequestAction,
  photoImageLoadAction,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Photo);
