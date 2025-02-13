import { Middleware, isRejectedWithValue } from "@reduxjs/toolkit";
import { setAuthStatus } from "./Features/authStatus";

/**Redux middleware to handle unauthorized error from redux query builder */
const apiErrorMiddleware: Middleware = (store) => (next) => (action: any) => {
  if (isRejectedWithValue(action)) {
    if (action.payload.status === 401) {
      store.dispatch(setAuthStatus(true));
    }
  }

  return next(action);
};

export default apiErrorMiddleware;
