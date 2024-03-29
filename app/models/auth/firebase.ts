import dotenv from 'dotenv'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

dotenv.config()

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FB_APIKEY,
  authDomain: process.env.FB_AUTHDOMAIN,
  projectId: process.env.FB_PROJECTID,
  storageBucket: process.env.FB_STORAGE,
  messagingSenderId: process.env.FB_MESSAGE,
  appId: process.env.FB_APPID,
  measurementId: process.env.FB_MEASURE,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

export { auth }

