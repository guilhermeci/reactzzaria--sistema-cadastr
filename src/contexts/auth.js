import React, {
  createContext,
  useEffect,
  useCallback,
  useState
} from 'react'
import firebase, { db } from 'services/firebase'
import t from 'prop-types'
const AuthContext = createContext()

function AuthProvider ({ children }) {
  const [userInfo, setUserInfo] = useState({
    isUserLoggedIn: false,
    user: null
  })
  useEffect(() => {
    const uid = userInfo.user?.uid || 'EMPTY'
    db.collection('users').doc(uid).get()
      .then(doc => {
        if (doc.exists || uid === 'EMPTY') {
          return
        }
        db.collection('users').doc(uid).set({
          email: userInfo.user.email,
          name: userInfo.user.displayName,
          role: 'user'
        })
      })
  }, [userInfo])
  const login = useCallback(() => {
    const provider = new firebase.auth.GithubAuthProvider()
    firebase.auth().signInWithRedirect(provider)
  }, [])

  const logout = useCallback(() => {
    firebase.auth().signOut().then(() => {
      setUserInfo({
        isUserLoggedIn: false,
        user: null
      })
    })
  }, [])

  return (
    <AuthContext.Provider value={{
      login,
      logout,
      userInfo,
      setUserInfo
    }}
    >
      {children}
    </AuthContext.Provider>
  )
}
AuthProvider.propTypes = {
  children: t.node.isRequired
}
export { AuthContext, AuthProvider }
