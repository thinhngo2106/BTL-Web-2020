import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {detailsOrder} from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';


export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
     
      dispatch(detailsOrder(orderId));}
  , [dispatch, orderId]);
  function numberWithCommas(order) {
    const x = order.orderdetails.reduce((a, c) => a + c.quantityOrder * c.priceEach,0);
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  function priceOrder(order){
    const x = order.orderdetails.reduce((a, c) => a + c.quantityOrder * c.priceEach,0);
    return x; 
  }
  function converToPrice(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  function sum(x,y) {
      const sum =  x + y;
      return sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>Đơn hàng {order.idOrder}</h1>
      <div className="order-detail row top">
        <div className="col-md-6 ">
          {/* <ul>
            <li> */}
              <div className="card card-body">
                <h2>Địa chỉ giao hàng</h2>
                <p>
                  <strong>Tên:</strong> {order.customerName} <br />
                  <strong>Địa chỉ: </strong> {order.address} <br />
                  <strong>Ngày đặt hàng: </strong> {order.orderDate}
                </p>
              </div>
            {/* </li>
            <li> */}
              <div className="card card-body">
                <h2>Thanh toán</h2>
                <p>
                  <strong>Phương thức thanh toán:</strong> {order.paymentMethod}
                </p>
              </div>
            {/* </li>
            <li> */}
              <div className="card card-body">
                <h2>Sản phẩm</h2>
                {/* <ul> */}
                  {order.orderdetails.map((item) => (
                    // <li key={item.idProduct}>
                    <div key={item.idProduct} className="card card-body">
                      <div className={`row orderItem ${item.product}`}>
                        <div className="col-md-6">
                          <div>
                            <img
                              src={item.product.productdetails[0].image}
                              alt={item.product.productName}
                              className="small1"
                            ></img>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="min-30">
                            <Link to={`/product/${item.idProduct}`}>
                              {item.product.productName}
                            </Link>
                          </div>
                          <div>
                            {item.quantityOrder} x {converToPrice(item.priceEach)}₫ = {converToPrice(item.quantityOrder * item.priceEach)}₫
                          </div>
                        </div>
                        </div>
                      </div>
          
                    //</li>
                    ))}
                {/* </ul> */}
              </div>
            {/* </li> */}
          {/* </ul> */}
        </div>
        <div className="col-md-3">
          <div className="card card-body">
            <div className="row">
            {/* <ul>
              <li> */}
                <h2>Chi tiết đơn hàng</h2>
              {/* </li>
              <li> */}
              <div className="col-md-8">
                <div className="row"> 
                  <div><p>Tiền hàng: {numberWithCommas(order)}₫ </p></div>
                  
                </div>
              {/* </li>
              <li> */}
                <div className="row">
                  <div><p>Tiền vận chuyển: {order.shippingPrice}₫ </p></div>
                  
                </div>
              {/* </li>
              <li> */}
                <div className="row">
                  <div>
                    <strong> <p>Tổng tiền: {sum(parseInt(priceOrder(order)), parseInt(order.shippingPrice))} ₫</p></strong>
                  </div>
                </div>
              {/* </li>
            </ul> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}