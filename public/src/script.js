// Define InventoryTable object
var InventoryTable = function ( opts ) {
  this.table       = opts.table;
  this.totalItems  = opts.totalItems;
}

// InventoryTable functions
InventoryTable.prototype = {
  getData: function() {
    var that = this;
    $.ajax({
      url: "/data/inventory.json",
      success: function ( ajaxData ) {
        that.setData(ajaxData);
      },
      error: function ( error ) {
        console.log(error);
      }
    });
  },
  setData: function( ajaxData ) {
    this.chocolates = ajaxData.chocolates;
    this.createTable();
  },

  // Create and populate table
  createTable: function () {
    // Loop throught the chocolates array
    for ( var i = 0; i < this.chocolates.length; i++ ) {
      var entry = this.addTableRow( this.chocolates[i] )
      this.table.appendChild(entry);
    }
  },
  // Add row to table
  addTableRow: function ( chocolateObject ) {
    // Row entry element
    var entry = document.createElement('tr');

    // Entry type and description element
    var typeDescription = createTableElement({ tagName: "td", className: "type-description" });
    
    // Type element
    var type = createTableElement({ tagName: "p", className: "type", innerHTML: chocolateObject.type });

    // Description element
    var description = createTableElement({ tagName: "p", className: "description", innerHTML: chocolateObject.description });

    // Append type/description to typeDescription element
    typeDescription.appendChild(type);
    typeDescription.appendChild(description);

    // Price element
    var price = createTableElement({ tagName: "td", className: "price", innerHTML: numberToPrice(chocolateObject.price) });

    // Add table element
    var add = createTableElement({ tagName: "td", className: "add" });

    // Add button element
    var addButton = createTableElement({ tagName: "button", className: "add-button", innerHTML: "Add to cart" });

    // Add button data attribute
    addButton.setAttribute("data-button", '{' +
      '"type": "' + chocolateObject.type + '",' +
      '"price": "' + chocolateObject.price + '"' +
      '}');

    // Add button click event
    addButton.onclick = function () {
      var detailObject = JSON.parse(this.getAttribute('data-button'));
      cart.addToCart( detailObject );
      inventoryTable.updateButton();
    }

    // Append elements to entry
    add.appendChild(addButton);
    entry.appendChild(typeDescription);
    entry.appendChild(price);
    entry.appendChild(add);
    return entry;
  },
  updateButton: function () {
    total = cart.calculateTotalItems();
    this.totalItems.innerHTML = total;
  }
}

// Table element
var tableElement = document.getElementById('table-body');

// Total items
var totalItems   = document.getElementById("total-items");

// Create new inventory table
var inventoryTable = new InventoryTable( { table: tableElement, totalItems: totalItems } )
inventoryTable.getData();


// Define Cart Object
var Cart = function () {
  this.contents = {};
}

Cart.prototype = {
  // Add item to cart
  addToCart: function ( opts ) {
    // If item already exists, increase by one
    // Else add item to cart
    var type  = opts.type,
        price = opts.price;

    if ( cart.contents[type] ) { cart.contents[type].quantity += 1; }
    else { cart.contents[type] = { quantity: 1, price: price } }
  },
  // Remove items from cart
  removeFromCart: function ( type ) {
    if ( cart.contents[type] ) { this.contents[type].quantity -= 1; }
    if ( this.contents[type].quantity === 0 ) { delete this.contents[type]; }
    cartModal.populateModal( this.contents );
  },
  // Calculate total price of cart
  calculateTotalPrice: function () {
    var total = 0;
    for ( var key in this.contents ) {
      var price    = parseFloat(this.contents[key].price);
      var quantity = this.contents[key].quantity;
      total += price * quantity;
    }
    cartModal.updateTotal(total);
    return total;
  },
  clearCart: function () {
    this.contents = {};
    cartModal.populateModal(this.contents);
    inventoryTable.updateButton();
  },
  calculateTotalItems: function () {
    var total = 0;
    for ( var key in this.contents ) { total += this.contents[key].quantity; }
    return total;
  }

}

// Create cart object
var cart = new Cart();

// Define CartModal
var CartModal = function ( opts ) {
  this.modal  = opts.modal;
  this.button = opts.button;
  this.table  = opts.table;
  this.total  = opts.total;
  this.close  = opts.close;
  this.clear  = opts.clear;

}

