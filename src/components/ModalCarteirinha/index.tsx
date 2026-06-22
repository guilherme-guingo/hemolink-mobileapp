import { Modal, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { Button } from "../Button";
import { styles } from "./style";

interface ProspModalCarteirinha {
  nome: string;
  visible: boolean;
  onClose: () => void;
  modalClose: () => void;
}

export const ModalCarteirinha = ({
  nome,
  modalClose,
  visible,
  onClose,
}: ProspModalCarteirinha) => {
  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#ffffff",
      }}
    >
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <View style={styles.containerFundo}>
          <View style={styles.modalView}>
            <View style={styles.titulo}>
              <Text style={{ color: "#141D23", fontSize: 20, fontWeight: 500 }}>
                Carteirinha Digital HemoLink
              </Text>
              <Text style={{ marginTop: 10, fontSize: 18 }}>{nome}</Text>
            </View>
            <View
              style={{
                backgroundColor: "#Ffffff",
                padding: 10,
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
              }}
            >
              <QRCode
                value="https://www.linkedin.com/in/pedro-dayer-4a630b398/"
                size={100}
                color="#C8102E"
                backgroundColor="white"
              />
            </View>
            <Text style={styles.descricao}>
              Esta é a sua carteirinha virtual, e com ela poderemos ter acesso
              aos seus dados
            </Text>
            <View
              style={{
                marginTop: 30,
              }}
            >
              <Text style={{ textAlign: "center", fontWeight: 500 }}>
                Apresente este QR Code para identificação, quando solicitado.
              </Text>
            </View>
            <View style={styles.botaoVoltar}>
              <Button
                texto="voltar"
                fontSizeTexto={12}
                onPress={modalClose}
                bg="#F1F1F1"
                color="#5C5F60"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
