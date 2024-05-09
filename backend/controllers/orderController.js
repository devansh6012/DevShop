import Order from "../models/orderModel.js";

// create new order
// POST /api/orders
// access: Private
const addOrderItems =  async (req, res) => {
    const { orderItems, totalPrice } = req.body;
    console.log(orderItems);

    const order = new Order({
        orderItems: orderItems.map((x) => ({
            ...x,
            product: x._id,
            _id: undefined
        })),
        totalPrice: totalPrice,
        user: req.user._id
    })

    const createOrder = await order.save()
    res.status(201).json(createOrder)
};


// Get logged in users order
// GET /api/orders/myorders
// access: Private
const getMyOrders =  async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders);
};


// get order by id
// GET /api/orders/:id
// access: Private
const getOrderById =  async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name emmail');
    if(order) {
        res.status(200).json(order);
    }
    else{
        res.status(404);
        throw new Error('Order not found')
    }
};


// Get all orders
// GET /api/orders
// access: Private/Admin
const getOrders =  async (req, res) => {
    res.send('get all orders')
};

export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    getOrders
}