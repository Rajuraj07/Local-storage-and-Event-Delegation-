const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
const clearButton = document.querySelector(".clear-all");
const selectButton = document.querySelector(".select-all");
const items = JSON.parse(localStorage.getItem("items")) || [];

function addItem(e) {
  e.preventDefault();
  const text = this.querySelector("input[name=item]").value;
  const item = {
    text,
    done: false,
  };
  items.push(item);
  populateItems(items, itemsList);
  updateLocalStorage(items);
  this.reset();
}

function populateItems(items = [], itemlist) {
  itemlist.innerHTML = items
    .map((item, i) => {
      return `
      <li>
        <input type='checkbox' data-index='${i}' id='item${i}' ${item.done ? "checked" : ""}></input>
        <label for='item${i}'>${item.text}</label>
        <span class='delete' data-index='${i}'>❌</span>
      </li>
    `;
    })
    .join("");

  if (items.length === 0) {
    itemlist.innerHTML = "<li>Loading Tapas...</li>";
    return;
  }
}

function toggleDone(e) {
  const el = e.target;
  const index = el.dataset.index;

  if (el.matches("input")) {
    items[index].done = !items[index].done;
    updateLocalStorage(items);
    populateItems(items, itemsList);
  }

  if (el.matches(".delete")) {
    deleteItem(index);
  }
}

function deleteItem(index) {
  if (confirm("Do you want to delete?")) {
    items.splice(index, 1);
  }
  populateItems(items, itemsList);
  updateLocalStorage(items);
}

function clearAll() {
  if (items.length === 0) return;

  if (confirm("Are you sure?")) {
    items.length = 0;
    populateItems(items, itemsList);
    updateLocalStorage(items);
  }
}

function selectAll() {
  const self = this;
  items.map((item) => {
    item.done = !item.done;

    item.done
      ? `${(self.innerHTML = "Clear Select")}`
      : `${(self.innerHTML = "Select All")}`;
  });
  populateItems(items, itemsList);
  updateLocalStorage(items);
}

function updateLocalStorage(collection) {
  localStorage.setItem("items", JSON.stringify(collection));
}

addItems.addEventListener("submit", addItem);
itemsList.addEventListener("click", toggleDone);
clearButton.addEventListener("click", clearAll);
selectButton.addEventListener("click", selectAll);
//Initialization
populateItems(items, itemsList);
