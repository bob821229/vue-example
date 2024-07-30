import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set, push
    , query
    , equalTo
    , orderByChild
} from 'firebase/app';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  //...
  databaseURL: "https://employeesystemproject-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);