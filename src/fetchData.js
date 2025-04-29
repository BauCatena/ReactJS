import { collection, getDocs } from "firebase/firestore";
import { db } from "./fireBaseConfig";


export const fetchData = async ()=>{

            let cachedData = null;
            const localData = localStorage.getItem("firedataBase")
            
            if (cachedData) {
                return cachedData;

              } else if(localData){

            cachedData = JSON.parse(localData);
            return cachedData;

            } else{

                try {
                    const querySnapshot = await getDocs(collection(db, "productos"))

                    const docsData = querySnapshot.docs.map(el =>({ 
                        id: el.id,
                        ...el.data()
                    }))

                    localStorage.setItem("firedataBase", JSON.stringify(docsData))
                    console.log("datos consultados a firebase", JSON.stringify(docsData))
                    return docsData;
                }catch(err){console.error(err); return(null)}
                }
            }
           