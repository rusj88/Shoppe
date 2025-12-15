import type { Slots, VNode } from 'vue'

export function mapNamedSlots(slots: Slots) {
  const children = slots.default?.() ?? []

  return children
    .filter((vnode): vnode is VNode & { props: { name: string; label?: string } } =>
      Boolean(vnode.type && vnode.props?.name),
    )
    .map((vnode) => ({
      name: vnode.props.name,
      label: vnode.props.label,
      vnode,
    }))
}
