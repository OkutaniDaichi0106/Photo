import { SignInWithDiscord } from "@/db/main";

export default function DiscordLogin() {

    

    return(
        <button onClick={SignInWithDiscord}>discordに飛ぶ</button>
    )
}