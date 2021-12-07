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

      if (member.roles.cache.has(app.approbationRoleId)) return

      await member.roles.add(app.approbationRoleId)

      await app.Log.bind({ client: this })(`Igor approve new member: ${member}`)

      const welcomeAttachment = await app.makeWelcomeAttachment(
        member,
        member.id
      )

      const generalChannel = this.channels.cache.get(app.generalChannelId)

      if (generalChannel?.isText())
        return generalChannel.send({ files: [welcomeAttachment] })
    }
  },
}

export default listener
