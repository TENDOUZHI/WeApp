import { Vapp } from "@/store/ast";

export const useSendWs = (wapp: Vapp, user_id: number, program_id: number, ws: WebSocket) => {
    // console.log(wapp.project_name);
    const text = 'user_id:' + user_id + ',' + 'program_id:' + program_id + JSON.stringify(wapp)
    ws.send(text)
    ws.onmessage = ((e) => {
        console.log(e);
    })
}