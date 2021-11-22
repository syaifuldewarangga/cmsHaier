import React from 'react';
import FormBanner from '../formBanner/FormBanner';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

function EditBanner(props) {
  const { id } = useParams();
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    async function fetchData() {
      var token = localStorage.getItem('access_token');
      const request = await axios
        .get(props.base_url + 'banner/get', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
          params: {
            id: id,
          },
        })
        .then((res) => {
          console.log(res.data);
          setData(res.data);
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
  }, []);

  return <FormBanner title="Edit Banner" data={data} />;
}

const mapStateToProps = (state) => {
  return {
    base_url: state.BASE_URL,
  };
};

export default connect(mapStateToProps, null)(EditBanner);
