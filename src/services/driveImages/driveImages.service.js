import { getStorage, ref, list, getDownloadURL } from 'firebase/storage';
import { isDevelopment } from '../../utils/env';

const env = require('../../../.env.json');

export const driveImagesRequest = async userId => {
  console.log('driveImagesRequest');
  if (isDevelopment) {
    return env.MOCK.DRIVE_FILES;
  } else {
    console.log('getting firebase storage');
    const storage = getStorage();
    console.log('listing files ');
    const listRef = ref(storage, 'photos/5UKx1vjZ6NfvyXtP4127jjQIF732');
    const firstPageOfItems = await list(listRef, { maxResults: 200 });
    return firstPageOfItems.items;
  }
};

const BASE_URL = 'https://drive.google.com/uc?id=';
const regExp = new RegExp('(?<=https://drive.google.com/file/d/)([^/]+)');

export const toDownloadableUri = inputUri => {
  const matches = regExp.exec(inputUri);
  const imageId = matches[0];
  return BASE_URL + imageId;
};

export const driveImagesTransform = async ({ results = [] }) => {
  console.log('driveImagesTransform');
  if (isDevelopment) {
    const len1 = 'https://drive.google.com/file/d/'.length;
    const len2 = (results[0].length || 85) - '/view?usp=share_link'.length;
    const mappedResults = results.map(x => {
      const url = x.path;
      return {
        ...x,
        fullPath: url,
        name: url.slice(len1, len2),
        path: toDownloadableUri(url),
      };
    });
    return mappedResults;
  } else {
    const storage = getStorage();
    console.log('fetching itemUrls');
    const itemUrls = results.map(item => {
      const { bucket, name, fullPath, ...rest } = item;
      return {
        bucket: item.bucket,
        fullPath: item.fullPath,
        name: item.name,
        rest: rest,
      };
    });
    console.log('getting download urls');
    const downloadUrls = await Promise.all(
      itemUrls.map(async item => {
        const { fullPath, name } = item;
        const downloadUrl = await getDownloadURL(ref(storage, fullPath));
        return {
          ...item,
          path: downloadUrl,
        };
      })
    );
    return downloadUrls;
  }
};
