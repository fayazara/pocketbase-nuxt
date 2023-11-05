import PocketBase from 'pocketbase';
const pb = new PocketBase('https://backend.fayazahmed.com');


export const usePocketBaseClient = () => {
  return pb as PocketBase;
}
