import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from './pages/Home';
import * as ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageTitle from './components/PageTitle';
import Details from './pages/Details';
import Dashboard from './pages/Dashboard';
import CartPage from './pages/CartPage';
import Layout from './pages/Layouts/Layout';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import About from './pages/About';
import Statistics from './pages/Statistics';
import NotFound from './pages/Notfound';
import CartContext from './context/CartStorage';
import RegisterPage from './pages/Register';
import ProtectedRoute from './ProtectedRoute';
import { RedirectRoute } from './pages/RedirectRoute';
import Tutors from './pages/Tutors';
import TutorDetails from './pages/TutorDetails';
import MyBookedTutors from './pages/MyBookedTutors';
import AddTutorial from './pages/AddTutorial';
import MyTutorials from './pages/MyTutorials';
import FindTutorials from './pages/FindTutorials';
import AddTutorForm from './pages/AddTutorForm';
import UpdateTutorials from './pages/UpdateTutorials';

function App() {


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,

      children: [
        {
          path: "/",
          element: (
            <PageTitle title="Home">
              <Home />
            </PageTitle>
          ),
        },
        {
          path: "find-tutors",
          element: (
            <PageTitle title="our tutors">
              <Tutors />
            </PageTitle>
          ),
        },
        {
          path: "add-tutorials",
          element: (
            <PageTitle title="Add tutorials">
              <ProtectedRoute>
                <AddTutorial />
              </ProtectedRoute>
            </PageTitle>
          ),
        },
        {
          path: "my-booked-tutors",
          element: (
            <PageTitle title="All My tutorials">
              <ProtectedRoute>
                <MyBookedTutors />
              </ProtectedRoute>
            </PageTitle>
          ),
        },
        {
          path: "/add",
          element: (
            <PageTitle title="Home">
              <AddTutorForm />
            </PageTitle>
          ),
        },
        {
          path: "details/:id",
          element: (
            <ProtectedRoute>
              <Details />
            </ProtectedRoute>
          ),
        },
        {
          path: "totorials",
          element: (
            <PageTitle title="All totorials">
              <div>all totorials </div>
            </PageTitle>
          ),
        },
        {
          path: "my-tutorials",
          element: (
            <PageTitle title="All Tutorials">
              <ProtectedRoute>
                <MyTutorials />
              </ProtectedRoute>
            </PageTitle>
          ),
        },
        {
          path: "update-tutorial/:id",
          element: (
            <PageTitle title="All totorials">
              <UpdateTutorials />
            </PageTitle>
          ),
        },


        {
          path: "find-tutors/:category",
          element: (
            <PageTitle title="find Tutorials">
              <ProtectedRoute>
                <FindTutorials />
              </ProtectedRoute>
            </PageTitle>
          ),
        },

        {
          path: "tutor/:id",
          element: (

            <ProtectedRoute>
              <TutorDetails />
            </ProtectedRoute>

          ),
        },
      
        {
          path: "update/:id",
          element: (
            <ProtectedRoute>

              <updatedTutoriall />
            </ProtectedRoute>

          ),
        },
        {
          path: "/login",
          element: (<PageTitle title="Login">
            <RedirectRoute>
            <Login />
            </RedirectRoute>
          </PageTitle>),
        },
        {
          path: "/register",
          element: (<PageTitle title="Register">
            <RegisterPage />
          </PageTitle>),
        },



      ],
    },



    {
      path: "*",
      element: (
        <PageTitle title="404 Not Found">
          <NotFound />
        </PageTitle>
      ),
    },

  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
