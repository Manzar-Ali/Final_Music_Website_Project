var hush,framePrice=39.99,counter=1,totalPrice=framePrice*counter,phyFrame=7.99
var cal=framePrice+phyFrame
var albumName,imgUrl


var expireTime

window.onload = function () {
    
    getTokken();
    document.getElementById("count").value=counter
}


function addFrame()
{
   if(document.getElementById("frameCost").checked){
    totalPrice=totalPrice+(phyFrame*counter)
    document.getElementById("cost").innerHTML=""
    document.getElementById("cost").innerHTML=`€ ${totalPrice.toFixed(2)}`
   }else{
    totalPrice=totalPrice-(phyFrame*counter)
    document.getElementById("cost").innerHTML=""
    document.getElementById("cost").innerHTML=`€ ${totalPrice.toFixed(2)}`
   }
    
    
}

function sizeChange(id){
    console.log()
    if(id=="large"){
        framePrice=39.99
        totalPrice=framePrice*counter
        phyFrame=7.99
        if(document.getElementById("frameCost").checked){
            
            totalPrice=totalPrice+(phyFrame*counter)
        }
        document.getElementById("frame").innerHTML=""
        document.getElementById("frame").innerHTML=`Add frame (+ ${phyFrame} €)`
        document.getElementById("cost").innerHTML=""
        document.getElementById("cost").innerHTML=`€ ${totalPrice.toFixed(2)}`
    }
    if(id=="medium"){

        framePrice=29.99
        totalPrice=framePrice*counter
        phyFrame=5.99
        if(document.getElementById("frameCost").checked){
            totalPrice=totalPrice+(phyFrame*counter)
        }
        document.getElementById("frame").innerHTML=""
        document.getElementById("frame").innerHTML=`Add frame (+ ${phyFrame} €)`
        document.getElementById("cost").innerHTML=""
        document.getElementById("cost").innerHTML=`€ ${totalPrice.toFixed(2)}`
    }
    if(id=="small"){
        framePrice=17.99
        totalPrice=framePrice*counter
        phyFrame=4.99
        if(document.getElementById("frameCost").checked){
            totalPrice=totalPrice+(phyFrame*counter)
        }
        document.getElementById("frame").innerHTML=""
        document.getElementById("frame").innerHTML=`Add frame (+ ${phyFrame} €)`
        document.getElementById("cost").innerHTML=""
        document.getElementById("cost").innerHTML=`€ ${totalPrice.toFixed(2)}`
    }
}

function increment(){
    counter++;
    
    if(document.getElementById("frameCost").checked){
        cal=framePrice+phyFrame
        totalPrice=cal*counter
    }else{
    totalPrice=(framePrice*counter)}
    document.getElementById("count").value=counter
    document.getElementById("cost").innerHTML=""
    document.getElementById("cost").innerHTML=`€ ${totalPrice.toFixed(2)}`
}

function decrement(){    
  
       if (counter>1){ counter--
        if(document.getElementById("frameCost").checked){
            cal=framePrice+phyFrame
            console.log(framePrice)
            totalPrice=cal*counter
        }
        else{
        totalPrice=(framePrice*counter)}
    document.getElementById("count").value=counter
    document.getElementById("cost").innerHTML=""
    document.getElementById("cost").innerHTML=`€ ${totalPrice.toFixed(2)}`}
}


$("#search").keyup(() => {

    let query = $("#search").val();
    query != (null || '') ? document.getElementById("results").classList.add("display"):document.getElementById("results").classList.remove("display")
    
hush=getSearch(query);


});


const getTokken = async () => {
    const clientId = '35068d361d7f49389cfebbbbdcd5fb76';
    const clientSecret = '44066fa4ff584911b057a6564e6130be';

    let token = localStorage.getItem('myToken');


    if (token == undefined || null) {
        
        const result = await fetch('https://accounts.spotify.com/api/token', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });

       const data = await result.json();
        localStorage.setItem('myToken', data.access_token);
        
        expiryTime= new Date().getTime()+3600000;
        localStorage.setItem('expireTime', expiryTime);
        return data.access_token;
    }

    return token;
}

const getSearch = async (query) => {

    var currentTime= new Date().getTime();
    var remainTime= new Date(localStorage.getItem('expireTime')-currentTime)

    if(remainTime.getMinutes<=0){
        localStorage.removeItem('myToken');
        getTokken
    }

    let token = localStorage.getItem('myToken');

    try {
        const result = await fetch(
            `https://api.spotify.com/v1/search?q=${query}&type=track&market=US&limit=10&offset=5`,
            {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + token
                },
            }
        );

         const data = await result.json();
        
    
        let el=document.getElementById("results")
        el.innerHTML=""
        for(i=0;i<10;i++){
           el.innerHTML +=`<div class="resultWrapper" id=${i} onclick="select(this.id)" >
           <img src=${data.tracks.items[i].album.images[0].url} alt="" width="70" height="70"/>
           <div class="info">
             <h4>${data.tracks.items[i].name}</h4>
             <p>${data.tracks.items[i].artists[0].name}</p>
           </div>
         </div>    `
           
    
            
            
        } 
        return data.tracks.items
    } catch (err) {
        
        console.log(err.response, "this is response");
    }
};


function select(id)
 {
     selectedData(id,hush)
 } 
const selectedData=async (id,data)=> {
const selData=await data
    document.getElementById("title").value=selData[id].name
    document.getElementById("artist").value=selData[id].artists[0].name
    document.getElementById("song-detail").innerHTML=""
    document.getElementById("song-detail").innerHTML=`
            <img src="./transparent.png" class="heartClip hidden" id="heartFrame" alt="heavy">
           <img src=${selData[id].album.images[0].url} alt="Frame" width="371" height="371" id="heroImage">
           <img src=https://scannables.scdn.co/uri/plain/png/cfcbc8/black/320/${selData[id].uri} alt="spotifyQr" width="204" height="51">
           <div class="frameTitle">
               <div class="titleInfo">
                   <label id="frameSongTitle">${selData[id].name}</label>
               <label id="frameArtistTitle">${selData[id].artists[0].name}</label>
               </div>
               <img src="./img4.png" alt="" width="17" height="17">
           </div>
           <img src="./img3.png" alt="controlers" width="371" height="107">

    
    `
    albumName=selData[id].name
    imgUrl=selData[id].album.images[0].url
}

  function frameChange(id){

    id=="heart" ? document.getElementById("heartFrame").classList.remove("hidden"):document.getElementById("heartFrame").classList.add("hidden")
      
  }     

  //Add item to cart Function
  function closeDrawer(){
    
      document.getElementById("sideDrawer").classList.add("hidden")
  }


  if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imgUrl}" width="100" height="100">
            <span class="cart-item-title">${albumName}</span>
        </div>
        <span class="cart-price cart-column">${totalPrice}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
    updateCartTotal()
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}
function addToCart(){
    addItemToCart(albumName, totalPrice, imgUrl)
}

function addItem(){
    
    document.getElementById("sideDrawer").classList.remove("hidden")

}