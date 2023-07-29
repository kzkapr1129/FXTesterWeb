import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

type Props = {
  element: ReactNode;
};

export const RouteAuthGuard: React.FC<Props> = (props) => {
  const { element } = props;

  let granted = true;

  // TODO: ローカルストレージからログイン済みか判定する

  if (!granted) {
    return <Navigate to={'/login'} state={{from:useLocation()}} replace={false} />
  }

  return (
    <>
        {element}
    </>
  );
}