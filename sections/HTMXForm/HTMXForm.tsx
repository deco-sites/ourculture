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
    <div class="m-auto border rounded-md border-accent p-4 w-full flex flex-col gap-4 lg:min-w-[768px] lg:w-fit my-8">
      <form
        class="flex flex-col gap-4 w-100 lg:flex-row"
        hx-post={useComponent(import.meta.url)}
        hx-target="closest section"
        hx-swap="outerHTML"
      >
        <label class="flex flex-col flex-1">
          Lembrete:
          <textarea
            class="outline-accent border border-black flex-1 rounded p-4 w-100"
            type="text"
            name="reminder"
            placeholder="Adicione aqui o seu lembrete..."
          />
        </label>
        <button
          class="px-4 py-2 rounded-md bg-accent text-base cursor-pointer h-fit my-auto"
          type="submit"
        >
          Adicionar lembrete
        </button>
      </form>
      {comments?.length > 0 &&
        (
          <div>
            <p class="font-bold text-xl">
              Lembretes atuais:
            </p>
            <ul class="flex flex-col gap-3 mt-4">
              {comments.map((reminder) => (
                <li key={reminder} class="border-b border-spacing-1">
                  {reminder}
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
}
