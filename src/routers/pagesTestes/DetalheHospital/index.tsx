import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Alert, ScrollView, Modal, FlatList } from 'react-native'
import { Input } from '../../../components/Input'
import {
  Hospital, BloodStock,
  buscarHospital, atualizarHospital, excluirHospital, cadastrarHospital
} from '../../../services/HospitalService'
import { Button } from '../../../components/Button'
import { BackButton } from '../../../components/BackButton'
import { styles } from './style'
import { theme } from '../../../theme'

const TIPOS_SANGUE: (keyof BloodStock)[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

const BLOOD_VAZIO: BloodStock = { 'A+': 0, 'A-': 0, 'B+': 0, 'B-': 0, 'AB+': 0, 'AB-': 0, 'O+': 0, 'O-': 0 }

const UF_LIST = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
]

function apenasNumeros(text: string) {
  return text.replace(/\D/g, '')
}

export const DetalheHospital = ({ route, navigation }: any) => {
  const id = route.params?.id
  const isCadastro = !id

  const [hospital, setHospital] = useState<Hospital | null>(null)
  const [editando, setEditando] = useState(isCadastro)
  const [dados, setDados] = useState<Partial<Hospital>>({})
  const [showUfModal, setShowUfModal] = useState(false)

  useEffect(() => {
    if (isCadastro) {
      setDados({ bloodStock: { ...BLOOD_VAZIO } })
    } else {
      buscarHospital(id).then(res => {
        setHospital(res.data)
        setDados(res.data)
      }).catch(console.error)
    }
  }, [id])

  function handleSalvar() {
    if (isCadastro) {
      cadastrarHospital(dados as Omit<Hospital, 'id'>)
        .then(() => navigation.goBack())
        .catch(console.error)
    } else {
      atualizarHospital(id, dados)
        .then(res => {
          setHospital(res.data)
          setDados(res.data)
          setEditando(false)
        })
        .catch(console.error)
    }
  }

  function handleExcluir() {
    Alert.alert('Excluir hospital', 'Tem certeza que deseja excluir este hospital?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir', style: 'destructive', onPress: () => {
          excluirHospital(id).then(() => navigation.goBack()).catch(console.error)
        }
      },
    ])
  }

  function atualizarCampo(chave: keyof Hospital, valor: string) {
    setDados({ ...dados, [chave]: valor })
  }

  function atualizarSangue(tipo: keyof BloodStock, valor: string) {
    setDados({
      ...dados,
      bloodStock: { ...dados.bloodStock, [tipo]: Number(valor) } as BloodStock,
    })
  }

  const inputProps = (chave: keyof Hospital) => ({
    value: editando ? dados[chave] || '' : hospital?.[chave] || '',
    disabled: !editando,
    onChangeText: (text: string) => atualizarCampo(chave, text),
  })

  if (!isCadastro && !hospital) return <Text>Carregando...</Text>

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <BackButton onPress={() => navigation.goBack()} />

        <Text style={styles.sectionTitle}>Dados do Hospital</Text>

        <Input label="Nome" placeholder="Nome" {...inputProps('name')} />

        <View style={styles.row}>
          <View style={styles.half}>
            <Input label="CNPJ" placeholder="CNPJ" keyboardType="numeric" maxLength={14} {...inputProps('cnpj')} onChangeText={t => atualizarCampo('cnpj', apenasNumeros(t))} />
          </View>
          <View style={styles.half}>
            <Input label="CEP" placeholder="CEP" keyboardType="numeric" maxLength={8} {...inputProps('cep')} onChangeText={t => atualizarCampo('cep', apenasNumeros(t))} />
          </View>
        </View>

        <Input label="Endereço" placeholder="Endereço" {...inputProps('address')} />

        <View style={styles.row}>
          <View style={styles.half}>
            <Input label="Cidade" placeholder="Cidade" {...inputProps('city')} />
          </View>
          <View style={styles.half}>
            {editando ? (
              <>
                <TouchableOpacity style={styles.dropdown} onPress={() => setShowUfModal(true)}>
                  <Text style={dados.state ? styles.dropdownText : styles.dropdownPlaceholder}>
                    {dados.state || 'Estado'}
                  </Text>
                </TouchableOpacity>
                <Modal visible={showUfModal} transparent animationType="fade">
                  <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowUfModal(false)}>
                    <View style={styles.modalContent}>
                      <Text style={styles.modalTitle}>Selecione o Estado</Text>
                      <FlatList
                        data={UF_LIST}
                        keyExtractor={item => item}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            style={styles.modalItem}
                            onPress={() => {
                              atualizarCampo('state', item)
                              setShowUfModal(false)
                            }}
                          >
                            <Text style={styles.modalItemText}>{item}</Text>
                          </TouchableOpacity>
                        )}
                      />
                    </View>
                  </TouchableOpacity>
                </Modal>
              </>
            ) : (
              <Input label="Estado" placeholder="Estado" {...inputProps('state')} disabled />
            )}
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.half}>
            <Input label="Telefone" placeholder="Telefone" keyboardType="phone-pad" {...inputProps('phone')} onChangeText={t => atualizarCampo('phone', apenasNumeros(t))} />
          </View>
          <View style={styles.half}>
            <Input label="Email" placeholder="Email" keyboardType="email-address" {...inputProps('email')} />
          </View>
        </View>

        <Input label="Website" placeholder="Website" {...inputProps('website')} />
        <Input label="Horário de funcionamento" placeholder="Horário de funcionamento" {...inputProps('openingHours')} />
        <Input label="URL da imagem" placeholder="URL da imagem" {...inputProps('image')} />

        <Text style={styles.sectionTitle}>Estoque de Sangue</Text>
        <View style={styles.bloodGrid}>
          {TIPOS_SANGUE.map(tipo => (
            <View key={tipo} style={styles.bloodInput}>
              <Input
                placeholder={tipo}
                keyboardType="numeric"
                value={editando ? String(dados.bloodStock?.[tipo] ?? '') : String(hospital?.bloodStock?.[tipo] ?? '')}
                disabled={!editando}
                onChangeText={text => atualizarSangue(tipo, text)}
              />
            </View>
          ))}
        </View>

        <View style={styles.buttonRow}>
          {editando ? (
            <>
              <View style={{ flex: 1 }}>
                <Button texto={isCadastro ? 'Criar' : 'Salvar'} onPress={handleSalvar} bg={theme.colors.primary} color="#fff" />
              </View>
              {!isCadastro && (
                <View style={{ flex: 1 }}>
                  <Button texto="Cancelar" onPress={() => { setEditando(false); setDados(hospital || {}) }} bg="#fff" color={theme.colors.secondary} borderColor={theme.colors.border} />
                </View>
              )}
            </>
          ) : (
            <>
              <View style={{ flex: 1 }}>
                <Button texto="Editar" onPress={() => setEditando(true)} bg={theme.colors.primary} color="#fff" />
              </View>
              <View style={{ flex: 1 }}>
                <Button texto="Excluir" onPress={handleExcluir} bg="#fff" color={theme.colors.status.danger} borderColor={theme.colors.status.danger} />
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  )
}
