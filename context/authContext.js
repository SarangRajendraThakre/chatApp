import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebaseConfig";

// Create the Auth Context
export const AuthContext = createContext();

// Auth Context Provider
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User data
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Auth state

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      console.log("got user: ",user);
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
        updateUserData(user.uid)

      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return unsub; // Cleanup listener on unmount
  }, []);

  const updateUserData = async (userId) => {
    try {
      const docRef = doc(db, "users", userId); // Reference to the user document
      const docSnap = await getDoc(docRef); // Fetch the document snapshot
  
      if (docSnap.exists()) { // Check if the document exists
        const data = docSnap.data(); // Get the document data
        setUser((prevUser) => ({
          ...prevUser,
          username: data.username,
          profileUrl: data.profileUrl,
          userId: data.userId,
        }));
      } else {
        console.error("No such user document!");
      }
    } catch (error) {
      console.error("Error fetching user data: ", error.message);
    }
  };
  
 

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, data: response.user };
     
    } catch (error) {
      let msg = error.message;
      if(msg.includes("(auth/invalid-email)"))  msg="Invalid email"
      if(msg.includes("(auth/invalid-credential)")) msg="Wrong credentials"
      if (msg.includes("(auth/wrong-password)")) msg = "Incorrect password";
      if (msg.includes("(auth/user-not-found)")) msg = "User not found";
      return { success: false, msg };
    }
  };

  const logout = async () => {
    try {
      await  signOut(auth);
      
      return { success: true };
    } catch (error) {
      return { success: false, msg: error.message };
    }
  };

  const register = async (email, password, username, profileUrl) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", response?.user?.uid), {
        username,
        profileUrl,
        userId: response?.user?.uid,
      });
      return { success: true, data: response?.user };
    } catch (error) {
      let msg = error.message;
      if (msg.includes("(auth/invalid-email)")) msg = "Invalid email"; 

      if(msg.includes('(auth/email-already-in-use)')) msg = 'This email is already in use'
      return { success: false, msg };
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};

