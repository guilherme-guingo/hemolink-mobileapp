import React, { useState, useCallback } from 'react'
import { FlatList, ScrollView, Text, View, Image, TouchableOpacity } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { Hospital, listarHospitais } from '../../../services/HospitalService'
import { listarDoadores } from '../../../services/DoadorService'
import { CardBaseCatalogo as CardBase } from '../../../components/CardBaseCatalogo'
import { styles } from './style'
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import admHero from '../../../assets/imagens/admHero.webp'
import { Input } from '../../../components/Input'
import { Button } from '../../../components/Button'
import { obterBloodStock } from '../../../util/obterBloodStock'
import { obterTiposSanguineosCriticos } from '../../../util/obterTiposSanguineosCriticos'
import { filtrosHospital } from './helper'
/*
    [x] Criacao de estatisticas
    [x] Get Hospital
    [x] Seções separadas e com divisoes claras
    [ ] Filtro Hospital
    [ ] estilizar após o estilo do site estar definido
    [ ] Colocar qtda Toda de doaçoes aberto x realizado
*/
export const Administrador = () => {
    const navigation = useNavigation()
    const [hospitais, setHospitais] = useState<Hospital[]>([])
    const [qtDoadores, setQtDoadores] = useState(0)
    const [filter, setFilter] = useState('')
    const [filtroAtivo, setFiltroAtivo] = useState('todos')


    useFocusEffect(
        useCallback(() => {
            listarHospitais()
                .then(res => setHospitais(res.data))
                .catch(err => console.log(err))
            listarDoadores()
                .then(res => setQtDoadores(res.data.length))
                .catch(err => console.log(err))
        }, [])
    )


    const data = [
        { id: '1', title: 'Hospitais', value: hospitais.length, color: '#0ecf00' },
        { id: '2', title: 'Doadores', value: qtDoadores, color: '#CE636D' },
        { id: '3', title: 'Doacoes em aberto', value: 45, color: '#EBC964' },
        { id: '4', title: 'Doações recebidas', value: 110, color: '#4592E5' },
    ];
    return (
        <ScrollView style={styles.container}>

            <View style={styles.heroContainer}>
                <Image
                    style={styles.heroAdmImg}
                    source={admHero}
                    resizeMode='contain'
                />
                <View style={{ marginLeft: 40, marginTop: 20 }}>
                    <Text style={styles.HeroTitle}>Bem-Vindo(a),{"\n"}
                        <Text style={{ fontWeight: 'bold' }}>
                            Administrador!
                        </Text>
                    </Text>
                </View>

            </View>

            <View style={styles.fullWidthSection}>
                <ScrollView
                    contentContainerStyle={styles.containerStat}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >

                    {data.map((item) => {
                        return (
                            <View key={item.id} style={styles.statisticContainer}>

                                <Text style={styles.cartTitle}>{item.title}</Text>
                                <MaterialIcons
                                    name='medical-services'
                                    size={16}
                                    color={item.color}
                                    style={[styles.cardIcon, { backgroundColor: `${item.color}40` }]}
                                />

                                <Text style={styles.cardValue}>{item.value}</Text>
                            </View>
                        )
                    })}



                </ScrollView>

            </View>


            <Text>Hospitais</Text>
            <View style={styles.fullWidthSection}>

                <ScrollView
                    contentContainerStyle={styles.containerStat}
                    horizontal
                    showsHorizontalScrollIndicator={false}>
                    <View style={{ flexDirection: 'row', gap: 8, height:24 }}>
                        {filtrosHospital.map((item) => {
                            const ativo = filtroAtivo === item.action
                            return (
                                <Button
                                    key={item.id}
                                    icon={item.icon}
                                    texto={item.texto}
                                    bg={ativo ? item.bg : '#fff'}
                                    color={ativo ? item.color : item.disableColor}
                                    borderRadius={item.borderRadius}
                                    borderWidth={1}
                                    borderColor={item.borderColor}
                                    onPress={() => setFiltroAtivo(item.action)}
                                />
                            )
                        })}
                    </View>



                </ScrollView>

            </View>


            <View style={{ flex: 1,paddingTop:16 }}>
                <Input value={filter} placeholder='Digite o nome do Hospital' onChangeText={setFilter} />
            </View>


            <View style={styles.containerHospitais}>
                {hospitais
                    .filter(item => {
                        const textMatch = item.name.toLowerCase().includes(filter.toLowerCase())
                        if (!textMatch) return false

                        if (filtroAtivo === 'emergencia') {
                            const { percentage } = obterBloodStock(item.bloodStock)
                            return percentage <= 30
                        }

                        return true
                    })
                    .sort((a, b) => {
                        if (filtroAtivo === 'alto_estoque') {
                            const aPct = obterBloodStock(a.bloodStock).percentage
                            const bPct = obterBloodStock(b.bloodStock).percentage
                            return bPct - aPct
                        }
                        return 0
                    })
                    .map((item) => {
                        const { percentage } = obterBloodStock(item.bloodStock)
                        const tipoCritico = obterTiposSanguineosCriticos(item.bloodStock)
                        return (
                            <TouchableOpacity
                                key={item.id}
                                style={{ width: '48%', marginBottom: 8 }}
                                onPress={() => navigation.navigate('StackDetalheHospital', { id: item.id })}
                            >
                                <CardBase
                                    percentage={percentage}
                                    tipoCritico={tipoCritico}
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
                        )
                    })}



            </View>
        </ScrollView>
    )
}