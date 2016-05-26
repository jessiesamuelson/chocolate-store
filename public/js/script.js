
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == cartModal.modal) { cartModal.closeModal(); }
}

// Helper function for creating DOM elements
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

// Helper function to turn float into price string
function numberToPrice ( number ) {
  var price;

  // When number = 0
  if ( number === 0 ) { price = "0.00"; }

  // When number has tens digit place
  else if ( number % 1 > 0 ) { price = number + "0"; }

  // number is integer
  else { price = number + ".00"}

  return "$" + price;
}


// Create inventory table to be used globally
var inventoryTable;

// Success function for ajax call
// Creates inventory table
function setData ( inputData ) {
  var data         = inputData;
  var tableElement = document.getElementById('table-body');
  var totalItems   = document.getElementById("total-items");

  // Create inventory table
  inventoryTable = new InventoryTable( { chocolates: data.chocolates, table: tableElement, totalItems: totalItems } )
  inventoryTable.populateTable();
  return data;

}

// Ajax call to retrieve data from json file
$.ajax({
  url: "/data/inventory.json",
  success: function ( data ) {
    // Success callback
    setData( data );
  },
  error: function ( error ) {
    console.log(error);
  }
});


// Create cart object
var cart = new Cart();


// Modal
var modal = document.getElementById('cart-modal');

// View cart button
var button = document.getElementById("view-cart");

// Close button
var close = document.getElementById("close-modal");

// Clear button
var clear = document.getElementById("clear-modal");

// Modal table
var modalTable = document.getElementById("modal-table-body");

// Cart total
var total = document.getElementById("cart-total");

// Empty message
var emptyMessage = document.getElementById("empty-message");

// Create cart modal
var cartModal = new CartModal ({
  modal:        modal,
  button:       button,
  table:        modalTable,
  total:        total,
  close:        close,
  clear:        clear,
  emptyMessage: emptyMessage
});
