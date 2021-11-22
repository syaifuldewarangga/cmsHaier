import React from 'react';
import FormUserRole from '../formUserRole/FormUserRole';
import { connect } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EditUserRole(props) {
  const [data, setData] = React.useState({});
  const { role_name } = useParams();
  React.useEffect(() => {
    var token = localStorage.getItem('access_token');
    async function fetchData() {
      const request = await axios
        .get(props.base_url + 'role/get', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
          params: {
            rolename: role_name,
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

  return (
    <div>
      <FormUserRole title="Edit User Role" data={data} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    base_url: state.BASE_URL,
  };
};

export default connect(mapStateToProps, null)(EditUserRole);
