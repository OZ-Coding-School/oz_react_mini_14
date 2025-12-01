import { useSupabase } from "@sbcontext";
import {
  changeFromDto,
  DTO_TYPE,
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
  setItemToLocalStorage,
  USER_INFO_KEY,
} from "@utils";

export const useAuth = () => {
  const supabase = useSupabase();

  //OAuth Callback 처리
  const handleOAuthCallback = async () => {
    try {
      const { data, error } = await supabase.auth.getUser();

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

  //유저정보 가져오기
  const getUserInfo = async () => {
    try {
      const localUser = getItemFromLocalStorage(USER_INFO_KEY.customKey);
      if (localUser?.user) return localUser;

      const { data, error } = await supabase.auth.getUser();

      const userInfo = changeFromDto({
        type: !error ? DTO_TYPE.user : DTO_TYPE.error,
        dto: { user: data?.user, error },
      });

      if (userInfo.user) {
        setItemToLocalStorage(USER_INFO_KEY.customKey, userInfo);
      }

      return userInfo;
    } catch (error) {
      console.error(error);
    }
  };

  //로그아웃
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      removeItemFromLocalStorage(USER_INFO_KEY.customKey);
    } catch (error) {
      console.error(error);
    }
  };

  return { handleOAuthCallback, logout, getUserInfo };
};
