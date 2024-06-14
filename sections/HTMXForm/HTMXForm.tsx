import { AppContext } from "../../apps/site.ts";
import { useId } from "../../sdk/useId.ts";
import { useComponent } from "../Component.tsx";
// import { asResolved, Resolved } from "deco/mod.ts";
// import Comments from "./Comments.tsx";

export async function action(
    _props: unknown,
    req: Request,
    ctx: AppContext
) {
    try {
        const form = await req.formData();

        const payload = {
            productId: "999",
            comment: form.get("reminder") ?? ""
        }

        await fetch('https://camp-api.deco.cx/event', {
            method: "POST",
            headers: {
                "x-api-key": "ourculture",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        // return useComponent(import.meta.resolve("./Comments.tsx"), {
        //     context: ctx
        // })
    } catch (error) {
        throw new Error(error)
    }
}

export default function HTMXForm() {
    const slot = useId();
    
    return (
        <div>
            <form
                hx-target={`#${slot}`}
                hx-swap="innerHTML"
                hx-sync="this:replace"
                hx-post={useComponent(import.meta.url)}
            >
                <label>
                    Lembrete:
                    <textarea 
                        type="text"
                        name="reminder"
                        placeholder="Adicione aqui o seu lembrete..."
                    />
                </label>
                <button
                  type="submit"
                >
                    Adicionar lembrete
                </button>
            </form>
            <div>
                <p>
                    Lembretes atuais:
                </p>
                <div id={slot} />
            </div>
        </div>
    )
}