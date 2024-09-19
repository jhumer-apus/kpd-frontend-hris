declare module 'js-cookie' {
    const Cookies: {
      get: (key: string) => string | undefined;
      set: (key: string, value: string, options?: object) => void;
      remove: (key: string) => void;
      // Add more methods as necessary based on your usage of js-cookie
    };
    export default Cookies;
  }
  