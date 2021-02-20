<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-form-item label="目标名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入目标名称"
          clearable
          size="small"
          style="width: 200px"
        />
      </el-form-item>
      <el-form-item label="来源" prop="source">
        <el-input
          v-model="queryParams.source"
          placeholder="请输入来源"
          clearable
          size="small"
          style="width: 200px"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
      </el-form-item>
<!--      <el-form-item>-->
<!--        <el-button type="cyan" icon="el-icon-search" size="mini" @click="search">搜索</el-button>-->
<!--        <el-button type="success" icon="el-icon-search" size="mini" @click="toggleItem">{{ this.hide ? "展开高级搜索" : "关闭高级搜索" }}</el-button>-->
<!--        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>-->
<!--      </el-form-item>-->
    </el-form>

    <el-row :gutter="10" class="handle-container">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleEdit"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="info"
          icon="el-icon-upload2"
          size="mini"
        >导入</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          :disabled="multiple"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table
      v-loading="loading"
      :data="dataList"
      @selection-change="handleSelectionChange"
      style="width:100%">
      <el-table-column type="selection" width="50" align="center"></el-table-column>
      <el-table-column
        prop="name"
        label="目标名称"
        width="180"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="source"
        label="来源"
        width="180"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="engine"
        label="发动机"
        width="180"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="length"
        label="机身长度"
        width="180"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="height"
        label="机身高度"
        width="180"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="width"
        label="机翼长度"
        width="180"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="factory"
        label="制造工厂"
        width="180"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="maxVoyage"
        label="最大航程"
        width="180"
        align="center"
      ></el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleEdit(scope.row)"
            v-hasPermi="['system:user:edit']"
          >修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination

      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

<!--    新增-->
    <el-dialog
      :title="title"
      :visible.sync="open"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="120px" style="height: 450px; overflow-y: auto; overflow-x: hidden">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="目标名称" prop="name">
              <el-input
                v-model="form.name"
                placeholder = "请输入目标名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属组织" prop="organId">
              <el-cascader
                v-model="form.organType"
                :options="organPrimary"
                @change="changeOrgan"
                :show-all-levels="true"
                clearable
              >
              </el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="目标分类" prop="typeId">
              <el-cascader
                v-model="form.targetTypes"
                :options="targetPrimary"
                @change="changeTarget"
                :show-all-levels="true"
                clearable
              >
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地面照片名称" prop="groundImageName">
              <el-input
                v-model="form.groundImageName"
                placeholder = "请输入地面照片名称"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="上传地面照片">
              <el-upload
                action="/li-api/common/file/upload"
                list-type="picture-card"
                :on-success="addGroundImg"
                :on-preview="handleGroundImgPreview"
                :on-remove="deleteGroundImg"
                :limit="1"
                :file-list="form.groundFileList"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="空中照片名称" prop="aerialImageName">
              <el-input
                v-model="form.aerialImageName"
                placeholder = "请输入空中照片名称"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="上传空中照片">
              <el-upload
                action="/li-api/common/file/upload"
                list-type="picture-card"
                :on-success="addAerialImg"
                :on-preview="handleAerialImgPreview"
                :on-remove="deleteAerialImg"
                :limit="1"
                :file-list="form.aerialFileList"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="来源" prop="source">
              <el-input
                v-model="form.source"
                placeholder = "请输入来源"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="制造厂" prop="factory">
              <el-input
                v-model="form.factory"
                placeholder = "请输入制造厂"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <!--<el-col :span="12">
            <el-form-item label="所属部队" prop="dept">
              <el-select v-model="form.dept" placeholder="请选择所属部队">
                <el-option
                  v-for="item in deptSelection"
                  :key="item.value"
                  :label="item.label"
                  value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>-->
        </el-row>
        <el-row :gutter="24">
          <el-col :span="20">
            <el-form-item label="特点介绍">
              <el-input v-model="form.introduce" type="textarea" placeholder="请输入内容" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="20">
            <el-form-item label="担负任务">
              <el-input v-model="form.content" type="textarea" placeholder="请输入内容" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="机身长度">
              <el-input v-model="form.length" placeholder="请输入机身长度" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="form.typeId === '19' ? '旋翼直径' : '机翼宽度'" prop="width">
              <el-input v-model="form.width" placeholder="请输入机翼宽度" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="飞机高度">
              <el-input v-model="form.height" placeholder="请输入高度" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="起飞重量">
              <el-input v-model="form.maxWeight" placeholder="请输入起飞重量" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="飞行速度">
              <el-input v-model="form.maxSpeed" placeholder="请输入速度" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="最大航程">
              <el-input v-model="form.maxVoyage" placeholder="请输入最大航程" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="发动机型号">
              <el-input v-model="form.engine" placeholder="请输入发动机型号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发动机数量">
              <el-input v-model="form.shuliang" placeholder="请输入发动机数量" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="卫星标注图名称" style="font-size: 12px;">
              <el-input v-model="form.satelliteImageName" placeholder="请输入发动机型号" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="上传卫星标注图" prop="">
              <el-upload
                action="/li-api/common/file/upload"
                list-type="picture-card"
                :on-success="addSatelliteImg"
                :on-preview="handleSatelliteImgPreview"
                :on-remove="deleteSatelliteImg"
                :limit="1"
                :file-list="form.satelliteFileList"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="视图名称" style="font-size: 12px;">
              <el-input v-model="form.threeViewsName" placeholder="请输入视图名称" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="上传视图" prop="">
              <el-upload
                action="/li-api/common/file/upload"
                list-type="picture-card"
                :on-success="addViewsImg"
                :on-preview="handleViewsImgPreview"
                :on-remove="deleteViewsImg"
                :limit="1"
                :file-list="form.viewsFileList"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="20">
            <el-form-item label="识别特征">
              <el-input v-model="form.desFeature" type="textarea" placeholder="请输入内容" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" style="display: inline-block">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancelForm">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { scrollTo } from "@utils/scroll-to";
