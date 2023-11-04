import { Box } from "@chakra-ui/react";
import CarListItem from "../CarListItem/CarListItem";
import Btn from "../Btn/Btn";
import { selectDataCars, setCars, useFetchAllcarsQuery, useFetchCarsQuery } from "../../redux/carsSlice";
import { useSelector, useDispatch } from "react-redux";
import { setPValue, selectPValue } from "../../redux/carsSlice";
import { useEffect } from "react";

const CarList = ({ showFavorites, showLoadMore, onOpen }) => {
  const dataCars = useSelector(selectDataCars)
  const currentPValue = useSelector(selectPValue);
  const favoriteCars = useSelector(state => state.favorite.favorites);
  const dispatch = useDispatch();

  const currentPathname = window.location.pathname;

  const { data: cars = [], error, isLoading } = showFavorites ? useFetchAllcarsQuery() : useFetchCarsQuery(currentPValue)

  const filteredCars = !showFavorites ? dataCars : cars?.filter(car =>
    (showFavorites ? favoriteCars?.map(el => el.id).includes(car.id) : true)) || []

  useEffect(() => {
    if (cars.length > 0 && currentPathname.includes('/catalog')) dispatch(setCars(cars))
  }, [dispatch, cars])

  const handleIncrementP = async () => {
    if (cars.length === 0) return
    dispatch(setPValue(currentPValue + 1));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading cars: {error.message}</div>;
  }

  return (
    <>
      {favoriteCars.length === 0 && currentPathname.includes('/favorite') ?
        <div>Вы не сохранили понравившиеся вам машины.</div> :
        <Box as="ul" display={'flex'} flexWrap={'wrap'} gap={'50px 29px'}>
          {filteredCars.length > 0 && filteredCars.map(({ id, ...carProps }) => (
            <CarListItem key={id} id={id} {...carProps} onOpen={onOpen} />
          ))}
        </Box>
      }
      {showLoadMore && <Btn text={'Load More'} onClick={handleIncrementP} />}
    </>
  );
};

export default CarList;
