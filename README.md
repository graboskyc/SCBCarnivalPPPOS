# SCBCarnivalPPPOS - SCB Carnival Pete's Place POS
A very basic Point of Sale (POS) system for the Pete and Larry's Place bar and grill at the [SCB Carnival](http://scbcarnival.com).

All menu items are listed in the products.js and then it builds the dynamic touch screen system. It will keep a running receipt of what is being ordered, the cost, and calculate the change. 

*No server or databases required, although if you have them additional features become available.*

# How To
## Setting your products and branding
Simply edit the products.js. Create a list of objects as shown in the sample. The ID must be unique for receipt purposes. Each product must also have a year key. This again is for historical data purposes. Only products with a year matching the universal config section at the end are shown.

The universal config section brands the site and receipt.

An example for a product is: `{"id":1,"name":"Clams (6)","price":"3.50","itemType":"food", "years":[2016,2017]}` and note that:
* `id` must be unique for each product
* `name` is what is shown on the touch screen
* `price` is a string, no dollar sign, and should be float(2) as shown
* `itemType` defines the background icon and color. Valid options are `food`, `draft`, `bottle`, `na`, `util` and are defined in `css\pos.css`
* `years` is an integer array for what years this has been on the menu. Only ones with the matching value of `menuyear` in the universal config section are shown in the system. 
* `station` should be unique per deployment. Since this has the option of storing on a centralized server, you would want each deployment (or each concession within a deployment) to have a unique value here for reporting. For example, at the St. Charles Carnival, we have concessions for Pete's Place (1 POS system) and for Food Tent (2 POS systems). So when deployed for the entire carnival, Pete's Place will have a different value than Food Tent but both terminals within Food Tent should have the same value.

Also at the bottom of the file is the site branding. These values define what gets printed on the receipt, is in the title bar, etc. Here, `menuyear` is important as it defines what items in the product list are visible (only those with the matching value in the `year` array of each product is shown). However it also defines the logo on the receipt. Place the logo in the `images` folder named `logo_yyyy.png` where `yyyy` matches your `menuyear` such as `logo_2017.png`.

If using locally, you are done! If you want to store all transactions in a centralized database, keep reading.

## Deployment
You can download everything and upload it to a web server if you choose. Otherwise, download and open the index.html file in Edge or Chrome or another standard browser. It is built on bootstrap and jquery so should be compatible with the same browsers.

When using locally or on the web, all receipt that are printed or saved get stored into localStorage. The history page and the admin page will let you see what is in that localStorage. This is still true if used on a server. However there are additional options with a centralized DB.

*Important Note:* If using some browser extensions that block ads and tracking, you must disable them for the deployment or site as this system creates a unique fingerprint of the browser. This ensures some level of uniqueness when creating and storing reciepts.  

## Printing and scanning
When printing a receipt, a bar code is created at the bottom using an encrypted string from the products, prices, tendered, etc in PDF417 format. After printing, you can scan it with an app on your phone such as [this Android app](https://play.google.com/store/apps/details?id=mobi.pdf417). Once scanned, copy that string and paste it into the first box on the admin.html page. Pressing the green button will decrypt the text. Pressing the orange button does that and then correlates that data with the actual product page.

## Connecting with a database
Sign up for MongoDB Atlas (managed MongoDB) at cloud.mongodb.com and deploy a cluster. For my setup, the cluster is called `Example` and it could be as simple a a free tier M0. Once deployed, create a database (here called `digisign`) and a collection (here called `pos`). Once complete install [MongoDB Stitch CLI](https://docs.mongodb.com/stitch/import-export/stitch-cli-reference/) and import the directory in this repo called `Stitch` to create the serverless application. 

At this point, you can get the webhook URL for the save function and put it in the `products.js` at the `stitchurl` and now when you load the site and save or print a reciept, a copy of that reciept will be stored in the central database.

# Try it:
[http://graboskyc.github.io/SCBCarnivalPPPOS/](http://graboskyc.github.io/SCBCarnivalPPPOS/)

# Screenshots
![](SS/ss1.png)

![](SS/ss2.png)

![](SS/ss7.png)

![](SS/ss3.png)

![](SS/ss4.png)

![](SS/ss5.PNG)

![](SS/ss6.png)

# Third Party Libraries
* [Bootstrap](http://getbootstrap.com)
* [jQuery](http://jquery.com/)
* [Crypto.js](code.google.com/p/crypto-js)
* [BCMath](https://sourceforge.net/projects/bcmath-js/)
* [Fingerprintjs2](https://github.com/Valve/fingerprintjs2)
* [pdf417 js](https://github.com/bkuzmic/pdf417-js)
* [FileSaver.js](https://github.com/eligrey/FileSaver.js)
* [DataTables](https://datatables.net/)