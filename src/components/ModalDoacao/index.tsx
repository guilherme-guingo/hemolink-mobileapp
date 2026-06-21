import { Modal, Text, View, Pressable } from "react-native";
import { styles } from "./style";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";

interface ProspModalDoacao {
  visible: boolean;
  onClose: () => void;
  modalClose: () => void;
}

export const ModalDoacao = ({
  visible,
  onClose,
  modalClose,
}: ProspModalDoacao) => {
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
            <View style={styles.modalHeader}>
              <Text style={{ color: "#141D23", fontSize: 23, fontWeight: 500 }}>
                Contribuir com a Causa
              </Text>
              <View>
                <Pressable onPress={modalClose}>
                  <Ionicons name="close" size={24} color="#5C5F60" />
                </Pressable>
              </View>
            </View>
            <View
              style={{
                borderColor: "#EAD0CF",
                borderWidth: 0.1,
                width: "100%",
                marginHorizontal: 30,
              }}
            ></View>

            <View style={{ marginTop: 10 }}>
              <Text style={{ color: "#5C5F60", fontSize: 13, fontWeight: 500 }}>
                Sua doação apoia diretamente a infraestrutura de coleta de
                sangue de sangue e o alcance comunitário.
              </Text>
            </View>

            <View style={styles.containerQrCode}>
              <View style={styles.containerPai}>
                <View style={styles.containerFilho}>
                  <View
                    style={{
                      backgroundColor: "#Ffffff",
                      padding: 10,
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
                    }}
                  >
                    <QRCode
                      value="https://github.com/awesome-qr-code"
                      size={120}
                      color="#C8102E"
                      backgroundColor="white"
                    />
                  </View>
                </View>
                <View style={styles.qrCodeDescricao}>
                  <Text style={{textAlign: "center", color: "#5C5F60"}}>Escaneie o QR Code com seu banco confiável</Text>
                  <Text style={{textAlign: "center", color: "#C8102E", fontWeight: 700}}>PIX HemoLink</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
