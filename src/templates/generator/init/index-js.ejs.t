---
to: <%= outputpath %>/index.js
---
import axios from 'axios'
import { useMutation, useQuery } from 'react-query'

export const instance = axios.create({
  timeout: 1000
})

export const replacePathParams = (url, pathParams) =>
  Object.entries(pathParams).reduce(
    (acc, [key, value]) => acc.replace(`{${key}}`, value),
    url
  )

