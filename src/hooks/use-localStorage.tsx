/* eslint-disable no-useless-catch */
import secureLocalStorage from "react-secure-storage";

const useLocalStorage = () => {
  const storeItem = async (key: string, value: string) => {
    try {
      await secureLocalStorage.setItem(key, value);
    } catch (e) {
      throw e;
    }
  };

  const retrieveItem = async (key: string) => {
    try {
      const value = await secureLocalStorage.getItem(key);
      return value;
    } catch (e) {
      throw e;
    }
  };

  const deleteItem = async (key: string) => {
    try {
      await secureLocalStorage.removeItem(key);
    } catch (e) {
      throw e;
    }
  };

  return { storeItem, retrieveItem, deleteItem };
};

export default useLocalStorage;
