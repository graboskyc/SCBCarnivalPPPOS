# SCBCarnivalPPPOS
Simple POS system for the Pete's Place bar at the SCB Carnival.

All menu items are listed in the products.js and then it builds the dynamic touch screen system. It will keep a running reciept of what is being ordered, the cost, and calculate the change. 

Very basic.

Built on BootStrap

# Modifying 
Simply edit the products.js. Create a list of objects as shown in the sample. The ID must be unique for reciept purposes.

Each product must also have a year key. This again is for historical data purposes. Only products with a year matching the universal config section at the end are shown.

The universal config section brands the site and reciept.