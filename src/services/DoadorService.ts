import { apiAuth } from './api/api'
import { User } from './auth'

//Usado para filtrar quantidade total dos doadores na pag ADM
export const listarDoadores = async () => {
  try{
    const response = await apiAuth.get('/user', { params: { tipo: 'doador' } })
    return response

  }catch(error){
    throw error
  }
}
