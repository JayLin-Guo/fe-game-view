import type { Ref } from 'vue'
import { ElMessage } from 'element-plus'

export enum ButtonType {
  discord_url = 'discord_url',
  game_download_url = 'game_download_url',
  kook_url = 'kook_url',
  login_download_url = 'login_download_url',
  out_pay_url = 'out_pay_url',
  qq_group_url = 'qq_group_url',
}

export const useButtonAction = (linkConf: Ref<any>) => {
  const onButtonAction = (type: ButtonType) => {
    if (!linkConf.value[type]) {
      ElMessage.warning('功能正在开发中，敬请稍候')
      return
    }
    window.open(linkConf.value[type])
  }

  return {
    onButtonAction,
  }
}
