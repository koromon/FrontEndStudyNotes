/*
 * @Description:
 * @Author: chenming.feng
 * @Date: 2021-10-26 22:29:01
 * @LastEditors: chenming.feng
 * @LastEditTime: 2021-10-30 00:11:50
 */
export default {
  functional: true,
  props: {
    row: Object,
    column: Object,
    index: Number,
    render: Function,
  },
  render: (h, ctx) => {
    const params = {
      row: ctx.props.row,
      column: ctx.props.column,
      index: ctx.props.index,
    };
    return ctx.props.render(h, params);
  },
};
