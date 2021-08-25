import React from 'react';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import * as cm from 'share/common';

const WishList = ({
  curMonth,
  totalWishAmount,
  curWishList,
  actionHandler,
  showDelBtn,
  deleteWishList,
  onEventHandler
}) => (
  <>
    <div className="page-title">
      {cm.trimMonth(curMonth)}월 장바구니
    </div>
    <div className="total-amount">
      {cm.addComma(totalWishAmount)}원
    </div>
    <div className="wish-item-list">
    { Array.isArray(curWishList) &&
      curWishList.map((item, index) =>
        <div key={index} id={item.id} className="wish-item" >
          <div
            className={`wish-info${showDelBtn === item.id ? '-deletable' : ''}`}
            draggable
            onClick={e => onEventHandler(e, item.id)}
            onDoubleClick={e => onEventHandler(e, item.id)}
            onTouchStart={e => onEventHandler(e, item.id)}
            onTouchEnd={e => onEventHandler(e, item.id)}
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
      )}
    </div>
  </>
);

export default WishList;