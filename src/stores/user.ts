import { defineStore, acceptHMRUpdate } from "pinia";

type UserInfo = {
  username: string;
  token: string;
};

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    username: "",
    token: "",
  }),
  actions: {
    setUserInfo(userInfo: UserInfo) {
      this.username = userInfo.username;
      this.token = userInfo.token;
    },
  },
});
