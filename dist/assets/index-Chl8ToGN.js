(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const a=[{name:"Pizza",ingredients:["pepperoni","mushrom","mozarella"],id:0,price:14,emoji:"🍕"},{name:"Hamburger",ingredients:["beef","cheese","lettuce"],price:12,emoji:"🍔",id:1},{name:"Beer",ingredients:["grain, hops, yeast, water"],price:12,emoji:"🍺",id:2}],u=document.getElementById("ordered-items"),p=document.getElementById("complete-order"),l=document.getElementById("order-section"),m=document.getElementById("modal");document.addEventListener("click",function(t){t.target.dataset.item?f(t.target.dataset.item):t.target.dataset.id?g(t.target.dataset.id):t.target.classList.contains("submit-order")&&v()});document.addEventListener("submit",function(t){t.target.tagName==="FORM"&&(t.preventDefault(),h())});let s=[];function d(){let t="",n="";if(s.length>0){const i=s.reduce(function(e,r){return e+r.price},0);s.forEach(function(e){t+=`
                <div class="order">
                    <div class="inner-order">
                        <p class="item-ordered">${e.name}</p>
                        <button class="remove-btn" data-id="${e.id}">remove</button>
                    </div>
                    <div>
                        <p class="price-for-item-ordered">$${e.price}</p>
                    </div>
                </div>
                `}),u.innerHTML=t,n+=`<div class="complete-order">
                <div class="inner-complete-order">
                    <p class="item-ordered">Total Price: </p>
                    <p>$${i}</p>
                </div>
                <button class="submit-order">Complete Order</button>
            </div>`,p.innerHTML=n}return a.map(i=>`
            <div class="food-container">
                <div class="food-options">
                    <div><p class="food-emoji">${i.emoji}</p></div>
                    <div class="food-item">
                        <p class="name">${i.name}</p>
                        <p class="ingredients">${i.ingredients.join(", ")}</p>
                        <p class="price">$${i.price}</p>
                    </div>
                </div>
                <button class="addBtn" data-item="${i.id}">+</button>
            </div>
        `).join("")}document.getElementById("food").innerHTML=d();function f(t){const n=a.filter(function(o){return o.id==t})[0];s.push(n),l.classList.remove("hidden"),d()}function g(t){const n=a.filter(function(o){return o.id==t})[0];s.pop(n),s.length===0&&l.classList.add("hidden"),d()}function v(){m.classList.toggle("hidden")}function h(){const t=document.querySelector("input[name='name']").value;l.innerHTML=`
        <p class="order-submitted-message">Thanks, ${t}! Your order is on its way!</p>`,d(),m.classList.toggle("hidden")}
