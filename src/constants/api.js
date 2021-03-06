export const URL_FOR_PROFILE_ME = `${process.env.REACT_APP_PROFILE}/me`;
export const URL_FOR_TOKEN = 'https://unsplash.com/oauth/token';
export const URL_FOR_AVATAR_PLACEHOLDER = `${process.env.PUBLIC_URL}/ava-placeholder.jpg`;
export const URL_FOR_ERROR_IMAGE = `${process.env.PUBLIC_URL}/error-image.jpg`;
export const URL_FOR_CARDS_PHOTOS = 'https://api.unsplash.com/search/photos';
export const URL_FOR_LOGIN = `https://unsplash.com/oauth/authorize?redirect_uri=${
  process.env.REACT_APP_UNSPLASH_API_REDIRECT_URI
}&response_type=code&scope=public+read_user+write_user+read_photos+write_likes+write_photos+write_followers+read_collections+write_collections&client_id=${
  process.env.REACT_APP_UNSPLASH_API_KEY
}`;
export const URL_FOR_PHOTO_QUERY = match => `${process.env.REACT_APP_UNSPLASH_API_NAME}photos/${match.params.id}?client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`;
export const URL_FOR_USER_QUERY = match => `${process.env.REACT_APP_UNSPLASH_API_NAME}users/${match.params.id}?client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`;
export const URL_FOR_USER_LIKES_QUERY = userId => `${process.env.REACT_APP_UNSPLASH_API_NAME}users/${userId}/likes`;
export const URL_FOR_USER_PHOTO_LISTING_QUERY = userId => `${process.env.REACT_APP_UNSPLASH_API_NAME}users/${userId}/photos`;
export const URL_FOR_USER_STATISTIC = userId => `${process.env.REACT_APP_UNSPLASH_API_NAME}users/${userId}/statistics`;
