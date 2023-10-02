import Layout from '../component/layout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../pages/home'
import Block from '../pages/block'
import Transaction from '../pages/transaction'
import Address from '../pages/address'
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
            },
            {
                path: '/transaction/:id',
                element: <Transaction />,
            },
            {
                path: '/address/:id',
                element: < Address />,
            },
        ],
    },
])



function Route() {
    return <RouterProvider router={router} />
}

export default Route