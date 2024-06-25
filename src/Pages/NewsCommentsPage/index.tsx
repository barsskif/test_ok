import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getComentsHelper } from '../../helpers/getComents';

import styles from './NewComments.module.css';

export const NewsCommentsPage = () => {
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Record<string | number, string>[]>([]);
  console.log('state', state.comments);

  const startCount = 0;
  const endCount = Infinity;

  useEffect(() => {
    const comments = async () => {
      setIsLoading(true);
      const news = await getComentsHelper(state.comments, startCount, endCount);
      setData((prev) => [...prev, ...news]);
      console.log('data', news);
      setIsLoading(false);
    };

    comments();
  }, [endCount, state.comments]);

  if (isLoading) return <>Loading...</>;
  return (
    <div>
      {data.map((item) => (
        <div
          dangerouslySetInnerHTML={{ __html: item.text }}
          key={item.id}
          className={styles.itemComment}
        />
      ))}
    </div>
  );
};
