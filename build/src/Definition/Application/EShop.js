var EShop = {
    id: Number,
    name: String,
    serviceConnections: [{
            serviceType: String,
            dateCreated: Date,
            info: Object
        }],
    url: String,
    dateCreated: Date
};
module.exports = EShop;
