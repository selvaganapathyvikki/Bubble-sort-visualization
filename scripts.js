let array = Array();

let x = 0;

let anyfunction = false;

let textarea = document.getElementById('arrele');

textarea.addEventListener('keydown', (e) => {
    if(anyfunction) {
        e.preventDefault();
    }
    else if(e.key === "Enter" && !anyfunction) {
        e.preventDefault();
        add_element_to_Array();
    }
});

function add_element_to_Array() {
  autofocusit();

  if (x >= 20) {
    alert("max elements reached");
    autofocusit();
  } 
  
  else {
    
    
    if (document.getElementById("arrele").value != "") {

      let n = document.getElementById("arrele").value;

      if(!isNaN(n)){

        if(n < 100){
            
            array[x] = n;
            x++;
            document.getElementById("arrele").value = "";
            displayElement(array[x - 1]);
        }
        else {
            alert("Please enter integers below 100");
            document.getElementById("arrele").value = "";
            autofocusit();
        }
      }
      
      else {
          alert("please enter an integer");
          document.getElementById("arrele").value = "";
          autofocusit();
      }
    }
  }
}

function displayElement(s) {

  var z = document.createElement("input");
  z.className = "addedele";
  z.setAttribute("type", "text");
  z.setAttribute("value", s);
  z.readOnly = true;
  displayhere.appendChild(z);
  autofocusit();

}

var container = document.getElementById("array");

function generatearrayelements() {
    generateaddedelements(array);
  
}

function generateautoarray() {
    anyfunction = true;

    for (var i = 0; i < 15; i++) {

        var value = Math.ceil(Math.random() * 100);

        var ele = document.createElement("div");
        ele.classList.add("block");
        ele.style.height = `${value * 3}px`;
        ele.style.transform = `translate(${i * 30}px)`;

        var ele_label = document.createElement("label");
        ele_label.classList.add("block_id");
        ele_label.innerText = value;

        ele.appendChild(ele_label);
        container.appendChild(ele);
    }
  
    document.getElementById("sortaddedele").disabled = true;
    document.getElementById("sortautoele").disabled = true;
    document.getElementById("add_btn").disabled = true;
    
    scroll();
    bubbleSort();

}

function generateaddedelements(array) {

    if(array.length < 1) {
        alert("Please add elements or click auto generating button");
        autofocusit();
    }
  
    else {
        anyfunction = true;
        for (var i = 0; i < array.length; i++) {

            var value = array[i];
    
            var ele = document.createElement("div");
            ele.classList.add("block");
            ele.style.height = `${value * 3}px`;
            ele.style.transform = `translate(${i * 30}px)`;
    
            var ele_label = document.createElement("label");
            ele_label.classList.add("block_id");
            ele_label.innerText = value;
            ele.appendChild(ele_label);
            container.appendChild(ele);
          
        }
        document.getElementById("sortaddedele").disabled = true;
        document.getElementById("sortautoele").disabled = true;
        document.getElementById("add_btn").disabled = true;

        scroll();
        bubbleSort();
    }
    
}

async function bubbleSort(delay = 200) {
  
    var blocks = document.querySelectorAll(".block");
  
    for (var i = 0; i < blocks.length; i += 1) {
        for (var j = 0; j < blocks.length - i - 1; j += 1) {
  
            blocks[j].style.backgroundColor = "#FF4949";
            blocks[j + 1].style.backgroundColor = "#FF4949";

            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );
  
            var element1 = Number(blocks[j].childNodes[0].innerHTML);
            var element2 = Number(blocks[j + 1].childNodes[0].innerHTML);

            if (element1 > element2) {
                await swapElemets(blocks[j], blocks[j + 1]);
                blocks = document.querySelectorAll(".block");
            }

            blocks[j].style.backgroundColor = "#ee18e3";
            blocks[j + 1].style.backgroundColor = "#ee18e3";
        }
      
        blocks[blocks.length - i - 1].style.backgroundColor = "#13CE66";
    }
}
  


function reset() {
    while(array.length > 0) {
        array.pop();
    }
    
    document.getElementById('displayhere').innerHTML = '';
    document.getElementById('array').innerHTML = '';
    document.getElementById("sortaddedele").disabled = false;
    document.getElementById("sortautoele").disabled = false;
    document.getElementById("add_btn").disabled = false;
    document.getElementById("arrele").value = "";

    anyfunction = false;
    x = 0;
    autofocusit();
}
  
function swapElemets(element1, element2) {
    return new Promise((resolve) => {

        var temp_element = element1.style.transform;
        element1.style.transform = element2.style.transform;
        element2.style.transform = temp_element;
  
        window.requestAnimationFrame(function() {
  
            setTimeout(() => {
                
                container.insertBefore(element2, element1);
                
                resolve();
            }, 300);
        });
    });
}


function autofocusit() {
    document.getElementById("arrele").focus();
}

function scroll() {
    window.scrollBy(0, 300);
}
