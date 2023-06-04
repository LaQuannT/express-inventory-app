#! /usr/bin/env node

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Sneaker = require("./models/sneaker");
const Brand = require("./models/brand");

const brands = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createBrands();
  await createSneakers();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function brandCreate({ name, description }) {
  const brand = new Brand({
    name,
    description,
  });
  await brand.save();
  brands.push(brand);
  console.log(`Added brand: ${name}`);
}

async function sneakerCreate({
  name,
  description,
  colorway,
  brand,
  price,
  pairs = 1,
}) {
  let sneakerdetails = {
    name,
    description,
    colorway,
    brand,
    price,
    pairs,
  };

  if (brand !== false) sneakerdetails.brand = brand._id;

  const sneaker = new Sneaker({ ...sneakerdetails });
  await sneaker.save();
  console.log(`Added sneaker: ${name}`);
}

async function createBrands() {
  console.log("Adding brand");
  await brandCreate({
    name: "Nike",
    description: "Popular brand with logo of a check mark",
  });
  await brandCreate({
    name: "Adidas",
    description: "Brand known for it's three stripes logo",
  });
  await brandCreate({
    name: "New Balance",
    description: "Brand recognised by its large N logo",
  });
}

async function createSneakers() {
  console.log("Adding sneakers");
  await Promise.all([
    sneakerCreate({
      name: "550",
      description: "Classic lifestyle trainer",
      colorway: "White/Grey",
      brand: brands[2],
      price: 130.0,
      pairs: 1,
    }),
    sneakerCreate({
      name: "airForce One",
      description: "Classic basketball trainer",
      colorway: "White/White",
      brand: brands[0],
      price: 109.95,
      pairs: 1,
    }),
    sneakerCreate({
      name: "Gazelle",
      description: "Modern version of the authentic football trainers",
      colorway: "Core Black/ Core Black",
      brand: brands[1],
      price: 85,
      pairs: 1,
    }),
    sneakerCreate({
      name: "Air Jordan 1 Low 'Pollen'",
      description: "Modern take on the iconic Jordan 1 low silhouette",
      colorway: "White/Pollen",
      brand: brands[0],
      price: 159.99,
      pairs: 1,
    }),
    sneakerCreate({
      name: "Air Jordan 1 Retro High OG 'Chicago Lost & Found'",
      description:
        "Iconic basketball trainer silhouette featuring the high-cut shape of the original 1985 'Air Jordan 1 Chicago' release",
      colorway: "Varsity Red/Black/Sail/Muslin",
      brand: brands[0],
      price: 365,
      pairs: 1,
    }),
  ]);
}
