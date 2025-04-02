import "./productCounter.scss"

function ProductCounter({stock, counter, setCounter}) {
    function totalAmount(op){
        if(op === "+"){
            if(counter < stock){
                setCounter( counter + 1)
            }
        }else{
            if(counter > 1){
                setCounter(counter - 1)
            }
        }
    }
    return(
        <div className="counter-container">
            <button className="button" onClick={()=>{totalAmount("-")}}>-</button>
            <p>{counter}</p>
            <button className="button" onClick={()=>{totalAmount("+")}}>+</button>
        </div>
    )
}

export default ProductCounter
