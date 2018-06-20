<template>
  <div class="hello">
    <!--对话框部分-->
    <!--新增-->
    <el-dialog
      :title="fatherNodeName"
      :visible.sync="dialogVisibleAdd"
      width="30%"
      :before-close="handleClose">
      <!--<div style="margin-top: 15px;" v-if="fatherNodeType==='总平台'">-->
      <!--<el-form :inline="true" class="demo-form-inline">-->

      <!--<el-form-item label="子节点类型">-->
      <!--<el-select v-model="childNodeType" placeholder="子节点类型" size="medium">-->
      <!--<el-option-->
      <!--v-for="item in optionsTP"-->
      <!--:key="item.value"-->
      <!--:label="item.label"-->
      <!--:value="item.value">-->
      <!--</el-option>-->
      <!--</el-select>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="子节点名称">-->
      <!--<el-input placeholder="子节点名称" v-model="childNodeName" class="input-with-select">-->
      <!--</el-input>-->
      <!--</el-form-item>-->
      <!--</el-form>-->

      <!--</div>-->
      <div style="margin-top: 15px;" v-if="fatherNodeType==='平台'">
        <div style="width: 40%;margin: 0 auto;">
          <el-select v-model="childNodeType" placeholder="子节点类型" size="medium">
            <el-option
              v-for="item in optionsCP"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input placeholder="子节点名称" v-model="childNodeName" class="input-with-select">
          </el-input>
        </div>
      </div>
      <div style="margin-top: 15px;" v-if="fatherNodeType==='企业'||fatherNodeType==='部门'">
        <div style="width: 40%;margin: 0 auto;">
          <el-select v-model="childNodeType" placeholder="子节点类型" size="medium">
            <el-option
              v-for="item in optionsCom"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input placeholder="子节点名称" v-model="childNodeName" class="input-with-select">
          </el-input>
        </div>
      </div>
      <div style="margin-top: 15px;" v-if="fatherNodeType==='散客'">
        <div style="width: 40%;margin: 0 auto;">
          <div>不能给{{fatherNodeName}}添加子节点！</div>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addNodeItem">确 定</el-button>
      </span>
    </el-dialog>

    <!--修改-->
    <el-dialog
      title="修改名称"
      :visible.sync="dialogVisibleChange"
      width="30%"
      :before-close="handleClose">

      <div style="margin-top: 15px;">

        <el-input placeholder="子节点名称" v-model="fatherNodeName" class="input-with-select">
        </el-input>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleChange = false">取 消</el-button>
        <el-button type="primary" @click="changeNodeItem">确 定</el-button>
      </span>
    </el-dialog>

    <!--删除-->
    <el-dialog
      title="删除"
      :visible.sync="dialogVisibleDelete"
      width="30%"
      :before-close="handleClose">

      <div style="margin-top: 15px;">
        <div>确定要删除{{fatherNodeName}}吗？</div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleDelete = false">取 消</el-button>
        <el-button type="primary" @click="deleteNodeItem">确 定</el-button>
      </span>
    </el-dialog>

    <!--表格的新增数据-->
    <el-dialog
      title="表格信息"
      :visible.sync="dialogVisibleTableAdd"
      width="30%"
      :before-close="handleClose">

      <div style="margin-top: 15px;">
        <el-input placeholder="姓名" v-model="tableName" class="input-with-select">
        </el-input>
        <el-input placeholder="日期" v-model="tableDate" class="input-with-select">
        </el-input>
        <el-input placeholder="地址" v-model="tableAddress" class="input-with-select">
        </el-input>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleTableAdd = false">取 消</el-button>
        <el-button type="primary" @click="addTableItem">确 定</el-button>
      </span>
    </el-dialog>

    <!--表格修改数据-->
    <el-dialog
      title="表格信息"
      :visible.sync="dialogVisibleTableAdd"
      width="30%"
      :before-close="handleClose">

      <div style="margin-top: 15px;">
        <el-input placeholder="姓名" v-model="tableName" class="input-with-select">
        </el-input>
        <el-input placeholder="日期" v-model="tableDate" class="input-with-select">
        </el-input>
        <el-input placeholder="地址" v-model="tableAddress" class="input-with-select">
        </el-input>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleTableAdd = false">取 消</el-button>
        <el-button type="primary" @click="changeTableItem">确 定</el-button>
      </span>
    </el-dialog>


    <!--表格删除-->
    <el-dialog
      title="删除"
      :visible.sync="dialogVisibleTableDelete"
      width="30%"
      :before-close="handleClose">

      <div style="margin-top: 15px;">
        <div>确定要删除{{tableName}}的信息吗？</div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleTableDelete = false">取 消</el-button>
        <el-button type="primary"  @click="deleteTableItem">确 定</el-button>
      </span>
    </el-dialog>

    <!--左侧树结构-->
    <el-row>
      <el-col :span="5">
        <el-card class="box-card">
          <div slot="header" style="height: 30px;">
            <el-row>
              <el-col :span="4">组织列表</el-col>
              <el-col :span="20">
                <el-row v-if="fatherNodeName">
                  <el-button type="info" plain size="mini" @click="dialogVisibleAdd = true">新增</el-button>
                  <el-button type="warning" plain size="mini" @click="dialogVisibleChange = true">修改</el-button>
                  <el-button type="danger" plain size="mini" @click="dialogVisibleDelete = true">删除</el-button>
                </el-row>
              </el-col>
            </el-row>

          </div>
          <div>
            <el-tree
              :data="treeList"
              node-key="id"
              default-expand-all
              @node-click="nodeClick"
              :expand-on-click-node="false">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span>{{ data.fName }} （{{ data.fType }} ）</span>
              </span>
            </el-tree>
          </div>
        </el-card>
      </el-col>

      <!--右侧主体部分-->
      <el-col :span="19">
        <el-card class="box-card">
          <div slot="header" style="height: 30px;">
            <el-row>
              <el-col :span="2" v-show="fatherNodeType">
                <el-row>
                  <el-button type="info" plain
                             @click="tableDate='';tableName='';tableAddress='';dialogVisibleTableAdd = true">新增
                  </el-button>
                </el-row>
              </el-col>
              <el-col :span="11">{{fatherNodeType}}</el-col>
              <el-col :span="11">{{fatherNodeName}}</el-col>
            </el-row>

          </div>
          <div>
            <el-table
              :data="tableList" @row-click="rowClick">
              <el-table-column
                align="center"
                prop="date"
                label="日期"
                width="180">
              </el-table-column>
              <el-table-column
                align="center"
                prop="name"
                label="姓名"
                width="180">
              </el-table-column>
              <el-table-column
                align="center"
                prop="address"
                label="地址">
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑
                  </el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>

      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {organization} from "../service/service";

  export default {
    name: 'organization',
    data() {
      return {
        // 查询表格数据的参数
        nodeIp: '',

        //表格每一行数据的唯一ID
        tableIp: '',

        tableDate: '',
        tableName: '',
        tableAddress: '',
        dialogVisibleTableAdd: false,
        dialogVisibleTableChange: false,
        dialogVisibleTableDelete: false,
        dialogVisibleAdd: false,
        dialogVisibleChange: false,
        dialogVisibleDelete: false,
        fatherNodeType: '',
        fatherNodeName: '',
        childNodeType: '',
        childNodeName: '',
        treeList: [],
        addItem: '',
        optionsTP: [{
          value: '子平台',
          label: '子平台'
        }, {
          value: '企业',
          label: '企业'
        }],
        optionsCP: [{
          value: '部门',
          label: '部门'
        }, {
          value: '企业',
          label: '企业'
        }],
        optionsCom: [{
          value: '部门',
          label: '部门'
        }],
        tableList: []
      }
    },

    methods: {
      // 节点数据的增改删
      deleteNodeItem: async function () {
        this.dialogVisibleDelete = false;
        await organization.deleteNodeItem(this.nodeIp);
        this.getCharacterList();
      },

      changeNodeItem: async function () {
        this.dialogVisibleChange = false;
        let param = {nodeIp: this.nodeIp, nodeName: this.fatherNodeName}
        await organization.changeNodeItem(param);
        this.getCharacterList();
      },

      addNodeItem: async function () {
        this.dialogVisibleAdd = false;
        let param = {nodeIp: this.nodeIp, nodeName: this.childNodeName, nodeType: this.childNodeType}
        await organization.addNodeItem(param);
        this.getCharacterList();
      },

      // 表格数据的增改删
      deleteTableItem: async function () {
        this.dialogVisibleTableDelete = false;
        await organization.deleteTableItem(this.tableIp);
        this.getTableList();
      },

      changeTableItem: async function () {
        this.dialogVisibleTableChange = false;
        let param = {tableIp: this.tableIp, tableValue: {}}
        await organization.changeTableItem(param);
        this.getTableList();
      },

      addTableItem: async function () {
        this.dialogVisibleTableAdd = false;
        let param = {tableIp: this.tableIp, tableValue: {}}
        await organization.addTableItem(param);
        this.getTableList();
      },


      nodeClick(data, node) {
        console.info(data)
        console.info(node)
        this.fatherNodeType = data.fType;
        this.fatherNodeName = data.fName;
        this.nodeIp = data.fId;
        this.getTableList();
      },

      rowClick(row, event, column) {
        console.log(row);
        this.tableDate = row.date;
        this.tableName = row.name;
        this.tableAddress = row.address;
      },

      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },

      handleEdit(index, row) {
        this.dialogVisibleTableAdd = true;
        console.log(index, row);
      },
      handleDelete(index, row) {
        this.dialogVisibleTableDelete = true;
        console.log(index, row);
      },

      //模拟从接口获取数据
      getTreeList: async function () {

        // let res = await organization.getOrganizationList()
        // if(res.success){
        //   this.treeList = res.obj;
        // }

        this.treeList = [
          {
            "fCode": "4590a31c63a24f7587f8b0d49e55b18a",
            "fPCode": "",
            "children": [
              {
                "fCode": "780fc44a80314039b9a4682c375ca5a0",
                "fPCode": "4590a31c63a24f7587f8b0d49e55b18a",
                "children": null,
                "fId": "780fc44a80314039b9a4682c375ca5a0",
                "fName": "舒客专车",
                "fType": "平台"
              }
            ],
            "fId": "4590a31c63a24f7587f8b0d49e55b18a",
            "fName": "面对面出行",
            "fType": "平台"
          }
        ]

      },

      getTableList: async function () {
        // let res = await organization.getTableList(this.nodeIp)
        // if(res.success) {
        //   this.tableList = res.obj;
        // }
        this.tableList = [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }



      // setItem() {
      //   let newChild = { id: id++, label: this.addItem, children: [] };
      //
      //   if (!this.thisLabel.children) {
      //     this.$set(this.thisLabel, 'children', []);
      //   }
      //   this.thisLabel.children.push(newChild);
      //   this.dialogVisible = false;
      //   console.log(this.addItem);
      //   let that = this;
      //   setTimeout(function(){
      //     that.organization = [{
      //       id: 1,
      //       label: '总平台',
      //       children: [{
      //         id: 4,
      //         label: '子平台',
      //         children: [{
      //           id: 9,
      //           label: '企业'
      //         }, {
      //           id: 10,
      //           label: '部门'
      //         }, {
      //           id: 11,
      //           label: '散客'
      //         }]
      //       },{ id: 2,
      //         label: '企业',
      //         children:[{
      //           id: 5,
      //           label: '部门'
      //         }]
      //       },{id: 3,
      //         label: '散客'
      //       }]
      //     }];
      //   }, 10000)
      //
      // },

      // append(data) {
      //   this.thisLabel = data;
      //   if (data.label == "部门") {
      //     this.addItem = "部门"
      //   } else if(data.label == "总平台"){
      //     this.addItem = "";
      //     this.dialogVisible = true;
      //   }
      // },
      //
      // remove(node, data) {
      //   const parent = node.parent;
      //   const children = parent.data.children || parent.data;
      //   const index = children.findIndex(d => d.id === data.id);
      //   children.splice(index, 1);
      // },
    },
    created() {
      this.getTreeList();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  h3 {
    color: #3791ff;
    text-align: left;
    margin-left: 30px;
    font-weight: lighter;
  }

  .box-card {
    font-size: 14px;
    height: 700px;
  }

  .input-with-select {
    margin-top: 10px;
  }


</style>
