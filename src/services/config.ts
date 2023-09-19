export const configure = (token: any) => {
  return {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
};
