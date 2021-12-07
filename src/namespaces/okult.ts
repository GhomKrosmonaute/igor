import path from "path"
import canvas from "canvas"
import * as discord from "discord.js"

export const rulesChannelId = "888836826327040051"
export const rulesReactionId = "892832205288661122"
export const approbationRoleId = "892834023603310694"
export const generalChannelId = "880159531957620766"
export const eventChannelId = "888836661822259280"

export async function Log(this: { client: discord.Client }, content: string) {
  const channel = await this.client.channels.fetch("896418606311698444")

  if (channel?.isText()) await channel.send(content)
}

export async function makeWelcomeAttachment(
  { client }: { client: discord.Client },
  userId: string
) {
  const user = await client.users.fetch(userId)

  const draft = canvas.createCanvas(800, 250)
  const ctx = draft.getContext("2d")

  canvas.registerFont(
    path.join(process.cwd(), "assets", "Comfortaa-Light.ttf"),
    { family: "Comfortaa-Light" }
  )

  const background = await canvas.loadImage(
    path.join(process.cwd(), "assets", "welcome-background.png")
  )

  ctx.drawImage(background, 0, 0)

  ctx.font = "36pt 'Comfortaa-Light'"
  ctx.textAlign = "right"
  ctx.fillStyle = "#fff"
  ctx.fillText(user.tag, 624, 217)

  const userAvatar = await canvas.loadImage(
    user.displayAvatarURL({ dynamic: false, format: "jpg", size: 256 })
  )

  const avatarDraft = canvas.createCanvas(250, 250)
  const avatarCtx = avatarDraft.getContext("2d")

  avatarCtx.beginPath()
  avatarCtx.arc(125, 125, 80, 0, Math.PI * 2)
  avatarCtx.closePath()
  avatarCtx.clip()
  avatarCtx.drawImage(userAvatar, 125 - 80, 125 - 80, 160, 160)

  ctx.drawImage(avatarDraft, 0, 0)

  return new discord.MessageAttachment(draft.toBuffer(), "welcome.png")
}
