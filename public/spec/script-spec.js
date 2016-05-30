describe('InventoryTable', function(){
  beforeAll(function(){
    var tableElement = document.getElementById('table-body');
    var totalItems   = document.getElementById("total-items");
    var inventoryTable = new InventoryTable( { table: tableElement, totalItems: totalItems } );
  });

  describe('constructor', function(){
    it('creates a new InventoryTable object', function(){
      expect(inventoryTable).toBeTruthy();
    });
    it('new inventoryTable object has a table attribute', function(){
      expect(inventoryTable.table).toBeTruthy();
    });
    it('new inventoryTable object has a totalItems attribute', function(){
      expect(inventoryTable.totalItems).toBeTruthy();
    });
  });
  describe('addTableRow', function(){
    var entry = inventoryTable.addTableRow({description: "Test chocolate description", id: 5, type: "test", price: 7})
    it('creates a new table row entry', function(){
      expect(entry.children).toBeTruthy();
    });
    it('new table row entry contains three child elements', function(){
      expect(entry.children.length).toEqual(3);
    });
    it("new table row entry's first child has class name equal to \"type-description\"", function(){
      expect(entry.children[0].className).toEqual("type-description");
    });
    it("new table row entry's first child has innerHTML to be in proper format", function(){
      expect(entry.children[0].innerHTML).toEqual('<p class="type">test</p><p class="description">Test chocolate description</p>');
    });
  });
  describe('setData', function() {
    beforeEach(function(){
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
      };
      inventoryTable.setData(data);
    })
    it('assigns chocolates attribute to inventoryTable', function(){
      expect(inventoryTable.chocolates).toBeTruthy();
    });
    it('inventoryTable.chocolates is an array of length 4', function(){
      expect(inventoryTable.chocolates.length).toEqual(4);
    })
  });
});


describe('CartModal', function(){
  beforeAll(function(){
    var modal      = document.getElementById('cart-modal');
    var button     = document.getElementById("view-cart");
    var close      = document.getElementById("close-modal");
    var clear      = document.getElementById("clear-modal");
    var modalTable = document.getElementById("modal-table-body");
    var total      = document.getElementById("cart-total");
    var cartModal = new CartModal ({
      modal:  modal,
      button: button,
      table:  modalTable,
      total:  total,
      close:  close,
      clear:  clear
    });
  });
  describe('constructor', function(){
    it('creates a new CartModal object', function(){
      expect(cartModal).toBeTruthy();
    });
    it('new CartModal object has a modal attribute', function(){
      expect(cartModal.modal).toBeTruthy();
    });
    it('new CartModal object has a button attribute', function(){
      expect(cartModal.button).toBeTruthy();
    });
    it('new CartModal object has a table attribute', function(){
      expect(cartModal.table).toBeTruthy();
    });
    it('new CartModal object has a close attribute', function(){
      expect(cartModal.close).toBeTruthy();
    });
    it('new CartModal object has a clear attribute', function(){
      expect(cartModal.clear).toBeTruthy();
    });
  });
  describe('populateModal', function(){
    cartModal.populateModal({milk: {price: "1.5", quantity: 1}});
    it('creates a first child element in cartModal.table with an id of "milk-entry"', function(){
      expect(cartModal.table.children[0].id).toEqual('milk-entry');
    });
  });
  describe('openModal', function(){
    it('sets cart.modal style to be "block"', function(){
      cartModal.openModal();
      expect(cartModal.modal.style.display).toEqual("block");
    });
  });
  describe('closeModal', function(){
    it('sets cart.modal style to be "none"', function(){
      cartModal.closeModal();
      expect(cartModal.modal.style.display).toEqual("none");
    });
  });
  describe('updateTotal', function(){
    beforeAll(function(){
      cartModal.updateTotal(5);
    });
    afterAll(function(){
      cartModal.updateTotal(0);
    });
    it('sets cartModal.total.innerHTML equal to "5.00"', function(){
      expect(cartModal.total.innerHTML).toEqual("$5.00")
;    })
  });
});


describe('Cart', function(){
  beforeAll(function(){
    var cart = new Cart();
  });
  afterAll(function(){
    cart.clearCart();
  })
  describe('constructor', function(){
    it('creates a new Cart object', function(){
      expect(cart).toBeTruthy();
    });
    it('new cart object has a contents attribute', function(){
      expect(cart.contents).toBeTruthy();
    });
  });
  describe('addToCart', function(){
    beforeAll(function(){
      cart.addToCart({ type: 'milk', price: 1.5 })
    });
    it('creates a contents key for milk if you add item type (milk) that does not already exist to cart', function(){
      expect(cart.contents.milk).toBeTruthy();
    });
    it('assigns that key (milk) to have the quantity of one upon creation of new key', function(){
      expect(cart.contents.milk.quantity).toEqual(1);
    });
    it('increases the quantity of that key (milk) to two when you add a second item of the same type', function(){
      cart.addToCart({ type: 'milk', price: 1.5 })
      expect(cart.contents.milk.quantity).toEqual(2);
    });
  });
  describe('removeFromCart', function(){
    beforeAll(function(){
      cart.addToCart({ type: 'dark', price: 2.5 })
      cart.addToCart({ type: 'dark', price: 2.5 })
    });
    it('brings quantity from 2 to one if one item is removed', function(){
      cart.removeFromCart('dark');
      expect(cart.contents.dark.quantity).toEqual(1);
    });
    it('removes type key from cart.contents if last item is removed', function(){
      cart.removeFromCart('dark');
      expect(cart.contents.dark).toBe(undefined);
    });
  });
  describe('clearCart', function(){
    beforeEach(function(){
      cart.clearCart();
    })
    it('resets cart.contents to be an empty object', function(){
      expect(cart.contents).toEqual({});
    });
  });
  describe('calculateTotalPrice', function(){
    var totalPrice = 0;
    beforeEach(function(){
      cart.addToCart({ type: 'dark', price: 2.5 })
      cart.addToCart({ type: 'dark', price: 2.5 })
      cart.addToCart({ type: 'milk', price: 1.5 })
      totalPrice = cart.calculateTotalPrice();
    })
    it('evaluates the total price of the cart to be 6.5', function(){
      expect(totalPrice).toEqual(6.5);
    });
  });
  describe('calculateTotalItems', function(){
    it('evaluates the total number of items to be 3', function(){
      var totalItems = cart.calculateTotalItems();
      expect(totalItems).toEqual(3);
    })
  });
});

describe('createTableElement', function(){
  var element = createTableElement( {tagName: "div", className: "test-class", id: "test-id"} );
  it('creates an element', function(){
    expect(element).toBeTruthy();
  });
  it('element has tagname "DIV"', function(){
    expect(element.tagName).toEqual('DIV');
  });
  it('element has className "test-class"', function(){
    expect(element.className).toEqual('test-class');
  });
  it('element has id "test-id"', function(){
    expect(element.id).toEqual('test-id');
  });
});

describe('numberToPrice', function(){
  it('returns "$0.00" if no input is entered', function(){
    var price = numberToPrice();
    expect(price).toEqual("$0.00");
  });
  it('returns "$5.00" if 5 is entered', function(){
    var price = numberToPrice(5);
    expect(price).toEqual("$5.00");
  });
  it('returns "$5.50" if 5.5 is entered', function(){
    var price = numberToPrice(5.5);
    expect(price).toEqual("$5.50");
  });
  it('returns "$0.00" if 0 is entered', function(){
    var price = numberToPrice(0);
    expect(price).toEqual("$0.00");
  });
});