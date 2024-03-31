import HomePage from '../Pages/HomePage/HomePage'
import OrderPage from '../Pages/OrderPage/OrderPage'
import ProductsPage from '../Pages/ProductsPage/ProductsPage'
import NotFoundPage from '../Pages/NotFoundPage/NotFoundPage'

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true
    },
    {
        path: '/products',
        page: ProductsPage,
        isShowHeader: true
    },
    {
        path: '*',
        page: NotFoundPage
    },
]