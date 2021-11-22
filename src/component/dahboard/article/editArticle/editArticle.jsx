import React from 'react';
import FormArticle from '../formArticle/FormArticle';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

function EditArticle(props) {
  const { slug } = useParams();
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    async function fetchData() {
      var token = localStorage.getItem('access_token');
      const request = await axios
        .get(props.base_url + 'article/get', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
          params: {
            slug: slug,
          },
        })
        .then((res) => {
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
  return <FormArticle title="Edit Article" data={data} />;
}

const mapStateToProps = (state) => {
  return {
    base_url: state.BASE_URL,
  };
};

export default connect(mapStateToProps, null)(EditArticle);
