// Utils
import axios from 'axios';
import { useState, useEffect } from 'react';


function App() {
  const [data, setData] = useState({});

  useEffect(() => {

    axios.get('https://services.odata.org/TripPinRESTierService/(S(3jgtctz5a2wyzb0gi3pxikvb))/People')
      .then(res => {
        let tableData = res.data.value;
        setData(tableData)
      })
  }, [])



  return (
    <div className="App">

    </div>
  );
}

export default App;
