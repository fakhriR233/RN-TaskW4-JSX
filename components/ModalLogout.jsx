import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { Button, Modal } from "native-base";
import { UserContext } from "../context/userContext";

const ModalLogout = ({ showModal, setShowModal, navigation }) => {
  const [state, dispatch] = useContext(UserContext);

  const handleLogout = (e) => {
    console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    navigation.navigate("Home");
  };
  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Body>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                setShowModal(false);
              }}
            >
              Cancel
            </Button>
            <Button onPress={handleLogout}>Logout</Button>
          </Button.Group>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default ModalLogout;

const styles = StyleSheet.create({});
