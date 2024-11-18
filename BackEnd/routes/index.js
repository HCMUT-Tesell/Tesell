import productRouter from './product.route.js';
// import siteRouter from './site'
import userRouter from './user.route.js';


function initRouter(app) {
    app.use('/api/user', userRouter)
    app.use('/api/product', productRouter)
    // app.use('/api/order', orderRouter)
    // app.use('/', siteRouter)
}

export default initRouter;

