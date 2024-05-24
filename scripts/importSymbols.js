const mongoose = require("mongoose");
const Symbol = require("../models/Symbol");
const connectDB = require("../database");

const symbols = [
  {
    alt: "nice symbol for tshirt",
    type: 1,
    price: 7,
    url: "https://cdn-icons-png.flaticon.com/128/731/731972.png",
  },
  {
    alt: "anmother nice symbol for tshirt",
    type: 1,
    price: 3,
    url: "https://cdn-icons-png.flaticon.com/128/732/732107.png",
  },
  {
    alt: "anmother nice symbol for tshirt",
    type: 1,
    price: 4,
    url: "https://cdn-icons-png.flaticon.com/128/1319/1319861.png",
  },
  {
    alt: "anmother nice symbol for tshirt",
    type: 1,
    price: 9,
    url: "https://cdn-icons-png.flaticon.com/128/3077/3077264.png",
  },
  {
    alt: "anmother nice symbol for tshirt",
    type: 1,
    price: 3,
    url: "https://cdn-icons-png.flaticon.com/128/616/616545.png",
  },
  {
    alt: "metal plate for tshirt",
    type: 2,
    price: 11,
    url: "https://images.vexels.com/media/users/3/346102/isolated/preview/df088fe96458116ced01cce6af10b223-three-candles-on-a-plate-with-a-cross.png?fmt=webp&h=250",
  },
  {
    alt: "another nice symbol for tshirt",
    type: 2,
    price: 14,
    url: "https://images.vexels.com/media/users/3/341598/isolated/preview/b82b1242870a82b5e62ca3f0434c790e-happy-thanksgiving-card-with-a-turkey-on-a-plate.png?fmt=webp&h=250",
  },
  {
    alt: "another nice symbol for tshirt",
    type: 2,
    price: 17,
    url: "https://images.vexels.com/media/users/3/334827/isolated/preview/315dc9c518e67ab9cc64bfa0872d7719-slice-of-pumpkin-pie-on-a-plate.png?fmt=webp&h=250",
  },
  {
    alt: "another nice symbol for tshirt",
    type: 2,
    price: 21,
    url: "https://images.vexels.com/media/users/3/324762/isolated/preview/074d9af75ca329ec58c832464e2a86c3-birthday-cake-with-candles-on-a-plate.png?fmt=webp&h=250",
  },
  {
    alt: "another nice symbol for tshirt",
    type: 2,
    price: 10,
    url: "https://images.vexels.com/media/users/3/149872/isolated/preview/c3a981927ca17772ddb1185b42e47452-horseshoe-racing-plate-silhouette.png?fmt=webp&h=250",
  },
];

const importSymbols = async () => {
  await connectDB();

  try {
    await Symbol.deleteMany();
    await Symbol.insertMany(symbols);
    mongoose.connection.close();
  } catch (error) {
    console.error("Error with symbol import", error);
    mongoose.connection.close();
  }
};

module.exports = importSymbols;
