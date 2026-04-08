require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected for Seeding'))
  .catch(err => console.log(err));

const seedProducts = [
  {
    name: 'Laptop',
    price: 999,
    quantity: 10,
    description: 'High-performance laptop for work and play.'
  },
  {
    name: 'Wireless Mouse',
    price: 25,
    quantity: 50,
    description: 'Ergonomic wireless mouse.'
  },
  {
    name: 'Keyboard',
    price: 45,
    quantity: 30,
    description: 'Mechanical keyboard with backlight.'
  }
];

const seedDB = async () => {
  try {
    await Product.deleteMany({}); // Clear existing data
    await Product.insertMany(seedProducts);
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();
