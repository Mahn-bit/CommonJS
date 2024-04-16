const create = require("zustand").default;

const userAuthStore = create((set, get) => {
  accessToken: null;
  isLoggedin: async () => {
    const accessToken = await
  }
});
