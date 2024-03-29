const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const { Product } = require("./models");
const port = 3000;

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/product", async (req, res) => {
  try {
    const allProducts = await Product.findAll();
    res.status(200).json(allProducts);
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/product", async (req, res) => {
  const {
    product_name,
    category,
    variant,
    description,
    price,
    stock,
    instock,
    seller,
  } = req.body;
  if (parseInt(stock) === 0) {
    try {
      const createProduct = await Product.create({
        product_name,
        category,
        variant,
        description,
        price,
        stock,
        instock: false,
        seller,
      });
      res.status(200).json(createProduct);
    } catch (error) {
      console.log(error.message);
    }
  } else {
    try {
      const createProduct = await Product.create({
        product_name,
        category,
        variant,
        description,
        price,
        stock,
        instock,
        seller,
      });
      res.status(200).json(createProduct);
    } catch (error) {
      console.log(error.message);
    }
  }
});

app.get("/product/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const idProducts = await Product.findOne({
      where: {
        id: id,
      },
    });
    res.status(200).json(idProducts);
  } catch (error) {
    console.log(error.message);
  }
});

app.put("/product/:id", async (req, res) => {
  const {
    product_name,
    category,
    variant,
    description,
    price,
    stock,
    instock,
    seller,
  } = req.body;
  const { id } = req.params;

  if (parseInt(stock) === 0) {
    try {
      const product = await Product.findOne({
        where: {
          id: parseInt(id),
        },
      });

      const editProduct = await Product.update(
        {
          product_name,
          category,
          variant,
          description,
          price,
          stock,
          instock: false,
          seller,
        },
        {
          where: {
            id: parseInt(id),
          },
        }
      );
      const editedProduct = await Product.findOne({
        where: {
          id: parseInt(id),
        },
      });
      res.status(201).json(editedProduct);
    } catch (error) {
      res.json(error.message);
    }
  } else {
    try {
      const product = await Product.findOne({
        where: {
          id: parseInt(id),
        },
      });

      const editProduct = await Product.update(
        {
          product_name,
          category,
          variant,
          description,
          price,
          stock,
          instock: true,
          seller,
        },
        {
          where: {
            id: parseInt(id),
          },
        }
      );
      const editedProduct = await Product.findOne({
        where: {
          id: parseInt(id),
        },
      });
      res.status(201).json(editedProduct);
    } catch (error) {
      res.json(error.message);
    }
  }
});

app.delete("/product/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const idProducts = await Product.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      message: "Data has been deleted",
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server listening to http://localhost:${port}`);
});
