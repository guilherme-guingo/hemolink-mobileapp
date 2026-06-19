import React, { useEffect, useState } from 'react'
import { FlatList, ScrollView, Text, View } from 'react-native'
import { Hospital, listarHospitais } from '../../../services/HospitalService'


export const Administrador = () => {
    const [hospitais, setHospitais] = useState<Hospital[]>([])

    useEffect(() => {
        const getAllHospitais = async () => {
            try {
                const res = await listarHospitais()
                setHospitais(res)
            } catch (err) {
                console.log(err)
            }
        }

        getAllHospitais()
    }, [])

    return (
        <ScrollView >
            <FlatList
                data={hospitais}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={{borderWidth: 1,borderColor: '#000',borderRadius: 8,backgroundColor: '#fff',padding: 16,marginBottom: 12,
                    }}>
                        <Text>{item.name}</Text>
                        <Text>{item.address}</Text>
                        <Text>{item.city} - {item.state}</Text>
                        <Text>{item.phone}</Text>
                    </View>
                )}
            />
        </ScrollView>
    )
}