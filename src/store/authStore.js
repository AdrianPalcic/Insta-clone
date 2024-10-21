import {create} from "zustand";
{/* Zustand umjesto Reduxa jer je jednostavniji, storamo u state iz local storagea kada je osoba ulogirana */}
const useAuthStore = create((set) => ({
    user: JSON.parse(localStorage.getItem("user-info")),
    login: (user) => {console.log("Updating Zustand store with user:", user); set({user})},
    
    logout: () => set({user:null}),
    setUser: (user) => set({user})
}))

export default useAuthStore;