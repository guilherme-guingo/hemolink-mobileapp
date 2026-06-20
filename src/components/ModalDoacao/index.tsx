import { Modal, Text, View, Pressable } from "react-native";
import { styles } from "./style";
import { useState } from "react";

interface ProspModalDoacao {
  visible: boolean;
  onClose: () => void;
  modalClose: () => void;
}

export const ModalDoacao = ({ visible, onClose, modalClose }: ProspModalDoacao) => {
  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <View style={styles.containerFundo}>
          <View style={styles.modalView}>
            <Text>Conteudo do modal</Text>
            <Pressable onPress={modalClose}>
              <Text>Fechar modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};
