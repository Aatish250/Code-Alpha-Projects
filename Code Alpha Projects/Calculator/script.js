allowedCharacters = ["+","-","*","/",".","%","="];

buttons = $("#buttons button");
display = $("#displays #display");
previous = $("#displays #previous");
expressions = [];
buttons.each((e) => {
    buttons[e].addEventListener("click",()=>{
        input = buttons[e].dataset.key;
        // console.log("CLICKED",buttons[e].dataset.key)
        if(input == "="){
            try{
                data = display.val().replace("%","/100")
                result = eval(data)
                expressions.push(display.val())
                if(expressions.length > 5) expressions.shift()
                previous.val(expressions.at(-1) || "No expression")
                display.val(result)
            } catch(e){
                console.log("Error",e)
                data = display.val()
                display.val("Error")
                setTimeout(()=>{display.val(data)},1000)
            }
        }else if(input == "CE")
            display.val("")
        else if(input == "DEL"){
            data = display.val().slice(0,-1)
            display.val(data)
        } else if(input == "PRE") {
            if(expressions.length > 0){
                display.val(expressions.pop())
                previous.val(expressions.at(-1) || "No expression")
                console.log(expressions.at(-1))
            }
        } else if(input == "+/-") {
            (display.val().at(0) == "-") ?
            display.val(display.val().slice(1)) :
            display.val("-" + display.val())
        } else {
            // to block operation repetation and replace recent oprator
            checkDoubleOperators(display, buttons[e].dataset.key)
            data = display.val() + buttons[e].dataset.key;
            display.val(data)
        }
    })
})

function checkDoubleOperators(display, input) {
    // checks for each character of input and last character of display are both operators by comparison with the allowed characters array
    if(allowedCharacters.includes(display.val().at(-1)) && allowedCharacters.includes(input) && display.val().at(-1) != "%") 
        display.val(display.val().slice(0,-1)) // remove last operator from display
    // if % is applied to the last character from the input then remove it from display
    if(display.val().at(-1) == "%" && input == "%") 
        display.val(display.val().slice(0,-1))
    // console.log(display.val().at(-1), input)
}