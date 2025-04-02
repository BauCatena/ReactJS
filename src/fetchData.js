import {products} from "./products"


export const fetchData = () => new Promise((resolve,) => {
    setTimeout(() => {
        resolve(products);        
    },1500);
});
