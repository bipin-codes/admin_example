import { useRouteError } from 'react-router-dom';

const Error = () => {
  const error = useRouteError() as { data: string };

  return (
    <div>
      <p>Error Page...</p>
      <i>{error.data}</i>
    </div>
  );
};

export default Error;
