<template>
  <div class="hello">
    <!--对话框-->
    <!--新增-->
    <el-dialog
      :title="fatherNodeLabel"
      :visible.sync="dialogVisibleAdd"
      width="30%"
      :before-close="handleClose">

      <div style="margin-top: 15px;" v-if="fatherNodeLabel!=='散客'">

        <el-input placeholder="子节点角色名称" v-model="childNodeLabel" class="input-with-select">
        </el-input>
      </div>
      <div style="margin-top: 15px;" v-if="fatherNodeLabel==='散客'">
        <div>不能给散客添加子节点！！</div>
      </div>


      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAdd = false">取 消</el-button>
        <el-button type="primary"  @click="addNodeItem">确 定</el-button>
      </span>
    </el-dialog>

    <!--修改-->
    <el-dialog
      title="修改节点名称"
      :visible.sync="dialogVisibleChange"
      width="30%"
      :before-close="handleClose">

      <div style="margin-top: 15px;">

        <el-input placeholder="角色名称" v-model="fatherNodeLabel" class="input-with-select">
        </el-input>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleChange = false">取 消</el-button>
        <el-button type="primary"  @click="changeNodeItem">确 定</el-button>
      </span>
    </el-dialog>

    <!--删除-->
    <el-dialog
      title="删除"
      :visible.sync="dialogVisibleDelete"
      width="30%"
      :before-close="handleClose">

      <div style="margin-top: 15px;">
        <div>确定要删除{{fatherNodeLabel}}吗？</div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleDelete = false">取 消</el-button>
        <el-button type="primary"  @click="deleteNodeItem">确 定</el-button>
      </span>
    </el-dialog>

    <!--左侧树结构-->
    <el-row>
      <el-col :span="5">
        <el-card class="box-card">
          <div slot="header" style="height: 30px;">
            <el-row>
              <el-col :span="4">角色列表</el-col>
              <el-col :span="20">
                <el-row v-if="fatherNodeLabel">
                  <el-button type="info" plain size="mini" @click=" dialogVisibleAdd = true">新增</el-button>
                  <el-button type="warning" plain size="mini" @click="dialogVisibleChange = true">修改</el-button>
                  <el-button type="danger" plain size="mini" @click="dialogVisibleDelete = true">删除</el-button>
                </el-row>
              </el-col>
            </el-row>

          </div>
          <div>
            <el-tree
              :data="characterList"
              node-key="id"
              default-expand-all
              @node-click="nodeClick"
              :expand-on-click-node="false">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span>{{data.fRoleName}}</span>
              </span>
            </el-tree>
          </div>
        </el-card>
      </el-col>

      <!--右侧主体部分-->
      <el-col :span="19">
        <el-card class="box-card">
          <div slot="header">
            <el-row>
              <el-col :span="2" v-show="fatherNodeLabel">
                <el-button type="info" plain @click="selectNode">保存</el-button>
              </el-col>
              <el-col :span="11">{{fatherNodeLabel}}</el-col>
            </el-row>

          </div>
          <div style="margin-left: 10%;">
            <el-tree
              show-checkbox
              :data="authorityList"
              node-key="fCode"
              default-expand-all
              :default-checked-keys="checkedKeys"
              @node-click="nodeClick"
              :expand-on-click-node="false"
              @check="checkChange">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span>{{data.fMenuName}}</span>
              </span>
            </el-tree>
          </div>
        </el-card>

      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {character} from "../service/service";

  export default {

    name: "character",
    data() {
      return {
        // 权限树的查询参数
        nodeIp: '',

        checkedKeys: [],
        authorityList: [],
        characterList: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        dialogVisibleChange: false,
        dialogVisibleAdd: false,
        dialogVisibleDelete: false,
        fatherNodeLabel: '',
        childNodeLabel: '',

      }
    },
    methods: {
      // 保存权限节点选中数据,参数数组用扩展运算符计算
      selectNode: async function () {
        await character.selectNode(...this.authorityList);
        this.getAuthorityList();
      },

      deleteNodeItem: async function () {
        this.dialogVisibleDelete = false;
        await character.deleteNodeItem(this.nodeIp);
        this.getCharacterList();
      },

      changeNodeItem: async function () {
        this.dialogVisibleChange = false;
        let param = {nodeIp: this.nodeIp, nodeLabel: this.fatherNodeLabel}
        await character.changeNodeItem(param);
        this.getCharacterList();
      },

      addNodeItem: async function () {
        this.dialogVisibleAdd = false;
        let param = {nodeIp: this.nodeIp, nodeLabel: this.fatherNodeLabel, childNodeLabel: this.childNodeLabel}
        await character.addNodeItem(param);
        this.getCharacterList();
      },

      getCharacterList: async function () {
        // let res = await character.getCharacterList();
        // if (res.success) {
        //   this.characterList = res.obj;
        // }

        this.characterList = [
          {
            "fCode": "42d4c6271f114b908ab07886304040b7",
            "fPCode": "",
            "children": [
              {
                "fCode": "1a9e4c979659436c816cdf578a22116b",
                "fPCode": "42d4c6271f114b908ab07886304040b7",
                "children": [
                  {
                    "fCode": "10f6c9daf4b2462d867545e75d9858a5",
                    "fPCode": "1a9e4c979659436c816cdf578a22116b",
                    "children": null,
                    "fId": "10f6c9daf4b2462d867545e75d9858a5",
                    "fMenu": "204",
                    "fRoleName": "子账号",
                    "fPId": "1a9e4c979659436c816cdf578a22116b"
                  }
                ],
                "fId": "1a9e4c979659436c816cdf578a22116b",
                "fMenu": "4456908",
                "fRoleName": "旅行社",
                "fPId": "42d4c6271f114b908ab07886304040b7"
              },
              {
                "fCode": "64136b5650674c669a2932185509ae86",
                "fPCode": "42d4c6271f114b908ab07886304040b7",
                "children": null,
                "fId": "64136b5650674c669a2932185509ae86",
                "fMenu": "262348",
                "fRoleName": "散客",
                "fPId": "42d4c6271f114b908ab07886304040b7"
              },
              {
                "fCode": "087fbc64d2704b90be88ad25fb20a55f",
                "fPCode": "42d4c6271f114b908ab07886304040b7",
                "children": null,
                "fId": "087fbc64d2704b90be88ad25fb20a55f",
                "fMenu": "2097152",
                "fRoleName": "送机人员",
                "fPId": "42d4c6271f114b908ab07886304040b7"
              }
            ],
            "fId": "42d4c6271f114b908ab07886304040b7",
            "fMenu": "4194047",
            "fRoleName": "系统管理员",
            "fPId": ""
          }
        ]
      },

      getAuthorityList: async function () {
        // let res = await character.getAuthorityList(this.nodeIp)
        // if(res.success) {
        //   this.authorityList = res.obj;
        // }
        this.authorityList = [
          {
            "fCode": "01",
            "fPCode": "",
            "children": null,
            "fId": 1,
            "fMenuName": "首页",
            "fMenuIcon": "home",
            "fMenuUrl": "/index/homePage"
          },
          {
            "fCode": "02",
            "fPCode": "",
            "children": null,
            "fId": 2,
            "fMenuName": "下单",
            "fMenuIcon": "clipboard",
            "fMenuUrl": "/index/order"
          },
          {
            "fCode": "03",
            "fPCode": "",
            "children": [
              {
                "fCode": "0301",
                "fPCode": "03",
                "children": null,
                "fId": 6,
                "fMenuName": "结算单查询",
                "fMenuIcon": "",
                "fMenuUrl": "/index/statementQuery"
              },
              {
                "fCode": "0302",
                "fPCode": "03",
                "children": null,
                "fId": 7,
                "fMenuName": "用车查询",
                "fMenuIcon": "",
                "fMenuUrl": "/index/orderQuery"
              },
              {
                "fCode": "0304",
                "fPCode": "03",
                "children": null,
                "fId": 15,
                "fMenuName": "账户查询",
                "fMenuIcon": "",
                "fMenuUrl": "/index/platformAccount"
              },
              {
                "fCode": "0305",
                "fPCode": "03",
                "children": null,
                "fId": 19,
                "fMenuName": "账单查询",
                "fMenuIcon": "",
                "fMenuUrl": "/index/billQuery"
              },
              {
                "fCode": "0306",
                "fPCode": "03",
                "children": null,
                "fId": 21,
                "fMenuName": "送机查询",
                "fMenuIcon": "",
                "fMenuUrl": "/index/senPlanQuery"
              }
            ],
            "fId": 3,
            "fMenuName": "查询",
            "fMenuIcon": "search",
            "fMenuUrl": ""
          },
          {
            "fCode": "04",
            "fPCode": "",
            "children": [
              {
                "fCode": "0401",
                "fPCode": "04",
                "children": null,
                "fId": 5,
                "fMenuName": "企业管理",
                "fMenuIcon": "checkmark",
                "fMenuUrl": "/index/customerManagement"
              },
              {
                "fCode": "0402",
                "fPCode": "04",
                "children": null,
                "fId": 12,
                "fMenuName": "资质审核",
                "fMenuIcon": "",
                "fMenuUrl": "/index/aptitudeaudit"
              },
              {
                "fCode": "0403",
                "fPCode": "04",
                "children": null,
                "fId": 17,
                "fMenuName": "充值审核",
                "fMenuIcon": "",
                "fMenuUrl": "/index/audit"
              }
            ],
            "fId": 4,
            "fMenuName": "企业管理",
            "fMenuIcon": "person",
            "fMenuUrl": ""
          },
          {
            "fCode": "05",
            "fPCode": "",
            "children": [
              {
                "fCode": "0501",
                "fPCode": "05",
                "children": null,
                "fId": 9,
                "fMenuName": "用户管理",
                "fMenuIcon": "",
                "fMenuUrl": "/index/userManagement"
              },
              {
                "fCode": "0502",
                "fPCode": "05",
                "children": null,
                "fId": 10,
                "fMenuName": "围栏管理",
                "fMenuIcon": "",
                "fMenuUrl": "/index/fenceManagement"
              },
              {
                "fCode": "0503",
                "fPCode": "05",
                "children": null,
                "fId": 11,
                "fMenuName": "参数管理",
                "fMenuIcon": "",
                "fMenuUrl": "/index/parameterManagement"
              },
              {
                "fCode": "0505",
                "fPCode": "05",
                "children": null,
                "fId": 13,
                "fMenuName": "公告管理",
                "fMenuIcon": "",
                "fMenuUrl": "/index/noticeManagement"
              },
              {
                "fCode": "0506",
                "fPCode": "05",
                "children": null,
                "fId": 14,
                "fMenuName": "推荐人管理",
                "fMenuIcon": "",
                "fMenuUrl": "/index/referralsManagement"
              },
              {
                "fCode": "0507",
                "fPCode": "05",
                "children": null,
                "fId": 18,
                "fMenuName": "我的公告",
                "fMenuIcon": "chatboxes",
                "fMenuUrl": "/index/mynotice"
              }
            ],
            "fId": 16,
            "fMenuName": "系统管理",
            "fMenuIcon": "settings",
            "fMenuUrl": ""
          }
        ]
      },

      nodeClick(data, node) {
        // console.info(data)
        // console.info(node)
        this.fatherNodeLabel = data.fRoleName;
        this.getAuthorityList();
      },

      checkChange(data) {
        console.log(data);
        this.checkedKeys.push(data.fPCode);
        console.log(this.checkedKeys);
      },

      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
    },
    created() {
      this.getCharacterList();
    }
  }
</script>

<style scoped>
  .box-card {
    font-size: 14px;
    height: 700px;
  }


</style>
