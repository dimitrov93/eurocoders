import axios from 'axios';
import { BASE_URL } from '../utils/apiConfig';

export const sendEmailService = async (name,email,message) => {
    const emailResponse = await axios.post(`${BASE_URL}/api/email/`, {name,email,message});
    return emailResponse;
}