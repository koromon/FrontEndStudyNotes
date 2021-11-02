export default {
  functional: true,
  inject: ["tableRoot"],
  props: {
    row: Object,
    column: Object,
    inedx: Number,
  },
  render: (h, ctx) => {
    return (
      h,
      ctx.injections.tableRoot.$scopedSlots[ctx.props.column.slot]({
        row: ctx.props.row,
        column: ctx.props.column,
        index: ctx.props.index,
      })
    );
  },
};
