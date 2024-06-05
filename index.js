const express = require("express");
const app = express();

const cors = require("cors");

const port = 3000;

app.use(express.json());
app.use(cors());

var users = [];
var products = [];
var seller = [];
var purchases = [];
var cart = [];
var wishlist = [];

app.post("/signup", (req, res) => {
  var id = req.body.id;
  var pass = req.body.pass;
  var name = req.body.name;
  var email = req.body.email;
  var age = req.body.age;
  var address = req.body.address;
  var user = {
    id,
    pass,
    name,
    email,
    age,
    address,
    cart: [],
    wishlist: [],
    purchases: [],
  };
  users.push(user);
  console.log(users);
  res.json({
    message: `User created successfully!`,
    user: user,
  });
});

app.post("/login", (req, res) => {
  var id = req.body.id;
  var pass = req.body.pass;

  for (let i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      if (users[i].pass === pass) {
        return res.json({
          message: "Login successful",
          user: users[i],
        });
      } else {
        return res.json({ message: "Invalid password" });
      }
    }
  }
  res.json({ message: "User not found" });
});

app.post("/signin", (req, res) => {
  var id = req.body.id;
  var pass = req.body.pass;
  var newpass = req.body.newpass;
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      if (users[i].pass === pass) {
        users[i].pass = newpass;
        return res.json({ message: "Password changed" });
      }
    }
  }
  res.json({ message: "User not found or incorrect password" });
});
app.post("/product", (req, res) => {
  var id = req.body.id;
  var title = req.body.title;
  var rating = req.body.rating;
  var image = req.body.image;
  var desc = req.body.desc;
  var price = req.body.price;
  var product = { id, title, rating, image, desc, price };
  products.push(product);
  console.log(products);
  res.json({ product: products });
});

app.post("/user", (req, res) => {
  var uid = req.body.uid;

  for (let i = 0; i < users.length; i++) {
    if (users[i].id === uid) {
      return res.json({ message: "User found", user: users[i] });
    }
  }
  res.json({ message: "User not found" });
});

// app.post("/purchase", (req, res) => {
//   var id = req.body.id;

//   for (let i = 0; i < product.length; i++) {
//     if (id === product[i].id);
//   }
//   res.json({ message: "Product purchased" });
// });

// app.post("/seller-signup", (req, res) => {
//   var id = req.body.id;
//   var pass = req.body.pass;
//   var name = req.body.name;
//   var email = req.body.email;
//   var age = req.body.age;
//   var address = req.body.address;
//   var use = {
//     id,
//     pass,
//     name,
//     email,
//     age,
//     address,
//   };
//   seller.push(use);
//   console.log(seller);
//   res.json({ message: "seller signed up" });
// });
// app.post("/seller-login", (req, res) => {
//   var id = req.body.id;
//   var pass = req.body.pass;

//   for (let i = 0; i < seller.length; i++) {
//     if (seller[i].id === id) {
//       if (seller[i].pass === pass) {
//         res.json({
//           message: "login successful",
//           name: seller[i].name,
//           email: seller[i].email,
//           age: seller[i].age,
//           address: seller[i].address,
//         });
//       } else {
//         res.json({ message: "wrong password" });
//       }
//     }
//   }

//   res.json("not find");

//   // res.json(`send ${JSON.stringify(users)}`);
// });

app.post("/add-product", (req, res) => {
  var id = req.body.id;
  var pass = req.body.pass;

  for (let i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      users[i].products.push(pass);
      console.log(users);
      return res.json({ user: users[i] });
    }
  }
  res.json({ message: "User not found" });
});

app.post("/purchase", (req, res) => {
  var uid = req.body.uid;
  var pid = req.body.pid;
  var pass = req.body.pass;

  for (let i = 0; i < users.length; i++) {
    if (users[i].id === uid && users[i].pass === pass) {
      for (let i = 0; i < products.length; i++) {
        if (products[i].id === pid) {
          if (users[i].purchases.includes(products[i])) {
            users[i].purchases.push(products[i]);
          }
          console.log(users);
          return res.json({ message: "Product purchased", user: users[i] }); 
        }
      }
    }
  }
  res.json({ message: "Product not found" });
});

app.post("/add-to-cart", (req, res) => {
  var id = req.body.id;
  var uid = req.body.uid;

  for (let i = 0; i < users.length; i++) {
    if (users[i].id === uid) {
      for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
          if (users[i].cart.includes(products[i])) {
            users[i].cart.push(products[i]);
          }
          console.log(users);
          return res.json({ message: "Product added to cart", user: users[i] });
        }
      }
    }
  }
  res.json({ message: "Product not found" });
});

app.post("/add-to-wishlist", (req, res) => {
  var id = req.body.id;
  var uid = req.body.uid;

  for (let i = 0; i < users.length; i++) {
    if (users[i].id === uid) {
      for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
          if (users[i].wishlist.includes(products[i])) {
            users[i].wishlist.push(products[i]);
          }
          console.log(users);
          return res.json({
            message: "Product added to wishlist",
            user: users[i],
          });
        }
      }
    }
  }
  res.json({ message: "Product not found" });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
