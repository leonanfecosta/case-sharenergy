export const fetchRandomUser = async (url: string) => {
  const response = await fetch(url);
  const { results } = await response.json();
  return results;
};

export const fetchAllRandomUsers = async () => {
  const url = 'https://randomuser.me/api/?results=500&inc=name,email,picture,dob,login';
  const response = await fetch(url);
  const { results } = await response.json();
  return results;
};
