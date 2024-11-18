import productRouter from './product.route.js';
// import siteRouter from './site'
import categoryRouter from './category.route.js';
import orderDetailRouter from './orderDetail.route.js';
import userRouter from './user.route.js';


function initRouter(app) {
    app.use('/api/user', userRouter)
    app.use('/api/product', productRouter)
    app.use('/api/category', categoryRouter)
    app.use('/api/orderDetail', orderDetailRouter)
    // app.use('/', siteRouter)
}

export default initRouter;

