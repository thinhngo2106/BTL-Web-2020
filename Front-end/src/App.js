import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/header";
import HeaderAdmin from "./components/HeaderAdmin";
import HomeScreen from "./views/HomeScreen";
import ProductScreen from "./views/ProductScreen";
import CartScreen from "./views/CartScreen";
import SearchScreen from "./views/SearchScreen";
import AdminRoute from "./components/AdminRoute";
import "./App.css";
import Footer from "./components/footer";
import SignupScreen from "./views/SignupScreen";
import SigninScreen from "./views/SigninScreen";
import ShippingAddressScreen from "./views/ShippingAddressScreen";
import PaymentScreen from "./views/PaymentScreen";
import PlaceOrderScreen from "./views/PlaceOrderScreen";
import OrderHistoryScreen from "./views/OrderHistoryScreen";
import AdminScreen from "./views/AdminScreen";
import { useSelector } from "react-redux";
import CategoryScreen from "./views/CategoryScreen";
import NavBar from "./components/navbar";
import Home from "./views/pages/Home";
import {OrdersManage} from "./views/pages/Orders";
import { Products, ProductsManage, AddProducts } from "./views/pages/Products";
import AdminSidebar from "./components/Admin_Sidebar";
import Users from "./views/pages/UsersManage";
import {ProductsTypeManage, AddProductsType,  EditCategoryScreen} from "./views/pages/ProductsType";
import {BrandsManage, AddBrands, EditBrandScreen} from "./views/pages/Brands";
import ProductEditScreen from './views/pages/EditProductScreen';
import OrderScreen from "./views/OrderScreen";

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  return (
    <Router>
      <div>
        {userInfo && userInfo.isAdmin ? (
          <div>
            <HeaderAdmin />
          </div>
        ) : (
          <div>
            <Header />
            <NavBar></NavBar>
          </div>
        )}
        <main>
         
          {userInfo && userInfo.isAdmin ? (
            <>
              <div className="row">
                <AdminSidebar></AdminSidebar>
                <div className="row contentInside">
                  <Switch>
                    <AdminRoute path="/" component={AdminScreen} exact ></AdminRoute>
                    <AdminRoute path="/ordersManage" exact component={OrdersManage}></AdminRoute>
                    <AdminRoute path="/products" exact component={Products}></AdminRoute>
                    <AdminRoute path="/products/productsManage" exact component={ProductsManage}></AdminRoute>
                    <AdminRoute path="/products/addProducts" exact component={AddProducts}></AdminRoute>
                    <AdminRoute path="/:id/edit" component={ProductEditScreen}></AdminRoute>
                    <AdminRoute path="/usersManage" exact component={Users}></AdminRoute>
                    <AdminRoute path="/productsType/productsTypeManage" exact component={ProductsTypeManage}></AdminRoute>
                    <AdminRoute path="/productsType/addProductsType" exact component={AddProductsType}></AdminRoute>
                    <AdminRoute path="/productsType/:id/edit" exact component={EditCategoryScreen}></AdminRoute>\
                    <AdminRoute path="/brands/brandsManage" exact component={BrandsManage}></AdminRoute>
                    <AdminRoute path="/brands/addBrands" exact component={AddBrands}></AdminRoute>
                    <AdminRoute path="/brands/:id/edit" exact component={EditBrandScreen}></AdminRoute>
                    <Route path="/order/:id" component={OrderScreen}></Route>
                  </Switch>
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <Switch>
                  <Route path="/cart/:id?" component={CartScreen}></Route>
                  <Route path="/" component={HomeScreen} exact></Route>
                  <Route
                    path="/product/:id"
                    component={ProductScreen}
                    exact
                  ></Route>
                  <Route path="/search" component={SearchScreen}></Route>
                  <Route path="/signin" component={SigninScreen}></Route>
                  <Route path="/register" component={SignupScreen}></Route>
                  <Route
                    path="/shipping"
                    component={ShippingAddressScreen}
                  ></Route>
                  <Route
                    path="/placeorder"
                    component={PlaceOrderScreen}
                  ></Route>
                  <Route
                    path="/orderhistory"
                    component={OrderHistoryScreen}
                  ></Route>
                  <Route path="/category" component={CategoryScreen}></Route>
                  <Route path="/order/:id" component={OrderScreen}></Route>
                </Switch>
              </div>
            </>
          )}
           
        </main>

        <Footer />
      </div>
    </Router>
  );
}
export default App;


