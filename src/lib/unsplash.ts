import { createApi, Orientation } from 'unsplash-js';
import { Random } from 'unsplash-js/dist/methods/photos/types';

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
    ? process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
    : '',
});

export const getRandomPhoto = async (orientation: Orientation) => {
  const response = await unsplash.photos.getRandom({ count: 1, orientation });
  if (response.errors) {
    throw new Error(response.errors[0]);
  }

  return response.response as Random[];
};

export const getPhoto = async (id: string) => {
  const response = await unsplash.photos.get({ photoId: id });
  if (response.errors) {
    throw new Error(response.errors[0]);
  }

  return response.response;
};
