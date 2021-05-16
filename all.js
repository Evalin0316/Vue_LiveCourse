let productData=[];

const productTitle = document.getElementById('title');
const originPrice = document.getElementById('origin_price');
const setPrice = document.getElementById('price');
const addProduct = document.getElementById('addProduct');
const clearAllProducts = document.getElementById('clearAll');
const productCount = document.getElementById('productCount');
const productList = document.getElementById('productList');

function addBtn(){
    if(productTitle.value !== "" && originPrice.value !=="" && setPrice.value !==""){
        productData.push({
        id:Date.now(),
        title:productTitle.value.trim(),
        origin_price:originPrice.value,
        price:setPrice.value,
        is_enabled:false,
        })
    }
    renderProduct(productData);
    productTitle.value ="";
    originPrice.value ="";
    setPrice.value ="";
}
    addProduct.addEventListener('click',addBtn);

function removeProduct(id){
  let index = 0;
  productData.forEach((item,key)=>{
      if(id == item.id){
        index = key;
      }
  })
  productData.splice(index,1);
  renderProduct(productData);
}

function productStatus(id){
  productData.forEach((item) => {
    if(id == item.id){
      item.is_enabled = !item.is_enabled;
    }
  })
  renderProduct(productData);
}

function clearAllProduct(e){
  e.preventDefault();
  productData = [];
  renderProduct(productData);
}
clearAllProducts.addEventListener('click',clearAllProduct);


function doTask(e){
  const act = e.target.dataset.action;
  const id = e.target.dataset.id;
  if(act === 'remove'){
    removeProduct(id)
   } else if(act === 'status'){
    productStatus(id)
  }
}
  productList.addEventListener('click',doTask);

function renderProduct(data) {
        let str="";
        data.forEach((item)=>{
            str+=`<tr>
            <td>${item.title}</td>
            <td width="120">
              ${item.origin_price}
            </td>
            <td width="120">
              ${item.price}
            </td>
            <td width="100">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="is_enabled" ${item.is_enabled? 'checked': ''} data-action="status" data-id="${item.id}">
                <label class="form-check-label" for="is_enabled">${item.is_enabled? '啟用' : '未啟用'}</label>
              </div>
            </td>
            <td width="120">
              <button type="button" class="btn btn-sm btn-danger move" data-action="remove" data-id="${item.id}"> 刪除 </button>
            </td>
          </tr>`;

        })
        productList.innerHTML =str;
        productCount.textContent = data.length;
        
    }
    renderProduct(productData);


$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })
