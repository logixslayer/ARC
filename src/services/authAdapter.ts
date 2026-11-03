export const authAdapter = {
  isAuthenticated: () => sessionStorage.getItem("arc-authenticated") === "true",
  setAuthenticated: (value: boolean) => value ? sessionStorage.setItem("arc-authenticated", "true") : sessionStorage.removeItem("arc-authenticated"),
};
