import signIn from "./sign-in";
import { setUser, clearUser, setLoading, setError } from "@/redux/authSlice";

export const signInUser = (formData: FormData) => async (dispatch: any) => {
  dispatch(setLoading());
  const result = await signIn(formData);

  if (result.success && "user" in result) {
    // Type guard to check for user
    dispatch(setUser(result.user));
  } else {
    // @ts-ignore
    dispatch(setError(result.error));
  }
};

export const signOutUser = () => async (dispatch: any) => {
  dispatch(clearUser());
  // Call your sign-out server action here if needed
};
