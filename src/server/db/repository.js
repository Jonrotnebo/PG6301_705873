

// map from ids to items
const items = new Map();

//used to create unique ids
let counter = 0;

function initWithSomeItems(){

    items.clear()
    counter = 0;

    createNewItem("Pen", "a pen pensile in fine conditions", 300, 0);
    createNewItem("The Lord of the Rings", "the book The Lord of the Rings", 150, 0);
    createNewItem("Cola", "a can of coca cola", 1, 1);
    createNewItem("laptop", "a well used laptop, macbook 8", 3600, 0);
}

function createNewItem(itemName, description, price, bidPrice){

    const id = "" + 1 + counter;
    counter++;

    const item = {
        id: id,
        itemName: itemName,
        description: description,
        startingPrice: price,
        currentBid: bidPrice
    };

    items.set(id, item);

    return id;
}

function deleteItem(id){

    return items.delete(id);
}

function getItem(id){

    return items.get(id);
}

function getAllItems(){

    return Array.from(items.values());
}

function updateItem(item){

    if(! items.has(item.id)){
        return false;
    }

    items.set(item.id, item);
    return true;
}

module.exports = {initWithSomeItems, getAllItems,
    createNewItem, getItem, updateItem, deleteItem};
