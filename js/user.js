// 用户登录和注册的表单项验证的通用代码
class FieldValidator {
  /**
   * 构造器
   * @param {String} txtId 文本框的Id
   * @param {Function} validatorFunc 验证规则函数，当需要对该文本框进行验证时，会调用该函数，函数的参数为当前文本框的值，函数的返回值为验证的错误消息，若没有返回，则表示无错误
   */
  constructor(txtId, validatorFunc) {
    this.input = $("#" + txtId);
    this.p = this.input.nextElementSibling;
    this.validatorFunc = validatorFunc;
    //input框失去焦点时触发，用箭头函数是因为箭头函数没有this，指向input
    this.input.onblur = () => {
      this.validate();
    };
  }
  /**
   * 原型方法
   * 验证，成功返回true，失败返回false
   */
  async validate() {
    const err = await this.validatorFunc(this.input.value);
    if (err) {
      //有错误
      this.p.innerText = err;
      return false;
    } else {
      this.p.innerText = "";
      return true;
    }
  }
  /**
   * 静态方法
   * 对传入的所有验证器进行统一验证,如果所有的验证器均通过，则返回true，否则返回false
   * ...validators剩余参数写法
   * @param {FieldValidator[]} validators 所有的验证器，是个FieldValidator类型数组
   */
  static async validate(...validators) {
    const proms = validators.map((v) => v.validate());
    const result = await Promise.all(proms);
    return result.every((r) => r); //result数组每一项作为参数穿进去，如果权威true，就返回true，若有一项为false，就返回false
  }
}

// FieldValidator.validate(loginIdValidator, nickNameValidator).then((result) =>
//   console.log(result)
// );
