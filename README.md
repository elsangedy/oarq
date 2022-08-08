# oarq (open-api react-query)

## Usage

```bash
$ npx oarq -i <open-api or swagger spec, can be an url>.[json|yaml] -o <directory to save generated files>
```

```ts
import axios, { AxiosRequestConfig } from "axios";
import { createClient, createAdapter } from "./<directory-of-generated-files>";

const logAdapter = createAdapter(async ({ url, method, params, body }) => {
  console.log({ url, method, params, body });
});
const client = createClient(logAdapter);

const axiosAdapter = createAdapter<AxiosRequestConfig>(axios);
const clientAxios = createClient<AxiosRequestConfig>(axiosAdapter);
```
