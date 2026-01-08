import { useState } from 'react'
import axios from 'axios';
import CopyButton from './copybutton';
import LoadingButton from './Button';

const center = () => {
  const [link, setLink] = useState('');
  const [alias, setAlias] = useState('');
  const [shortLink, setShortLink] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const VITE_BACKEND_SERVER = import.meta.env.VITE_BACKEND_SERVER// Replace with your actual API endpoint

  const handleLink = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior 
    // Here you can add logic to shorten the link
    // console.log('Shortening link:', VITE_BACKEND_SERVER);
    if (!link && link.trim() === '') {
      setError("Please enter a valid link");
      return;
    }
    if (link && !link.startsWith('http://') && !link.startsWith('https://')) {
      setError("Please enter a valid link");
      return;
    }
    setError(null);
    if (alias && alias.trim() === '') {
      setAlias('');
    }
    if (alias && alias.includes(' ')) {
      setError("Alias cannot contain spaces");
      return;
    }
    if (alias && alias.length < 5) {
      setError("Alias cannot be less than 5 characters");
      return;
    }
    if (alias && alias.length > 15) {
      setError("Alias cannot be more than 15 characters");
      return;
    }
    try {
      if(alias){
        const aliasAvailable = await axios.get(VITE_BACKEND_SERVER + '/check/' + alias);
      // console.log(aliasAvailable.data);
      if (alias && aliasAvailable.data.isAvailable === false) {
        setError("choose another alias, this one is already taken");
        return;
      }
      }
      setIsLoading(true);

      const response = await axios.post(VITE_BACKEND_SERVER + '/url/shorten', { longUrl: link, customAlias: alias });
      // console.log(response.data);
      setIsLoading(false);
      if (response.data.success === false) {
        setError(response.data.msg);
        return;
      }
      setShortLink(response.data.data.shortUrl);
    } catch (err) {
      setError(err.response.data.msg);
      setIsLoading(false);
    }
  };




  return (
    <div className=' flex flex-row justify-around px-4 md:px-6 lg:px-8'>

      <div className='w-1/2'>
        <div className='text-center mb-12'>
          <h1 className='text-5xl font-bold text-gray-900 mb-4'>Shorten your link</h1>
          <p className='text-xl text-gray-600 max-w-lg mx-auto'>Transform your long URLs into clean, shareable links with our professional URL shortener for free.</p>
        </div>
        <div className="bg-white shadow-xl rounded-2xl w-full p-8 mb-12 border border-gray-100">

          <div className="mb-4">
            {error && <div className='text-red-500 mr-4'>{error}</div>}
            <label htmlFor="original-link" className="sr-only">Enter your link</label>
            <input
              type="text"
              id="original-link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="form-control w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              placeholder="Enter your link"
            />
          </div>

          <div className="flex items-center mb-6">
            <span className="input-group-text bg-gray-200 border border-gray-300 rounded-l-lg p-3 mr-2 text-gray-600">Alias</span>
            <label htmlFor="alias-link" className="sr-only">Enter your alias (Optional)</label>
            {/* {error && <div className='text-red-500 mr-4'>{error}</div>} */}
            <input
              type="text"
              id="alias-link"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              className="form-control flex-grow p-3 border border-gray-300 rounded-r-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              placeholder="Enter your alias (Optional)"
            />
          </div>

          <div className="flex items-center mb-6 w-full">
            <div className='flex items-center justify-between w-full'>
              <div className='input-group-text bg-gray-200 border border-gray-300 rounded-l-lg p-3 mr-2 text-gray-600 w-full truncate'>
                {shortLink ? `https://shortlinxfront.vercel.app/${shortLink}` : 'Your shortened link'}
              </div>
              <CopyButton textToCopy={shortLink} />
            </div>
          </div>

          <div className='flex justify-center'>
            <button type="submit" onClick={handleLink}
              className=" inline-flex items-center px-6 py-3 border border-transparent 
                          text-base font-medium rounded-md shadow-sm
                          transition-all duration-200 ease-in-out
                          bg-sky-100 hover:bg-sky-200 text-black
                          disabled:opacity-70 disabled:cursor-not-allowed"

            >{isLoading && (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
              {isLoading ? 'loading...' : 'Shorten Link'}
            </button>

          </div>
        </div>
      </div>

      {/* 
      <div className='mt-6 w-3/10'>
        <h3 className='text-3xl font-semibold text-gray-800 mb-6'>Your Shortened Link</h3>

        <div className='bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 mt-27 rounded-xl p-6 shadow-sm'>
          <div className='flex items-center justify-between'>
            <div className='text-blue-700 font-semibold text-lg truncate flex-1 mr-4'>
              {shortLink ? `${shortLink}` : 'Your shortened link will appear here'}
            </div>
            <CopyButton textToCopy={shortLink} />
          </div>
        </div>
      </div> */}



    </div>

  )
}

export default center