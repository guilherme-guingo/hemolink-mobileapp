import { FlatList, Text, View } from "react-native";
import { dadosVindoApiTeste } from "../Home/dadosVindoApiTeste";
import { CardBase } from "../../../components/CardBaseCatalogo";
import { Header } from "../../../components/Hearder";

export const Teste = () => {
  return (
    <View>
      <Header />
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <FlatList
          data={dadosVindoApiTeste}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <CardBase
              source={item.image}
              name={item.name}
              city={item.city}
              state={item.state}
            />
          )}
        />
      </View>
    </View>
  );
};
