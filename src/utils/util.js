export const getStorageName = (cate, id) => {
  if (!cate) {
    return '';
  }
  let storage = cate.find(s => s.id == id)
  return storage ? storage.name : '';
};

export const getProductName = (cate, id) => {
  if (!cate) {
    return '';
  }
  let product = cate.find(p => p.Prod_Id == id);
  return product ? product.Prod_Desc : '';
};