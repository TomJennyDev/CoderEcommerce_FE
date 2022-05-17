import { createContext, useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import apiService from "../app/apiService";
import { getTotalProducts } from "../features/cart/cartSlice";
import { isValidToken } from "../utils/jwt";

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const INITIALIZE = "AUTH.INITIALIZE";
const LOGIN_SUCCESS = "AUTH.LOGIN_SUCCESS";
const REGISTER_SUCCESS = "AUTH.REGISTER_SUCCESS";
const LOGOUT = "AUTH.LOGOUT";
const UPDATE_PROFILE = "AUTH.UPDATE_PROFILE";
const reducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      const { isAuthenticated, user } = action.payload;
      return {
        ...state,
        isInitialized: true,
        isAuthenticated,
        user,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case UPDATE_PROFILE:
      const {
        name,
        email,
        password,
        isDeleted,
        phone,
        address,
        avatarUrl,
        role,
        creditCards,
      } = action.payload;
      return {
        ...state,
        user: {
          ...state.user,
          name,
          email,
          password,
          isDeleted,
          phone,
          address,
          avatarUrl,
          role,
          creditCards,
        },
      };
    default:
      return state;
  }
};

export const setSession = async (accessToken) => {
  if (accessToken) {
    window.localStorage.setItem("accessToken", accessToken);
    apiService.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    window.localStorage.removeItem("accessToken");
    delete apiService.defaults.headers.common.Authorization;
  }
};

const AuthContext = createContext({ ...initialState });

function AuthProvider({ children }) {
  const dispatchCart = useDispatch();

  const [state, dispatch] = useReducer(reducer, initialState);
  const updatedProfile = useSelector((state) => state.user.updatedProfile);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");

        if (accessToken && isValidToken(accessToken)) {
          await setSession(accessToken);

          console.log("1");

          const response = await apiService.get("/users/me");
          const user = response.data;

          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: true, user },
          });
          dispatchCart(getTotalProducts(user?.cartId?.totalItem));
        } else {
          setSession(null);

          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: false, user: null },
          });
        }
      } catch (err) {
        console.error(err);

        setSession(null);
        dispatch({
          type: INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  useEffect(() => {
    if (updatedProfile)
      dispatch({ type: UPDATE_PROFILE, payload: updatedProfile });
  }, [updatedProfile]);

  const login = async ({ email, password }, callback) => {
    const response = await apiService.post("/auth/login", { email, password });
    const { user, accessToken } = response.data;

    setSession(accessToken);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user },
    });
    dispatchCart(getTotalProducts(user?.cartId?.totalItem));
    callback();
  };

  const register = async ({ name, email, password }, callback) => {
    const response = await apiService.post("/users", {
      name,
      email,
      password,
    });

    const { user, accessToken } = response.data;
    setSession(accessToken);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: { user },
    });

    callback();
  };

  const logout = async (callback) => {
    setSession(null);
    dispatch({ type: LOGOUT });
    callback();
  };

  const resetPassword = async ({ email }, callback) => {
    const response = await apiService.post("/auth/resetpassword", { email });
    if (response.ok) toast.success("Please check your email!");
    callback();
  };

  const loginFacebook = async (res, callback) => {
    const response = await apiService.post("/auth/facebook", {
      access_token: res.accessToken,
    });

    const { user, accessToken } = response.data;

    setSession(accessToken);
    dispatchCart(getTotalProducts(user?.cartId?.totalItem));

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user },
    });

    callback();
  };
  const loginGoogle = async (res, callback) => {
    const response = await apiService.post("/auth/google", {
      access_token: res.accessToken,
    });
    const { user, accessToken } = response.data;
    console.log(response);

    setSession(accessToken);
    dispatchCart(getTotalProducts(user?.cartId?.totalItem));

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user },
    });

    callback();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        loginFacebook,
        loginGoogle,
        register,
        logout,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
