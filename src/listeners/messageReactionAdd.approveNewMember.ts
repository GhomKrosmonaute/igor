import * as app from "../app.js"

const listener: app.Listener<"messageReactionAdd"> = {
  event: "messageReactionAdd",
  description: "A messageReactionAdd listener",
  async run(reaction, user) {
    await reaction.fetch()

    if (
      reaction.message.channel.id === app.rulesChannelId &&
      reaction.emoji.id === app.rulesReactionId
    ) {
      const member = await reaction.message.guild?.members.fetch(user.id)

      if (!member)
        return app.error(
          `Can't fetch ${user} member.`,
          "listener:approveNewMember"
        )

      await member.roles.add(app.approbationRoleId)

      return app.Log.bind({ client: this })(
        `Igor approve new member: ${member}`
      )
    }
  },
}

export default listener
