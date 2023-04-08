import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const Logout = () => {
    const navigate = useNavigate();
    const {userLogout} = useContext(AuthContext);
    
    useEffect(() => {
        userLogout();
        navigate("/");
    }, [userLogout, navigate])
    
    
  return (
    null
  )
}

export default Logout
