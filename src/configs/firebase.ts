import { initializeApp, type FirebaseOptions } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig:FirebaseOptions = {

    apiKey: import.meta.env.VITE_API_KEY,
    authDomain:  import.meta.env.VITE_AUTH_DOMAIN,
    storageBucket:  import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId:import.meta.env.VITE_MESSSAGING_SENDER_ID,
    appId: import.meta.env.VITE.APP_ID 

};

// intialiser le service d'authentification
const app = initializeApp(firebaseConfig);
// intialiser firebase authenfication et récupérer le service
const auth = getAuth(app)

export { auth } ;  