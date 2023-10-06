import Layout from '../component/layout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../pages/home'
import Block from '../pages/block'
import Transaction from '../pages/transaction'
import Address from '../pages/address'
import Token from '../pages/token'
import Blocks from '../pages/blocks'
import Transactions from '../pages/transactions'
import Error from '../pages/error'
//All routes of the application are defined here

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />,

            },
            {
                path: '/block/:id',
                element: <Block />,
                errorElement: <Error />
            },
            {
                path: '/transaction/:id',
                element: <Transaction />,
                errorElement: <Error />
            },
            {
                path: '/address/:id',
                element: < Address />,
                errorElement: <Error />
            },
            {
                path: '/token/:id',
                element: <Token />,
                errorElement: <Error />
            },
            {
                path: '/blocks',
                element: <Blocks />,
            },
            {
                path: '/transactions',
                element: <Transactions />,
            },
            {
                path: '*',
                element: <Error />,
            }
        ],
    },
])



function Route() {
    return <RouterProvider router={router} />
}

export default Route