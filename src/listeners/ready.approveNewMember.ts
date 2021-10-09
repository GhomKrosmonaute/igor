import * as app from "../app.js"

const listener: app.Listener<"ready"> = {
  event: "ready",
  description: "A ready listener",
  once: true,
  async run() {
    const rulesChannel = await this.channels.fetch(app.rulesChannelId)

    if (rulesChannel?.isText()) await rulesChannel.messages.fetch()

    await app.Log.bind({ client: this })("Igor is ready.")
  },
}

export default listener
