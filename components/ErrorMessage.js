const ErrorMessage = ({ children }) => (
  <p className="text-red-700 rounded-md bg-red-300 border-2 border-red-500 font-medium text-center">
    {children}
  </p>
);

export default ErrorMessage;
