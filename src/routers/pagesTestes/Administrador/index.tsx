import React, { useState, useCallback } from 'react'
import { FlatList, ScrollView, Text, View, Image, TouchableOpacity } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { Hospital, listarHospitais } from '../../../services/HospitalService'
import { CardBaseCatalogo as CardBase } from '../../../components/CardBaseCatalogo'
import { styles } from './style'
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import admHero from '../../../assets/imagens/admHero.webp'
import { Input } from '../../../components/Input'

/*
    [x] Criacao de estatisticas
    [x] Get Hospital
    [ ] Seções separadas e com divisoes claras
    [ ] Filtro Hospital
    [ ] estilizar após o estilo do site estar definido

*/
export const Administrador = () => {
    const navigation = useNavigation()
    const [hospitais, setHospitais] = useState<Hospital[]>([])
    const [filter,setFilter] = useState('')
    useFocusEffect(
        useCallback(() => {
            listarHospitais()
                .then(res => setHospitais(res.data))
                .catch(err => console.log(err))
        }, [])
    )


    const data = [
        { id: '1', title: 'Hospitais', value: 40, color: '#0ecf00' },
        { id: '2', title: 'Doadores', value: 1600, color: '#CE636D' },
        { id: '3', title: 'Doacoes', value: 8000, color: '#EBC964' },
        { id: '4', title: 'Parceiros', value: 300, color: '#4592E5' },
    ];
    return (
        <ScrollView style={styles.container}>
            <View style={styles.fullWidthSection}>
                <Image
                    style={styles.heroAdmImg}
                    source={admHero}
                    resizeMode='contain'
                />
                <View style={{ height: 200, marginLeft: 30, justifyContent: 'center' }}>
                    <Text style={styles.HeroTitle}>Bem-Vindo(a),{"\n"}
                        <Text style={{ fontWeight: 'bold' }}>
                            Administrador!
                        </Text>
                    </Text>
                </View>



            </View>

            <Text>Estatisticas</Text>

            <View style={styles.fullWidthSection}>
                <ScrollView
                    contentContainerStyle={styles.containerStat}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >

                    {data.map((item) => {
                        return (
                            <View key={item.id} style={styles.statisticContainer}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
                                    <MaterialIcons
                                        name='medical-services'
                                        size={16}
                                        color={item.color}
                                        style={{ backgroundColor: `${item.color}40`, padding: 8, borderRadius: 10 }}
                                    />
                                </View>
                                <Text style={styles.cardValue}>{item.value}</Text>
                            </View>
                        )
                    })}



                </ScrollView>

            </View>

            <Text>Hospitais</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <View style={{ flex: 1 }}>
                <Input value={filter} placeholder='Digite o nome do Hospital' onChangeText={setFilter} />
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('StackCadastroHospital')}>
                <Text style={{ fontSize: 28, color: '#007AFF' }}>+</Text>
              </TouchableOpacity>
            </View>


            <View style={styles.containerHospitais}>
                {hospitais.filter(item =>
                    item.name.toLowerCase().includes(filter.toLowerCase())
                ).map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={{ width: '48%', marginBottom: 8 }}
                        onPress={() => navigation.navigate('StackDetalheHospital', { id: item.id })}
                    >
                        <CardBase
                            cardStyleView={{
                                width: '100%',
                                borderRadius: 10,
                                backgroundColor: '#fff',
                                paddingBottom: 20,

                            }}
                            sourceStyleAdd={{}}
                            source={item.image}
                            name={item.name}
                            city={item.city}
                            state={item.state}
                        />
                    </TouchableOpacity>
                ))}



            </View>
        </ScrollView>
    )
}