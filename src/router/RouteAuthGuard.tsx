import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

type Props = {
  element: ReactNode;
};

export const RouteAuthGuard: React.FC<Props> = (props) => {
  const { element } = props;
  const location = useLocation();

  const granted = true;

  // TODO: ローカルストレージからログイン済みか判定する

  if (!granted) {
    return (
      <Navigate to={'/login'} state={{ from: location }} replace={false} />
    );
  }

  return <>{element}</>;
};
