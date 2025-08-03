const historyDispaly=document.getElementById("history");
const resultDisplay=document.getElementById("result");

let currentInput="";
let history="";

const buttons=document.querySelectorAll(".btn");

buttons.forEach(button => {
    button.addEventListener("click",()=>{
        const value=button.getAttribute("data-value");

        if(value==="C"){
            currentInput="";
            history="";

        }
        else if(value==="←"){
            currentInput=currentInput.slice(0,-1);
        }
        else if(value==='='){
            try{
                history=currentInput;
                currentInput=eval(currentInput.replace("×","*").replace("÷","/")).toString();

            }
            catch{
                currentInput="error";

            }
            
        }else{
                currentInput+=value;
            }
updateDisplay();
    });
    
});

function updateDisplay(){
    resultDisplay.textContent=currentInput||"0";
    historyDispaly.textContent=history;
}