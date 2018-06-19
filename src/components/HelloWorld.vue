<template>
  <div class="hello">
    <h1>组织树结构</h1>
    <el-dialog
      title="请输入节点名称"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-input v-model="addItem" placeholder="请输入内容"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-row>
      <el-col :span="3">
        <el-container>
          <el-header style="border-right: 1px solid whitesmoke">
            <el-row>
              <el-button type="info" plain size="mini" @click="dialogVisible = true">新增</el-button>
              <el-button type="warning" plain size="mini">修改</el-button>
              <el-button type="danger" plain size="mini">删除</el-button>
            </el-row>
          </el-header>
          <el-main>
            <div class="grid-content bg-purple">
              <el-tree :data="organization" :props="defaultProps" @node-click="handleNodeClick"
                       :default-expanded-keys="[1,2,3]" show-checkbox node-key="id"></el-tree>
            </div>
          </el-main>
        </el-container>

      </el-col>
      <el-col :span="21">
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
                  :data="tableData"
                  style="width: 100%">
                  <el-table-column
                    fixed
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
                      <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
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
  export default {
    name: 'HelloWorld',
    data: function () {
      return {
        addItem:"test",
        dialogVisible: false,
        organization: [{
          id: 1,
          label: '总平台',
          children: [{
            id: 2,
            label: '子平台1',
            children: [{
              label: '企业'
            }, {
              label: '散客'
            }]
          }, {
            id: 3,
            label: '子平台2',
            children: [{
              label: '企业',
              children: [{
                label: '部门一'
              }]
            }]
          }, {
            id: 4,
            label: '企业',
            children: [{
              label: '部门一'
            }]

          }, {
            id: 5,
            label: '散客'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }]
      }
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
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
