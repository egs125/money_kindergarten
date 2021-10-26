import React from 'react';
import {
  TextField, Button, FormControl, InputLabel, NativeSelect,
} from '@material-ui/core';
// import moment from "moment";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/src/stylesheets/datepicker.scss";
import ko from 'date-fns/locale/ko';
registerLocale('ko', ko);

const ItemDetail = ({
  type, item,
  onChangeItem, onChangeDate,
  onClickPrevBtn, onClickSubmitBtn,
}) => (
  <div className="item-container">
    <div className="item-detail">
      {type === 'expense' ? (
        <>
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="item-type-native">
              구분
            </InputLabel>
            <NativeSelect
              defaultValue="mart"
              value={item.itemType}
              inputProps={{
                name: 'itemType',
                id: 'item-type-native',
              }}
              onChange={onChangeItem}
            >
              <option value="mart">마트</option>
              <option value="dineout">외식</option>
              <option value="leisure">여가</option>
              <option value="etc">기타</option>
            </NativeSelect>
          </FormControl>
          <TextField
            required
            name="itemPrice"
            label="금액"
            value={item.itemPrice}
            onChange={onChangeItem}
          />
          <DatePicker
            locale="ko"
            selected={item.date}
            onChange={onChangeDate}
            dateFormat="yyyy-MM-dd"
            customInput={<TextField label="일자" />}
            popperModifiers={{ 
              preventOverflow: { enabled: true, },
            }}
            popperPlacement="auto"
          />
          <TextField
            name="remark"
            label="비고"
            value={item.remark}
            onChange={onChangeItem}
          />
        </>
      ): (
        <>
          <TextField
            required
            name="itemAmount"
            label="금액"
            value={item.itemAmount}
            onChange={onChangeItem}
          />
          <TextField
            name="remark"
            label="비고"
            value={item.remark}
            onChange={onChangeItem}
          />
        </>
      )}
    </div>
    
    <div className="item-btn-area">
      <Button
        variant="contained"
        onClick={onClickPrevBtn}
      >
        돌아가기
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={onClickSubmitBtn}
      >
        저장
      </Button>
    </div>
  </div>
);

export default ItemDetail;
