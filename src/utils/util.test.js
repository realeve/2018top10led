import * as util from './util';

test('获取品种名', () => {
  expect(util.getProductName()).toHaveLength(0);
  expect(
    util.getProductName(
      [
        {
          Prod_Id: 2,
          Prod_Desc: '9602A'
        }
      ],
      2
    )
  ).toBe('9602A');

  expect(
    util.getProductName(
      [
        {
          Prod_Id: 2,
          Prod_Desc: '9602A'
        }
      ],
      3
    )
  ).toHaveLength(0);
});
