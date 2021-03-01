import { Plugin } from '@nuxt/types'
import { initializeAxios } from '~/utils/api'

const accessor: Plugin = ({ $axios, $api }) => {
  initializeAxios($axios, $api)
}

export default accessor
