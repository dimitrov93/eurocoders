import axios from 'axios';
import { BASE_URL } from '../utils/apiConfig';

export const getAllPicsPerUser = async () => {
    const pictures = await axios.get(`${BASE_URL}/api/pictures/pics`);
    return pictures;
}


export const getLastTenPictures = async () => {
    const pictures = await axios.get(`${BASE_URL}/api/pictures/`);
    const sortedPictures = pictures.data.sort((a, b) =>
      b.createdAt.localeCompare(a.createdAt)
    );
    const lastTenPictures = sortedPictures.slice(0, 10);
    return lastTenPictures;
}

export const getallPicturesDateDesc = async () => {
    const pictures = await axios.get(`${BASE_URL}/api/pictures/`);
    const sortedPictures = pictures.data.sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt)
  );
    return sortedPictures
}

export const getallPictures = async () => {
    const response = await axios.get(`${BASE_URL}/api/pictures/`);
    return response
}

export const createPicture = async (userId, imgUrl) => {
  const response = await axios.post(`${BASE_URL}/api/pictures/`, {userId, imgUrl});
  return response.data;
};

export const deletePicture = async (pictureId, userId) => {
    const response = await axios.delete(`${BASE_URL}/api/pictures/${pictureId}`, userId);
    return response.data;
  };