// CartModal functions
CartModal.prototype = {
  // Open modal
  openModal: function () {
    this.populateModal( cart.contents );
    this.modal.style.display = "block";
  },
  // Close modal
  closeModal: function () {
    this.modal.style.display = "none";
  },
  // Populate modal
  populateModal: function ( cartContents ) {
    // Remove all elements from table
    while (this.table.firstChild) {
      this.table.removeChild(this.table.firstChild);
    }
    if ( Object.keys(cartContents).length === 0) {
      document.getElementById("empty-message").style.display = "block";
      document.getElementById("modal-table").style.display = "none";
    }
    else {
      document.getElementById("empty-message").style.display = "none";
      document.getElementById("modal-table").style.display = "table";
      for ( var key in cartContents ) {
        this.addCartRow( { type: key, price: cartContents[key].price, quantity: cartContents[key].quantity } )
      }
    }
    cart.calculateTotalPrice();
  },
  // Add row to modal table
  addCartRow: function ( cartObject ) {
    var type     = cartObject.type,
        price    = cartObject.price,
        quantity = cartObject.quantity;

    if ( document.getElementById(type + "-entry") ) {
      var entry           = document.getElementById(type + "-entry");
      var quantityElement = entry.children[2];
      quantityElement.innerHTML = quantity;
    }
    else {
      // Entry element
      var entry = createTableElement({ tagName: "tr", id: type + "-entry" });;

      // Type element
      var typeElement = createTableElement({ tagName: "td", className: "cart-type", innerHTML: type });

      // Price element
      var priceElement = createTableElement({ tagName: "td", className: "cart-price", innerHTML: numberToPrice(price) });

      // Quantity element
      var quantityElement = createTableElement({ tagName: "td", className: "cart-quantity", innerHTML: quantity });

      // Remove button element
      var removeButton = createTableElement({ tagName: "button", className: "cart-remove", innerHTML: "Remove" });

      // Add click event to remove button
      removeButton.onclick = function () {
        cart.removeFromCart( type );
        inventoryTable.updateButton();
      }

      // Add elements to entry
      entry.appendChild(typeElement);
      entry.appendChild(priceElement);
      entry.appendChild(quantityElement);
      entry.appendChild(removeButton);
    }
    // Add entry to table
    this.table.appendChild(entry);
  },
  updateTotal: function ( total ) {
    total = numberToPrice(total)
    this.total.innerHTML = total;
  }
}


// Get the modal
var modal = document.getElementById('cart-modal');

// Get the button that opens the modal
var button = document.getElementById("view-cart");

// Close button
var close = document.getElementById("close-modal");

// Clear button
var clear = document.getElementById("clear-modal");

// Modal Table
var modalTable = document.getElementById("modal-table-body");

// Total
var total = document.getElementById("cart-total");

// Create cart modal
var cartModal = new CartModal ({
  modal:  modal,
  button: button,
  table:  modalTable,
  total:  total,
  close:  close,
  clear:  clear
});

// When the user clicks on the button, open the modal 
cartModal.button.onclick = function() {
  cartModal.openModal();
}

// When the user clicks on close, close the modal
cartModal.close.onclick = function() {
  cartModal.closeModal();
}

// When the user clicks on clear, clear and close the modal
cartModal.clear.onclick = function() {
  cart.clearCart();
  cartModal.closeModal();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == cartModal.modal) {
    cartModal.closeModal();
  }
}

// Helper function for creating elements
function createTableElement ( opts ) {
  var tagName   = opts.tagName,
      className = opts.className,
      innerHTML = opts.innerHTML,
      id        = opts.id;

  var element       = document.createElement(tagName);
  element.innerHTML = innerHTML || "";
  if ( id        ) { element.id = id;               }
  if ( className ) { element.className = className; }

  return element;
}

// Helper function for converting a number into a price
function numberToPrice ( number ) {
  var price;

  var newNumber = number ? number : 0;
  // newNumber equals zero
  if ( newNumber === 0 ) { price = "0.00"; }

  // newNumber has tens digit place
  else if ( newNumber % 1 > 0 ) { price = newNumber + "0"; }

  // newNumber is integer
  else { price = newNumber + ".00"; }

  return "$" + price;
}
