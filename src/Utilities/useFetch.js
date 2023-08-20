import * as React from "react";

// Retry count
// current state of fetching
// data
// caching with key
/*
config= {
  retry,
  key,
  method,
  headers,
  body,
  url
  options
}
*/

const useFetch = ({ config }) => {
  const [data, setData] = React.useState([]);
  const [status, setStatus] = React.useState("fetching");
  const [error, setError] = React.useState("");
  const [tempError, setTempError] = React.useState("");
  const [retry, setRetry] = React.useState(1);
  const [inProgress, setInProgress] = React.useState(false);
  // const []
//   console.log("retry >>",retry);
  React.useEffect(() => {
    const fetchData = async () => {
        setData([]);
        // console.log("inside useEffect", retry, config?.retry)
      if (retry < config?.retry || !config?.retry) {
        try {
            // console.log("fetch>>>><<<<<>>>>", retry)
          setStatus("fetching");
          setInProgress(true);
          const response = await fetch(config.url, {
            ...config?.options,
            headers: config?.headers,
            method: config?.method || "GET",
            body: config?.body
          });

          const data = await response.json();
          setData(data);
          setStatus("done");
          setInProgress(false);
        } catch (error) {
          if(config?.retry){
            if(retry < config?.retry){
                // console.log("state update",retry)
            setRetry(retry+1);
            }
        }
        setTempError(error);
          if(!config?.retry){
            setInProgress(false);
            setError(error);
          }
        }
      } else {
        setInProgress(false);
        setError(tempError);
        setStatus("done!")
      }
    };

    // if(retry<config?.retry){
    fetchData();
    // }
  }, [retry]);

  return [retry, data, status, error, inProgress];
};

export default useFetch;
