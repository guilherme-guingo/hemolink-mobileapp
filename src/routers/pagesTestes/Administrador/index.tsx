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
import { theme } from '../../../theme'
import { Loading } from '../../../components/loading'
import { Header } from '../../../components/Hearder'

export const Administrador = () => {
    const navigation = useNavigation()
    const [hospitais, setHospitais] = useState<Hospital[]>([])
    const [qtDoadores, setQtDoadores] = useState(0)
    const [filter, setFilter] = useState('')
    const [filtroAtivo, setFiltroAtivo] = useState('todos')
    const [loading, setLoading] = useState(false)

    //Render dos Cards
    useFocusEffect(
        useCallback(() => {
            setLoading(true)

            Promise.all([
                listarHospitais(),
                listarDoadores()
            ])
                .then(([hospitaisRes, doadoresRes]) => {
                    setHospitais(hospitaisRes.data)
                    setQtDoadores(doadoresRes.data.length)
                })
                .catch(err => console.log(err))
                .finally(() => setLoading(false))
        }, [])
    )

    type IconName = React.ComponentProps<typeof MaterialIcons>['name'];

    type StatItem = {
        id: string;
        title: string;
        value: number;
        color: string;
        icon: IconName;
    };
    
    const data: StatItem[] = [
        { id: '1', title: 'Hospitais', value: hospitais.length, color: '#0ecf00', icon: 'medical-services' },
        { id: '2', title: 'Doadores', value: qtDoadores, color: '#CE636D', icon: 'people' },
        { id: '3', title: 'Doacoes em aberto', value: 45, color: '#EBC964', icon: 'pending-actions' },
        { id: '4', title: 'Doações recebidas', value: 110, color: '#4592E5', icon: 'check-circle' },
    ];

    return (
        <View >
            <Header />
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
                                        name={item.icon}
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


                <Text style={styles.titleFilter}>Hospitais</Text>
                <View style={styles.fullWidthSection}>
                    <ScrollView
                        contentContainerStyle={styles.containerStat}
                        horizontal
                        showsHorizontalScrollIndicator={false}>
                        <View style={{ flexDirection: 'row', gap: 8, height: 51 }}>
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


                <View style={styles.filterContainer}>
                    <View style={{ flex: 1 }}>
                        <Input
                            value={filter}
                            placeholder='Digite o nome do Hospital'
                            onChangeText={setFilter}
                        />
                    </View>

                    <Button
                        texto=''
                        onPress={() => navigation.navigate('StackCadastroHospital')}
                        height={46}
                        width={46}
                        icon='add'
                    />
                </View>

                {!loading ?
                    (<View style={styles.containerHospitais}>
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
                                        style={{ width: '100%', marginBottom: 8 }}
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
                                                borderWidth: 2,
                                                borderColor: `${theme.colors?.textMuted}70`,
                                                boxShadow: '0 3px 8px rgba(0,0,0,.12)'
                                            }}
                                            sourceStyleAdd={{}}
                                            source={item.image}
                                            name={item.name}
                                            nameStyleAdd={{ fontSize: 16 }}
                                            city={item.city}
                                            cityStyleAdd={{ marginBottom: 100 }}
                                            state={item.state}
                                        />
                                    </TouchableOpacity>
                                )
                            })}



                    </View>)
                    :
                    (<View style={styles.loadingContainer}>
                        <Loading size="large" />
                    </View>
                    )
                }
            </ScrollView >

        </View>

    )
}