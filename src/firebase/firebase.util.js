import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyBtKoX3Sx_GPA_X3PCUavXoZasKNRrfmD8",
    authDomain: "crwn-db-e66f1.firebaseapp.com",
    databaseURL: "https://crwn-db-e66f1.firebaseio.com",
    projectId: "crwn-db-e66f1",
    storageBucket: "crwn-db-e66f1.appspot.com",
    messagingSenderId: "492066227811",
    appId: "1:492066227811:web:6689059146634d6e50da56",
    measurementId: "G-3EPX0K80VM"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    
    if (!userAuth) return;


    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if (!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });

        } catch (error){
            console.log('error creating user', error.message);
        }
        
    }

   // console.log(snapShot);
    return userRef;


}


export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollections = collections.docs.map(doc => {
        const {title, items} = doc.data();
        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title: title,
            items: items
        }
    })

    return transformedCollections.reduce((acc, collectionObj) => {
        acc[collectionObj.title.toLowerCase()] = collectionObj;
        return acc;
    },{});
}

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject);
    });
};


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();


export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);


    const batch = firestore.batch();
    objectsToAdd.forEach(object => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, object);
    });
    return await batch.commit();

}

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
