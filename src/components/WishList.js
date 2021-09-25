

import React from 'react';
import { IconButton } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
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
            // onClick={e => onEventHandler(e, item.id)}
            // onDoubleClick={e => onEventHandler(e, item.id)}
            onTouchStart={e => onEventHandler(e, item.id)}
            onTouchEnd={e => onEventHandler(e, item.id)}
            {...actionHandler}
          >
            <div>
              {item.itemName}
            </div>
            <div>
              {`${cm.addComma(item.itemPrice)}원`}
            </div>
          </div>

          {showDelBtn && showDelBtn === item.id && (
            <div className="icon">
              {/* <IconButton onClick={() => deleteWishList(item.id)}>
                <Edit />
              </IconButton> */}

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