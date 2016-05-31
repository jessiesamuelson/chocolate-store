## Instructions

Implement the feature, [described](#prompt) below, using Javascript, HTML and CSS.

Please do not use any frameworks or pre-processors - we'd like to see your javascript skills! Similarly, please do not use third party libraries (with the exception of jasmine & karma for testing).
This means no [bootstrap](http://getbootstrap.com) or similar CSS frameworks. We want to see your CSS skills.

Add tests/specs as needed.

## Prompt

Our client is Sugar Sweet Chocolate Treats (SSCT). SSCT is looking to grow their online presence, and you've been tasked with building their shopping cart.

## Spec

SSCT would like a single-page application.

It should work on mobile and desktop (between 768px wide and 1200px).

It must display their inventory, prices, and have the ability to add chocolates to their cart.

Each item will have the chocolate type, description, price, and an Add to Cart button.

Clicking Add to Cart multiple times will increase the count of that item in the cart.

It will have a button to view cart.

The cart will be a modal overlayed on the inventory page.

The cart should show the user's total.

If the cart is empty, it will show the message "There are no items in your cart".

Each item in the cart should have a remove button and a quantity count.

The cart should have a Clear button. It should clear the users cart, and close the modal.

The cart should have a Close button. It should close the modal, but not clear the cart.


### Mockup

```
Inventory page:

+---------------------------------------------------------------+
|                                                               |
|                   Sugar Sweet Chocolate Treats                |
|                            (header)                           |
+---------------------------------------------------------------+
|        +---------------------------------+      +----------+  |
|        |Chocolate type   Price      Add  |      |View cart |  |
|        |Description               to cart|      |(# items) |  |
|        +---------------------------------+      +----------+  |
|        +---------------------------------+                    |
|        |Chocolate type   Price      Add  |                    |
|        |Description               to cart|                    |
|        +---------------------------------+                    |
|        +---------------------------------+                    |
|        |Chocolate type   Price      Add  |                    |
|        |Description               to cart|                    |
|        +---------------------------------+                    |
|        +---------------------------------+                    |
|        |Chocolate type   Price      Add  |                    |
|        |Description               to cart|                    |
|        +---------------------------------+                    |
|        +---------------------------------+                    |
|        |Chocolate type   Price      Add  |                    |
|        |Description               to cart|                    |
|        +---------------------------------+                    |
|                                                               |
+---------------------------------------------------------------+


Cart:

+---------------------------------------------------------------+
|                                                               |
|                                                               |
|                                                               |
|                                                               |
|                                                               |
|            +-----------------------------------+              |
|            |          Your cart                |              |
|            |                                   |              |
|            |   +----------------------------+  |              |
|            |   |Item     Price  Qty         |  |              |
|            |   |                            |  |              |
|            |   +----------------------------+  |              |
|            |   +----------------------------+  |              |
|            |   |Dark     $1.50   3  Remove  |  |              |
|            |   |                            |  |              |
|            |   +----------------------------+  |              |
|            |                                   |              |
|            |   Total: $X.XX                    |              |
|            |                                   |              |
|            +----------+-----------+            |              |
|            | Clear    |  Close    |            |              |
|            +----------+-----------+------------+              |
|                                                               |
|                                                               |
|                                                               |
|                                                               |
|                                                               |
|                                                               |
|                                                               |
|                                                               |
|                                                               |
+---------------------------------------------------------------+

```

### Inventory data

Inventory, including types of chocolate and prices, are available in `public/data/inventory.json`.


## Setup

1. Install [NodeJS](nodejs.org)
2. Run `npm install`

## Run

To run the setup:

1. `npm run serve` - Serves the `public/` directory at [localhost:3000](http://localhost:3000).


## Test

1. `npm run serve` - Visit [localhost:3000/index-spec.html](http://localhost:3000/index-spec.html)