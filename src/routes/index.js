import HomePage from '../Pages/HomePage/HomePage'
import OrderPage from '../Pages/OrderPage/OrderPage'
import ProductsPage from '../Pages/ProductsPage/ProductsPage'
import NotFoundPage from '../Pages/NotFoundPage/NotFoundPage'
import OrderSucess from '../Pages/OrderSucess/OrderSucess'
import TypeProductsPage from '../Pages/TypeProductsPage/TypeProductsPage'
import SignInPage from '../Pages/SignInPage/SignInPage'
import SignUpPage from '../Pages/SignUpPage/SignUpPage'
import ProductDetailPage from '../Pages/ProductDetailPage/ProductDetailPage'
import ProfilePage from '../Pages/ProfilePage/ProfilePage'
import AdminPage from '../Pages/AdminPage/AdminPage'
import MyOrderPage from '../Pages/MyOrderPage/MyOrderPage'
import PaymentPage from '../Pages/PaymentPage/PaymentPage'
import DetailsOrderPage from '../Pages/DetailsOrderPage/DetailsOrderPage'

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
        path: '/my-order',
        page: MyOrderPage,
        isShowHeader: true
    },
    {
        path: '/details-order/:id',
        page: DetailsOrderPage,
        isShowHeader: true
    },
    {
        path: '/payment',
        page: PaymentPage,
        isShowHeader: true
    },
    {
        path: '/orderSuccess',
        page: OrderSucess,
        isShowHeader: true
    },
    {
        path: '/products',
        page: ProductsPage,
        isShowHeader: true
    },
    {
        path: '/product/:type',
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
        path: '/product-details/:id',
        page: ProductDetailPage,
        isShowHeader: true
    },
    {
        path: '/profile-user',
        page: ProfilePage,
        isShowHeader: true
    },
    {
        path: '/system/admin',
        page: AdminPage,
        isShowHeader: false,
        isPrivated: true
    },
    {
        path: '*',
        page: NotFoundPage
    }
]