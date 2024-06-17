export interface Props {
  comments: string[];
}

export default function ModalComments({ comments }: Props) {
  return (
    <div class="absolute flex flex-col p-6 bg-white rounded-lg gap-4">
      {comments.length > 0
        ? (
          <>
            <p>Comentários:</p>
            <ul>
              {comments.map((comment) => <li key={comment}>{comment}</li>)}
            </ul>
          </>
        )
        : <p>Não há comentários para esse produto.</p>}
    </div>
  );
}
