/*
 *
 *
 * CART
 *
 *
 */













// Define Cart Object
var Cart = function () { this.contents = {}; }


Cart.prototype = {
  // Add item to cart
  addToCart: function ( opts ) {
    // If item already exists, increase by one
    // Else add item to cart
    var type  = opts.type,
        price = opts.price;

    // If type exists in cart, increate quantity by 1
    if ( cart.contents[type] ) { cart.contents[type].quantity += 1;                  }
    // Otherwise add to cart
    else                       { cart.contents[type] = { quantity: 1, price: price } }
  },
  removeFromCart: function ( type ) {
    // If there are existing contents of this type, decrease by 1
    if ( cart.contents[type] ) { this.contents[type].quantity -= 1; };

    // If cart contents of this type equal zero, remove key from cart
    if ( this.contents[type].quantity === 0 ) { delete this.contents[type]; };
    
    // Update modal contents accordingly
    cartModal.populateModal();
  },
  // Calculate total price based on contents of cart
  calculateTotalPrice: function () {
    var total = 0;
    for ( var key in this.contents ) {
      var price    = parseFloat(this.contents[key].price);
      var quantity = this.contents[key].quantity;
      total += price * quantity;
    }
    // Update modal with total price
    cartModal.updateCartTotal(total);
  },
  // Empty cart
  clearCart: function () {
    this.contents = {};
    cartModal.populateModal();
  },
  calculateTotalItems: function () {
    var total = 0;
    for ( var key in this.contents ) { total += this.contents[key].quantity; }
    return total;
  }
}










/*
 *
 *
 * INVENTORY TABLE
 *
 *
 */












// Define InventoryTable object
var InventoryTable = function ( opts ) {
  this.chocolates  = opts.chocolates;
  this.table       = opts.table;
  this.totalItems  = opts.totalItems;
}

// InventoryTable functions
InventoryTable.prototype = {

  // Create and populate table
  populateTable: function () {
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
  // Update displayed item total in button
  updateButton: function () {
    total = cart.calculateTotalItems();
    this.totalItems.innerHTML = total;
  }
}





/*
 *
 *
 * CART MODAL 
 *
 *
 */








// Define CartModal
var CartModal = function ( opts ) {
  this.modal        = opts.modal;
  this.button       = opts.button;
  this.table        = opts.table;
  this.total        = opts.total;
  this.close        = opts.close;
  this.clear        = opts.clear;
  this.emptyMessage = opts.emptyMessage

  var that = this;

  // When the user clicks on the button, open the modal 
  this.button.onclick = function() { that.openModal(); }

  // When the user clicks on close, close the modal
  this.close.onclick = function() { that.closeModal(); }

  // When the user clicks clear, clear cart and close modal
  this.clear.onclick = function() {
    cart.clearCart();
    that.closeModal(); }
  }

// CartModal functions
CartModal.prototype = {
  // Open modal
  openModal: function () {
    this.populateModal();
    this.modal.style.display = "block";
  },
  // Close modal
  closeModal: function () {
    this.modal.style.display = "none";
  },
  // Populate modal
  populateModal: function () {
    // Clear contents of modal
    while (this.table.firstChild) { this.table.removeChild(this.table.firstChild); };

    // If cart is empty, show empty message and hide cart table
    if ( Object.keys(cart.contents).length === 0) {
      this.emptyMessage.style.display                      = "block";
      document.getElementById("modal-table").style.display = "none";
    }
    // Otherwise show inventory table, and hide empty message
    else {
      this.emptyMessage.style.display                      = "none";
      document.getElementById("modal-table").style.display = "table";

      // Add items to cart accordingly
      for ( var key in cart.contents ) {
        this.addCartRow( { type: key, price: cart.contents[key].price, quantity: cart.contents[key].quantity } )
      }
    }

    // Calculate cart total
    cart.calculateTotalPrice();

    // Update current inventory in cart
    inventoryTable.updateButton();
  },
  // Add row to modal table
  addCartRow: function ( cartObject ) {
    var type     = cartObject.type,
        price    = cartObject.price,
        quantity = cartObject.quantity;

    // If DOM element for item already exists, update quantity based on cart
    if ( document.getElementById(type + "-entry") ) {
      var entry           = document.getElementById(type + "-entry");
      var quantityElement = entry.children[2];
      quantityElement.innerHTML = quantity;
    }
    // Otherwise create row
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
  // Update total 
  updateCartTotal: function ( total ) {
    total                = numberToPrice(total)
    this.total.innerHTML = total;
  }
}


