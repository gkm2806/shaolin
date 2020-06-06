import usuariosModel from "../models/users"
import URIS from "../lib/URIS"
import https from 'https'
import axios from "axios"
import { Container } from 'typedi';

const agent = new https.Agent({
  rejectUnauthorized: false
})

export default class SuapService {
  URISInstance = Container.get(URIS)

  GetToken = async (username, password) => {
    const user_token = await axios.post(
      this.URISInstance.SUAP_TOKEN,
      {
        username: username,
        password: password,
      },
      {
        httpsAgent: agent
      }
    )

    return user_token
  }

  GetUserData = async (token) => {
    const user_data = await axios.get(
      this.URISInstance.SUAP_USER_DATA,
      {
        headers: { 'Authorization': `JWT ${token}` },
        httpsAgent: agent
      }
    )
    return user_data
  }
}