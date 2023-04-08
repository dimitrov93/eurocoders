import axios from 'axios';
import { BASE_URL } from '../utils/apiConfig';

export const addComment = async (id, authorId, content) => {
    const emailResponse = await axios.post(`${BASE_URL}/api/comment/${id}`, {
        author: authorId,
        content: content
    });
    return emailResponse;
}