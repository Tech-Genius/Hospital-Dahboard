import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="p-4 bg-red-900 border border-red-700 text-red-300 rounded-lg shadow-xl m-4">
      <h3 className="text-xl font-bold mb-2">🚨 Error Encountered</h3>
      <p>{message}</p>
      <p className="mt-2 text-sm">Please check the console for details or try refreshing the page.</p>
    </div>
  );
};

export default ErrorMessage;