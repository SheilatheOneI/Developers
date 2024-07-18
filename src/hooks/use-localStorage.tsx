const useLocalStorage = () => {
  const storeItem = async (key: string, value: string) => {
    await window.localStorage.setItem(key, value);
  };
  const retrieveItem = async (key: string) => {
    const value = await window.localStorage.getItem(key);
    return value;
  };
  const deleteItem = async (key: string) => {
    await window.localStorage.removeItem(key);
  };
  return { storeItem, retrieveItem, deleteItem };
};
export default useLocalStorage;
