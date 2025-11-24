// api-firebase.js (Firebase v9+ modular using CDN imports)

// Import the functions you need from the SDKs you use (from CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  getDocs,
  query
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4Uv0ngzbDDClXZ3SzZzkbL6xPoS3rQ4g",
  authDomain: "rv-coaching-system.firebaseapp.com",
  projectId: "rv-coaching-system",
  storageBucket: "rv-coaching-system.firebasestorage.app",
  messagingSenderId: "65883754066",
  appId: "1:65883754066:web:1ca8e6059581fb2c19198b",
  measurementId: "G-ZE6FV5E0Y2"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Get service instances
const auth = getAuth(app);
const db = getFirestore(app);

// -------------------------
// AUTH HELPERS
// -------------------------
export async function signupCreateUser(email, password, name, role = "agent") {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  const uid = cred.user.uid;

  // Save extra info to Firestore
  await setDoc(doc(db, "users", uid), {
    email,
    name,
    role,
    createdAt: new Date()
  });

  return { uid, email, name, role };
}

export async function loginUser(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  const uid = cred.user.uid;

  const userSnap = await getDoc(doc(db, "users", uid));
  if (!userSnap.exists()) throw new Error("Profile not found");

  return { uid, ...userSnap.data() };
}

export async function logoutUser() {
  await signOut(auth);
}

// -------------------------
// EVALUATIONS
// -------------------------
export async function addEvaluation(payload) {
  const collectionRef = collection(db, "evaluations");
  const docRef = await addDoc(collectionRef, {
    ...payload,
    createdAt: new Date()
  });
  return docRef.id;
}

export async function listEvaluations() {
  const collectionRef = collection(db, "evaluations");
  const q = query(collectionRef);
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// -------------------------
// COACHING
// -------------------------
export async function addCoaching(payload) {
  const collectionRef = collection(db, "coaching");
  const docRef = await addDoc(collectionRef, {
    ...payload,
    createdAt: new Date()
  });
  return docRef.id;
}

export async function listCoaching() {
  const collectionRef = collection(db, "coaching");
  const q = query(collectionRef);
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function acknowledgeCoaching(id, ackText) {
  const docRef = doc(db, "coaching", id);
  await updateDoc(docRef, {
    ackText,
    ackDate: new Date()
  });
}

// -------------------------
// ADMIN
// -------------------------
export async function adminListAll() {
  const usersSnap = await getDocs(collection(db, "users"));
  const membersSnap = await getDocs(collection(db, "members"));
  const critSnap = await getDocs(collection(db, "criteria"));

  return {
    users: usersSnap.docs.map((d) => ({ id: d.id, ...d.data() })),
    members: membersSnap.docs.map((d) => ({ id: d.id, ...d.data() })),
    criteria: critSnap.docs.map((d) => ({ id: d.id, ...d.data() }))
  };
}

// Optional: export auth/db if you need them
export { auth, db };
