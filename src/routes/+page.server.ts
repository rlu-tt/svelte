import { THE_ONE_API_KEY } from '$env/static/private'

export async function load() {
  const url = 'https://the-one-api.dev/v2/character';
  const headers = {
    Authorization: `Bearer ${THE_ONE_API_KEY}`
  };
  const response = await fetch(url, { headers });
  const data = await response.json();
  return { data: data.docs };
}