import './App.css';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    const eventList = document.getElementById('event-list');

    const eventSource = new EventSource(`https://events.idtolu.net/iot-events/events/${'app01'}`, { withCredentials: false }); // URL del servidor SSE

    eventSource.onopen = () => {
      console.log('Connected');
    }
    
    eventSource.onmessage = (event) => {
      console.log(event.data);
      const newEvent = document.createElement('li');
      newEvent.textContent = JSON.parse(event.data).count;
      eventList.appendChild(newEvent);
    };

    eventSource.onerror = (error) => {
      console.error('Error en la conexión SSE:', error);
    };

    return () => eventSource.close();
  }, []);
  return (
    <div id='event-list'></div>
  );
}

export default App;
