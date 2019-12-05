// export const GetIcons = () => fetch(`https://icon-service-backend.herokuapp.com/icons/`);
export const GetIcons = (tag: string, query: string, marker: string) =>
  fetch(
    `https://icon-service-backend.herokuapp.com/icons/?tag=${tag}&query=${query}&marker=${marker}`
  );
