var data = {
  "chocolates" : [
    {
      "description": "Milk chocolate milder and sweeter because it is made with milk and a higher sugar content than the darker varieties. It also has a smaller quantity of chocolate liquor and, therefore, fewer flavors and aromas.",
      "id": 1,
      "type": "milk",
      "price": 1.50
    },
    {
      "description": "Dark chocolate has the most chocolate liquor and the most intense chocolate flavor. Look for bitter, roasted, fruit, earthy, woodsy and/or nutty notes.",
      "id": 2,
      "type": "dark",
      "price": 2.50
    },
    {
      "description": "White chocolate lacks chocolate liquor, and includes the milk and vanilla used in milk chocolate. These ingredients give it a variety of sweet flavor notes, including cream, milk, honey, vanilla, caramel and/or fruit.",
      "id": 3,
      "type": "white",
      "price": 0.50
    },
    {
      "description": "Treat Grandma to this fine bar of sugar free chocolate",
      "id": 4,
      "type": "sugar free",
      "price": 1
    }
  ]
}


var Cart = function () {
  this.contents = {};
}

Cart.prototype = {
  addToCart: function ( opts ) {
    // If item already exists, increase by one
    // Else add item to cart
    var type  = opts.type,
        price = opts.price;

    if ( cart.contents[type] ) {
      cart.contents[type].quantity += 1;
    }
    else {
      cart.contents[type] = {
        quantity: 1,
        price:    price
      }
    }
  }
}

var cart = new Cart();

var InventoryTable = function ( opts ) {
  this.chocolates = opts.chocolates;
  this.table      = opts.table;
}

InventoryTable.prototype = {
  createTable: function () {
    // Loop throught the chocolates array
    for ( var i = 0; i < this.chocolates.length; i++ ) {
      var entry = this.addTableRow( this.chocolates[i] )
      this.table.appendChild(entry);
    }
  },
  addTableRow: function ( chocolateObject ) {
    var entry = document.createElement('tr');

    var typeDescription = createTableElement({
      tagName: "td",
      className: "type-description"
    });
    
    var type = createTableElement({
      tagName:   "p",
      className: "type",
      innerHTML: chocolateObject.type
    });

    var description = createTableElement({
      tagName:   "p",
      className: "description",
      innerHTML: chocolateObject.description
    });

    typeDescription.appendChild(type);
    typeDescription.appendChild(description);

    var price = createTableElement({
      tagName:   "td",
      className: "price",
      innerHTML: chocolateObject.price
    });

    var add = createTableElement({
      tagName:   "td",
      className: "add"
    });

    var addButton = createTableElement({
      tagName:   "button",
      className: "add-button",
      innerHTML: "Add to cart"
    });

    addButton.setAttribute("data-button", '{' +
      '"type": "' + chocolateObject.type + '",' +
      '"price": "' + chocolateObject.price + '"' +
      '}');

    addButton.onclick = function () {
      var detailObject = JSON.parse(this.getAttribute('data-button'));
      cart.addToCart( detailObject );

    }

    add.appendChild(addButton);
    entry.appendChild(typeDescription);
    entry.appendChild(price);
    entry.appendChild(add);
    return entry;
  },
}

var chocolates = data.chocolates;
var table     = document.getElementById('table-body');

var table = new InventoryTable( { chocolates: chocolates, table: table } )
table.createTable();


var CartModal = function ( opts ) {
  this.modal  = opts.modal;
  this.button = opts.button;
  this.span   = opts.span;
  this.table  = opts.table;
}


CartModal.prototype = {
  openModal: function () {
    this.populateModal( cart.contents );
    this.modal.style.display = "block";
  },
  closeModal: function () {
    this.modal.style.display = "none";
  },
  populateModal: function ( cart ) {
    for ( var key in cart ) {
      this.addCartRow( { type: key, price: cart[key].price, quantity: cart[key].quantity } )
    }
  },
  addCartRow: function ( cartObject ) {
    var type     = cartObject.type,
        price    = cartObject.price,
        quantity = cartObject.quantity;

    if ( document.getElementById(type + "-entry") ) {
      var entry           = document.getElementById(type + "-entry");
      var quantityElement = entry.children[2];
      var value = quantityElement.innerHTML;
      value = Math.floor(value);
      value++;
      quantityElement.innerHTML = value;
    }
    else {
      // create entry
      var entry = createTableElement({
        tagName: "tr",
        id:      type + "-entry"
      });


      var type = createTableElement({
        tagName:   "td",
        className: "cart-type",
        innerHTML: type
      })

      var price = createTableElement({
        tagName:   "td",
        className: "cart-price",
        innerHTML: price
      })

      var quantity = createTableElement({
        tagName:   "td",
        className: "cart-quantity",
        innerHTML: quantity
      })

      var removeButton = createTableElement({
        tagName:   "button",
        className: "cart-remove",
        innerHTML: "Remove"
      })

      removeButton.onclick = function () {
        // TODO: implement remove funtionality
      }


      entry.appendChild(type);
      entry.appendChild(price);
      entry.appendChild(quantity);
      entry.appendChild(removeButton);
    }

    this.table.appendChild(entry);

  }
}

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

// Get the modal
var modal = document.getElementById('cart-modal');

// Get the button that opens the modal
var button = document.getElementById("view-cart");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var modalTable = document.getElementById("modal-table-body")


var cartModal = new CartModal ({
  modal:  modal,
  button: button,
  span:   span,
  table:  modalTable
});

// When the user clicks on the button, open the modal 
cartModal.button.onclick = function() {
  cartModal.openModal();
}

// When the user clicks on <span> (x), close the modal
cartModal.span.onclick = function() {
  cartModal.closeModal();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == cartModal.modal) {
    cartModal.closeModal();
  }
}
