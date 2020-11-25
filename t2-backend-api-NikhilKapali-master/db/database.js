const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Bakery-Cafe-Shop-api',{      //Bakery-cafe-shop-api = name of database
useNewUrlParser: true,
useCreateIndex: true

});