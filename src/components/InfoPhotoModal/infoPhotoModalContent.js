import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Icon } from 'antd';
import moment from 'moment';
import 'moment-timezone';
import numeral from 'numeral';

const setInfoPhotoModalContent = ({
  lastUpdateInfo,
  photoDesc,
  views,
  downloads,
  likes,
  cameraMake,
  focalLength,
  aperture,
  shutterspeed,
  iso,
  cameraModel,
  width,
  height,
}) => {
  const date = moment(lastUpdateInfo).format('LL');
  const viewsFormat = numeral(views).format('0,0');
  const downloadsFormat = numeral(downloads).format('0,0');
  const likesFormat = numeral(likes).format('0,0');
  const photoModalHeader = (
    <header className="photo-info__header">
      <h2 className="photo-info__title">
        Info
      </h2>
      { photoDesc && (
        <p className="photo-info__desc">
          <i>
            <b>
              {photoDesc}
            </b>
          </i>
        </p>
      )}
      <p className="photo-info__date">
        Published on
        {' '}
        {date}
      </p>
    </header>
  );

  const photoModalContent = (
    <div className="photo-info__content">
      <ul className="photo-info__list-head photo-info-list-head">
        <li className="photo-info-list-head__item">
          <h3 className="photo-info-list-head__title">
            <Icon type="eye" />
            {' '}
            Views
          </h3>
          <p className="photo-info-list-head__text-main">
            {viewsFormat}
          </p>
          <p className="photo-info-list-head__text">
            {''}
          </p>
        </li>
        <li className="photo-info-list-head__item">
          <h3 className="photo-info-list-head__title">
            <Icon type="arrow-down" />
            {' '}
            Downloads
          </h3>
          <p className="photo-info-list-head__text-main">
            {downloadsFormat}
          </p>
          <p className="photo-info-list-head__text">
            {''}
          </p>
        </li>
        <li className="photo-info-list-head__item">
          <h3 className="photo-info-list-head__title">
            <Icon type="heart" />
            {' '}
            Likes
          </h3>
          <p className="photo-info-list-head__text-main">
            {likesFormat}
          </p>
          <p className="photo-info-list-head__text">
            {''}
          </p>
        </li>
      </ul>

      <Divider />

      <ul className="photo-info-list photo-info__list-content">
        <li className="photo-info-list__item">
          <h3 className="photo-info-list__title">
            Camera Make
          </h3>
          <p className="photo-info-list__text">
            {cameraMake || '--'}
          </p>
        </li>
        <li className="photo-info-list__item">
          <h3 className="photo-info-list__title">
            Camera Model
          </h3>
          <p className="photo-info-list__text">
            {cameraModel || '--'}
          </p>
        </li>
        <li className="photo-info-list__item">
          <h3 className="photo-info-list__title">
            Focal Length
          </h3>
          <p className="photo-info-list__text">
            {focalLength || '--'}
          </p>
        </li>
        <li className="photo-info-list__item">
          <h3 className="photo-info-list__title">
            Aperture
          </h3>
          <p className="photo-info-list__text">
            {aperture || '--'}
          </p>
        </li>
        <li className="photo-info-list__item">
          <h3 className="photo-info-list__title">
            Shutter Speed
          </h3>
          <p className="photo-info-list__text">
            {shutterspeed || '--'}
          </p>
        </li>
        <li className="photo-info-list__item">
          <h3 className="photo-info-list__title">
            ISO
          </h3>
          <p className="photo-info-list__text">
            {iso || '--'}
          </p>
        </li>
        <li className="photo-info-list__item">
          <h3 className="photo-info-list__title">
            Dimensions
          </h3>
          <p className="photo-info-list__text">
            {(width && height) ? `${width} x ${height}` : '--' }
          </p>
        </li>
      </ul>
    </div>
  );
  return (
    <div className="photo-info">
      { photoModalHeader }
      { photoModalContent }
    </div>
  );
};

setInfoPhotoModalContent.propTypes = {
  lastUpdateInfo: PropTypes.string,
  photoDesc: PropTypes.string,
  views: PropTypes.number,
  downloads: PropTypes.number,
  likes: PropTypes.number,
  cameraMake: PropTypes.string,
  focalLength: PropTypes.string,
  aperture: PropTypes.string,
  shutterspeed: PropTypes.string,
  iso: PropTypes.number,
  cameraModel: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

setInfoPhotoModalContent.defaultProps = {
  lastUpdateInfo: '',
  photoDesc: '',
  views: 0,
  downloads: 0,
  likes: 0,
  cameraMake: '',
  focalLength: '',
  aperture: '',
  shutterspeed: '',
  iso: 0,
  cameraModel: '',
  width: 0,
  height: 0,
};

export default setInfoPhotoModalContent;
