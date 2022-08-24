<template>
  <div class="app-container">
    <el-button
        icon="el-icon-back"
        class="back-button"
        circle
        @click="$router.replace('/')"
    />
    <h2>进出校扫码模式</h2>
    <div class="count">已扫码: {{ count }}人</div>
    <div class="volunteer">
      工作地点: {{ volunteerTypes['离校'] }}
    </div>
    <div v-if="userData.bumen" class="status">
      {{ userData.bumen }}
    </div>
    <div v-if="userInfo.uid && userData.xingming" class="status">
      {{ userInfo.uid }} - {{ userData.xingming }}
    </div>
    <div v-if="userData.toSite" class="status">
      {{ userData.toSite }}
    </div>
    <div v-if="userInfo.in !== undefined" class="status" :style="{'color': inStatus[userInfo.in].color}">
      {{ inStatus[userInfo.in].text }}
    </div>
    <div v-if="userInfo.out !== undefined" class="status" :style="{'color': outStatus[userInfo.out].color}">
      {{ outStatus[userInfo.out].text }}
    </div>
    <el-button
        type="success"
        icon="el-icon-full-screen"
        class="scan-button"
        @click="scan"
    >
      开始扫码
    </el-button>
    <audio id="successAudio" ref="successAudio" autoplay="autoplay" :src="tipAudio" @canplay="playAudio" />
    <el-dialog
        title="离校码红码人员"
        :visible.sync="dialogVisible"
        class="error-dialog"
        width="90%"
        center
        :show-close="false"
    >
      <div style="margin-bottom: 20px;">是否手动通过</div>
      <el-button
          type="primary"
          size="small"
          @click="submit({
          ...userInfo,
          currentState: 'out',
          pass: true
        })"
      >
        出校
      </el-button>
      <el-button
          type="primary"
          size="small"
          @click="submit({
          ...userInfo,
          currentState: 'in',
          pass: true
        })"
      >
        进校
      </el-button>
      <el-button
          type="danger"
          size="small"
          @click="dialogVisible = false"
      >
        不通过
      </el-button>
    </el-dialog>
  </div>
</template>

<script>
const importAll = context => {
  const map = {}

  for (const key of context.keys()) {
    const keyArr = key.split('/')
    keyArr.shift() // 移除.
    map[keyArr.join('.').replace(/\.mp3$/g, '')] = context(key)
  }

  return map
}
const audios = importAll(require.context('@/assets/audio', false, /\.mp3$/))

import { mapGetters } from 'vuex'
import { getWXSignature } from '@/api/user'
import { md5Verify, inoutSaomaNum } from '@/api/api'
import { getBaiduAudio } from '@/api/baidu'

export default {
  name: 'Inout',
  data() {
    return {
      tipAudio: null,
      userInfo: {},
      userData: {},
      count: 0,
      dialogVisible: false,
      outStatus: {
        0: {
          text: '当前不可出校',
          color: '#FE0F33'
        },
        1: {
          text: '当前可以出校',
          color: '#3762FF'
        }
      },
      inStatus: {
        0: {
          text: '当前不可入校',
          color: '#FE0F33'
        },
        1: {
          text: '当前可以入校',
          color: '#3762FF'
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'volunteerTypes'
    ])
  },
  created() {
    // 注册wx权限
    this.setWxConfig()
    this.getCount()
  },
  methods: {
    async setWxConfig() {
      const response = await getWXSignature(encodeURI(location.href))

      window.wx.config({


        beta: true,
        debug: true,
        appId: response.data.data.appid,
        timestamp: response.data.data.timeStamp,
        nonceStr: response.data.data.nonceStr,
        signature: response.data.data.signature,
        jsApiList: [
          'scanQRCode'
        ]
      })
    },
    scan() {
      const self = this
      this.userInfo = {}
      window.wx.scanQRCode({  //扫的是学生的码
        needResult: 1,
        success(res) {
          let data, errorJson
          try {
            data = JSON.parse(res.resultStr)
            self.userInfo = data//获取学生的信息
          } catch (error) {
            errorJson = true
            self.$message.error('出校码验证失败!!')
          }
          if (!errorJson) {
            if (data.in === 1 && data.out === 1) {
              // 判断进出校状态
              self.$confirm('选择该人员进出校状态', '提示', {
                confirmButtonText: '入校',
                cancelButtonText: '出校',
                type: 'warning',
                showClose: false,
                closeOnClickModal: false,
                closeOnPressEscape: false
              }).then(() => {
                self.submit({
                  ...data,
                  currentState: 'in'
                })
              }).catch(() => {
                self.submit({
                  ...data,
                  currentState: 'out'
                })
              })
            } else {
              self.submit(data)
            }
          }
        },
        error(res) {
          if (res.errMsg.indexOf('function_not_exist') > 0) {
            alert('版本过低请升级')
          } else {
            self.$message.error('扫码失败请重试')
          }
        }
      })
    },
    async getCount() {
      const response = await inoutSaomaNum()
      this.count = response.data.value
    },
    async submit(params) {
      this.dialogVisible = false
      try {
        const response = await md5Verify(params)
        this.userData = response.data
        this.$message.success(response.data.message)
        this.getVoice(true)
        this.getCount()
      } catch (error) {
        if (!error.response || !error.response.data) return
        this.userData = error.response.data
        this.getVoice(false, error.response.data.reason, error.response.data.message)
        // 手动通过
        this.dialogVisible = true
      }
    },
    getVoice(success, reason, message) {
      if (success) {
        getBaiduAudio({
          uid: this.userInfo.uid,
          type: 'success',
          saomaType: '进出校'
        }).then(response => {
          this.tipAudio = URL.createObjectURL(response.data)
          this.$refs.successAudio.load()
        }).catch(() => {
          this.playLocalAudio(success)
        })
      } else {
        getBaiduAudio({
          uid: this.userInfo.uid,
          type: 'error',
          saomaType: '进出校',
          reason,
          message
        }).then(response => {
          this.tipAudio = URL.createObjectURL(response.data)
          this.$refs.successAudio.load()
        }).catch(() => {
          this.playLocalAudio(success)
        })
      }
    },
    playLocalAudio(success) {
      if (success) {
        this.tipAudio = audios['success']
        this.$refs.successAudio.load()
      } else {
        this.tipAudio = audios['error']
        this.$refs.successAudio.load()
      }
    },
    playAudio() {
      this.$refs.successAudio.play()
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  >h2 {
    padding: 60px 0 20px;
    margin: 0;
    text-align: center;
    font-size: 30px;
  }
  .back-button {
    position: absolute;
    top: 50px;
    left: 10px;
    zoom: 1.3;
  }
  .volunteer {
    padding-bottom: 20px;
    text-align: center;
    font-size: 24px;
  }
  .status {
    text-align: center;
    font-size: 22px;
    font-weight: 700;
    padding: 10px 0;
  }
  .scan-button {
    width: 80%;
    height: 60px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
  #successAudio {
    display: none !important;
  }
  .count {
    position: absolute;
    top: 80px;
    right: 20px;
    font-weight: 700;
    font-size: 14px;
    color: #3762FF;
  }
}
.error-dialog {
  ::v-deep .el-dialog {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0 !important;
    .el-dialog__body {
      padding: 10px;
      text-align: center;
    }
  }
}
</style>