import { getTargetList, addTarget, getTargetTypes, getOrganTypes } from '@/api/target';
import { deleteTarget, getSingleData, updateData } from '@/api/api';
export default {
  name: "page1",
  components: {

  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      //
      loading: false,
      // 所属组织下拉
      organPrimary: [],
      // 目标分类下拉
      targetPrimary: [],
      // 检索条件
      queryParams: {
        num: 1,
        size: 1,
        pageNum: 1,
        pageSize: 10,
      },
      dateRange: null,
      hide: false,
      single: false,
      multiple: false,
      // 列表数据
      dataList: [],
      // 列表总条数
      total: 0,
      autoScroll: {
        type: Boolean,
        default: true
      },
      // 表格多选数据
      ids:[],
      title: '新增',
      open: false,
      // 新增/修改对象
      form: {
        id: null,
        name: null,
        dept: null,
        organType: [],
        typeId:null,
        targetTypes: [],
        groundImageName:null,
        groundImagePath:null,
        groundFileList: [],
        aerialImageName:null,
        aerialImagePath:null,
        aerialFileList: [],
        source: null,
        factory: null,
        organId: null,
        introduce: '',
        content: '',
        satelliteImageName: null,
        satelliteImagePath: null,
        satelliteFileList: [],
        threeViewsName: null,
        threeViewsPath:null,
        viewsFileList:[],
        desFeature:null,
      },
      // 所属单位
      deptSelection: [
        {
          value: 1,
          label: "日本陆上自卫队",
        },
        {
          value: 2,
          label: "日本海上自卫队",
        },
        {
          value: 3,
          label: "日本航空自卫队",
        },
        {
          value: 4,
          label: "日本海上保安厅",
        },
      ],
      sel2: [
        {
          value: 1,
          label: "飞机",
        },
        {
          value: 2,
          label: "舰船",
        },
        {
          value: 3,
          label: "车辆",
        }
      ],
      sel3: [
        {value: 1, label: "海上搜救/巡逻机",},
        {value: 2, label: "武装直升机",},
        {value: 3, label: "联络/侦察机",},
        {value: 4, label: "运输/多用途直升机",},
        {value: 5, label: "反潜巡逻机",},
        {value: 6, label: "电子/图像侦察机",},
        {value: 7, label: "水上救援机",},
        {value: 8, label: "教练机",},
        {value: 9, label: "运输机",},
        {value: 10, label: "直升机",},
        {value: 11, label: "战斗机",},
        {value: 12, label: "侦察机",},
        {value: 13, label: "预警机",},
        {value: 14, label: "电子对抗机",},
        {value: 15, label: "加油机",},
        {value: 16, label: "运输直升机",},
      ],
      // 表单校验
      rules: {

      }

    }
  },
  created() {
    this.getList();
    // 所属组织
    this.getOrganType();
    // 查询 下拉字段 目标数据
    this.getTargetType();
  },
  mounted() {

  },
  methods: {
    // 搜索
    handleQuery() {
      this.getList();
    },
    // 新增
    handleAdd() {
      this.reset();
      this.open = true;
    },
    // 修改
    handleEdit(row) {
      this.reset();
      const targetId = row.id || this.ids;
      getSingleData(targetId).then(res => {
        this.form = res.data;
        // 所属组织回显
        this.form.organType = this.returnSelectAry(this.form.organId,this.organPrimary);
        // 目标分类回显
        this.form.targetTypes = this.returnSelectAry(this.form.typeId, this.targetPrimary);
        // this.form.groundFileList = [];
        // this.form.groundFileList[0] = {};
        // this.form.groundFileList[0].url = res.data.groundImagePath;
        //console.log(33, this.form);
        this.open = true;
      });
    },
    // 根据一个id查找数组
    returnSelectAry(a,ay) {
      // 先判断数组
      // value值是否存在，同时判断children
      // 第一步监测数组元素是否存在,存在才能循环
      // 最后应该返回一个数组，所以提前定义
      // 可递归优化
      const targetSelectAry = [];
      const ary1 = [];

      if(ay.length > 0) {
        for(let i = 0; i< ay.length; i++) {
          //
          if(ay[i].value === a) {
            // 相等就结束
            ary1.push(ay[i].value);
            break;
          }else {
            if(ay[i].children && ay[i].children.length > 0) {
              let childObj = ay[i].children;
              for(let j = 0; j < childObj.length; j++) {
                if(childObj[j].value === a) {
                  targetSelectAry.push(ay[i].value);
                  targetSelectAry.push(childObj[j].value);
                  break;
                }
              }
            }
          }
        }
      }
      return targetSelectAry;
    },
    // 删除
    handleDelete(row) {
      const targetIds = row.id || this.ids;
      this.$confirm('是否确认删除角色编号为"' + targetIds + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return deleteTarget(targetIds);
      }).then(() => {
        this.getList();
        //this.msgSuccess("删除成功");
      })

    },
    // 保存
    submitForm() {
      console.log(0,this.form);
      // 对所有字段进行校验
      if(this.form.id) {
        // 修改保存
        //console.log("修改前的数据", this.form);
        // updateData(this.form).then(res => {
        //
        // });

      }else {
        // 新增保存
        this.form.dept = this.form.dept + '';
        this.form.organId = this.form.organId + '';
        //console.log(99,this.form);
        addTarget(this.form).then(res => {
          this.getList();
          this.open = false;
        });
      }
    },
    // 新增/修改 取消
    cancelForm() {
      // this.reset();
      this.open = false;

      console.log("取消",this.form);
      // console.log("取消",this.targetPrimary);

    },
    handleSizeChange() {
      if (this.autoScroll) {
        scrollTo(0, 800);
      }
    },
    handleCurrentChange() {
      if (this.autoScroll) {
        scrollTo(0, 800);
      }
    },
    // 多选框选中的数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
    },
    //获取 列表所有数据
    getList() {
      this.loading = true;
      getTargetList(this.queryParams).then(res => {
        this.dataList = res.data.list;
        this.total = res.data.total;
        this.loading = false;
      })
    },
    // 上传地面图
    addGroundImg(a) {
      this.form.groundImagePath = a.data.url;
    },
    // 删除地面图
    deleteGroundImg(file, fileList) {
      this.form.groundFileList = [];
      this.form.groundImagePath = "";
    },
    // 地面
    handleGroundImgPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    //aerial 上传空中图
    addAerialImg(a) {
      this.form.aerialImagePath = a.data.url;
    },
    // 删除空中图
    deleteAerialImg(file, fileList) {
      this.form.aerialFileList = [];
      this.form.aerialImagePath = "";
    },
    // 空中
    handleAerialImgPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    /*上传卫星标注图*/
    addSatelliteImg(a) {
      this.form.satelliteImagePath = a.data.url;
    },
    /*删除卫星标注图*/
    deleteSatelliteImg() {
      this.form.satelliteFileList = [];
      this.form.satelliteImagePath = "";
    },
    handleSatelliteImgPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 上传视图
    addViewsImg(a) {
      this.form.threeViewsPath = a.data.url;
    },
    // 删除视图
    deleteViewsImg() {
      this.form.viewsFileList = [];
      this.form.threeViewsPath = "";
    },
    handleViewsImgPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 目标类别
    changeTarget(row) {
      this.form.typeId = row[1] + '';
    },
    // 获取目标分类数据
    getTargetType() {
      getTargetTypes().then(res => {
        // 可递归封装优化
        res.data.forEach((item, index) => {
          this.obj1 = {};
          this.obj1.value = item.id;
          this.obj1.label = item.label;
          this.obj1.children = [];
          if (item.children) {
            item.children.forEach((item, index) => {
              let obj2 = {};
              obj2.value = item.id;
              obj2.label = item.label;
              this.obj1.children.push(obj2);
            });
          }
          this.targetPrimary.push(this.obj1);
        });
      });
    },
    //
    changeOrgan(row) {
      //this.form.organType = row;
      this.form.organId = row[1] + '';
    },
    // 获取所属组织分类
    getOrganType() {
      getOrganTypes().then(res => {
        // 可递归封装优化
        res.data.forEach((item, index) => {
          this.obj1 = {};
          this.obj1.value = item.id;
          this.obj1.label = item.label;
          this.obj1.children = [];
          if (item.children) {
            item.children.forEach((item, index) => {
              let obj2 = {};
              obj2.value = item.id;
              obj2.label = item.label;
              this.obj1.children.push(obj2);
            });
          }
          this.organPrimary.push(this.obj1);
        });
        //
        console.log('组织元数据',this.organPrimary);
      });
    },

    // 新增数据初始化
    reset() {
      // this.form = {};
      // // 清除上传地面图
      // this.form.groundFileList = [];
      // // 清除上传空中图
      // this.form.aerialFileList = [];
      // // 清除上传卫星标注图
      // this.form.satelliteFileList = [];
      // // 清除上传视图
      // this.form.viewsFileList = [];
    }

  }
}
</script>

<style scoped>
.app-container {
  padding: 5px 15px;
}

.pagination-container {
  margin-top: 20px;
  float: right;
}
/**/
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 12px;
  color: #8c939d;
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
}
.avatar {
  width: 80px;
  height: 80px;
  display: block;
}
/**/
</style>
