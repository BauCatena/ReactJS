import {products} from "./products.js"


export const fetchData = () => new Promise((resolve,) => {
    setTimeout(() => {
        resolve(products);        
    },1500);
});
