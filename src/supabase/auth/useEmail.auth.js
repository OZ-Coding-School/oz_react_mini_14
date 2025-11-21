import { useSupabase } from "../context";
import {
  changeFromDto,
  DTO_TYPE,
  setItemToLocalStorage,
  USER_INFO_KEY,
} from "../utilities";

export const useEmailAuth = () => {
  const supabase = useSupabase();

  //회원가입
  const signUp = async ({ email, password, userName }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { userName },
        },
      });

      const userInfo = changeFromDto({
        type: !error ? DTO_TYPE.user : DTO_TYPE.error,
        dto: { user: data?.user, error },
      });

      if (userInfo.user) {
        setItemToLocalStorage(USER_INFO_KEY.customKey, userInfo);
      }

      return userInfo;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  //로그인
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
      }

      return userInfo;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return { signUp, login };
};
