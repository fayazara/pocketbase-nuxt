import PocketBase from 'pocketbase';
const pb = new PocketBase('https://fayaz.pockethost.io/');


export const usePocketBaseClient = () => {
  return pb as PocketBase;
}
