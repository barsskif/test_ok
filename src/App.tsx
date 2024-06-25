import './App.css';
import { Loayt } from './HOCS/Loayt';
import { Main } from './Pages/Main';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { NewsCommentsPage } from './Pages/NewsCommentsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: 'news-comments',
    element: <NewsCommentsPage />,
  },
]);

function App() {
  return (
    <Loayt>
      <RouterProvider router={router} />
    </Loayt>
  );
}

export default App;
