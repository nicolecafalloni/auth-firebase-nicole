import { initializeApp, cert } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';

const serviceAccount = require('./serviceAccountKey.json');

const adminApp = initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'auth-firebase-projeto-au-4ab15.appspot.com'
});

export const adminStorage = getStorage(adminApp);
export default adminApp; 