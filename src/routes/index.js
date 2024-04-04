import HomePage from '../Pages/HomePage/HomePage'
import OrderPage from '../Pages/OrderPage/OrderPage'
import ProductsPage from '../Pages/ProductsPage/ProductsPage'
import NotFoundPage from '../Pages/NotFoundPage/NotFoundPage'
import TypeProductsPage from '../Pages/TypeProductsPage/TypeProductsPage'
import SignInPage from '../Pages/SignInPage/SignInPage'
import SignUpPage from '../Pages/SignUpPage/SignUpPage'
import ProductDetailPage from '../Pages/ProductDetailPage/ProductDetailPage'

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
        path: '/:type',
        page: TypeProductsPage,
        isShowHeader: true
    },
    {
        path: '/sign-in',
        page: SignInPage,
        isShowHeader: false
    },
    {
        path: '/sign-up',
        page: SignUpPage,
        isShowHeader: false
    },
    {
        path: '/product-details',
        page: ProductDetailPage,
        isShowHeader: true
    },
    {
        path: '*',
        page: NotFoundPage
    },
]