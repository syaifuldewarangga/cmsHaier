import React from 'react';
import FormUser from '../fromUser/FormUser';
import { connect } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EditUser(props) {
  const { username } = useParams();
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    var token = localStorage.getItem('access_token');
    async function fetchData() {
      await axios.get(props.base_url + 'user', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
          params: {
            username: username,
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
    }
    fetchData();
  }, []);
  return (
    <div>
      <div className="d-flex justify-content-center">
        <div className="col-lg-7">
          <FormUser title="Edit User" data={data} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    base_url: state.BASE_URL,
  };
};

export default connect(mapStateToProps, null)(EditUser);
