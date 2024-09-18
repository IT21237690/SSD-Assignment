import { useParams } from 'react-router-dom';
import React, { useContext, useEffect ,useState} from 'react';
import { LoginContext } from './ContextProvider/Context';
import { useNavigate,NavLink } from 'react-router-dom';
import axios from 'axios';



const ResultPage = () => {
  const { logindata, setLoginData } = useContext(LoginContext);
  const { name } = useParams();
  const [marks, setMarks] = useState('');

  const history = useNavigate();

  const validateUser = async () => {
    const token = localStorage.getItem('usersdatatoken');

    try {
      const res = await fetch('/student/validuser', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });

      const data = await res.json();

      if (data.status === 401 || !data) {
        history('*');
      } else {
        console.log('user verified');
        setLoginData(data);
        
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetResult = async () => {
    try {
      const response = await axios.get(`/student/results/${logindata ? logindata.ValidUserOne.name : ''}`);
      const data = response.data;
      setMarks(data.marks);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      validateUser();
      handleGetResult();
    }, 500000);
  }, [logindata.ValidUserOne.name]);

  return (
    <>
      <h1>Result for {logindata.ValidUserOne.name}</h1>
      {marks && <div>{marks}</div>}
    </>
  );
};

export default ResultPage;
