import axios from 'axios';
import { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
const VITE_BACKEND_SERVER = import.meta.env.VITE_BACKEND_SERVER

const RedirectHandler = () => {
    const { urlCode } = useParams();
    const longUrl = ''; // Fetch the long URL based on the urlCode from the backend
    const [error, setError] = useState(null);

    useEffect(() => {       
        axios.get(VITE_BACKEND_SERVER + '/' + urlCode)
            .then(response => {
                window.location.replace(response.data.longUrl); // Redirect to the long URL
            })
            .catch(error => {
                setError('Invalid URL code');
            });
    }, [urlCode]);
        
    return (    
        <div>
            {error && <p>{error}</p>}
        </div>
    )
}

export default RedirectHandler