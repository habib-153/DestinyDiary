import { IPost, IUser } from "../types";

export const generateChartData = (users: IUser[], posts: IPost[]) => {
    const dataMap: Record<string, { userCount: number; postCount: number }> = {};
  
    users.forEach((user) => {
      const userCreatedAt = user.createdAt; // Access the createdAt

      if (userCreatedAt) {
        const date = new Date(userCreatedAt).toISOString().split("T")[0];

        if (!dataMap[date]) {
          dataMap[date] = { userCount: 0, postCount: 0 };
        }
        dataMap[date].userCount += 1;
      }
    });
  
    posts.forEach((post) => {
      const postCreatedAt = post?.createdAt; 

      if (postCreatedAt) {
        const date = new Date(postCreatedAt).toISOString().split("T")[0]; 

        if (!dataMap[date]) {
          dataMap[date] = { userCount: 0, postCount: 0 };
        }
        dataMap[date].postCount += 1;
      }
    });
  
    return Object.entries(dataMap).map(([date, counts]) => ({
      date,
      userCount: counts.userCount,
      postCount: counts.postCount,
    }));
  };