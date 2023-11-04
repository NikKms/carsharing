import { Container, useDisclosure } from "@chakra-ui/react";
import CarList from "../components/CarList/CarList";
import ModalCard from "../components/modal/ModalCard";

const EventDetails = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Container maxW={'1280px'} >
      {/* <Button onClick={onOpen}>Trigger modal</Button> */}
      <ModalCard isOpen={isOpen} onClose={onClose} />
      <CarList showFavorites={false} showLoadMore={true} onOpen={onOpen} />
    </Container>
  )
};

export default EventDetails;
