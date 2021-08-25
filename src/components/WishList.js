import React from 'react';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import * as cm from 'share/common';

const Wish = ({ item, actionHandler, showDelBtn, deleteWishList, onEventHandler }) => {
  return (
    <div id={item.id} className="wish-item" >
      <div
        className={`wish-info${showDelBtn === item.id ? '-deletable' : ''}`}
        draggable
        onClick={e => onEventHandler(e, item.id)}
        onDoubleClick={e => onEventHandler(e, item.id)}
        onDragEnd={e =>  onEventHandler(e, item.id)}
        {...actionHandler}
      >
        <div className="name">
          {item.itemName}
        </div>
        <div className="price">
          {`${cm.addComma(item.itemPrice)}원`}
        </div>
      </div>
      
      {showDelBtn && showDelBtn === item.id && (
        <div className="icon">
          <IconButton onClick={() => deleteWishList(item.id)}>
            <DeleteIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
};

const WishList = ({
  curMonth, totalWishAmount, curWishList, actionHandler, showDelBtn, deleteWishList,
  onEventHandler
}) => {
  
  return (
    <>
      <div className="page-title">
        {cm.trimMonth(curMonth)}월 장바구니
      </div>
      <div className="total-amount">
        {cm.addComma(totalWishAmount)}원
      </div>
      {Array.isArray(curWishList) &&
        curWishList.map((item, index) =>
          <Wish
            key={index}
            item={item}
            actionHandler={actionHandler}
            showDelBtn={showDelBtn}
            deleteWishList={deleteWishList}
            onEventHandler={onEventHandler}
          />
        )
      }
    </>
  );
};

export default WishList;