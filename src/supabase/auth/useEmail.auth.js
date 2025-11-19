import { useSupabase } from "../context";
import {
  changeFromDto,
  DTO_TYPE,
  localStorageUtils,
  USER_INFO_KEY,
} from "../utilities";

export const useEmailAuth = () => {
  const supabase = useSupabase();
  const { setItemToLocalStorage } = localStorageUtils();

  const signUp = async ({ email, password, ...userData }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { userData },
        },
      });

      const userInfo = changeFromDto({
        type: !error ? DTO_TYPE.user : DTO_TYPE.error,
        dto: { user: data.user, error },
      });

      if (userInfo.user) {
        setItemToLocalStorage(USER_INFO_KEY.customKey, userInfo);
      } else {
        return userInfo;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const login = async ({ email, password }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      const userInfo = changeFromDto({
        type: !error ? DTO_TYPE.user : DTO_TYPE.error,
        dto: { user: data?.user, error },
      });

      if (userInfo.user) {
        setItemToLocalStorage(USER_INFO_KEY.customKey, userInfo);
        return userInfo;
      } else {
        return userInfo;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return { signUp, login };
};
