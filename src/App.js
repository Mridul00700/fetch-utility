import logo from './logo.svg';
import './App.css';
import useFetch from './Utilities/useFetch';
function App() {
  const config = {
    url: "https://jsonplaceholder.typicod.com/todos",
    retry: 10
  }
  const [retry, data, status, error, inProgress] = useFetch({config});

  console.log(retry, data, status, error, inProgress);
  return (
    (
      <>
        { inProgress ? <p>Fetching data!</p> :
        <>{ error ? <p>{error.message}</p> : 
      <ul>
        {data.map(data=> <li key={data.id}>{data.title}</li>)}
        </ul>
        }</>
  }
        </>
    )
  );
}

export default App;
