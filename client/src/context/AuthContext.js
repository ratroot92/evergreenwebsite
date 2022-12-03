/* eslint-disable  */
import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import apiServer from '../config/axios.config';

const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};
export const AuthContext = React.createContext(null);
export default ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await apiServer.get(`/auth/is-authenticated`);
        setIsAuthenticated(response.data.data.isAuthenticated);
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const logout = () => {
    setLoading(true)
    setIsAuthenticated(false);
    setUser(null);
    localStorage.clear();
    setLoading(false)

  };
  return (
    <div>
      {loading ? (
        <ClipLoader color={'#000'} loading={loading} cssOverride={override} size={150} />
      ) : (
        <AuthContext.Provider
          value={{
            user,
            isAuthenticated,
            setIsAuthenticated,
            logout,
            setUser,
          }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </div>
  );
};

