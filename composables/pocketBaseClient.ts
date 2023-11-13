import PocketBase from 'pocketbase';
const pb = new PocketBase('https://fragrant-violet-2948.fly.dev');


export const usePocketBaseClient = () => {
  return pb as PocketBase;
}
