import { useEffect, useState } from 'react';

import { getComentsHelper } from '../../helpers/getComents';
import useFetchLikeAxios from '../../hooks/useFetchLikeAxios';

import styles from './Main.module.css';
import { useNavigate } from 'react-router-dom';

export const Main = () => {
  const { data, fetchData } = useFetchLikeAxios();
  const navigate = useNavigate();
  const [dataNews, setDataNews] = useState<Record<string | number, string>[]>(
    []
  );

  console.log('dataNews', dataNews);

  const openNews = (comments: number[] | string) => {
    navigate('/news-comments', { state: { comments } });
  };

  //   const [dataComents, setDataComents] = useState<
  //     Record<string | number, string>[]
  //   >([]);

  //   const [dataComentsKids, setDataComentsKids] = useState<
  //     Record<string | number, string>[]
  //   >([]);
  //   const count = 1;

  //   useEffect(() => {
  //     if (!data) return;

  //     const fch = async () => {
  //       const topStories = data;
  //       const promises = topStories?.map(async (id: number) => {
  //         const response = await fetch(
  //           `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
  //           {
  //             method: 'GET',
  //           }
  //         );

  //         const responseData = await response.json();
  //         return responseData;
  //       });

  //       const dataAll = await Promise.all(promises.slice(0, count));
  //       setDataNews((prev) => [...prev, ...dataAll]);
  //       //   setDataComentsKids((prev) => [...prev, ...dataAll]);
  //     };

  //     fch();
  //   }, [data]);

  //   const getComents = async (
  //     e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
  //     comments: number[] | string[] | string,
  //     callback: Dispatch<SetStateAction<Record<string | number, string>[]>>
  //   ) => {
  //     e.stopPropagation();
  //     const dataCom = await getComentsHelper(comments);

  //     callback((prev) => [...prev, ...dataCom]);
  //   };

  const getNews = async (
    data: number[],
    startCount: number = 0,
    endCount: number = 10
  ) => {
    const news = await getComentsHelper(data, startCount, endCount);
    setDataNews((prev) => [...prev, ...news]);
  };

  useEffect(() => {
    const getdataNews = async () => {
      await fetchData({
        url: 'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty',
      });
    };

    getdataNews();
  }, []);

  useEffect(() => {
    if (!data) return;

    getNews(data, 0, 50);
  }, [data]);

  return (
    <div
      style={{
        background: 'red',
        marginTop: '-8px',
      }}
    >
      {dataNews.map((callbackfn) => (
        <div key={callbackfn.id} className={styles.itemNews}>
          <h3>{callbackfn.title}</h3>
          {callbackfn?.kids?.length && (
            <div>
              <button
                className={styles.itemActiveNews}
                onClick={() => {
                  callbackfn?.kids?.length ? openNews(callbackfn?.kids) : null;
                }}
              >
                читать коментарии {callbackfn?.kids?.length}
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
