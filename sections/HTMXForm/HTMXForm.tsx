import { useComponent } from "../Component.tsx";

export interface Props {
  comments: string[];
}

interface Comments {
  product: number;
  comments: string[];
}

// Aproveitei a api de comentários de produtos para simular os lembretes salvos.
export async function action(
  _props: unknown,
  req: Request,
  _ctx: unknown,
) {
  try {
    const form = await req.formData();

    const payload = {
      productId: "999",
      comment: form.get("reminder") ?? "",
    };

    await fetch("https://camp-api.deco.cx/event", {
      method: "POST",
      headers: {
        "x-api-key": "ourculture",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const response: Comments = await fetch(
      `https://camp-api.deco.cx/event/999`,
      {
        headers: {
          "x-api-key": "ourculture",
        },
      },
    )
      .then((res) => res.json());

    return {
      comments: response.comments,
    };
  } catch (error) {
    throw new Error(error);
  }
}

export default function HTMXForm({ comments }: Props) {
  return (
    <div>
      <form
        hx-post={useComponent(import.meta.url)}
        hx-target="closest section"
        hx-swap="outerHTML"
      >
        <label>
          Lembrete:
          <textarea
            type="text"
            name="reminder"
            placeholder="Adicione aqui o seu lembrete..."
          />
        </label>
        <button type="submit">
          Adicionar lembrete
        </button>
      </form>
      {comments?.length > 0 &&
        (
          <div>
            <p>
              Lembretes atuais:
            </p>
            <ul>
              {comments.map((reminder) => (
                <li key={reminder}>
                  {reminder}
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
}
