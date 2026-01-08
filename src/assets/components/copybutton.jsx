import React, { useState, useCallback } from 'react';
import { Copy } from 'lucide-react';

const CopyButton = ({ textToCopy }) => {
    // State to track the copy status: 'idle', 'copied', or 'error'
    const [copyStatus, setCopyStatus] = useState('idle');

    // Function to handle the copying logic
    const handleCopy = useCallback(async () => {
        if (copyStatus === 'copied') return; // Prevent rapid clicking
        if (textToCopy.trim() === '') return; // Do not copy empty text
        try {
            await navigator.clipboard.writeText(textToCopy);
            
            // Set status to 'copied'
            setCopyStatus('copied');
            buttonClasses += ' bg-green-500 text-black hover:bg-green-600';
            // Reset status back to 'idle' after 2 seconds
            setTimeout(() => {
                setCopyStatus('idle');
            }, 8000);

        } catch (err) {
            console.error('Failed to copy text: ', err);
            setCopyStatus('error');
            // Reset status after 3 seconds for error visibility
            setTimeout(() => {
                setCopyStatus('idle');
            }, 3000);
        }
    }, [textToCopy, copyStatus]);

    // --- Tailwind CSS Classes based on Status ---
    let buttonClasses = 'px-4 py-2 bg-sky-100 hover:bg-sky-200 text-black rounded-lg transition-all duration-300 flex items-center justify-center shadow-md';
    let buttonText = 'Copy';
    let icon = (
       <Copy size={18} />
    ); // Default Copy Icon

    if (copyStatus === 'copied') {
        buttonClasses += ' bg-green-500 hover:bg-green-600';
        buttonText = 'Copied!';
        icon = (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
        ); // Checkmark Icon
    } else if (copyStatus === 'error') {
        buttonClasses += ' bg-red-500 hover:bg-red-600';
        buttonText = 'Error';
        icon = (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
        ); // Error Icon
    } else {
        // 'idle' state
         buttonClasses += 'bg-indigo-500 hover:bg-indigo-600';
    }
    
    return (
        <button
            className={buttonClasses}
            onClick={handleCopy}
             // Disable while success message is shown
        >
            {icon}
            {buttonText}
        </button>
    );
};

export default CopyButton;  