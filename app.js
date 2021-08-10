let search = document.getElementById("search");
let mainlist = document.getElementById("mainlist");
let query = search.value;
let items = document.getElementsByClassName("item");
let addbtn = document.getElementById("add");
let newitem = document.getElementById("newitem");

// this function runs every new query for search
function newquery() {
  document.getElementById("noresult").style.display = "none";
  let result = 0;
  query = search.value.toLowerCase();
  Array.from(items).map((item) => {
    item.style.display = "list-item";
    item.style.color = "black";
  });
  Array.from(items).map((item) => {
    let value = item.innerHTML;
    if (value.toLowerCase().includes(query)) {
      result++;
    } else {
      item.style.display = "none";
    }
  });
  if (result == 0) {
    document.getElementById("noresult").style.display = "list-item";
  }
}

// now we can dynamically load lists using array

let listitems = [
  "Ice Cream",
  "Potato",
  "Tomato",
  "Mango",
  "Peanut",
  "Walnut",
  "Tinde",
  "Pineapple",
  "Orange",
  "Patisa",
  "Aam Papad",
];

// this will show the item when the page loads
function showitem() {
  if (localStorage.length == 0) {
    listitems.forEach((item) => {
      // console.log(item);
      mainlist.innerHTML += `<li class="item">${item} <span class="delete">❌</span></li>`;
    });
    localStorage.setItem("list", listitems);
  } else {
    let newitems = localStorage.getItem("list");
    newitems = newitems.split(",");
    // console.log(newitems);
    newitems.forEach((item) => {
      if (item != "") {
        mainlist.innerHTML += `<li class="item">${item} <span class="delete">❌</span></li>`;
      }
    });
  }
}
showitem();

// this will temporary add item to the list but the additem function will really push this to the localstorage so that it also get dynamically loaded next time user visits

function temporary(value) {
  if (value.length > 0) {
    mainlist.innerHTML += `<li class="item">${value.trim()} <span class="delete">❌</span></li>`;
  }
}

// adding new items in the array or localstorage

function additem() {
  console.log("You clicked add item button");
  let saveditems = localStorage.getItem("list").split(",");
  let newvalue = newitem.value;
  if (newvalue.length > 0) {
    saveditems.push(newvalue.trim());
    newitem.value = "";
    let url = window.location.href;
    window.location.href = url;
  }
  localStorage.setItem("list", saveditems);
  
  temporary(newvalue);
}
addbtn.addEventListener("click", additem);
newitem.addEventListener("keydown",(e) =>{
  if (e.key == "Enter") {
    additem();
  }
})

// for removing a list item from both ui and localstorage

let deletebtns = document.getElementsByClassName("delete");
deletebtns = Array.from(deletebtns);

function deletebuttons() {
  deletebtns.map((item) => {
    item.addEventListener("click", (e) => {
      var userdelete = e.target.parentNode.firstChild.textContent;
      e.target.parentNode.remove();
      console.log(userdelete + " deleted");
      let getList = localStorage.getItem("list").split(",");
      // console.log(getList);
      let indexofitem = getList.indexOf(userdelete.trim());
      // console.log(indexofitem);
      getList.splice(indexofitem, 1);
      console.log(getList);
      localStorage.setItem("list", getList);
    });
  });
}

deletebuttons();





