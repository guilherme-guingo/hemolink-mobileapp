import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { Input } from '../../../components/Input'
import {
  Hospital, BloodStock,
  buscarHospital, atualizarHospital, excluirHospital, cadastrarHospital
} from '../../../services/HospitalService'

const TIPOS_SANGUE: (keyof BloodStock)[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

const BLOOD_VAZIO: BloodStock = { 'A+': 0, 'A-': 0, 'B+': 0, 'B-': 0, 'AB+': 0, 'AB-': 0, 'O+': 0, 'O-': 0 }

const CAMPOS: { chave: keyof Hospital; placeholder: string }[] = [
  { chave: 'image', placeholder: 'URL da imagem' },
  { chave: 'name', placeholder: 'Nome' },
  { chave: 'cnpj', placeholder: 'CNPJ' },
  { chave: 'address', placeholder: 'Endereço' },
  { chave: 'city', placeholder: 'Cidade' },
  { chave: 'state', placeholder: 'Estado' },
  { chave: 'cep', placeholder: 'CEP' },
  { chave: 'phone', placeholder: 'Telefone' },
  { chave: 'email', placeholder: 'Email' },
  { chave: 'website', placeholder: 'Website' },
  { chave: 'openingHours', placeholder: 'Horário de funcionamento' },
]

export const DetalheHospital = ({ route, navigation }: any) => {
  const id = route.params?.id
  const isCadastro = !id

  const [hospital, setHospital] = useState<Hospital | null>(null)
  const [editando, setEditando] = useState(isCadastro)
  const [dados, setDados] = useState<Partial<Hospital>>({})

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

  if (!isCadastro && !hospital) return <Text>Carregando...</Text>

  return (
    <ScrollView>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Voltar</Text>
      </TouchableOpacity>

      {CAMPOS.map(campo => (
        <Input
          key={campo.chave}
          placeholder={campo.placeholder}
          value={editando ? dados[campo.chave] || '' : hospital?.[campo.chave] || ''}
          disabled={!editando}
          onChangeText={text => atualizarCampo(campo.chave, text)}
        />
      ))}

      {TIPOS_SANGUE.map(tipo => (
        <Input
          key={tipo}
          placeholder={`Estoque ${tipo}`}
          value={editando ? String(dados.bloodStock?.[tipo] ?? '') : String(hospital?.bloodStock?.[tipo] ?? '')}
          disabled={!editando}
          onChangeText={text => atualizarSangue(tipo, text)}
        />
      ))}

      {editando ? (
        <TouchableOpacity onPress={handleSalvar}>
          <Text>{isCadastro ? 'Criar' : 'Salvar'}</Text>
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity onPress={() => setEditando(true)}>
            <Text>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleExcluir} style={{marginBottom:40}}>
            <Text>Excluir</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  )
}
