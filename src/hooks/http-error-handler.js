import { useState, useEffect } from 'react';

const useHttp = httpClient => {
   const [error, setError] = useState(null);

   const reqInterceptor = httpClient.interceptors.request.use(req => {
      setError(null);
      return req;
   });

   const resInterceptor = httpClient.interceptors.response.use(res => res, err => {
      setError(err);
   });

   // useeffect usado como un componentWillUnmount, por eso solo es un return
   useEffect(() => {
      return () => {
         httpClient.interceptors.request.eject(reqInterceptor);
         httpClient.interceptors.response.eject(resInterceptor);
      };
   }, [reqInterceptor, resInterceptor]);

   const errorConfirmedHandler = () => {
      setError(null);
   };

   return [error, errorConfirmedHandler];
};

export default useHttp;