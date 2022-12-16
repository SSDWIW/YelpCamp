const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 400; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20 + 10);
        const camp = new Campground({
            author: '639670fb38d764db1feea652',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)} `,
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus reiciendis dolor ipsum neque unde cumque sint laudantium, optio soluta voluptatem blanditiis sed rem molestiae fugiat aliquid mollitia temporibus cupiditate ipsa?',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/drcrzcngp/image/upload/v1670902914/YelpCamp/whkx2ip9ci2au5ep9nbx.jpg',
                    filename: 'YelpCamp/whkx2ip9ci2au5ep9nbx',
                },
                {
                    url: 'https://res.cloudinary.com/drcrzcngp/image/upload/v1670902925/YelpCamp/xfjjtnn1gqbjzfl9hra6.jpg',
                    filename: 'YelpCamp/xfjjtnn1gqbjzfl9hra6',
                },
                {
                    url: 'https://res.cloudinary.com/drcrzcngp/image/upload/v1670902930/YelpCamp/hsije3nam7hhu3ijdpio.jpg',
                    filename: 'YelpCamp/hsije3nam7hhu3ijdpio',
                }
            ],
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
});