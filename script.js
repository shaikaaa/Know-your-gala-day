import { country_List } from "./countryList.js";        //tyo list of countries from another js file import garnalai
let code;


//where you at ra location ko icon to pop up after 0.9s
let country_selection = document.querySelector(".country_Selection");
function popup(){
    setTimeout(()=>{
        country_selection.classList.add("allow");

    },900);
}
popup();



//location icon thichepachi country select garne show garna lai
let country_dropdown = document.querySelector(".country_dropdown");
let where_u_at = document.querySelector(".where_you_at");
let choose_date = document.querySelector(".choose_date");
let globe = document.querySelector(".globe");
globe.addEventListener("click",()=>{
    country_dropdown.classList.add("show");
    where_u_at.classList.add("hide");
    globe.classList.add("hide");
})




//country select garepachi date select garne show garnalai
let countries = document.querySelector(".countries");
countries.addEventListener("change",()=>{
    choose_date.classList.add("show");    
})



//location icon float garauna
function floating(){
    let position= 0;
    let speed =0.8;
    let direction =1;
    setInterval(() => {
        position += direction*speed;
    if(position >4 || position<-4)
    {
        direction *= -1;
    }
    globe.style.transform =`translateY(${position}px)`;
        
    }, 50);
}
floating();




//info icon , eamil ra me icon ma hover garda text dekhauna
let info_img = document.querySelector(".info_img p");
let info = document.querySelectorAll(".info");
info[0].addEventListener("mouseenter",()=>{
    info_img.classList.add("show");

})
info[0].addEventListener("mouseleave",()=>{
    info_img.classList.remove("show");

})
let email_img = document.querySelector(".email_img p");
let email = document.querySelector(".email");
email.addEventListener("mouseenter",()=>{
    email_img.classList.add("show");

})
email.addEventListener("mouseleave",()=>{
    email_img.classList.remove("show");

})
let me_img = document.querySelector(".me_img p");
let me = document.querySelector(".me");
me.addEventListener("mouseenter",()=>{
    me_img.classList.add("show");

})
me.addEventListener("mouseleave",()=>{
    me_img.classList.remove("show");

})





//for countries list in dropdowns
let dropdowns = document.querySelectorAll(".country_dropdown select");
for(let select of dropdowns){                         //euta variable select is made for the dropdowns
    for(const countries in country_List){             //country_list jun import garya cha tesbata euta euta countries leko
       let options = document.createElement("option");  //select ma options huncha ni tei create gareko for each countries
       options.innerText=countries;                      //tyo options ko text ra value set gareko
       options.value=countries;
       select.append(options);                         //ani bhako create ma yo sab options append gareko
    }
    select.addEventListener("change",(evt)=>{          //everytime you change the country, tyo change lai euta event (Evt) ma store gara ani pass it to update flag
        updateFlag(evt.target);
    })

}




//country flag update garna aacording to the changed country
function updateFlag(element){
    let abc = element.value;  //abc will have bharkhar change gareko country ko naam
    code = country_List[abc];    //this is country ko code
    let newimg = `https://www.worldometers.info/img/flags/${code.toLowerCase()}-flag.gif`; //change bhaepachi aaunu parne link lai country code anusar le change gareko
    let newimgsrc = element.parentElement.querySelector("img"); //aba tyo country dropdown ma bhako img src lai select gareko
    newimgsrc.src=newimg; //ani tyo purano img source lai change garera naya src haleko
    
}




//date choose garne part
let year;
let month;
let day;
let date = document.querySelector(".choose_date input");  
date.addEventListener("change",()=>{                      //date change huda
    let dateValue = date.value;                          // tyo change bhako date ko value dateValue ma store gar
    [year,month,day]=dateValue.split("-");               //year, moth ra day wala variable haru ma save gar by splitting the dateValue everytime '-' comes
})




let base_url="https://holidays.abstractapi.com/v1/?api_key=ea405c1d5110478887df910c36010726&country=";
// US&year=2025&month=12&day=25
let outputdiv = document.querySelector(".outputdiv");
let button = document.querySelector(".choose_date button");
button.addEventListener("click",async(evt)=>{                                 //api bata data fetch garna lai time lagcha so async func banako
    let newUrl = `${base_url}${code}&year=${year}&month=${month}&day=${day}`; //base url ma country ko code {code} ani agi save gareko year,month ra day lai pass gareko ani tyo extra bich ko text haru chai tyo link ko plain text rakheko ho
    let response = await fetch(newUrl);                                      //naya url bata aako response fetch garne
    let data =await response.json();                                         //tyo response lai  json format ma change garne
    choose_date.classList.remove("show");
    country_dropdown.classList.remove("show");
    outputdiv.classList.add("show");

    if(data.length ===0 ){                                                  //json format ma fetch garda array ko format ma aaucha so if array = null then
        outputdiv.innerText =`NO HOLIDAYS SORRY!`;

    }
    else{                                                                  //if array != null
    let output = data[0].name;                                             //tyo array ma first pos ma name cha tei variable tanne ani output bhanne var ma save gardine
    outputdiv.innerText =`It's ${output} and a holiday`;
    

    }    
})

