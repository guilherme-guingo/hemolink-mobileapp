import React, { useState } from 'react'
import { ScrollView, View, Text, FlatList, Image } from 'react-native'
import { styles } from './style'

import { ICONS } from '../../icones'
import Icon from "@expo/vector-icons/Ionicons";
import { BotaoAtalho } from '../../components/BotaoAtalho'
import { categorias, giftCards } from './helper'
import { theme } from '../../theme'
import googplePlay from '../../assets/imagens/googleplay.webp'
import { Header } from '../../components/Header';


export const LojaDePontos = () => {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos")

  const giftCardsFiltrados = categoriaSelecionada === "Todos"
    ? giftCards
    : giftCards.filter(item =>
      item.tipo?.toLowerCase() === categoriaSelecionada.toLowerCase()
    )

  return (
    <View style={{ flex: 1 }}>
      <Header />

      <FlatList
        data={giftCardsFiltrados}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 16,
          gap: 16,
          paddingBottom: 40,
        }}
        ListHeaderComponent={
          <>
            <Text style={{ fontWeight: "700", fontSize: 22 }}>
              Loja de Pontos
            </Text>

            <Text style={{ marginVertical: 10 }}>
              Use seus pontos para ganhar recompensas incriveis
            </Text>

            <View style={styles.pointsContainer}>
              <View style={styles.heroSquare} />
              <Icon
                style={styles.gifIcon}
                name={ICONS.gift}
                size={60}
                color="white"
              />

              <View style={{ padding: 20, gap: 10 }}>
                <Text style={styles.textWhite}>Seus pontos disponíveis</Text>
                <Text style={[styles.textWhite, styles.points]}>
                  3000
                </Text>
                <Text style={styles.textWhite}>
                  Faça uma doação e ganhe pontos
                </Text>
              </View>
            </View>

            <Text style={{ fontWeight: "600", marginVertical: 10 }}>Categorias</Text>

            <FlatList
              data={categorias}
              horizontal
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesContainer}
              ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
              renderItem={({ item }) => (
                <BotaoAtalho
                  label={item.label}
                  icon={item.icon}
                  onPress={() => setCategoriaSelecionada(item.label)}
                  corIcone={theme.colors.primary}
                />
              )}
            />

            <Text style={{ fontWeight: "600", marginTop: 10 }}>
              Destaques para você
            </Text>
          </>
        }
        renderItem={({ item }) => (
          <View style={styles.shopItensContainer}>
            <Image style={styles.shopItensCard} source={item.imagem} />

            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-around' }}>


              <Text style={{ fontWeight: "600" }}>
                {item.nome}
              </Text>
              <Text>{item.description}</Text>

              <Text style={styles.pointCard}>
                {item.pontos}
              </Text>
            </View>

            <Icon name={ICONS.arrowRight} size={20} />
          </View>
        )}
      />
    </View>
  )
}
