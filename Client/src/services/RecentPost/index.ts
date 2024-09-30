/* eslint-disable prettier/prettier */
export const getRecentPosts = async () => {
  const res = await fetch("http://localhost:5000/api/v1/items?sortBy=-createdAt&limit=9")

  return res.json();
};
