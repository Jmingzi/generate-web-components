<template>
  <el-dialog
    title="同步文件"
    :visible.sync="dialogVisible"
    width="300px"
  >
    <el-checkbox v-if="!!root" v-model="form.sync">是否需要同步本地文件到远端</el-checkbox>
    <el-input class="mt10" v-model.trim="form.filename" placeholder="输入文件名称，逗号分隔" />
    <el-input class="mt10" v-model.trim="form.origin" placeholder="cdn 服务器地址" />
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
        origin: 'http://aikanvod.miguvideo.net',
        category: 'migu'
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
    }
  },

  methods: {
    confirm () {
      if (!this.form.filename) {
        this.$message.error('请输入文件名')
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
