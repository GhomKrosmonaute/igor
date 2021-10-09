import * as discord from "discord.js"
export const rulesChannelId = "888836826327040051"
export const rulesReactionId = "892832205288661122"
export const approbationRoleId = "892834023603310694"

export async function Log(this: { client: discord.Client }, content: string) {
  const channel = await this.client.channels.fetch("896418606311698444")

  if (channel?.isText()) await channel.send(content)
}
