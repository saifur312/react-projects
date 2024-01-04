import { useEffect, useState } from 'react';
import './App.css';
import Tours from './Tours';
import Loading from './Loading';

const toursUrl = 'https://course-api.com/react-tours-project';

function App() {
  // const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    const filterTours = tours.filter((tour) => id !== tour.id);
    setTours(filterTours);
  };

  const fetchTours = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(toursUrl);
      console.log(response);
      if (!response.ok) {
        // if response.ok is false then set error true and set loading false to show error message
        setIsError(true);
        setIsLoading(false);
        return;
      }
      // if response.ok is true then set data into tours and pass it to Tours Component and set loading false
      const data = await response.json();
      console.log(data);
      setTours(data);
      setIsLoading(false);
      setIsError(false);
    } catch (error) {
      console.log(error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  if (isLoading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  console.log('isError:', isError, ' isLoading', isLoading);

  if (isError) {
    return (
      <main>
        <h3>Error occurs into fetch data</h3>
      </main>
    );
  }

  // return (
  //     {/* <h3>{isError && 'Error occured into fetch data'}</h3> */}
  //     {tours && (
  //       <main>
  //         <h3> Our Tours</h3>
  //         <Tours tours={tours} removeTour={removeTour} />
  //         {tours.length === 0 && (
  //           <button type="button" className="btn" onClick={fetchTours()}>
  //             Refresh
  //           </button>
  //         )}
  //       </main>
  //     )}
  // );

  return (
    <main>
      {tours.length === 0 ? (
        <div className="title">
          <h2>No tours left</h2>
          <button className="btn" onClick={() => fetchTours()}>
            refresh
          </button>
        </div>
      ) : (
        <Tours tours={tours} removeTour={removeTour} />
      )}
    </main>
  );
}

export default App;
