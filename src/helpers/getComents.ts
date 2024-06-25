export const getComentsHelper = async (
  comments: number[] | string[] | string,
  startCount: number = 0,
  endCount: number = 10
) => {
  if (!Array.isArray(comments)) {
    const response = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${comments}.json`,
      {
        method: 'GET',
      }
    );

    return await response.json();
  }

  console.log('🚀 ~ getComents ~ comments:', comments);
  const promises = comments?.map(async (id: number | string) => {
    const response = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
      {
        method: 'GET',
      }
    );

    const responseData = await response.json();
    return responseData;
  });

  const dataAll = await Promise.all(promises.slice(startCount, endCount));
  return dataAll;
};
