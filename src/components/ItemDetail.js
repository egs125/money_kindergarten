import React from 'react';
import { TextField, Button, FormControl, InputLabel, NativeSelect } from '@material-ui/core';

const ItemDetail = ({ type, item, onChangeItem, onClickPrevBtn, onClickSubmitBtn }) => (
  <div className="item-container">
    <div className="item-detail">
      {type === 'incomes' ? (
        <>
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="item-type-native">
              구분
            </InputLabel>
            <NativeSelect
              defaultValue={30}
              inputProps={{
                name: 'itemType',
                id: 'item-type-native',
              }}
              onChange={onChangeItem}
            >
              <option value="salary">급여</option>
              <option value="financial">금융 수입</option>
              <option value="etc">기타 수입</option>
            </NativeSelect>
          </FormControl>
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
      ): (
        <>
          <TextField
            required
            name="itemName"
            label="품목명"
            value={item.itemName}
            onChange={onChangeItem}
          />
          <TextField
            required
            name="itemPrice"
            label="금액"
            value={item.itemPrice}
            onChange={onChangeItem}
          />
          <TextField
            name="priority"
            label="우선순위"
            value={item.priority}
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
