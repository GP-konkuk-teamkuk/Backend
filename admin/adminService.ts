import { getAudioList, getBookItems, getUserSelection } from './adminRepository';

export const fetchAudioList = async () => {
  return await getAudioList();
};

export const fetchBookItems = async () => {
  return await getBookItems();
};

export const fetchUserSelection = async () => {
  return await getUserSelection();
};
