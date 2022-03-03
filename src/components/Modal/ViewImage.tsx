import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
      <ModalOverlay />
      <ModalContent bg={"pGray.800"} maxH={"600"} maxW={"900"}>
        <ModalBody padding={"initial"}>
          <Image src={imgUrl} maxH={"600"} maxW={"900"} w={"100%"} h={"100%"}></Image>
        </ModalBody>
        <ModalFooter justifyContent={"flex-start"}>
          <Link href={imgUrl} target={"_blank"}>Abrir original</Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
