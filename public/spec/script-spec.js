describe('inventoryTable', function(){
  var tableElement = document.getElementById('table-body');
  var totalItems   = document.getElementById("total-items");

  describe('constructor', function(){

    var inventoryTable = new InventoryTable( { table: tableElement, totalItems: totalItems } );

    it('creates a new inventoryTable object', function(){
      expect(inventoryTable).toBeTruthy();
    });
    it('new inventoryTable object has a non-empty table attribute', function(){
      expect(inventoryTable.table).toBeTruthy();
    });
    it('new inventoryTable object has a non-empty totalItems attribute', function(){
      expect(inventoryTable.totalItems).toBeTruthy();
    });



  });
});