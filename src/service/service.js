import request from '../lib/request';

export const organization = {
  //获取数据
  getOrganizationList: () => request.get('/123'),
  getTableList: (param) => request.post('/111',param),

  // 表格数据的增改删
  deleteTableItem: (param) => request.post('/333',param),
  changeTableItem: (param) => request.post('/555',param),
  addTableItem: (param) => request.post('/666',param),

  //节点数据的增改删
  deleteNodeItem: (param) => request.post('/333',param),
  changeNodeItem: (param) => request.post('/555',param),
  addNodeItem: (param) => request.post('/666',param),
}

export const character = {
  //获取数据
  getCharacterList: () => request.get('/789'),
  getAuthorityList: (param) => request.post('/000',param),

  //节点数据的增改删
  deleteNodeItem: (param) => request.post('/333',param),
  changeNodeItem: (param) => request.post('/555',param),
  addNodeItem: (param) => request.post('/666',param),

  //权限树选中数据更新
  selectNode: (param) => request.post('/333',param),

}



