import { FlatList, Text, View } from "react-native";
import { dadosVindoApiTeste } from "../Home/dadosVindoApiTeste";
import { CardBaseCatalogo } from "../../components/CardBaseCatalogo";

 export const Teste = () => {
   return (
     <View>
       <View style={{ justifyContent: "center", alignItems: "center" }}>
         <FlatList
           data={dadosVindoApiTeste}
           keyExtractor={(item) => String(item.id)}
           renderItem={({ item }) => (
             <CardBaseCatalogo
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
