import React from 'react';
import Hero from '../components/Hero/Hero';
import { useFetchCarByIdQuery } from '../redux/carsSlice';


const Home = () => {
  const { data: car, error, isFetching } = useFetchCarByIdQuery(1);

  console.log(car);


  return (
    <div>

      <Hero />
    </div>
  );
};

export default Home;
