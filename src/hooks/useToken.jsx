import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useToken = () => {
    const exsting_token = JSON.parse(localStorage.getItem('sub_dealer_token'))
    const [token, setToken] = useState(null);
    const { BASE_URL, CLIENT_ID, CLIENT_SECRET } = useSelector((state) => state.SUB_DEALER);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const res = await axios.post(`${BASE_URL}oauth/token`, {
                    grant_type: "client_credentials",
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET,
                    scope: "*"
                })
                localStorage.setItem('sub_dealer_token', JSON.stringify(res.data))
                setToken(res.data.access_token);
            } catch (error) {
            }
        };
        if(!exsting_token || exsting_token?.expires_in < new Date().toLocaleString()){
            fetchToken();
        }else{
            setToken(exsting_token.access_token)
        }
    }, []);

    return token;
}

export default useToken;