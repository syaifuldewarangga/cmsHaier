import axios from 'axios';

export const getToken = () => {
  return (dispatch) => {
    async function fetchData() {
      const request = await axios
        .post(
          'https://openplat-sg-aws-test.haier.net/GTM3HSI/gateway/auth/oauth2/token',
          {
            client_id: 'LKG44Gpar2',
            client_secret: 'Sn93uLgBwP',
            grant_type: 'client_credentials',
          }
        )
        .then((res) => {
          dispatch({ type: 'SET_TOKEN', value: res.data.access_token });
        })
        .catch((e) => {
          if (e.response) {
            console.log(e.response);
          } else if (e.request) {
            console.log('request : ' + e.request);
          } else {
            console.log('message : ' + e.message);
          }
        });
      return request;
    }
    fetchData();
  };
};
