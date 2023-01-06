//start of get request to retrieve available coffees

// const getInventory = async () => {
//   let results = await axios.get('/api/cloud/getCoffee');
// results.data.forEach(item => {
//   let pic = item.pic;
//   let name = item.name;
//   let description = item.description;
//   let price = item.price;

//   let table = document.getElementById("product-table");
//   let newRow = table.insertRow(-1);
//   let picCell = newRow.insertCell();
//   let nameCell = newRow.insertCell();
//   let priceCell = newRow.insertCell();
  
//   let picLink = document.createElement("img");
//   picLink.src = pic; 
//   picLink.classList.add("product-image");

//   let nameText = document.createElement("h2");
//   nameText.innerHTML = name;

//   let descriptionText = document.createTextNode(description);
//   let priceText = document.createElement("h3");
//   priceText.innerHTML = "$" + price;

//   let addToCart = document.createElement("button");
//   addToCart.classList.add("addToCart");
//   addToCart.innerHTML = "Add to cart"
//   addToCart.name = name;
//   addToCart.value = price;

//   picCell.appendChild(picLink);
//   nameCell.appendChild(nameText);
//   nameCell.appendChild(descriptionText);
//   nameCell.appendChild(priceText);
//   priceCell.appendChild(addToCart);

//   let cartButtons = document.querySelectorAll(".addToCart");

//   cartButtons.forEach(item => {
//   item.addEventListener('click', cartHandler)
//   })

// })
// }
// getInventory();

// start of shopping cart handler
// let order = [];
// const cartHandler = function() {
//   let addItem = {"name" : this.name, "price" : this.value};
//   let currentQuantity = parseInt(document.getElementById("order-quantity").innerHTML);
//   let updatedQuantity = currentQuantity + 1;
//   document.getElementById("order-quantity").innerHTML = updatedQuantity;
//   console.log(updatedQuantity);
//   order.push(addItem);
//   let stringOrder = JSON.stringify(order);
//   localStorage.setItem("order", stringOrder);

//   let total = Number(localStorage.getItem("total"));
//   if (total) {
//     let itemValue = Number(this.value)
//     let newTotal = itemValue + total;
//     localStorage.setItem("total", newTotal);
//   } else {
//     localStorage.setItem("total", this.value);
//   }
// }

// Search for tho handler
let searchButton = document.getElementById("search_button");
let searchForm = document.getElementById("search-form");

const searchHandler = async function() {
  let searchContent = document.getElementById("search_content");
  let searchSummary = document.getElementById("search_summary");
  let search = document.getElementById("search").value;
  searchSummary.innerHTML = '';
  searchContent.innerHTML = '';
  let searchUrl = "/tcct/api/algolia/getTho" + "?search=" + search;
  // searchUrl = "https://faas-sgp1-18bc02ac.doserverless.co/api/v1/web/fn-7a547e63-4a3e-4a00-9798-b26f58c99213/algolia/getTho" + "?search=" + search;
  const result = await axios.get(searchUrl);
  // console.log(result);
  // localStorage.setItem("search", search);
  document.getElementById("search").value = '';

  const message = result.data.length ? "(Có " + String(result.data.length) + " kết quả cho: [" + String(search) + "])" : "(Không có kết quả)";
  searchSummary.innerHTML = message;

  result.data.forEach(e => {
    let childTho = document.createElement('div');
    // childTho.innerHTML = marked.parse(e.content);
    let highlightValue = e._highlightResult.content.value;
    highlightValue = highlightValue.replaceAll("\<em>", '<em class="text-danger">');
    childTho.innerHTML = marked.parse(highlightValue);
    searchContent.appendChild(childTho);
  })
}

searchButton.addEventListener('click', searchHandler);
searchForm.addEventListener('submit', function(e){
  e.preventDefault();
  searchHandler();
})