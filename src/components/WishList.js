import React from 'react';
import * as cm from 'share/common';

const Wish = ({item}) => {
  return (
    <div>
      {`${item.name}, ${item.price}원`}
    </div>
  );
};

const WishList = ({ curMonth, totalWishAmount, curWishList }) => {
  
  return (
    <>
      <div className="page-title">
        {cm.trimMonth(curMonth)}월 장바구니
      </div>
      <div className="total-amount">
        {totalWishAmount}원
      </div>
      {curWishList.map((item, index) => <Wish key={index} item={item} />)}
    </>
  );
};

export default WishList;