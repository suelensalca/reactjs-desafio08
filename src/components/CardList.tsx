import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const { isOpen, onClose,onOpen } = useDisclosure();
  function handleViewImage(url: string) {
    setImageUrl(url);
    onOpen();
  }

  return (
    <>
      <SimpleGrid spacing={{ base:"10px" , md:"40px"}} templateColumns={"repeat(3, 1fr)"}>
        {cards?.map((card) => (
          <Card
            key={card.ts}
            data={card}
            viewImage={() => handleViewImage(card.url)}
          />
        ))}
      </SimpleGrid>
      <ModalViewImage isOpen={isOpen} onClose={onClose} imgUrl={imageUrl} />
    </>
  );
}
