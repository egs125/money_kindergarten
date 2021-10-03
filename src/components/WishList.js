

import React from 'react';
import { IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import * as cm from 'share/common';

const WishList = ({
  curWishList,
  actionHandler,
  showDelBtn,
  deleteWishList,
  onEventHandler
}) => (
  <>
    <div className="item-list-container">
    { Array.isArray(curWishList) &&
      curWishList.map((item, index) =>
        <div key={index} id={item.id} className="item-info-container" >
          <div
            className={`item-info${showDelBtn === item.id ? '-deletable' : ''}`}
            draggable
            onTouchStart={e => onEventHandler(e, item.id)}
            onTouchEnd={e => onEventHandler(e, item.id)}
            {...actionHandler}
          >
            <div className="item-text">
              {item.itemName}
            </div>
            <div>
              {`${cm.addComma(item.itemPrice)}원`}
            </div>
          </div>

          {showDelBtn && showDelBtn === item.id && (
            <div className="icon">
              <IconButton onClick={() => deleteWishList(item.id)}>
                <Delete />
              </IconButton>
            </div>
          )}
        </div>
      )}
    </div>
  </>
);

export default WishList;