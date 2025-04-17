import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD1JkE9hBZ8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8",
  authDomain: "auth-firebase-projeto-au-4ab15.firebaseapp.com",
  projectId: "auth-firebase-projeto-au-4ab15",
  storageBucket: "auth-firebase-projeto-au-4ab15.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:1234567890123456789012"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage }; 