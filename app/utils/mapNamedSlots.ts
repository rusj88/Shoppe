import type { Slots, VNode } from 'vue'

type VNodeWithNamedProps = VNode & {
  props: {
    name: string
    label?: string
  }
}

export function mapNamedSlots(slots: Slots) {
  const children = slots.default?.() ?? []

  return children
    .filter((vnode): vnode is VNodeWithNamedProps => Boolean(vnode.type && vnode.props?.name))
    .map((vnode) => ({
      name: vnode.props.name,
      label: vnode.props.label,
      vnode,
    }))
}
