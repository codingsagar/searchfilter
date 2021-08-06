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

let listitems = ["Ice Cream","Potato","Tomato","Mango","Peanut","Walnut","Tinde","Pineapple","Orange","Patisa","Aam Papad"]

// this will show the item when the page loads
function showitem(){
    if(localStorage.length == 0){
        listitems.forEach((item)=>{
            // console.log(item);
            mainlist.innerHTML += `<li class="item">${item}</li>`;
        })
        localStorage.setItem("list",listitems);
    }
    else{
        let newitems = localStorage.getItem("list");
        newitems = newitems.split(",")
        // console.log(newitems);
        newitems.forEach((item)=>{
            mainlist.innerHTML += `<li class="item">${item}</li>`;
        })
    }
}
showitem();

// this will temporary add item to the list but the additem function will really push this to the localstorage so that it also get dynamically loaded next time user visits

function temporary(value) {
    mainlist.innerHTML +=  `<li class="item">${value}</li>`
}

// adding new items in the array or localstorage

function additem() {
    console.log("You clicked add item button");
    let saveditems = localStorage.getItem("list").split(",");
    let newvalue = newitem.value;
    if(newvalue.length>0){
        saveditems.push(newvalue);
        newitem.value = "";
    }
    localStorage.setItem("list",saveditems);
    
    temporary(newvalue);
    
}



addbtn.addEventListener("click",additem);
