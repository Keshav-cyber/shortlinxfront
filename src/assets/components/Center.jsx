import { useState } from 'react'
import { Plus, Copy } from 'lucide-react';
import axios from 'axios';
import CopyButton from './copybutton';

const center = () => {
  const [link, setLink] = useState('');
  const [shortLink, setShortLink] = useState('');
  const VITE_BACKEND_SERVER =  import.meta.env.VITE_BACKEND_SERVER// Replace with your actual API endpoint

  const handleLink = async(e) => {
    e.preventDefault(); // Prevent the default form submission behavior 
    // Here you can add logic to shorten the link
    console.log('Shortening link:', VITE_BACKEND_SERVER);
    const response = await axios.post(VITE_BACKEND_SERVER+'', { longUrl: link });
    // console.log(response.data);
    setShortLink(response.data.data.shortUrl);
  };

  // const handleCopy = () => {
  //   navigator.clipboard.writeText(shortLink);
  // };

  
  return (
    <div className='max-w-2xl mx-auto  px-4 md:px-6 lg:px-8'>
      <div className='text-center mb-12'>
        <h1 className='text-5xl font-bold text-gray-900 mb-4'>Shorten your link</h1>
        <p className='text-xl text-gray-600 max-w-lg mx-auto'>Transform your long URLs into clean, shareable links with our professional URL shortener for free.</p>
      </div>
      <div className="bg-white shadow-xl rounded-2xl p-8 mb-12 border border-gray-100">

        <div className="mb-4">
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
          <span className="input-group-text bg-gray-200 border border-gray-300 rounded-l-lg p-3 mr-2 text-gray-600">shortlinx.work.gd/</span>
          <label htmlFor="alias-link" className="sr-only">Enter your alias (Optional)</label>
          <input
            type="text"
            id="alias-link"
            className="form-control flex-grow p-3 border border-gray-300 rounded-r-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            placeholder="Enter your alias (Optional)"
          />
        </div>

        <div className='flex justify-center'>
          <button type="submit" onClick={handleLink} className="w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-base px-6 py-3 text-center transition duration-200">Shorten URL</button>
        </div>
      </div>
      <div className="mt-12">
        <h3 className='text-3xl font-semibold text-gray-800 mb-6'>Your Shortened Link</h3>

        <div className='bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6 shadow-sm'>
          <div className='flex items-center justify-between'>
            <div className='text-blue-700 font-semibold text-lg truncate flex-1 mr-4'>
              {shortLink ? `${shortLink}` : 'Your shortened link will appear here'}
            </div>
            {/* <button type="button" onClick={handleCopy} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 flex items-center space-x-2">
              <Copy size={18} />
              <span>Copy</span>
            </button> */}
            <CopyButton textToCopy={shortLink}/>
          </div>
        </div>
      </div>
    </div>

  )
}

export default center