<template>
  <el-dialog
    title="同步文件"
    :visible.sync="dialogVisible"
    width="300px"
  >
    <el-checkbox v-if="!!root" v-model="form.sync">是否需要同步本地文件到远端</el-checkbox>
    <el-checkbox v-model="form.innerNet">是否是内网</el-checkbox>
    <el-select class="mt10" v-model="form.origin">
      <el-option label="http://aikanvod.miguvideo.net" value="http://aikanvod.miguvideo.net" />
      <el-option label="https://gw.aikan.miguvideo.com" value="https://gw.aikan.miguvideo.com" />
      <el-option label="https://developer.e.uban360.com" value="https://developer.e.uban360.com" />
    </el-select>
    <!--<el-input class="mt10" v-model.trim="form.origin" placeholder="cdn 服务器地址" />-->
    <input v-if="form.innerNet" type="file" @change="e => { form.file = e.target.files[0] }">
    <template v-else>
      <el-input class="mt10" v-model.trim="form.filename" placeholder="输入文件名称，逗号分隔" />
    </template>
    <el-input class="mt10" v-model.trim="form.category" placeholder="文件分类" />
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Cdn.vue',

  data () {
    return {
      dialogVisible: this.show,
      form: {
        sync: false,
        filename: '',
        origin: 'https://developer.e.uban360.com',
        category: 'migu',
        innerNet: false
      }
    }
  },

  props: {
    show: Boolean
  },

  computed: {
    ...mapGetters(['root'])
  },

  watch: {
    show (val) {
      this.dialogVisible = val
    },
    dialogVisible (val) {
      if (val === false) {
        this.$emit('update:show', false)
      }
    },
    'form.origin': function (val) {
      this.form.innerNet = /\.net/.test(val)
    }
  },

  methods: {
    confirm () {
      if (!this.form.filename && !this.form.innerNet) {
        this.$message.error('请输入文件名')
        return
      } else if (this.form.innerNet && !this.form.file) {
        this.$message.error('请选择文件')
        return
      }
      this.$emit('confirm', this.form)
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="stylus">

</style>
