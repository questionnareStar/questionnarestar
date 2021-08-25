import {
    Message
} from 'element-ui'

/**
 * element-ui 消息弹窗的函数封装
 */

/**
 * 消息提示框
 * @param {message, type} options
 * type: success/warning/info/error
 */
export function message(options) {
    Message({
        showClose: true,
        message: options.message,
        type: options.type
    })
}
