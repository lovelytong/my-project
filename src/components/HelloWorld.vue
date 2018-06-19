<template>
  <div class="hello">
    <h1>组织树结构</h1>
    <!--对话框-->
    <!--新增-->
    <el-dialog
      :title="fatherNodeName"
      :visible.sync="dialogVisibleAdd"
      width="30%"
      :before-close="handleClose">
      <div style="margin-top: 15px;" v-if="fatherNodeType==='总平台'">
        <el-select v-model="childNodeType" placeholder="子节点类型" size="medium">
          <el-option
            v-for="item in optionsTP"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input placeholder="子节点名称" v-model="childNodeName" class="input-with-select">
        </el-input>
      </div>
      <div style="margin-top: 15px;" v-if="fatherNodeType==='子平台'">
        <el-select v-model="childNodeType" placeholder="子节点类型" size="medium">
          <el-option
            v-for="item in optionsCP"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input placeholder="子节点名称" v-model="childNodeName" class="input-with-select">
        </el-input >
      </div>
      <div style="margin-top: 15px;" v-if="fatherNodeType==='企业'||fatherNodeType==='部门'">
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

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>

    <!--修改-->
    <el-dialog
      title="修改名称"
      :visible.sync="dialogVisibleChange"
      width="30%"
      :before-close="handleClose">

      <div style="margin-top: 15px;" >

        <el-input placeholder="子节点名称" v-model="fatherNodeName" class="input-with-select">
        </el-input>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>

    <!--删除-->
    <el-dialog
      title="删除"
      :visible.sync="dialogVisibleDelete"
      width="30%"
      :before-close="handleClose">

      <div style="margin-top: 15px;" >
        <div>确定要删除{{fatherNodeName}}吗？</div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>

    <el-row>
      <el-col :span="5">
        <el-container>
          <el-header style="border-right: 1px solid whitesmoke">
            <el-row v-if="fatherNodeType">
              <el-button type="info" plain size="mini" @click="dialogVisibleAdd = true">新增</el-button>
              <el-button type="warning" plain size="mini" @click="dialogVisibleChange = true">修改</el-button>
              <el-button type="danger" plain size="mini" @click="dialogVisibleDelete = true">删除</el-button>
            </el-row>
          </el-header>
          <el-main>
            <div class="grid-content bg-purple">
              <el-tree
                :data="organization"
                node-key="id"
                default-expand-all
                @node-click="nodeClick"
                :expand-on-click-node="false">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span>{{ data.name }} （{{ data.type }} ）</span>
                  <!--<span v-if="node.id === showId">-->
                    <!--<el-button-->
                      <!--type="text"-->
                      <!--size="mini"-->
                      <!--@click="() => append(data)">-->
                      <!--Append-->
                    <!--</el-button>-->
                    <!--<el-button-->
                      <!--type="text"-->
                      <!--size="mini"-->
                      <!--@click="() => remove(node, data)">-->
                      <!--Delete-->
                    <!--</el-button>-->
                  <!--</span>-->
              </span>
              </el-tree>
            </div>
          </el-main>
        </el-container>

      </el-col>
      <el-col :span="19">
        <el-container>
          <el-header>
            <el-row :gutter="12">
              <el-col :span="8">
                <div>组织机构</div>
              </el-col>
              <el-col :span="8">
                <div>组织类型</div>
              </el-col>
              <el-col :span="8">
                <div>上级节点</div>
              </el-col>
            </el-row>
          </el-header>

          <el-main>

            <div style="margin-bottom: 80px;">
              <el-row>
                <el-col :span="8">
                  <el-card class="box-card">
                    <div slot="header" class="clearfix">
                      <span>平台</span>
                    </div>
                    <div class="text item">
                      平台名称，平台域名，短信配置等
                    </div>
                  </el-card>
                </el-col>

                <el-col :span="8">
                  <el-card class="box-card">
                    <div slot="header" class="clearfix">
                      <span>企业</span>
                    </div>
                    <div class="text item">
                      企业名称，账户，负责人，营业执照等
                    </div>
                  </el-card>
                </el-col>

                <el-col :span="8">
                  <el-card class="box-card">
                    <div slot="header" class="clearfix">
                      <span>部门</span>
                    </div>
                    <div class="text item">
                      部门名称，负责人等
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </div>

            <el-row>
              <el-col :span="24">
                <el-table
                  style="width: 100%">
                  <el-table-column
                    prop="date"
                    label="日期"
                    width="200">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="姓名"
                    width="200">
                  </el-table-column>
                  <el-table-column
                    prop="province"
                    label="省份"
                    width="200">
                  </el-table-column>
                  <el-table-column
                    prop="city"
                    label="市区"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="地址"
                    width="300">
                  </el-table-column>
                  <el-table-column
                    prop="zip"
                    label="邮编"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                      <el-button type="text" size="small">删除</el-button>
                      <el-button type="text" size="small">编辑</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>

            </el-row>

          </el-main>
        </el-container>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  let id = 1000;
  export default {
    name: 'HelloWorld',
    data() {
      return {
        dialogVisibleAdd: false,
        dialogVisibleChange: false,
        dialogVisibleDelete: false,
        fatherNodeType: '',
        fatherNodeName: '',
        childNodeType: '',
        childNodeName: '',
        organization: [{
          id: 1,
          name: '面对面',
          type: "总平台",
          children: [{
            id: 4,
            name: '舒客',
            type: "子平台",
            children: [{
              id: 9,
              name: '金合',
              type: "企业"
            }, {
              id: 10,
              name: '开发部',
              type: "部门"
            }, {
              id: 11,
              name: '散客',
              type: "散客"
            }]
          },{ id: 2,
            name: '测试',
            type: "企业",
            children:[{
              id: 5,
              name: '人事',
              type: "部门"
            }]
          },{id: 3,
            name: '散客',
            type: "散客"
          }]
        }],
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
      }
    },

    methods: {
      nodeClick(data, node) {
        console.info(data)
        console.info(node)
        this.fatherNodeType = data.type;
        this.fatherNodeName = data.name;
      },

      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },

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
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .bg-purple {
    background: #d3dce6;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }


</style>
