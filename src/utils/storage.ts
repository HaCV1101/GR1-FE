export const getItem = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? (JSON.parse(data) as string | number | object) : null;
};

export const storeItem = (key: string, data: unknown) => {
  const stringifiedData = JSON.stringify(data);
  localStorage.setItem(key, stringifiedData);
};

export const removeItem = (key: string) => {
  localStorage.removeItem(key);
};
