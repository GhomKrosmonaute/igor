import * as app from "../app.js"

const listener: app.Listener<"messageReactionAdd"> = {
  event: "messageReactionAdd",
  description: "A messageReactionAdd listener",
  async run(reaction, user) {
    if(reaction.message.id === app.rulesMessageId && reaction.emoji.id === app.rulesReactionId){
      const member = await reaction.message.guild?.members.fetch(user.id)

      if(!member) return app.error(`Can't fetch ${user} member.`, "listener:approveNewMember")

      return member.roles.add(app.approbationRoleId)
    }
  }
}

export default listener