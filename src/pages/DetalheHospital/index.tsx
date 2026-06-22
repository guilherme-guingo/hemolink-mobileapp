import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Alert, ScrollView, Modal, FlatList } from 'react-native'
import { Input } from '../../components/Input'
import {
  Hospital, BloodStock,
  buscarHospital, atualizarHospital, excluirHospital, cadastrarHospital
} from '../../services/HospitalService'
import { Button } from '../../components/Button'
import { BackButton } from '../../components/BackButton'
import { styles } from './style'
import { theme } from '../../theme'
import { formatPhone } from '../../util/formataTelefone'
import { formatCEP } from '../../util/formataCEP'
import { formatCNPJ } from '../../util/formataCNPJ'
import { apenasNumeros } from '../../util/apenasNumeros'
import { BLOOD_VAZIO, TIPOS_SANGUE, UF_LIST } from './helper'
import { ICONS } from '../../icones'
import Toast from 'react-native-toast-message'


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
      }).catch(() => {
      Toast.show({
        type: "error",
        text1: "Erro durante a persistencia dos dados",
      });
})
    }
  }, [id])

function handleSalvar() {
  if (isCadastro) {
    cadastrarHospital(dados as Omit<Hospital, 'id'>)
      .then(() => navigation.goBack())
      .catch(() => {
        Toast.show({
          type: "error",
          text1: "Erro ao cadastrar",
          text2: "Não foi possível salvar o novo hospital.",
        });
      });
  } else {
    atualizarHospital(id, dados)
      .then((res) => {
        setHospital(res.data);
        setDados(res.data);
        setEditando(false);
      })
      .catch(() => {
        Toast.show({
          type: "error",
          text1: "Erro ao atualizar",
          text2: "Não foi possível salvar as alterações do hospital.",
        });
      });
  }
}

  function handleExcluir() {
    Alert.alert('Excluir hospital', 'Tem certeza que deseja excluir este hospital?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir', style: 'destructive', onPress: () => {
          excluirHospital(id).then(() => navigation.goBack()).catch(() => {
            Toast.show({
              type: "error",
              text1: "Erro ao excluir",
              text2: "Não foi possível remover este hospital no momento.",
            });
          });
        }
      },
    ])
  }

  function atualizarCampo(chave: keyof Hospital, valor: string) {
    setDados({ ...dados, [chave]: valor })
  }

  function atualizarSangue(tipo: keyof BloodStock, valor: string) {
    const num = Math.min(100, Math.max(0, Number(apenasNumeros(valor))))
    setDados({
      ...dados,
      bloodStock: { ...dados.bloodStock, [tipo]: num } as BloodStock,
    })
  }

  function isFormValid(): boolean {
    const required: (keyof Hospital)[] = [
      'name', 'cnpj', 'address', 'city', 'state',
      'cep', 'phone', 'email', 'website', 'openingHours', 'image',
    ]
    return required.every(f => dados[f]?.toString().trim())
  }

  const inputProps = (chave: keyof Hospital) => ({
    value: editando ? String(dados[chave] ?? '') : String(hospital?.[chave] ?? ''),
    disabled: !editando,
    onChangeText: (text: string) => atualizarCampo(chave, text),
  })

  if (!isCadastro && !hospital) return <Text>Carregando...</Text>

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.backButton}>
          <BackButton onPress={() => navigation.goBack()} />
        </View>

        <Text style={styles.sectionTitle}>Dados do Hospital</Text>

        <Input label="Nome" placeholder="Nome" {...inputProps('name')} />

        <View style={styles.row}>
          <View style={styles.half}>
            <Input label="CNPJ" placeholder="CNPJ" keyboardType="numeric" maxLength={18} value={formatCNPJ(editando ? (dados.cnpj || '') : (hospital?.cnpj || ''))} disabled={!editando} onChangeText={t => atualizarCampo('cnpj', apenasNumeros(t))} />
          </View>
          <View style={styles.half}>
            <Input label="CEP" placeholder="CEP" keyboardType="numeric" maxLength={9} value={formatCEP(editando ? (dados.cep || '') : (hospital?.cep || ''))} disabled={!editando} onChangeText={t => atualizarCampo('cep', apenasNumeros(t))} />
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
                <Text >Estado</Text>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => setShowUfModal(true)}
                >
                  <Text
                    style={
                      dados.state
                        ? styles.dropdownText
                        : styles.dropdownPlaceholder}
                  >
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
            <Input label="Telefone" placeholder="Telefone" keyboardType="phone-pad" maxLength={15} value={formatPhone(editando ? (dados.phone || '') : (hospital?.phone || ''))} disabled={!editando} onChangeText={t => atualizarCampo('phone', apenasNumeros(t))} />
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
          {TIPOS_SANGUE.map((tipo) => (
            <View key={tipo} style={styles.bloodInput}>

              <Text>
                {tipo}
              </Text>
              <View style={{position:'relative', height:40}}>
                <Input
                  placeholder={tipo}
                  keyboardType="numeric"
                  maxLength={3}
                  value={editando ? String(dados.bloodStock?.[tipo] ?? '') : String(hospital?.bloodStock?.[tipo] ?? '')}
                  disabled={!editando}
                  onChangeText={text => atualizarSangue(tipo, text)}

                />
                <Text style={styles.percent}>%</Text>
              </View>


            </View>
          ))}
        </View>
        <View style={styles.buttonRow}>
          {editando ? (
            <>
              <View style={{ flex: 1 }}>
                <Button texto={isCadastro ? 'Criar' : 'Salvar'} onPress={handleSalvar} bg={theme.colors.primary} color="#fff" disabled={!isFormValid()} />
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
