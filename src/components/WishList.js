import React from 'react';
import * as cm from 'share/common';

const Wish = ({ item, actionHandler }) => {
  return (
    <div className="wish-item" {...actionHandler}>
      {`${item.itemName}, ${cm.addComma(item.itemPrice)}원`}
    </div>
  );
};

const WishList = ({ curMonth, totalWishAmount, curWishList, actionHandler }) => {
  
  return (
    <>
      <div className="page-title">
        {cm.trimMonth(curMonth)}월 장바구니
      </div>
      <div className="total-amount">
        {cm.addComma(totalWishAmount)}원
      </div>
      {Array.isArray(curWishList) &&
        curWishList.map((item, index) => <Wish key={index} item={item} actionHandler={actionHandler} />)
      }
    </>
  );
};

export default WishList;