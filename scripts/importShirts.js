const mongoose = require("mongoose");
const Shirt = require("../models/Shirt"); // Adjust path as necessary
const connectDB = require("../database");

const shirts = [
  {
    name: "T-shirt 1",
    alt: "tshirt 1",
    price: 10,
    url: "https://res.cloudinary.com/teepublic/image/private/s--n5kS5dRl--/t_Resized Artwork/c_crop,x_10,y_10/c_fit,w_456/c_crop,g_north_west,h_626,w_470,x_-7,y_0/g_north_west,u_upload:v1462829017:production:blanks:qe3008lhp5hquxmwp4a0,x_-402,y_-325/b_rgb:eeeeee/c_limit,f_auto,h_313,q_auto:good:420,w_313/v1703766996/production/designs/55643065_0",
  },
  {
    name: "T-shirt 2",
    alt: "another nice tshirt",
    price: 15,
    url: "https://res.cloudinary.com/teepublic/image/private/s--eaAZsoFH--/t_Resized Artwork/c_crop,x_10,y_10/c_fit,w_470/c_crop,g_north_west,h_626,w_470,x_0,y_0/g_north_west,u_upload:v1462829017:production:blanks:qe3008lhp5hquxmwp4a0,x_-395,y_-325/b_rgb:eeeeee/c_limit,f_auto,h_313,q_auto:good:420,w_313/v1689872640/production/designs/48127777_0",
  },
  {
    name: "T-shirt 3",
    alt: "another nice tshirt",
    price: 20,
    url: "https://res.cloudinary.com/teepublic/image/private/s--JSBznKic--/t_Resized Artwork/c_crop,x_10,y_10/c_fit,w_367/c_crop,g_north_west,h_626,w_470,x_-52,y_-16/g_north_west,u_upload:v1462829020:production:blanks:h778z1f0n6g0xugjpxxm,x_-447,y_-341/b_rgb:eeeeee/c_limit,f_auto,h_313,q_auto:good:420,w_313/v1543809478/production/designs/3639611_0",
  },
  {
    name: "T-shirt 4",
    alt: "another nice tshirt",
    price: 7,
    url: "https://res.cloudinary.com/teepublic/image/private/s--5t3UcAhc--/t_Resized Artwork/c_crop,x_10,y_10/c_fit,w_470/c_crop,g_north_west,h_626,w_470,x_0,y_0/g_north_west,u_upload:v1462829017:production:blanks:qe3008lhp5hquxmwp4a0,x_-395,y_-325/b_rgb:eeeeee/c_limit,f_auto,h_313,q_auto:good:420,w_313/v1611341833/production/designs/18765124_0",
  },
  {
    name: "T-shirt 5",
    alt: "another nice tshirt",
    price: 24,
    url: "https://res.cloudinary.com/teepublic/image/private/s---uLSUN_5--/t_Resized Artwork/c_crop,x_10,y_10/c_fit,w_470/c_crop,g_north_west,h_626,w_470,x_0,y_0/g_north_west,u_upload:v1462829020:production:blanks:h778z1f0n6g0xugjpxxm,x_-395,y_-325/b_rgb:eeeeee/c_limit,f_auto,h_313,q_auto:good:420,w_313/v1521988785/production/designs/2527864_0",
  },
  {
    name: "T-shirt 6",
    alt: "another nice tshirt",
    price: 13,
    url: "https://res.cloudinary.com/teepublic/image/private/s--tk3DjV9m--/t_Resized Artwork/c_crop,x_10,y_10/c_fit,w_423/c_crop,g_north_west,h_626,w_470,x_-23,y_-14/g_north_west,u_upload:v1462829015:production:blanks:mtl53ofohwq5goqjo9ke,x_-418,y_-339/b_rgb:eeeeee/c_limit,f_auto,h_313,q_auto:good:420,w_313/v1609889192/production/designs/18228093_0",
  },
  {
    name: "T-shirt 7",
    alt: "another nice tshirt",
    price: 21,
    url: "https://res.cloudinary.com/teepublic/image/private/s--L7q91Juz--/t_Resized Artwork/c_crop,x_10,y_10/c_fit,w_470/c_crop,g_north_west,h_626,w_470,x_0,y_0/g_north_west,u_upload:v1462829015:production:blanks:mtl53ofohwq5goqjo9ke,x_-395,y_-325/b_rgb:eeeeee/c_limit,f_auto,h_313,q_auto:good:420,w_313/v1461081128/production/designs/482779_1",
  },
  {
    name: "T-shirt 8",
    alt: "another nice tshirt",
    price: 11,
    url: "https://res.cloudinary.com/teepublic/image/private/s--rAry_jXx--/t_Resized Artwork/c_crop,x_10,y_10/c_fit,w_470/c_crop,g_north_west,h_626,w_470,x_0,y_0/g_north_west,u_upload:v1462829015:production:blanks:mtl53ofohwq5goqjo9ke,x_-395,y_-325/b_rgb:eeeeee/c_limit,f_auto,h_313,q_auto:good:420,w_313/v1515382114/production/designs/2262446_1",
  },
  {
    name: "T-shirt 9",
    alt: "another nice tshirt",
    price: 34,
    url: "https://res.cloudinary.com/teepublic/image/private/s--3zePzqUm--/t_Resized Artwork/c_crop,x_10,y_10/c_fit,w_169/c_crop,g_north_west,h_626,w_470,x_-293,y_-31/g_north_west,u_upload:v1462829015:production:blanks:mtl53ofohwq5goqjo9ke,x_-688,y_-356/b_rgb:eeeeee/c_limit,f_auto,h_313,q_auto:good:420,w_313/v1607176493/production/designs/16930164_2",
  },
  {
    name: "T-shirt 10",
    alt: "another nice tshirt",
    price: 8,
    url: "https://res.cloudinary.com/teepublic/image/private/s--aPePlxJZ--/t_Resized Artwork/c_crop,x_10,y_10/c_fit,h_626/c_crop,g_north_west,h_626,w_470,x_-21,y_0/g_north_west,u_upload:v1462829024:production:blanks:a59x1cgomgu5lprfjlmi,x_-416,y_-325/b_rgb:eeeeee/c_limit,f_auto,h_313,q_auto:good:420,w_313/v1700102283/production/designs/53231615_0",
  },
];
const importShirts = async () => {
  await connectDB(); // Ensure this completes before proceeding

  try {
    await Shirt.deleteMany();
    await Shirt.insertMany(shirts);
    mongoose.connection.close();
  } catch (error) {
    console.error("Error with data import", error);
    mongoose.connection.close();
  }
};

module.exports = importShirts;