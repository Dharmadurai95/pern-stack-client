import { Route, Routes } from 'react-router-dom';
import './App.css';
import Container from '@mui/material/Container';
import Home from './Home';
import RestaurantContextProvider from './Context/RestaurantContext'
import UpdateRestaurant from './component/UpdateRestaurant';
import RestaurantDetails from './component/RestaurantDetails';

function App() {
  return (
    <RestaurantContextProvider>
  
      <Container maxWidth="lg">
        <Routes>
          <Route path='/' element={<Home  />} />
          <Route path='/restaurant/:id/update' element={<UpdateRestaurant />} />
          <Route path='/restaurant-details/:id' element={<RestaurantDetails />} />
        </Routes>
      </Container>
    </RestaurantContextProvider>
  );
}

export default App;
