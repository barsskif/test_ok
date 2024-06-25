import { Header } from '../../components/Header';

export const Loayt = (props: { children: React.ReactNode }) => {
  const { children } = props;
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};
