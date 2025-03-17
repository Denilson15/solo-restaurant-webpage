import {menuArray} from "/data.js"

const orderedItems = document.getElementById("ordered-items");
const orderComplete = document.getElementById("complete-order");
const orderSection = document.getElementById("order-section");
const modal = document.getElementById("modal");

document.addEventListener("click", function(e){
    if(e.target.dataset.item){
        handleAddToOrderBtn(e.target.dataset.item);
    }
    else if(e.target.dataset.id){
        handleRemoveBtn(e.target.dataset.id);
    }
    else if(e.target.classList.contains("submit-order")){
        handleSubmitOrderBtn();
    }
})

document.addEventListener("submit", function(e){
    if(e.target.tagName === "FORM"){
        e.preventDefault();
        handleSubmitPayment();
    }
})
    


let orderArr = [];

function renderHtml(){
    let orderHtml = "";
    let completeOrder = "";
    if(orderArr.length > 0){
         const totalPrice = orderArr.reduce(function(total, currentItem){
                return total + currentItem.price;
            }, 0)
        orderArr.forEach(function(itemOrdered){
            orderHtml += `
                <div class="order">
                    <div class="inner-order">
                        <p class="item-ordered">${itemOrdered.name}</p>
                        <button class="remove-btn" data-id="${itemOrdered.id}">remove</button>
                    </div>
                    <div>
                        <p class="price-for-item-ordered">$${itemOrdered.price}</p>
                    </div>
                </div>
                `
        })
           
        orderedItems.innerHTML = orderHtml;
        completeOrder += 
         `<div class="complete-order">
                <div class="inner-complete-order">
                    <p class="item-ordered">Total Price: </p>
                    <p>$${totalPrice}</p>
                </div>
                <button class="submit-order">Complete Order</button>
            </div>`
        orderComplete.innerHTML = completeOrder;
        
    }
    const foodItemsHtmlArr = menuArray.map((food)=>{
        return `
            <div class="food-container">
                <div class="food-options">
                    <div><p class="food-emoji">${food.emoji}</p></div>
                    <div class="food-item">
                        <p class="name">${food.name}</p>
                        <p class="ingredients">${food.ingredients.join(", ")}</p>
                        <p class="price">$${food.price}</p>
                    </div>
                </div>
                <button class="addBtn" data-item="${food.id}">+</button>
            </div>
        `
    }).join("");
    return foodItemsHtmlArr;
    
}


document.getElementById("food").innerHTML = renderHtml();


function handleAddToOrderBtn(itemId){
    const orderItemObj = menuArray.filter(function(order){
        return order.id == itemId;
            
    })[0];
    
    orderArr.push(orderItemObj);  
    orderSection.classList.remove("hidden");
    renderHtml();
}

function handleRemoveBtn(itemId){
    const orderItemObj = menuArray.filter(function(order){
        return order.id == itemId;     
    })[0];
    orderArr.pop(orderItemObj);
    if(orderArr.length === 0){
        orderSection.classList.add("hidden");
    }
    renderHtml();
}

function handleSubmitOrderBtn(){
    modal.classList.toggle("hidden");
}

function handleSubmitPayment(){
    const customerName = document.querySelector("input[name='name']").value;
    orderSection.innerHTML = `
        <p class="order-submitted-message">Thanks, ${customerName}! Your order is on its way!</p>`
    renderHtml();
    modal.classList.toggle("hidden");
}