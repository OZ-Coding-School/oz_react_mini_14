import { useSupabase } from "../context";
import {
  changeFromDto,
  DTO_TYPE,
  localStorageUtils,
  USER_INFO_KEY,
} from "../utilities";

export const useAuth = () => {
  const supabase = useSupabase();
  const {
    getItemFromLocalStorage,
    removeItemFromLocalStorage,
    setItemToLocalStorage,
  } = localStorageUtils();

  // 로그아웃
  const logout = async () => {
    try {
      const supabaseUser = getItemFromLocalStorage(USER_INFO_KEY.sbKey);
      const customUser = getItemFromLocalStorage(USER_INFO_KEY.customKey);

      if (!supabaseUser && !customUser) return;

      const { error } = await supabase.auth.signOut();

      if (error) {
        throw new Error(error.message);
      }

      removeItemFromLocalStorage(USER_INFO_KEY.sbKey);
      removeItemFromLocalStorage(USER_INFO_KEY.customKey);
    } catch (error) {
      console.error(error);
    }
  };

  // user 정보 가져오기
  const getUserInfo = async () => {
    try {
      const localUserInfo = getItemFromLocalStorage(USER_INFO_KEY.customKey);
      if (localUserInfo) {
        return localUserInfo;
      }
      const supabaseUser = getItemFromLocalStorage(USER_INFO_KEY.sbKey);
      if (!supabaseUser) return;

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

  return { logout, getUserInfo };
};
