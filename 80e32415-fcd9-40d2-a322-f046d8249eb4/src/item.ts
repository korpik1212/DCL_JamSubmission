export type Props = {
  text?: string
  fontSize?: number
}

type ChangeTextType = { newText: string }

export default class SignPost implements IScript<Props> {
  init() { }

  spawn(host: Entity, props: Props, channel: IChannel) {
    const sign = new Entity()
    sign.setParent(host)

    sign.addComponent(new GLTFShape('80e32415-fcd9-40d2-a322-f046d8249eb4/models/signpost/Sign_Circle.glb'))

    let signText = new Entity()
    signText.setParent(host)
    let text = new TextShape(props.text)
    text.fontSize = props.fontSize
    text.color = Color3.FromHexString('#c4feff')
    text.outlineWidth = 0.4
    text.outlineColor = Color3.FromHexString('#c4feff')

    text.width = 20
    text.height = 10
    text.hTextAlign = 'center'

    signText.addComponent(text)

    signText.addComponent(
      new Transform({
        position: new Vector3(0, 0.6, 0.04),
        rotation: Quaternion.Euler(0, 180, 0),
        scale: new Vector3(0.05, 0.05, 0.05)
      })
    )

    channel.handleAction<ChangeTextType>('changeText', action => {
      text.value = action.values.newText
    })

    channel.request<string>('getText', signText => (text.value = signText))
    channel.reply<string>('getText', () => text.value)
  }
}
